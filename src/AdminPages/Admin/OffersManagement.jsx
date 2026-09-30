import { useState } from 'react'
import './Admin.css'

function OffersManagement({ language }) {

  // Stores all offers
  const [offers, setOffers] = useState([])

  // Stores form values
  const [offerName, setOfferName] = useState('')
  const [description, setDescription] = useState('')
  const [discount, setDiscount] = useState('')
  const [status, setStatus] = useState('Active')

  // Stores the offer being edited
  const [editIndex, setEditIndex] = useState(null)


  // ================= ADD / UPDATE OFFER =================

  // Add Offer button does nothing for now
  function handleOfferSubmit(e) {

    e.preventDefault()

  }


  // ================= EDIT OFFER =================

  function handleEdit(index) {

    const selectedOffer = offers[index]

    setOfferName(selectedOffer.name)
    setDescription(selectedOffer.description)
    setDiscount(selectedOffer.discount)
    setStatus(selectedOffer.status)

    setEditIndex(index)

  }


  // ================= DELETE OFFER =================

  function handleDelete(index) {

    if (
      window.confirm(
        language === 'EN'
          ? 'Are you sure you want to delete this offer?'
          : 'هل أنت متأكد أنك تريد حذف هذا العرض؟'
      )
    ) {

      const updatedOffers = offers.filter(
        (offer, i) => i !== index
      )

      setOffers(updatedOffers)

    }

  }


  // ================= CANCEL EDIT =================

  function handleCancelEdit() {

    setOfferName('')
    setDescription('')
    setDiscount('')
    setStatus('Active')

    setEditIndex(null)

  }


  return (

    <div className="admin-management-page">

      <div className="container">


        {/* ================= PAGE HEADING ================= */}

        <div className="admin-management-heading text-center">

          <span>
            {language === 'EN'
              ? 'ADMIN PORTAL'
              : 'بوابة المسؤول'}
          </span>

          <h1>
            {language === 'EN'
              ? 'Offers Management'
              : 'إدارة العروض'}
          </h1>

          <p>
            {language === 'EN'
              ? 'Create, update and manage restaurant offers.'
              : 'إنشاء وتحديث وإدارة عروض المطعم.'}
          </p>

        </div>


        {/* ================= OFFER FORM ================= */}

        <div className="admin-management-form">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h2 className="mb-0">

              {editIndex === null
                ? language === 'EN'
                  ? 'Add New Offer'
                  : 'إضافة عرض جديد'
                : language === 'EN'
                  ? 'Update Offer'
                  : 'تحديث العرض'}

            </h2>


            {editIndex !== null && (

              <span className="admin-edit-label">

                <i className="bi bi-pencil-square me-1"></i>

                {language === 'EN'
                  ? 'Editing Offer'
                  : 'تعديل العرض'}

              </span>

            )}

          </div>


          <form onSubmit={handleOfferSubmit}>

            <div className="row g-3">


              {/* Offer Name */}

              <div className="col-md-6">

                <label>
                  {language === 'EN'
                    ? 'Offer Name'
                    : 'اسم العرض'}
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={offerName}
                  onChange={(e) => setOfferName(e.target.value)}
                  placeholder={
                    language === 'EN'
                      ? 'Enter offer name'
                      : 'أدخل اسم العرض'
                  }
                  required
                />

              </div>


              {/* Discount */}

              <div className="col-md-3">

                <label>
                  {language === 'EN'
                    ? 'Discount (%)'
                    : 'الخصم (%)'}
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="10"
                  min="1"
                  max="100"
                  required
                />

              </div>


              {/* Status */}

              <div className="col-md-3">

                <label>
                  {language === 'EN'
                    ? 'Status'
                    : 'الحالة'}
                </label>

                <select
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >

                  <option value="Active">
                    {language === 'EN'
                      ? 'Active'
                      : 'نشط'}
                  </option>

                  <option value="Inactive">
                    {language === 'EN'
                      ? 'Inactive'
                      : 'غير نشط'}
                  </option>

                </select>

              </div>


              {/* Description */}

              <div className="col-12">

                <label>
                  {language === 'EN'
                    ? 'Description'
                    : 'الوصف'}
                </label>

                <textarea
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    language === 'EN'
                      ? 'Enter offer description'
                      : 'أدخل وصف العرض'
                  }
                  required
                ></textarea>

              </div>

            </div>


            {/* ================= FORM BUTTONS ================= */}

            <div className="mt-4">

              <button
                type="submit"
                className="admin-management-btn"
              >

                <i
                  className={
                    editIndex === null
                      ? 'bi bi-plus-circle me-2'
                      : 'bi bi-pencil-square me-2'
                  }
                ></i>

                {editIndex === null
                  ? language === 'EN'
                    ? 'Add Offer'
                    : 'إضافة عرض'
                  : language === 'EN'
                    ? 'Update Offer'
                    : 'تحديث العرض'}

              </button>


              {/* Cancel Edit Button */}

              {editIndex !== null && (

                <button
                  type="button"
                  className="admin-cancel-btn ms-2"
                  onClick={handleCancelEdit}
                >

                  <i className="bi bi-x-circle me-2"></i>

                  {language === 'EN'
                    ? 'Cancel'
                    : 'إلغاء'}

                </button>

              )}

            </div>

          </form>

        </div>


        {/* ================= OFFERS TABLE ================= */}

        <div className="admin-management-table">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h2 className="mb-0">

              {language === 'EN'
                ? 'Current Offers'
                : 'العروض الحالية'}

            </h2>


            <span className="admin-offer-count">

              {offers.length}{' '}

              {language === 'EN'
                ? offers.length === 1
                  ? 'Offer'
                  : 'Offers'
                : 'عروض'}

            </span>

          </div>


          {/* Table is always visible */}

          <div className="table-responsive">

            <table className="table table-dark table-hover align-middle">

              {/* ================= TABLE HEAD ================= */}

              <thead>

                <tr>

                  <th>
                    {language === 'EN'
                      ? 'Offer Name'
                      : 'اسم العرض'}
                  </th>

                  <th>
                    {language === 'EN'
                      ? 'Description'
                      : 'الوصف'}
                  </th>

                  <th>
                    {language === 'EN'
                      ? 'Discount'
                      : 'الخصم'}
                  </th>

                  <th>
                    {language === 'EN'
                      ? 'Status'
                      : 'الحالة'}
                  </th>

                  <th>
                    {language === 'EN'
                      ? 'Actions'
                      : 'الإجراءات'}
                  </th>

                </tr>

              </thead>


              {/* ================= TABLE BODY ================= */}

              <tbody>

                {offers.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center"
                    >

                      <div className="admin-management-empty">

                        <div className="admin-empty-icon">
                          <i className="bi bi-tags"></i>
                        </div>

                        <h3>
                          {language === 'EN'
                            ? 'No Offers Yet'
                            : 'لا توجد عروض بعد'}
                        </h3>

                        <p>
                          {language === 'EN'
                            ? 'Offer records will appear here when the database is connected.'
                            : 'ستظهر سجلات العروض هنا عند ربط قاعدة البيانات.'}
                        </p>

                      </div>

                    </td>

                  </tr>

                ) : (

                  offers.map((offer, index) => (

                    <tr key={index}>

                      {/* Offer Name */}

                      <td>

                        <strong>
                          {offer.name}
                        </strong>

                      </td>


                      {/* Description */}

                      <td>
                        {offer.description}
                      </td>


                      {/* Discount */}

                      <td>

                        <span className="admin-discount-badge">

                          {offer.discount}%

                        </span>

                      </td>


                      {/* Status */}

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
                            ? language === 'EN'
                              ? 'Active'
                              : 'نشط'
                            : language === 'EN'
                              ? 'Inactive'
                              : 'غير نشط'}

                        </span>

                      </td>


                      {/* Actions */}

                      <td>

                        {/* Edit Button */}

                        <button
                          type="button"
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(index)}
                          title={
                            language === 'EN'
                              ? 'Edit Offer'
                              : 'تعديل العرض'
                          }
                        >

                          <i className="bi bi-pencil"></i>

                        </button>


                        {/* Delete Button */}

                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(index)}
                          title={
                            language === 'EN'
                              ? 'Delete Offer'
                              : 'حذف العرض'
                          }
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

export default OffersManagement