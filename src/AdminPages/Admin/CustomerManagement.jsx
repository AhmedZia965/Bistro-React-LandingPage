import { useState } from 'react'
import './Admin.css'

function CustomerManagement({ language }) {

  // Stores all customers
  const [customers, setCustomers] = useState([])


  // ================= GIVE REWARD POINTS =================

  function handleRewardPoints(index) {

    alert(
      language === 'EN'
        ? 'Reward points feature will work when the database is connected.'
        : 'ستعمل ميزة نقاط المكافآت عند ربط قاعدة البيانات.'
    )

  }


  // ================= BLACKMARK CUSTOMER =================

  function handleBlackmark(index) {

    alert(
      language === 'EN'
        ? 'Blackmark feature will work when the database is connected.'
        : 'ستعمل ميزة العلامة السوداء عند ربط قاعدة البيانات.'
    )

  }


  // ================= SEND EMAIL =================

  function handleSendEmail(index) {

    alert(
      language === 'EN'
        ? 'Email feature will work when the email system is connected.'
        : 'ستعمل ميزة البريد الإلكتروني عند ربط نظام البريد.'
    )

  }


  // ================= VIEW DETAILS =================

  function handleViewDetails(index) {

    alert(
      language === 'EN'
        ? 'Customer details will be displayed when the database is connected.'
        : 'ستظهر تفاصيل العميل عند ربط قاعدة البيانات.'
    )

  }


  // ================= BLOCK CUSTOMER =================

  function handleBlockCustomer(index) {

    alert(
      language === 'EN'
        ? 'Block customer feature will work when the database is connected.'
        : 'ستعمل ميزة حظر العميل عند ربط قاعدة البيانات.'
    )

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
              ? 'Customer Management'
              : 'إدارة العملاء'}
          </h1>

          <p>
            {language === 'EN'
              ? 'Manage existing customers and customer activity.'
              : 'إدارة العملاء الحاليين ونشاط العملاء.'}
          </p>

        </div>


        {/* ================= CUSTOMER TABLE ================= */}

        <div className="admin-management-table">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <h2 className="mb-1">

                {language === 'EN'
                  ? 'Customer Accounts'
                  : 'حسابات العملاء'}

              </h2>

              <p className="mb-0 text-secondary">

                {language === 'EN'
                  ? 'Manage rewards, customer status and communication.'
                  : 'إدارة المكافآت وحالة العملاء والتواصل معهم.'}

              </p>

            </div>


            {/* Customer Count */}

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


          {/* ================= CUSTOMER TABLE ================= */}

          <div className="table-responsive">

            <table className="table table-dark table-hover align-middle">

              {/* ================= TABLE HEAD ================= */}

              <thead>

                <tr>

                  <th>
                    {language === 'EN'
                      ? 'Customer Name'
                      : 'اسم العميل'}
                  </th>

                  <th>
                    {language === 'EN'
                      ? 'Email'
                      : 'البريد الإلكتروني'}
                  </th>

                  <th>
                    {language === 'EN'
                      ? 'Phone'
                      : 'رقم الهاتف'}
                  </th>

                  <th>
                    {language === 'EN'
                      ? 'Reward Points'
                      : 'نقاط المكافآت'}
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

                {customers.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center"
                    >

                      <div className="admin-management-empty">

                        <div className="admin-empty-icon">

                          <i className="bi bi-people"></i>

                        </div>

                        <h3>

                          {language === 'EN'
                            ? 'No Customer Accounts'
                            : 'لا توجد حسابات عملاء'}

                        </h3>

                        <p>

                          {language === 'EN'
                            ? 'Customer records will appear here when the database is connected.'
                            : 'ستظهر سجلات العملاء هنا عند ربط قاعدة البيانات.'}

                        </p>

                      </div>

                    </td>

                  </tr>

                ) : (

                  customers.map((customer, index) => (

                    <tr key={index}>


                      {/* Customer Name */}

                      <td>

                        <strong>
                          {customer.name}
                        </strong>

                      </td>


                      {/* Email */}

                      <td>
                        {customer.email}
                      </td>


                      {/* Phone */}

                      <td>
                        {customer.phone}
                      </td>


                      {/* Reward Points */}

                      <td>

                        <span className="admin-discount-badge">

                          {customer.rewardPoints}

                        </span>

                      </td>


                      {/* Status */}

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
                            ? language === 'EN'
                              ? 'Blackmarked'
                              : 'مُعلّم'
                            : language === 'EN'
                              ? 'Active'
                              : 'نشط'}

                        </span>

                      </td>


                      {/* ================= ACTIONS ================= */}

                      <td>

                        {/* Give Reward Points */}

                        <button
                          type="button"
                          className="btn btn-sm btn-success me-1"
                          onClick={() => handleRewardPoints(index)}
                          title={
                            language === 'EN'
                              ? 'Give Reward Points'
                              : 'إضافة نقاط المكافآت'
                          }
                        >

                          <i className="bi bi-gift"></i>

                        </button>


                        {/* Blackmark */}

                        <button
                          type="button"
                          className="btn btn-sm btn-warning me-1"
                          onClick={() => handleBlackmark(index)}
                          title={
                            language === 'EN'
                              ? 'Blackmark Customer'
                              : 'وضع علامة على العميل'
                          }
                        >

                          <i className="bi bi-exclamation-triangle"></i>

                        </button>


                        {/* Send Email */}

                        <button
                          type="button"
                          className="btn btn-sm btn-info me-1"
                          onClick={() => handleSendEmail(index)}
                          title={
                            language === 'EN'
                              ? 'Send Email'
                              : 'إرسال بريد إلكتروني'
                          }
                        >

                          <i className="bi bi-envelope"></i>

                        </button>


                        {/* View Details */}

                        <button
                          type="button"
                          className="btn btn-sm btn-secondary me-1"
                          onClick={() => handleViewDetails(index)}
                          title={
                            language === 'EN'
                              ? 'View Details'
                              : 'عرض التفاصيل'
                          }
                        >

                          <i className="bi bi-eye"></i>

                        </button>


                        {/* Block Customer */}

                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => handleBlockCustomer(index)}
                          title={
                            language === 'EN'
                              ? 'Block Customer'
                              : 'حظر العميل'
                          }
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