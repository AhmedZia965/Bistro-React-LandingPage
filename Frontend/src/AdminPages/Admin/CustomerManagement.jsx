
import '../Admin/CustomerManagement.css'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { getCustomerFeedbackAxiosFunction } from '../../Services/AdminApi.js'

// customers comes from AdminDashboard (the dashboard shows the total too)
function CustomerManagement() {

  const { language } = useOutletContext()
  const [customers, setCustomers] = useState([])

  const t = (en, ar) => (language === 'EN' ? en : ar)

  useEffect(() => {
    getCustomerFeedbackAxiosFunction()
      .then((response) => {
        setCustomers(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const feedbackRows = customers.flatMap((customer) =>
    (customer.feedbacks || []).map((feedback, feedbackIndex) => ({
      id: `${customer._id}-${feedbackIndex}`,
      name: `${customer.firstName} ${customer.lastName}`,
      feedback
    }))
  )

  return (
    <div className="admin-management-page">

      <div className="container">

        {/* Page Heading */}
        <div className="admin-management-heading text-center">
          <span>{t('ADMIN PORTAL', 'بوابة المسؤول')}</span>

          <h1>{t('Customer Feedbacks', 'إدارة الملاحظات')}</h1>

          <p>
            {t(
              'Manage existing customers and customer activity.',
              'إدارة العملاء الحاليين ونشاط العملاء.'
            )}
          </p>
        </div>

        {/* Customer Table */}
        <div className="admin-management-table">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h2 className="mb-1">
                {t('Customer Feedbacks', 'إدارة الملاحظات')}
              </h2>

              <p className="mb-0 text-secondary">
                {t(
                  'Manage rewards, customer status and communication.',
                  'إدارة المكافآت وحالة العملاء والتواصل معهم.'
                )}
              </p>
            </div>

            <span className="admin-offer-count">
              <i className="bi bi-people me-1"></i>

              {customers.length}{' '}

              {language === 'EN'
                ? customers.length === 1
                  ? 'Customer'
                  : 'Customers'
                : 'عملاء'}
            </span>

          </div>

          <div className="table-responsive">

            <table className="Customertable table-dark table-hover align-middle">

              <thead>
                <tr>
                  <th>{t('Customer Name', 'اسم العميل')}</th>
                  <th>{t('Rating', 'التقييم')}</th>
                  <th>{t('Feedback Category', 'فئة الملاحظات')}</th>
                  <th>{t('Feedback', 'الملاحظات')}</th>
                </tr>
              </thead>

              <tbody>

                {feedbackRows.length === 0 ? (

                  <tr>
                    <td colSpan="4" className="text-center">

                      <div className="admin-management-empty">

                        <div className="admin-empty-icon">
                          <i className="bi bi-people"></i>
                        </div>

                        <h3>
                          {t(
                            'No Customer Feedback',
                            'لا توجد ملاحظات من العملاء'
                          )}
                        </h3>

                        <p>
                          {t(
                            'Customer feedback will appear here when available.',
                            'ستظهر ملاحظات العملاء هنا عند توفرها.'
                          )}
                        </p>

                      </div>

                    </td>
                  </tr>

                ) : (

                  feedbackRows.map((row) => (

                    <tr key={row.id}>

                      <td>
                        <strong>{row.name}</strong>
                      </td>

                      <td>
                        {row.feedback.experience || 'N/A'}
                      </td>

                      <td>
                        {row.feedback.category || 'N/A'}
                      </td>

                      <td>
                        {row.feedback.message || 'N/A'}
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

export default CustomerManagement
