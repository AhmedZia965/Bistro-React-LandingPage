import '../Admin/Admin.css'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const offerSchema = z.object({

  name: z.string()
    .trim()
    .min(3, 'Offer name must have at least 3 characters')
    .max(60, 'Offer name cannot exceed 60 characters'),

  description: z.string()
    .trim()
    .min(10, 'Description must have at least 10 characters')
    .max(300, 'Description cannot exceed 300 characters'),

  discount: z.string()
    .trim()
    .min(1, 'Discount is required')
    .refine(value => {
      return /^\d+$/.test(value) &&
        Number(value) >= 1 &&
        Number(value) <= 100
    }, 'Discount must be a whole number from 1 to 100'),

  status: z.enum(['Active', 'Inactive'])

})

const emptyOffer = {
  name: '',
  description: '',
  discount: '',
  status: 'Active'
}


// offers + setOffers come from AdminDashboard so the data
// survives page switches.
function AdminOfferManagement() {

  const { language, offers, setOffers } = useOutletContext()

  const t = (en, ar) => (language === 'EN' ? en : ar)

  // Index of the offer being edited (null = adding a new one)
  const [editIndex, setEditIndex] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(offerSchema),
    defaultValues: emptyOffer,
    mode: 'onBlur'
  })


  // ================= ADD / UPDATE OFFER =================

  function handleOfferSubmit(data) {

    const newOffer = {
      name: data.name.trim(),
      description: data.description.trim(),
      discount: data.discount,
      status: data.status
    }

    if (editIndex === null) {
      setOffers([...offers, newOffer])
    } else {
      setOffers(
        offers.map((offer, index) =>
          index === editIndex ? newOffer : offer
        )
      )
    }

    reset(emptyOffer)
    setEditIndex(null)

  }


  // ================= EDIT OFFER =================

  function handleEdit(index) {

    const selectedOffer = offers[index]

    reset({
      name: selectedOffer.name,
      description: selectedOffer.description,
      discount: String(selectedOffer.discount),
      status: selectedOffer.status
    })

    setEditIndex(index)

  }


  // ================= CANCEL EDIT =================

  function handleCancelEdit() {

    reset(emptyOffer)
    setEditIndex(null)

  }


  // ================= DELETE OFFER =================

  function handleDelete(index) {

    if (
      window.confirm(
        t(
          'Are you sure you want to delete this offer?',
          'هل أنت متأكد أنك تريد حذف هذا العرض؟'
        )
      )
    ) {

      setOffers(offers.filter((offer, i) => i !== index))

      if (editIndex === index) {
        handleCancelEdit()
      } else if (editIndex !== null && editIndex > index) {
        setEditIndex(editIndex - 1)
      }

    }

  }


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

          <h1>{t('Offers Management', 'إدارة العروض')}</h1>

          <p>{t('Create, update and manage restaurant offers.', 'إنشاء وتحديث وإدارة عروض المطعم.')}</p>

        </div>


        {/* Offer Form */}

        <div className="admin-management-form">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h2 className="mb-0">
              {editIndex === null
                ? t('Add New Offer', 'إضافة عرض جديد')
                : t('Update Offer', 'تحديث العرض')}
            </h2>

            {editIndex !== null && (
              <span className="admin-edit-label">
                <i className="bi bi-pencil-square me-1"></i>
                {t('Editing Offer', 'تعديل العرض')}
              </span>
            )}

          </div>


          <form onSubmit={handleSubmit(handleOfferSubmit)} noValidate>

            <div className="row g-3">


              {/* Offer Name */}

              <div className="col-md-6">
                <label>{t('Offer Name', 'اسم العرض')}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={t('Enter offer name', 'أدخل اسم العرض')}
                  {...register('name')}
                />
                {fieldError('name')}
              </div>


              {/* Discount */}

              <div className="col-md-3">
                <label>{t('Discount (%)', 'الخصم (%)')}</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="10"
                  min="1"
                  max="100"
                  {...register('discount')}
                />
                {fieldError('discount')}
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


              {/* Description */}

              <div className="col-12">
                <label>{t('Description', 'الوصف')}</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder={t('Enter offer description', 'أدخل وصف العرض')}
                  {...register('description')}
                ></textarea>
                {fieldError('description')}
              </div>

            </div>


            {/* Form Buttons */}

            <div className="mt-4">

              <button type="submit" className="admin-management-btn">
                <i
                  className={
                    editIndex === null
                      ? 'bi bi-plus-circle me-2'
                      : 'bi bi-pencil-square me-2'
                  }
                ></i>
                {editIndex === null
                  ? t('Add Offer', 'إضافة عرض')
                  : t('Update Offer', 'تحديث العرض')}
              </button>

              {editIndex !== null && (
                <button
                  type="button"
                  className="admin-cancel-btn ms-2"
                  onClick={handleCancelEdit}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  {t('Cancel', 'إلغاء')}
                </button>
              )}

            </div>

          </form>

        </div>


        {/* Offers Table */}

        <div className="admin-management-table">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h2 className="mb-0">{t('Current Offers', 'العروض الحالية')}</h2>

            <span className="admin-offer-count">
              {offers.length}{' '}
              {language === 'EN'
                ? offers.length === 1 ? 'Offer' : 'Offers'
                : 'عروض'}
            </span>

          </div>


          <div className="table-responsive">

            <table className="table table-dark table-hover align-middle">

              <thead>
                <tr>
                  <th>{t('Offer Name', 'اسم العرض')}</th>
                  <th>{t('Description', 'الوصف')}</th>
                  <th>{t('Discount', 'الخصم')}</th>
                  <th>{t('Status', 'الحالة')}</th>
                  <th>{t('Actions', 'الإجراءات')}</th>
                </tr>
              </thead>

              <tbody>

                {offers.length === 0 ? (

                  <tr>
                    <td colSpan="5" className="text-center">
                      <div className="admin-management-empty">
                        <div className="admin-empty-icon">
                          <i className="bi bi-tags"></i>
                        </div>
                        <h3>{t('No Offers Yet', 'لا توجد عروض بعد')}</h3>
                        <p>{t('Add an offer using the form above.', 'أضف عرضاً باستخدام النموذج أعلاه.')}</p>
                      </div>
                    </td>
                  </tr>

                ) : (

                  offers.map((offer, index) => (

                    <tr key={index}>

                      <td><strong>{offer.name}</strong></td>

                      <td>{offer.description}</td>

                      <td>
                        <span className="admin-discount-badge">
                          {offer.discount}%
                        </span>
                      </td>

                      <td>
                        <span
                          className={
                            offer.status === 'Active'
                              ? 'admin-status-active'
                              : 'admin-status-inactive'
                          }
                        >
                          <i
                            className={
                              offer.status === 'Active'
                                ? 'bi bi-check-circle me-1'
                                : 'bi bi-x-circle me-1'
                            }
                          ></i>
                          {offer.status === 'Active'
                            ? t('Active', 'نشط')
                            : t('Inactive', 'غير نشط')}
                        </span>
                      </td>

                      <td>

                        <button
                          type="button"
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(index)}
                          title={t('Edit Offer', 'تعديل العرض')}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(index)}
                          title={t('Delete Offer', 'حذف العرض')}
                        >
                          <i className="bi bi-trash"></i>
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

export default AdminOfferManagement
