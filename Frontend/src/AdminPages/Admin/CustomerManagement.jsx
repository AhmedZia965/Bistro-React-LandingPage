import '../Admin/Admin.css'
import { useOutletContext } from 'react-router-dom'

// customers comes from AdminDashboard (the dashboard shows the total too)
function CustomerManagement() {

  const { language, customers } = useOutletContext()

  const t = (en, ar) => (language === 'EN' ? en : ar)


  // ================= GIVE REWARD POINTS =================

  function handleRewardPoints(index) {
    alert(t(
      'Reward points feature will work when the database is connected.',
      'ستعمل ميزة نقاط المكافآت عند ربط قاعدة البيانات.'
    ))
  }


  // ================= BLACKMARK CUSTOMER =================

  function handleBlackmark(index) {
    alert(t(
      'Blackmark feature will work when the database is connected.',
      'ستعمل ميزة العلامة السوداء عند ربط قاعدة البيانات.'
    ))
  }


  // ================= SEND EMAIL =================

  function handleSendEmail(index) {
    alert(t(
      'Email feature will work when the email system is connected.',
      'ستعمل ميزة البريد الإلكتروني عند ربط نظام البريد.'
    ))
  }


  // ================= VIEW DETAILS =================

  function handleViewDetails(index) {
    alert(t(
      'Customer details will be displayed when the database is connected.',
      'ستظهر تفاصيل العميل عند ربط قاعدة البيانات.'
    ))
  }


  // ================= BLOCK CUSTOMER =================

  function handleBlockCustomer(index) {
    alert(t(
      'Block customer feature will work when the database is connected.',
      'ستعمل ميزة حظر العميل عند ربط قاعدة البيانات.'
    ))
  }


  return (

    <div className="admin-management-page">

      <div className="container">


        {/* Page Heading */}

        <div className="admin-management-heading text-center">

          <span>{t('ADMIN PORTAL', 'بوابة المسؤول')}</span>

          <h1>{t('Customer Management', 'إدارة العملاء')}</h1>

          <p>{t('Manage existing customers and customer activity.', 'إدارة العملاء الحاليين ونشاط العملاء.')}</p>

        </div>


        {/* Customer Table */}

        <div className="admin-management-table">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h2 className="mb-1">{t('Customer Accounts', 'حسابات العملاء')}</h2>
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
                ? customers.length === 1 ? 'Customer' : 'Customers'
                : 'عملاء'}
            </span>

          </div>


          <div className="table-responsive">

            <table className="table table-dark table-hover align-middle">

              <thead>
                <tr>
                  <th>{t('Customer Name', 'اسم العميل')}</th>
                  <th>{t('Email', 'البريد الإلكتروني')}</th>
                  <th>{t('Phone', 'رقم الهاتف')}</th>
                  <th>{t('Reward Points', 'نقاط المكافآت')}</th>
                  <th>{t('Status', 'الحالة')}</th>
                  <th>{t('Actions', 'الإجراءات')}</th>
                </tr>
              </thead>

              <tbody>

                {customers.length === 0 ? (

                  <tr>
                    <td colSpan="6" className="text-center">
                      <div className="admin-management-empty">
                        <div className="admin-empty-icon">
                          <i className="bi bi-people"></i>
                        </div>
                        <h3>{t('No Customer Accounts', 'لا توجد حسابات عملاء')}</h3>
                        <p>
                          {t(
                            'Customer records will appear here when the database is connected.',
                            'ستظهر سجلات العملاء هنا عند ربط قاعدة البيانات.'
                          )}
                        </p>
                      </div>
                    </td>
                  </tr>

                ) : (

                  customers.map((customer, index) => (

                    <tr key={customer.id ?? index}>

                      <td><strong>{customer.name}</strong></td>

                      <td>{customer.email}</td>

                      <td>{customer.phone}</td>

                      <td>
                        <span className="admin-discount-badge">
                          {customer.rewardPoints}
                        </span>
                      </td>

                      <td>
                        <span
                          className={
                            customer.blackmarked
                              ? 'admin-status-inactive'
                              : 'admin-status-active'
                          }
                        >
                          <i
                            className={
                              customer.blackmarked
                                ? 'bi bi-exclamation-circle me-1'
                                : 'bi bi-check-circle me-1'
                            }
                          ></i>
                          {customer.blackmarked
                            ? t('Blackmarked', 'مُعلّم')
                            : t('Active', 'نشط')}
                        </span>
                      </td>

                      <td>

                        <button
                          type="button"
                          className="btn btn-sm btn-success me-1"
                          onClick={() => handleRewardPoints(index)}
                          title={t('Give Reward Points', 'إضافة نقاط المكافآت')}
                        >
                          <i className="bi bi-gift"></i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-warning me-1"
                          onClick={() => handleBlackmark(index)}
                          title={t('Blackmark Customer', 'وضع علامة على العميل')}
                        >
                          <i className="bi bi-exclamation-triangle"></i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-info me-1"
                          onClick={() => handleSendEmail(index)}
                          title={t('Send Email', 'إرسال بريد إلكتروني')}
                        >
                          <i className="bi bi-envelope"></i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-secondary me-1"
                          onClick={() => handleViewDetails(index)}
                          title={t('View Details', 'عرض التفاصيل')}
                        >
                          <i className="bi bi-eye"></i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => handleBlockCustomer(index)}
                          title={t('Block Customer', 'حظر العميل')}
                        >
                          <i className="bi bi-person-x"></i>
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

export default CustomerManagement
