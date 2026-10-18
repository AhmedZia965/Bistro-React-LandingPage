import '../Admin/Admin.css'
import { useOutletContext } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const staffSchema = z.object({

  name: z.string()
    .trim()
    .min(2, 'Name must have at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/, 'Enter a valid name'),

  id: z.string()
    .trim()
    .min(3, 'Staff ID must have at least 3 characters')
    .max(15, 'Staff ID cannot exceed 15 characters')
    .regex(/^[A-Za-z0-9-]+$/, 'Use letters, numbers or hyphens only'),

  email: z.string()
    .trim()
    .email('Enter a valid email address'),

  phone: z.string()
    .trim()
    .regex(/^\+?[0-9]{8,10}$/, 'Enter 8-10 digits, with an optional +'),

  role: z.enum(['Waiter', 'Chef', 'Cleaner']),

  workTime: z.enum(['Morning', 'Evening', 'Night']),

  salary: z.string()
    .trim()
    .min(1, 'Salary is required')
    .refine(value => {
      const number = Number(value)
      return Number.isFinite(number) && number > 0
    }, 'Salary must be greater than zero')
    .refine(value => {
      return /^\d+(?:\.\d{1,3})?$/.test(value)
    }, 'Enter a valid salary with up to 3 decimal places'),

  status: z.enum(['Active', 'Inactive'])

})


// staff + setStaff come from AdminDashboard so the data
// survives page switches and the dashboard can show the total.
function StaffManagement() {

  const { language, staff, setStaff } = useOutletContext()

  const t = (en, ar) => (language === 'EN' ? en : ar)

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      name: '',
      id: '',
      email: '',
      phone: '',
      role: 'Waiter',
      workTime: 'Morning',
      salary: '',
      status: 'Active'
    },
    mode: 'onBlur'
  })


  // ================= ADD STAFF =================

  function handleAddStaff(data) {

    const duplicateId = staff.some(
      member => member.id.toLowerCase() === data.id.trim().toLowerCase()
    )

    if (duplicateId) {
      setError('id', {
        type: 'manual',
        message: 'This Staff ID already exists'
      })
      return
    }

    setStaff([
      ...staff,
      {
        name: data.name.trim(),
        id: data.id.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        role: data.role,
        workTime: data.workTime,
        salary: data.salary,
        status: data.status
      }
    ])

    reset()

  }


  // ================= REMOVE STAFF =================

  function handleRemoveStaff(index) {

    if (
      window.confirm(
        t(
          'Are you sure you want to remove this staff member?',
          'هل أنت متأكد أنك تريد إزالة هذا الموظف؟'
        )
      )
    ) {
      setStaff(staff.filter((member, i) => i !== index))
    }

  }


  // Small helper to show a validation message under a field
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

          <p>{t('Add and manage restaurant staff members.', 'إضافة وإدارة موظفي المطعم.')}</p>

        </div>


        {/* Add Staff Form */}

        <div className="admin-management-form">

          <h2>{t('Add Staff Member', 'إضافة موظف')}</h2>

          <form onSubmit={handleSubmit(handleAddStaff)} noValidate>

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


            <button type="submit" className="admin-management-btn mt-4">
              <i className="bi bi-person-plus me-2"></i>
              {t('Add Staff', 'إضافة موظف')}
            </button>

          </form>

        </div>


        {/* Staff Table */}

        <div className="admin-management-table">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h2 className="mb-0">{t('Staff Members', 'الموظفون')}</h2>

            <span className="admin-offer-count">
              {staff.length}{' '}
              {language === 'EN'
                ? staff.length === 1 ? 'Member' : 'Members'
                : 'موظفون'}
            </span>

          </div>


          <div className="table-responsive">

            <table className="table table-dark table-hover align-middle">

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

                {staff.length === 0 ? (

                  <tr>
                    <td colSpan="8" className="text-center">
                      <div className="admin-management-empty">
                        <div className="admin-empty-icon">
                          <i className="bi bi-people"></i>
                        </div>
                        <h3>{t('No Staff Members Yet', 'لا يوجد موظفون بعد')}</h3>
                        <p>{t('Add a staff member using the form above.', 'أضف موظفاً باستخدام النموذج أعلاه.')}</p>
                      </div>
                    </td>
                  </tr>

                ) : (

                  staff.map((member, index) => (

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
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemoveStaff(index)}
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
