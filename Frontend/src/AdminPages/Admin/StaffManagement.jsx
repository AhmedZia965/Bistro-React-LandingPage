
import '../Admin/StaffManagement.css'

import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  getStaffAxiosFunction,
  addStaffAxiosFunction,
  deleteStaffAxiosFunction,
  updateStaffAxiosFunction
} from '../../Services/AdminApi.js'


const staffSchema = z.object({

  name: z.string()
    .trim()
    .min(2, 'Name must have at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/, 'Enter a valid name'),

  id: z.string()
    .trim()
    .regex(
      /^(WT|CH|CL)\d{3,13}$/,
      'Staff ID must start with WT, CH or CL followed by 3-13 digits'
    ),

  email: z.string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address')
    .max(254, 'Email cannot exceed 254 characters'),

  password: z.string()
    .min(8, 'Password must have at least 8 characters')
    .max(128, 'Password cannot exceed 128 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[a-z]/, 'Password must contain a lowercase letter')
    .regex(/[0-9]/, 'Password must contain a number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain a special character'),

  phone: z.string()
    .trim()
    .regex(
      /^\+?[0-9]{8,12}$/,
      'Enter a valid phone number (8-12 digits, optional +)'
    ),

  role: z.enum(['Waiter', 'Chef', 'Cleaner']),

  workTime: z.enum(['Morning', 'Evening', 'Night']),

  salary: z.string()
    .trim()
    .min(1, 'Salary is required')
    .refine(value => {
      const number = Number(value)
      return Number.isFinite(number) && number > 0
    }, 'Salary must be greater than zero')
    .refine(value => Number(value) <= 1000, 'Salary cannot exceed 1000 KWD')
    .refine(
      value => /^\d+(?:\.\d{1,3})?$/.test(value),
      'Enter a valid salary with up to 3 decimal places'
    ),

  status: z.enum(['Active', 'Inactive'])

}).superRefine((data, ctx) => {

  const rolePrefixes = {
    Waiter: 'WT',
    Chef: 'CH',
    Cleaner: 'CL'
  }

  if (
    data.role &&
    data.id &&
    !data.id.startsWith(rolePrefixes[data.role])
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['id'],
      message: `Staff ID must start with ${rolePrefixes[data.role]} for the selected role`
    })
  }

})


const emptyForm = {
  name: '',
  id: '',
  email: '',
  password: '',
  phone: '',
  role: 'Waiter',
  workTime: 'Morning',
  salary: '',
  status: 'Active'
}


function StaffManagement() {

  const { language } = useOutletContext()

  // This state displays the records fetched from MongoDB.
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)

  const t = (en, ar) => (language === 'EN' ? en : ar)

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(staffSchema),
    defaultValues: emptyForm,
    mode: 'onBlur'
  })


  // ================= FETCH STAFF FROM DATABASE =================

  async function loadStaff() {

    try {

      const res = await getStaffAxiosFunction()

      setStaff(res.data)

    } catch (error) {

      console.error('Failed to fetch staff:', error)

      alert(
        t(
          'Failed to load staff members from the database.',
          'فشل تحميل الموظفين من قاعدة البيانات.'
        )
      )

    } finally {

      setLoading(false)

    }
  }


  // Fetch staff whenever this page loads.
  useEffect(() => {
    loadStaff()
  }, [])


  // ================= ADD / UPDATE STAFF =================

  async function handleSaveStaff(data) {

    const body = {
      name: data.name.trim(),
      id: data.id.trim(),
      email: data.email.trim(),
      password: data.password,
      phone: data.phone.trim(),
      role: data.role,
      workTime: data.workTime,
      salary: data.salary,
      status: data.status
    }

    // ---------- UPDATE STAFF IN DATABASE ----------

    if (editingId) {

      try {

        await updateStaffAxiosFunction(editingId, body)

        // Reload the records from MongoDB.
        await loadStaff()

        setEditingId(null)
        reset(emptyForm)

      } catch (error) {

        console.error('Failed to update staff:', error)

        alert(
          error.response?.data?.message || 'Failed to update staff'
        )

      }

      return
    }


    // ---------- CHECK DUPLICATE ID ----------

    const duplicateId = staff.some(
      member => member.id.toLowerCase() === body.id.toLowerCase()
    )

    if (duplicateId) {

      setError('id', {
        type: 'manual',
        message: 'This Staff ID already exists'
      })

      return
    }


    // ---------- ADD STAFF TO DATABASE ----------

    try {

      await addStaffAxiosFunction(body)

      // Reload the records from MongoDB.
      await loadStaff()

      reset(emptyForm)

    } catch (error) {

      const message =
        error.response?.data?.message || 'Failed to add staff'

      if (error.response?.status === 400) {

        if (message.toLowerCase().includes('email')) {

          setError('email', {
            type: 'manual',
            message
          })

        } else if (message.toLowerCase().includes('id')) {

          setError('id', {
            type: 'manual',
            message
          })

        } else {

          alert(message)

        }

      } else {

        console.error('Failed to add staff:', error)
        alert(message)

      }

    }
  }


  // ================= START EDIT =================

  function handleEditStaff(member) {

    setEditingId(member.id)

    reset({
      name: member.name,
      id: member.id,
      email: member.email,
      password: member.password, 
      role: member.role,
      workTime: member.workTime,
      salary: String(member.salary),
      status: member.status,
      phone: member.phone
    })

  }


  // ================= CANCEL EDIT =================

  function handleCancelEdit() {

    setEditingId(null)
    reset(emptyForm)

  }


  // ================= REMOVE STAFF FROM DATABASE =================

  async function handleRemoveStaff(id) {

    if (
      window.confirm(
        t(
          'Are you sure you want to remove this staff member?',
          'هل أنت متأكد أنك تريد إزالة هذا الموظف؟'
        )
      )
    ) {

      try {

        await deleteStaffAxiosFunction(id)

        // Reload the records from MongoDB.
        await loadStaff()

        if (editingId === id) {
          handleCancelEdit()
        }

      } catch (error) {

        console.error('Failed to delete staff:', error)

        alert(
          error.response?.data?.message || 'Failed to delete staff'
        )

      }

    }
  }


  // ================= VALIDATION MESSAGE =================

  const fieldError = (name) =>
    errors[name] && (
      <small className="text-danger d-block mt-1">
        {errors[name].message}
      </small>
    )


  return (

    <div className="admin-management-page">

      <div className="container">

        {/* Page Heading */}

        <div className="admin-management-heading text-center">
          <span>{t('ADMIN PORTAL', 'بوابة المسؤول')}</span>
          <h1>{t('Staff Management', 'إدارة الموظفين')}</h1>
          <p>
            {t(
              'Add and manage restaurant staff members.',
              'إضافة وإدارة موظفي المطعم.'
            )}
          </p>
        </div>


        {/* Add / Edit Staff Form */}

        <div className="admin-management-form">

          <h2>
            {editingId
              ? t('Edit Staff Member', 'تعديل الموظف')
              : t('Add Staff Member', 'إضافة موظف')}
          </h2>

          <form onSubmit={handleSubmit(handleSaveStaff)} noValidate>

            <div className="row g-3">

              {/* Staff Name */}

              <div className="col-md-4">
                <label>{t('Staff Name', 'اسم الموظف')}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={t('Enter staff name', 'أدخل اسم الموظف')}
                  {...register('name')}
                />
                {fieldError('name')}
              </div>


              {/* Staff ID */}

              <div className="col-md-4">
                <label>{t('Staff ID', 'رقم الموظف')}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={t('Enter staff ID', 'أدخل رقم الموظف')}
                  readOnly={!!editingId}
                  {...register('id')}
                />
                {fieldError('id')}
              </div>


              {/* Phone */}

              <div className="col-md-4">
                <label>{t('Phone Number', 'رقم الهاتف')}</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder={t('Enter phone number', 'أدخل رقم الهاتف')}
                  {...register('phone')}
                />
                {fieldError('phone')}
              </div>


              {/* Email */}

              <div className="col-md-6">
                <label>{t('Email', 'البريد الإلكتروني')}</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder={t('Enter email', 'أدخل البريد الإلكتروني')}
                  {...register('email')}
                />
                {fieldError('email')}
              </div>


              {/* Password */}

              <div className="col-md-6">
                <label>{t('Password', 'كلمة المرور')}</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder={t('Enter password', 'أدخل password')}
                  {...register('password')}
                />
                {fieldError('password')}
              </div>


              {/* Role */}

              <div className="col-md-3">
                <label>{t('Role', 'الدور')}</label>
                <select className="form-control" {...register('role')}>
                  <option value="Waiter">{t('Waiter', 'نادل')}</option>
                  <option value="Chef">{t('Chef', 'طاهٍ')}</option>
                  <option value="Cleaner">{t('Cleaner', 'عامل نظافة')}</option>
                </select>
                {fieldError('role')}
              </div>


              {/* Work Time */}

              <div className="col-md-3">
                <label>{t('Work Time', 'وقت العمل')}</label>
                <select className="form-control" {...register('workTime')}>
                  <option value="Morning">{t('Morning', 'الصباح')}</option>
                  <option value="Evening">{t('Evening', 'المساء')}</option>
                  <option value="Night">{t('Night', 'الليل')}</option>
                </select>
                {fieldError('workTime')}
              </div>


              {/* Salary */}

              <div className="col-md-3">
                <label>{t('Salary', 'الراتب')}</label>
                <input
                  type="number"
                  step="0.001"
                  className="form-control"
                  placeholder={t('Enter salary', 'أدخل الراتب')}
                  {...register('salary')}
                />
                {fieldError('salary')}
              </div>


              {/* Status */}

              <div className="col-md-3">
                <label>{t('Status', 'الحالة')}</label>
                <select className="form-control" {...register('status')}>
                  <option value="Active">{t('Active', 'نشط')}</option>
                  <option value="Inactive">{t('Inactive', 'غير نشط')}</option>
                </select>
                {fieldError('status')}
              </div>

            </div>


            <button
              type="submit"
              className="admin-management-btn mt-4"
              disabled={loading}
            >
              <i
                className={
                  editingId
                    ? 'bi bi-check-lg me-2'
                    : 'bi bi-person-plus me-2'
                }
              ></i>

              {editingId
                ? t('Update Staff', 'تحديث الموظف')
                : t('Add Staff', 'إضافة موظف')}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn btn-secondary mt-4 ms-2"
                onClick={handleCancelEdit}
              >
                {t('Cancel', 'إلغاء')}
              </button>
            )}

          </form>

        </div>


        {/* Staff Table */}

        <div className="admin-management-table">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">
              {t('Staff Members', 'الموظفون')}
            </h2>

            <span className="admin-offer-count">
              {staff.length}{' '}
              {language === 'EN'
                ? staff.length === 1 ? 'Member' : 'Members'
                : 'موظفون'}
            </span>
          </div>


          <div className="Stafftable-responsive">

            <table className="Stafftable Stafftable-dark Stafftable-hover align-middle">

              <thead>
                <tr>
                  <th>{t('Staff Name', 'اسم الموظف')}</th>
                  <th>{t('Staff ID', 'رقم الموظف')}</th>
                  <th>{t('Phone', 'الهاتف')}</th>
                  <th>{t('Role', 'الدور')}</th>
                  <th>{t('Work Time', 'وقت العمل')}</th>
                  <th>{t('Salary', 'الراتب')}</th>
                  <th>{t('Status', 'الحالة')}</th>
                  <th>{t('Actions', 'الإجراءات')}</th>
                </tr>
              </thead>


              <tbody>

                {loading ? (

                  <tr>
                    <td colSpan="8" className="text-center p-4">
                      {t('Loading staff...', 'جارٍ تحميل الموظفين...')}
                    </td>
                  </tr>

                ) : staff.length === 0 ? (

                  <tr>
                    <td colSpan="8" className="text-center">

                      <div className="admin-management-empty">

                        <div className="admin-empty-icon">
                          <i className="bi bi-people"></i>
                        </div>

                        <h3>
                          {t('No Staff Members Yet', 'لا يوجد موظفون بعد')}
                        </h3>

                        <p>
                          {t(
                            'Add a staff member using the form above.',
                            'أضف موظفاً باستخدام النموذج أعلاه.'
                          )}
                        </p>

                      </div>

                    </td>
                  </tr>

                ) : (

                  staff.map((member) => (

                    <tr key={member.id}>

                      <td><strong>{member.name}</strong></td>
                      <td>{member.id}</td>
                      <td>{member.phone}</td>
                      <td>{member.role}</td>
                      <td>{member.workTime}</td>
                      <td>KWD {member.salary}</td>

                      <td>
                        <span
                          className={
                            member.status === 'Active'
                              ? 'admin-status-active'
                              : 'admin-status-inactive'
                          }
                        >
                          <i
                            className={
                              member.status === 'Active'
                                ? 'bi bi-check-circle me-1'
                                : 'bi bi-x-circle me-1'
                            }
                          ></i>

                          {member.status === 'Active'
                            ? t('Active', 'نشط')
                            : t('Inactive', 'غير نشط')}
                        </span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEditStaff(member)}
                          title={t('Edit Staff', 'تعديل الموظف')}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemoveStaff(member.id)}
                          title={t('Remove Staff', 'إزالة الموظف')}
                        >
                          <i className="bi bi-person-dash"></i>
                        </button>
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  )
}

export default StaffManagement
