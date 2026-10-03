import StaffNavbar from './StaffNavbar'
import StaffFooter from './StaffFooter'

function StaffOrders({ language, setLanguage }) {

  // Orders will come from the database later
  const orders = []

  return (
    <>
      <StaffNavbar
        language={language}
        setLanguage={setLanguage}
      />

      <div className="staff-orders-page">

        <div className="container">

          {/* ================= ORDERS HEADING ================= */}

          <div className="staff-orders-heading text-center">

            <span className="staff-subtitle">
              {language === 'EN'
                ? 'STAFF PORTAL'
                : 'بوابة الموظفين'}
            </span>

            <h1>
              {language === 'EN'
                ? 'Orders'
                : 'الطلبات'}
            </h1>

            <p>
              {language === 'EN'
                ? 'View and manage all customer orders.'
                : 'عرض وإدارة جميع طلبات العملاء.'}
            </p>

          </div>


          {/* ================= ORDERS TABLE ================= */}

          <div className="staff-orders-items">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <h2>
                {language === 'EN'
                  ? 'All Orders'
                  : 'جميع الطلبات'}
              </h2>

              <span className="staff-order-count">
                {orders.length}
                {' '}
                {language === 'EN'
                  ? 'Orders'
                  : 'طلبات'}
              </span>

            </div>


            <div className="table-responsive">

              <table className="staff-orders-table">

                <thead>

                  <tr>

                    <th>
                      {language === 'EN'
                        ? 'Order ID'
                        : 'رقم الطلب'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Customer'
                        : 'العميل'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Items'
                        : 'العناصر'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Total'
                        : 'المجموع'}
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


                <tbody>

                  {orders.length === 0 ? (

                    <tr>

                      <td colSpan="6">

                        <div className="staff-orders-empty">

                          <div className="staff-order-icon">

                            <i className="bi bi-receipt"></i>

                          </div>

                          <h3>
                            {language === 'EN'
                              ? 'No Orders Found'
                              : 'لا توجد طلبات'}
                          </h3>

                          <p>
                            {language === 'EN'
                              ? 'Customer orders will appear here when the database is connected.'
                              : 'ستظهر طلبات العملاء هنا عند ربط قاعدة البيانات.'}
                          </p>

                        </div>

                      </td>

                    </tr>

                  ) : (

                    orders.map((order) => (

                      <tr key={order.id}>

                        <td>
                          {order.id}
                        </td>

                        <td>
                          {order.customer}
                        </td>

                        <td>
                          {order.items}
                        </td>

                        <td>
                          {order.total} PKR
                        </td>

                        <td>

                          <span className="staff-order-status">
                            {order.status}
                          </span>

                        </td>

                        <td>

                          <button
                            type="button"
                            className="staff-order-view-btn"
                          >
                            {language === 'EN'
                              ? 'View'
                              : 'عرض'}
                          </button>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>


          {/* ================= BACK BUTTON ================= */}

          <div className="staff-orders-back text-center">

            <button
              type="button"
              className="staff-back-btn"
            >

              <i className="bi bi-arrow-left me-2"></i>

              {language === 'EN'
                ? 'Back to Dashboard'
                : 'العودة إلى لوحة التحكم'}

            </button>

          </div>

        </div>

      </div>

      <StaffFooter language={language} />

    </>
  )
}

export default StaffOrders