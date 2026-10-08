import StaffNavbar from './StaffNavbar'
import StaffFooter from './StaffFooter'

function StaffInventory({ language, setLanguage }) {

  // Stores inventory items
  const inventory = []


  return (

    <>

      {/* Staff Navbar */}

      <StaffNavbar
        language={language}
        setLanguage={setLanguage}
      />


      <div className="staff-inventory-page">

        <div className="container">


          {/* ================= PAGE HEADING ================= */}

          <div className="staff-inventory-heading text-center">

            <span className="staff-subtitle">

              {language === 'EN'
                ? 'STAFF PORTAL'
                : 'بوابة الموظفين'}

            </span>


            <h1>

              {language === 'EN'
                ? 'Inventory Management'
                : 'إدارة المخزون'}

            </h1>


            <p>

              {language === 'EN'
                ? 'Manage ingredients, stock levels, and supplies.'
                : 'إدارة المخزون والمكونات والمواد الغذائية.'}

            </p>

          </div>


          {/* ================= INVENTORY TABLE ================= */}

          <div className="staff-inventory-items">


            {/* Table Heading */}

            <div className="d-flex justify-content-between align-items-center mb-4">

              <h2 className="mb-0">

                {language === 'EN'
                  ? 'Current Inventory'
                  : 'المخزون الحالي'}

              </h2>


              <span className="staff-inventory-count">

                {inventory.length}{' '}

                {language === 'EN'
                  ? inventory.length === 1
                    ? 'Item'
                    : 'Items'
                  : 'عناصر'}

              </span>

            </div>


            {/* ================= TABLE ================= */}

            <div className="table-responsive">

              <table className="staff-inventory-table">


                {/* ================= TABLE HEAD ================= */}

                <thead>

                  <tr>

                    <th>
                      {language === 'EN'
                        ? 'Item ID'
                        : 'رقم العنصر'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Item Name'
                        : 'اسم العنصر'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Category'
                        : 'الفئة'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Quantity'
                        : 'الكمية'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Unit'
                        : 'الوحدة'}
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

                  {inventory.length === 0 ? (

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center"
                      >

                        <div className="staff-inventory-empty">


                          {/* Empty Inventory Icon */}

                          <div className="staff-inventory-icon">

                            <i className="bi bi-box-seam"></i>

                          </div>


                          <h3>

                            {language === 'EN'
                              ? 'No Inventory Items Yet'
                              : 'لا توجد عناصر في المخزون بعد'}

                          </h3>


                          <p>

                            {language === 'EN'
                              ? 'Inventory items will appear here when the database is connected.'
                              : 'ستظهر عناصر المخزون هنا عند ربط قاعدة البيانات.'}

                          </p>

                        </div>

                      </td>

                    </tr>

                  ) : (

                    inventory.map((item, index) => (

                      <tr key={index}>


                        {/* Item ID */}

                        <td>

                          {item.id}

                        </td>


                        {/* Item Name */}

                        <td>

                          <strong>

                            {item.name}

                          </strong>

                        </td>


                        {/* Category */}

                        <td>

                          {item.category}

                        </td>


                        {/* Quantity */}

                        <td>

                          {item.quantity}

                        </td>


                        {/* Unit */}

                        <td>

                          {item.unit}

                        </td>


                        {/* Status */}

                        <td>

                          <span
                            className={
                              item.status === 'Available'
                                ? 'staff-inventory-available'
                                : item.status === 'Low Stock'
                                ? 'staff-inventory-low'
                                : 'staff-inventory-out'
                            }
                          >

                            {item.status}

                          </span>

                        </td>


                        {/* Actions */}

                        <td>


                          {/* Edit */}

                          <button
                            type="button"
                            className="staff-inventory-edit-btn me-1"
                            title={
                              language === 'EN'
                                ? 'Edit Item'
                                : 'تعديل العنصر'
                            }
                          >

                            <i className="bi bi-pencil"></i>

                          </button>


                          {/* Delete */}

                          <button
                            type="button"
                            className="staff-inventory-delete-btn"
                            title={
                              language === 'EN'
                                ? 'Delete Item'
                                : 'حذف العنصر'
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


          {/* ================= BACK BUTTON ================= */}

          <div className="text-center staff-inventory-back">

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


      {/* Staff Footer */}

      <StaffFooter language={language} />

    </>

  )

}

export default StaffInventory