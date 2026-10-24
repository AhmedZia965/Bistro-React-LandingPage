
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  getCustomerAddressesAxiosFunction,
  saveCustomerAddressesAxiosFunction
} from '../../Services/api'
import './Customer.css'

const MAX_ADDRESSES = 5

// Optional text field
const optionalText = (max, label) =>
  z.string()
    .trim()
    .max(max, `${label} cannot exceed ${max} characters`)

const addressSchema = z.object({
  label: z.enum(['Home', 'Work', 'Other']),

  city: z.string()
    .trim()
    .min(2, 'City must have at least 2 characters')
    .max(40, 'City cannot exceed 40 characters')
    .regex(/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/, 'Enter a valid city name'),

  area: z.string()
    .trim()
    .min(2, 'Area must have at least 2 characters')
    .max(40, 'Area cannot exceed 40 characters'),

  street: z.string()
    .trim()
    .min(2, 'Street must have at least 2 characters')
    .max(60, 'Street cannot exceed 60 characters'),

  building: z.string()
    .trim()
    .min(1, 'Building / house number is required')
    .max(15, 'Building / house number cannot exceed 15 characters')
    .regex(/^[A-Za-z0-9\-\/ ]+$/, 'Use letters, numbers, spaces, - or / only'),

  apartment: optionalText(15, 'Apartment')
    .refine(
      value => value === '' || /^[A-Za-z0-9\-\/ ]+$/.test(value),
      'Use letters, numbers, spaces, - or / only'
    ),

  phone: z.string()
    .trim()
    .refine(
      value => /^\+?[0-9]+$/.test(value),
      'Phone can only contain digits, with an optional + at the start'
    )
    .refine(
      value => value.replace('+', '').length >= 8,
      'Phone number must have at least 8 digits'
    )
    .refine(
      value => value.replace('+', '').length <= 10,
      'Phone number cannot exceed 10 digits'
    ),

  notes: optionalText(150, 'Notes'),

  isDefault: z.boolean()
})

const emptyAddress = {
  label: 'Home',
  city: '',
  area: '',
  street: '',
  building: '',
  apartment: '',
  phone: '',
  notes: '',
  isDefault: false
}

function Addresses({ language }) {
  const t = (en, ar) => (language === 'EN' ? en : ar)

  const [addresses, setAddresses] = useState([])
  const [editIndex, setEditIndex] = useState(null)

  // Load the logged-in customer's addresses
  useEffect(() => {
    const customerId = sessionStorage.getItem('customerId')

    if (customerId) {
      getCustomerAddressesAxiosFunction(customerId)
        .then((response) => {
          setAddresses(response.data)
        })
        .catch((error) => {
          console.error('Error retrieving addresses:', error)
        })
    }
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: emptyAddress,
    mode: 'onBlur'
  })

  // Save the complete address list to MongoDB
  async function saveAddresses(updated) {
    const customerId = sessionStorage.getItem('customerId')

    if (!customerId) {
      alert(t('Please log in first.', 'يرجى تسجيل الدخول أولاً.'))
      return false
    }

    try {
      await saveCustomerAddressesAxiosFunction(customerId, updated)
      setAddresses(updated)
      return true
    } catch (error) {
      console.error('Error saving addresses:', error)
      alert(t('Could not save addresses. Please try again.', 'تعذر حفظ العناوين. حاول مرة أخرى.'))
      return false
    }
  }

  // ================= ADD / UPDATE ADDRESS =================

  async function handleAddressSubmit(data) {
    if (editIndex === null && addresses.length >= MAX_ADDRESSES) {
      alert(t(
        `You can save up to ${MAX_ADDRESSES} addresses.`,
        `يمكنك حفظ ${MAX_ADDRESSES} عناوين كحد أقصى.`
      ))
      return
    }

    const newAddress = {
      label: data.label,
      city: data.city.trim(),
      area: data.area.trim(),
      street: data.street.trim(),
      building: data.building.trim(),
      apartment: data.apartment.trim(),
      phone: data.phone.trim(),
      notes: data.notes.trim(),
      isDefault: data.isDefault ||
        (editIndex === null && addresses.length === 0)
    }

    let updated = newAddress.isDefault
      ? addresses.map(address => ({
          ...address,
          isDefault: false
        }))
      : [...addresses]

    if (editIndex === null) {
      updated = [...updated, newAddress]
    } else {
      updated = updated.map((address, index) =>
        index === editIndex ? newAddress : address
      )
    }

    if (updated.length > 0 && !updated.some(address => address.isDefault)) {
      updated[0] = {
        ...updated[0],
        isDefault: true
      }
    }

    const saved = await saveAddresses(updated)

    if (saved) {
      reset(emptyAddress)
      setEditIndex(null)
    }
  }

  // ================= EDIT ADDRESS =================

  function handleEdit(index) {
    const address = addresses[index]

    reset({
      ...emptyAddress,
      ...address
    })

    setEditIndex(index)

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // ================= CANCEL EDIT =================

  function handleCancelEdit() {
    reset(emptyAddress)
    setEditIndex(null)
  }

  // ================= DELETE ADDRESS =================

  async function handleDelete(index) {
    if (
      window.confirm(
        t(
          'Are you sure you want to delete this address?',
          'هل أنت متأكد أنك تريد حذف هذا العنوان؟'
        )
      )
    ) {
      let updated = addresses.filter((address, i) => i !== index)

      if (updated.length > 0 && !updated.some(address => address.isDefault)) {
        updated[0] = {
          ...updated[0],
          isDefault: true
        }
      }

      const saved = await saveAddresses(updated)

      if (saved) {
        if (editIndex === index) {
          handleCancelEdit()
        } else if (editIndex !== null && editIndex > index) {
          setEditIndex(editIndex - 1)
        }
      }
    }
  }

  // ================= SET DEFAULT ADDRESS =================

  async function handleSetDefault(index) {
    const updated = addresses.map((address, i) => ({
      ...address,
      isDefault: i === index
    }))

    await saveAddresses(updated)
  }

  // ================= ADDRESS LABELS =================

  const labelText = {
    Home: t('Home', 'المنزل'),
    Work: t('Work', 'العمل'),
    Other: t('Other', 'آخر')
  }

  const labelIcon = {
    Home: 'bi-house-door-fill',
    Work: 'bi-briefcase-fill',
    Other: 'bi-geo-alt-fill'
  }

  // ================= VALIDATION ERRORS =================

  const fieldError = (name) =>
    errors[name] && (
      <small className="text-danger d-block mt-1">
        {errors[name].message}
      </small>
    )

  // ================= PAGE =================

  return (
    <div className="addresses-page container-fluid px-4 py-3">

      {/* Page Heading */}

      <div className="text-center mb-5">
        <h1>{t('My Addresses', 'عناويني')}</h1>
        <p>
          {t(
            'Save your delivery addresses for faster checkout.',
            'احفظ عناوين التوصيل لإتمام الطلب بشكل أسرع.'
          )}
        </p>
      </div>

      {/* Address Form */}

      <div className="card p-4 mb-5">
        <h2 className="mb-4">
          {editIndex === null
            ? t('Add New Address', 'إضافة عنوان جديد')
            : t('Update Address', 'تحديث العنوان')}
        </h2>

        <form onSubmit={handleSubmit(handleAddressSubmit)} noValidate>
          <div className="row g-3">

            <div className="col-md-6">
              <label className="form-label">
                {t('Address Label', 'نوع العنوان')}
              </label>
              <select className="form-control" {...register('label')}>
                <option value="Home">{labelText.Home}</option>
                <option value="Work">{labelText.Work}</option>
                <option value="Other">{labelText.Other}</option>
              </select>
              {fieldError('label')}
            </div>

            <div className="col-md-6">
              <label className="form-label">{t('City', 'المدينة')}</label>
              <input
                type="text"
                className="form-control"
                placeholder={t('Enter city', 'أدخل المدينة')}
                {...register('city')}
              />
              {fieldError('city')}
            </div>

            <div className="col-md-6">
              <label className="form-label">{t('Area', 'المنطقة')}</label>
              <input
                type="text"
                className="form-control"
                placeholder={t('Enter area', 'أدخل المنطقة')}
                {...register('area')}
              />
              {fieldError('area')}
            </div>

            <div className="col-md-6">
              <label className="form-label">{t('Street', 'الشارع')}</label>
              <input
                type="text"
                className="form-control"
                placeholder={t('Enter street', 'أدخل الشارع')}
                {...register('street')}
              />
              {fieldError('street')}
            </div>

            <div className="col-md-6">
              <label className="form-label">
                {t('Building / House No.', 'رقم المبنى / المنزل')}
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={t('Enter building number', 'أدخل رقم المبنى')}
                {...register('building')}
              />
              {fieldError('building')}
            </div>

            <div className="col-md-6">
              <label className="form-label">
                {t('Phone Number', 'رقم الهاتف')}
              </label>
              <input
                type="tel"
                className="form-control"
                placeholder={t('Enter phone number', 'أدخل رقم الهاتف')}
                {...register('phone')}
              />
              {fieldError('phone')}
            </div>

          </div>

          {/* Form Buttons */}

          <div className="mt-4">
            <button type="submit" className="btn btn-primary">
              <i
                className={
                  editIndex === null
                    ? 'bi bi-plus-circle me-2'
                    : 'bi bi-pencil-square me-2'
                }
              ></i>
              {editIndex === null
                ? t('Save Address', 'حفظ العنوان')
                : t('Update Address', 'تحديث العنوان')}
            </button>

            {editIndex !== null && (
              <button
                type="button"
                className="btn btn-outline-secondary ms-2"
                onClick={handleCancelEdit}
              >
                <i className="bi bi-x-circle me-2"></i>
                {t('Cancel', 'إلغاء')}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Saved Addresses Heading */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          {t('Saved Addresses', 'العناوين المحفوظة')}
        </h2>
        <span>{addresses.length} / {MAX_ADDRESSES}</span>
      </div>

      {/* Empty Address Message */}

      {addresses.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-geo-alt display-4"></i>
          <h3 className="mt-3">
            {t('No Saved Addresses', 'لا توجد عناوين محفوظة')}
          </h3>
          <p>
            {t(
              'Add an address using the form above.',
              'أضف عنواناً باستخدام النموذج أعلاه.'
            )}
          </p>
        </div>
      ) : (

        /* Saved Address Cards */

        <div className="row g-4">
          {addresses.map((address, index) => (
            <div className="col-md-6" key={address._id || index}>
              <div className="card p-3 h-100">

                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="mb-0">
                    <i className={`bi ${labelIcon[address.label]} me-2`}></i>
                    {labelText[address.label]}
                  </h5>

                  {address.isDefault && (
                    <span className="badge bg-success">
                      {t('Default', 'افتراضي')}
                    </span>
                  )}
                </div>

                <p className="mb-1">
                  {address.building}
                  {address.apartment && `, ${address.apartment}`}
                  {', '}
                  {address.street}
                </p>

                <p className="mb-1">
                  {address.area}, {address.city}
                </p>

                <p className="mb-1">
                  <i className="bi bi-telephone me-1"></i>
                  {address.phone}
                </p>

                {address.notes && (
                  <p className="mb-1">
                    <i className="bi bi-chat-left-text me-1"></i>
                    {address.notes}
                  </p>
                )}

                {/* Address Action Buttons */}

                <div className="mt-3">
                  {!address.isDefault && (
                    <button
                      type="button"
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleSetDefault(index)}
                      title={t('Set as Default', 'تعيين كافتراضي')}
                    >
                      <i className="bi bi-check2-circle"></i>
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(index)}
                    title={t('Edit Address', 'تعديل العنوان')}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(index)}
                    title={t('Delete Address', 'حذف العنوان')}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Addresses
