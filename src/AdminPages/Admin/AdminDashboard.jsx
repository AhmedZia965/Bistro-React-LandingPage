import '../Admin/Admin.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function AdminDashboard({ language }) {

  const navigate = useNavigate()

  // Stores the currently selected Admin Dashboard page
  const [activePage, setActivePage] = useState('dashboard')


  // ================= STAFF MANAGEMENT STATES =================

  // Stores all staff members
  const [staff, setStaff] = useState([])

  // Stores staff form values
  const [staffName, setStaffName] = useState('')
  const [staffId, setStaffId] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('Waiter')
  const [workTime, setWorkTime] = useState('Morning')
  const [salary, setSalary] = useState('')
  const [status, setStatus] = useState('Active')


  // ================= CUSTOMER MANAGEMENT STATES =================

  // Stores all customers
  const [customers, setCustomers] = useState([])


  // ================= OFFERS MANAGEMENT STATES =================

  // Stores all offers
  const [offers, setOffers] = useState([])

  // Stores offer form values
  const [offerName, setOfferName] = useState('')
  const [description, setDescription] = useState('')
  const [discount, setDiscount] = useState('')
  const [offerStatus, setOfferStatus] = useState('Active')

  // Stores the offer being edited
  const [editIndex, setEditIndex] = useState(null)


  // ================= CHANGE PAGE =================

  function changePage(page) {

    setActivePage(page)

  }


  // =========================================================
  // ================= STAFF MANAGEMENT ======================
  // =========================================================


  // ================= ADD STAFF =================

  function handleAddStaff(e) {

    e.preventDefault()

    const newStaff = {

      name: staffName,
      id: staffId,
      email: email,
      phone: phone,
      role: role,
      workTime: workTime,
      salary: salary,
      status: status

    }

    setStaff([
      ...staff,
      newStaff
    ])


    // Clear form

    setStaffName('')
    setStaffId('')
    setEmail('')
    setPhone('')
    setRole('Waiter')
    setWorkTime('Morning')
    setSalary('')
    setStatus('Active')

  }


  // ================= REMOVE STAFF =================

  function handleRemoveStaff(index) {

    if (
      window.confirm(
        language === 'EN'
          ? 'Are you sure you want to remove this staff member?'
          : 'هل أنت متأكد أنك تريد إزالة هذا الموظف؟'
      )
    ) {

      const updatedStaff = staff.filter(
        (member, i) => i !== index
      )

      setStaff(updatedStaff)

    }

  }


  // =========================================================
  // ================= CUSTOMER MANAGEMENT ===================
  // =========================================================


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


  // =========================================================
  // ================= OFFERS MANAGEMENT =====================
  // =========================================================


  // ================= ADD / UPDATE OFFER =================

  function handleOfferSubmit(e) {

    e.preventDefault()


    const newOffer = {

      name: offerName,
      description: description,
      discount: discount,
      status: offerStatus

    }


    // Add new offer

    if (editIndex === null) {

      setOffers([
        ...offers,
        newOffer
      ])

    }


    // Update existing offer

    else {

      const updatedOffers = offers.map(
        (offer, index) =>
          index === editIndex
            ? newOffer
            : offer
      )

      setOffers(updatedOffers)

    }


    // Clear form

    setOfferName('')
    setDescription('')
    setDiscount('')
    setOfferStatus('Active')
    setEditIndex(null)

  }


  // ================= EDIT OFFER =================

  function handleEdit(index) {

    const selectedOffer = offers[index]

    setOfferName(selectedOffer.name)
    setDescription(selectedOffer.description)
    setDiscount(selectedOffer.discount)
    setOfferStatus(selectedOffer.status)

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
    setOfferStatus('Active')

    setEditIndex(null)

  }


  return (

    <div className="admin-dashboard">


      {/* =====================================================
          ================= ADMIN SIDEBAR =====================
          ===================================================== */}

      <div className="admin-sidebar">


        {/* Admin Brand */}

        <div className="admin-brand">

          <i className="bi bi-cup-hot-fill"></i>

          <span>
            {language === 'EN'
              ? 'Monarch Bistro'
              : 'مونارك بيسترو'}
          </span>

        </div>


        {/* Sidebar Title */}

        <div className="admin-sidebar-title">

          {language === 'EN'
            ? 'ADMIN PANEL'
            : 'لوحة الإدارة'}

        </div>


        {/* Dashboard */}

        <button
          className={
            activePage === 'dashboard'
              ? 'admin-sidebar-link active'
              : 'admin-sidebar-link'
          }
          onClick={() => changePage('dashboard')}
        >

          <i className="bi bi-grid-1x2-fill"></i>

          <span>
            {language === 'EN'
              ? 'Dashboard'
              : 'لوحة التحكم'}
          </span>

        </button>


        {/* Staff Management */}

        <button
          className={
            activePage === 'staff'
              ? 'admin-sidebar-link active'
              : 'admin-sidebar-link'
          }
          onClick={() => changePage('staff')}
        >

          <i className="bi bi-people-fill"></i>

          <span>
            {language === 'EN'
              ? 'Staff Management'
              : 'إدارة الموظفين'}
          </span>

        </button>


        {/* Customer Management */}

        <button
          className={
            activePage === 'customers'
              ? 'admin-sidebar-link active'
              : 'admin-sidebar-link'
          }
          onClick={() => changePage('customers')}
        >

          <i className="bi bi-person-lines-fill"></i>

          <span>
            {language === 'EN'
              ? 'Customer Management'
              : 'إدارة العملاء'}
          </span>

        </button>


        {/* Offers Management */}

        <button
          className={
            activePage === 'offers'
              ? 'admin-sidebar-link active'
              : 'admin-sidebar-link'
          }
          onClick={() => changePage('offers')}
        >

          <i className="bi bi-tag-fill"></i>

          <span>
            {language === 'EN'
              ? 'Offers Management'
              : 'إدارة العروض'}
          </span>

        </button>


        {/* Reports */}

        <button
          className={
            activePage === 'reports'
              ? 'admin-sidebar-link active'
              : 'admin-sidebar-link'
          }
          onClick={() => changePage('reports')}
        >

          <i className="bi bi-bar-chart-fill"></i>

          <span>
            {language === 'EN'
              ? 'Reports'
              : 'التقارير'}
          </span>

        </button>


        {/* Settings */}

        <button
          className={
            activePage === 'settings'
              ? 'admin-sidebar-link active'
              : 'admin-sidebar-link'
          }
          onClick={() => changePage('settings')}
        >

          <i className="bi bi-gear-fill"></i>

          <span>
            {language === 'EN'
              ? 'Settings'
              : 'الإعدادات'}
          </span>

        </button>


        {/* Logout */}

        <button
          className="admin-sidebar-logout"
          onClick={() => navigate('/admin-login')}
        >

          <i className="bi bi-box-arrow-left"></i>

          <span>
            {language === 'EN'
              ? 'Logout'
              : 'تسجيل الخروج'}
          </span>

        </button>

      </div>


      {/* =====================================================
          ================= MAIN CONTENT ======================
          ===================================================== */}

      <div className="admin-main">

        {/* =====================================================
            ================= DASHBOARD ========================
            ===================================================== */}

        {activePage === 'dashboard' && (

          <>


            {/* Welcome Section */}

            <div className="admin-welcome">

              <div>

                <span>
                  {language === 'EN'
                    ? 'WELCOME BACK'
                    : 'مرحباً بعودتك'}
                </span>

                <h1>
                  {language === 'EN'
                    ? 'Good to see you, Admin!'
                    : 'سعيدون برؤيتك، أيها المسؤول!'}
                </h1>

                <p>
                  {language === 'EN'
                    ? 'Here is an overview of your café management system.'
                    : 'إليك نظرة عامة على نظام إدارة المقهى الخاص بك.'}
                </p>

              </div>

              <i className="bi bi-cup-hot-fill"></i>

            </div>


            {/* Statistics */}

            <div className="row g-4 admin-statistics">


              {/* Customers */}

              <div className="col-xl-3 col-md-6">

                <div className="admin-stat-card">

                  <div className="admin-stat-icon">

                    <i className="bi bi-people-fill"></i>

                  </div>

                  <div>

                    <p>
                      {language === 'EN'
                        ? 'Total Customers'
                        : 'إجمالي العملاء'}
                    </p>

                    <h2>
                      {customers.length}
                    </h2>

                  </div>

                </div>

              </div>


              {/* Staff */}

              <div className="col-xl-3 col-md-6">

                <div className="admin-stat-card">

                  <div className="admin-stat-icon">

                    <i className="bi bi-person-badge-fill"></i>

                  </div>

                  <div>

                    <p>
                      {language === 'EN'
                        ? 'Total Staff'
                        : 'إجمالي الموظفين'}
                    </p>

                    <h2>
                      {staff.length}
                    </h2>

                  </div>

                </div>

              </div>


              {/* Orders */}

              <div className="col-xl-3 col-md-6">

                <div className="admin-stat-card">

                  <div className="admin-stat-icon">

                    <i className="bi bi-bag-check-fill"></i>

                  </div>

                  <div>

                    <p>
                      {language === 'EN'
                        ? 'Total Orders'
                        : 'إجمالي الطلبات'}
                    </p>

                    <h2>
                      0
                    </h2>

                  </div>

                </div>

              </div>


              {/* Revenue */}

              <div className="col-xl-3 col-md-6">

                <div className="admin-stat-card">

                  <div className="admin-stat-icon">

                    <i className="bi bi-cash-stack"></i>

                  </div>

                  <div>

                    <p>
                      {language === 'EN'
                        ? 'Total Revenue'
                        : 'إجمالي الإيرادات'}
                    </p>

                    <h2>
                      0 <small>KWD</small>
                    </h2>

                  </div>

                </div>

              </div>

            </div>


            {/* Recent Activity */}

            <div className="row g-4 admin-bottom-section">


              <div className="col-lg-7">

                <div className="admin-panel">

                  <div className="admin-panel-title">

                    <div>

                      <span>
                        {language === 'EN'
                          ? 'ACTIVITY'
                          : 'النشاط'}
                      </span>

                      <h4>
                        {language === 'EN'
                          ? 'Recent Activity'
                          : 'النشاط الأخير'}
                      </h4>

                    </div>

                    <i className="bi bi-activity"></i>

                  </div>


                  <div className="admin-empty-state">

                    <i className="bi bi-inbox"></i>

                    <h5>
                      {language === 'EN'
                        ? 'No Recent Activity'
                        : 'لا يوجد نشاط حديث'}
                    </h5>

                    <p>
                      {language === 'EN'
                        ? 'New activity will appear here when your system has data.'
                        : 'سيظهر النشاط الجديد هنا عند وجود بيانات في النظام.'}
                    </p>

                  </div>

                </div>

              </div>


              {/* System Summary */}

              <div className="col-lg-5">

                <div className="admin-panel">

                  <div className="admin-panel-title">

                    <div>

                      <span>
                        {language === 'EN'
                          ? 'SYSTEM'
                          : 'النظام'}
                      </span>

                      <h4>
                        {language === 'EN'
                          ? 'System Summary'
                          : 'ملخص النظام'}
                      </h4>

                    </div>

                    <i className="bi bi-bar-chart-fill"></i>

                  </div>


                  <div className="admin-empty-state">

                    <i className="bi bi-check-circle"></i>

                    <h5>
                      {language === 'EN'
                        ? 'System Ready'
                        : 'النظام جاهز'}
                    </h5>

                    <p>
                      {language === 'EN'
                        ? 'Use the sidebar to manage your bistro.'
                        : 'استخدم القائمة الجانبية لإدارة المطعم.'}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </>

        )}


        {/* =====================================================
            ================= STAFF MANAGEMENT =================
            ===================================================== */}

        {activePage === 'staff' && (

          <div className="admin-management-page">

            <div className="container">


              {/* Page Heading */}

              <div className="admin-management-heading text-center">

                <span>
                  {language === 'EN'
                    ? 'ADMIN PORTAL'
                    : 'بوابة المسؤول'}
                </span>

                <h1>
                  {language === 'EN'
                    ? 'Staff Management'
                    : 'إدارة الموظفين'}
                </h1>

                <p>
                  {language === 'EN'
                    ? 'Add and manage restaurant staff members.'
                    : 'إضافة وإدارة موظفي المطعم.'}
                </p>

              </div>


              {/* Add Staff Form */}

              <div className="admin-management-form">

                <h2>
                  {language === 'EN'
                    ? 'Add Staff Member'
                    : 'إضافة موظف'}
                </h2>


                <form onSubmit={handleAddStaff}>

                  <div className="row g-3">


                    {/* Staff Name */}

                    <div className="col-md-4">

                      <label>
                        {language === 'EN'
                          ? 'Staff Name'
                          : 'اسم الموظف'}
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={staffName}
                        onChange={(e) => setStaffName(e.target.value)}
                        placeholder={
                          language === 'EN'
                            ? 'Enter staff name'
                            : 'أدخل اسم الموظف'
                        }
                        required
                      />

                    </div>


                    {/* Staff ID */}

                    <div className="col-md-4">

                      <label>
                        {language === 'EN'
                          ? 'Staff ID'
                          : 'رقم الموظف'}
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={staffId}
                        onChange={(e) => setStaffId(e.target.value)}
                        placeholder={
                          language === 'EN'
                            ? 'Enter staff ID'
                            : 'أدخل رقم الموظف'
                        }
                        required
                      />

                    </div>


                    {/* Phone */}

                    <div className="col-md-4">

                      <label>
                        {language === 'EN'
                          ? 'Phone Number'
                          : 'رقم الهاتف'}
                      </label>

                      <input
                        type="tel"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={
                          language === 'EN'
                            ? 'Enter phone number'
                            : 'أدخل رقم الهاتف'
                        }
                        required
                      />

                    </div>


                    {/* Email */}

                    <div className="col-md-6">

                      <label>
                        {language === 'EN'
                          ? 'Email'
                          : 'البريد الإلكتروني'}
                      </label>

                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={
                          language === 'EN'
                            ? 'Enter email'
                            : 'أدخل البريد الإلكتروني'
                        }
                        required
                      />

                    </div>


                    {/* Role */}

                    <div className="col-md-3">

                      <label>
                        {language === 'EN'
                          ? 'Role'
                          : 'الدور'}
                      </label>

                      <select
                        className="form-control"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >

                        <option value="Waiter">
                          {language === 'EN'
                            ? 'Waiter'
                            : 'نادل'}
                        </option>

                        <option value="Chef">
                          {language === 'EN'
                            ? 'Chef'
                            : 'طاهٍ'}
                        </option>

                        <option value="Cleaner">
                          {language === 'EN'
                            ? 'Cleaner'
                            : 'عامل نظافة'}
                        </option>

                      </select>

                    </div>


                    {/* Work Time */}

                    <div className="col-md-3">

                      <label>
                        {language === 'EN'
                          ? 'Work Time'
                          : 'وقت العمل'}
                      </label>

                      <select
                        className="form-control"
                        value={workTime}
                        onChange={(e) => setWorkTime(e.target.value)}
                      >

                        <option value="Morning">
                          {language === 'EN'
                            ? 'Morning'
                            : 'الصباح'}
                        </option>

                        <option value="Evening">
                          {language === 'EN'
                            ? 'Evening'
                            : 'المساء'}
                        </option>

                        <option value="Night">
                          {language === 'EN'
                            ? 'Night'
                            : 'الليل'}
                        </option>

                      </select>

                    </div>


                    {/* Salary */}

                    <div className="col-md-3">

                      <label>
                        {language === 'EN'
                          ? 'Salary'
                          : 'الراتب'}
                      </label>

                      <input
                        type="number"
                        className="form-control"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder={
                          language === 'EN'
                            ? 'Enter salary'
                            : 'أدخل الراتب'
                        }
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

                  </div>


                  {/* Add Staff Button */}

                  <button
                    type="submit"
                    className="admin-management-btn mt-4"
                  >

                    <i className="bi bi-person-plus me-2"></i>

                    {language === 'EN'
                      ? 'Add Staff'
                      : 'إضافة موظف'}

                  </button>

                </form>

              </div>


              {/* Staff Table */}

              <div className="admin-management-table">

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <h2 className="mb-0">
                    {language === 'EN'
                      ? 'Staff Members'
                      : 'الموظفون'}
                  </h2>

                  <span className="admin-offer-count">

                    {staff.length}{' '}

                    {language === 'EN'
                      ? staff.length === 1
                        ? 'Member'
                        : 'Members'
                      : 'موظفون'}

                  </span>

                </div>


                <div className="table-responsive">

                  <table className="table table-dark table-hover align-middle">

                    <thead>

                      <tr>

                        <th>
                          {language === 'EN'
                            ? 'Staff Name'
                            : 'اسم الموظف'}
                        </th>

                        <th>
                          {language === 'EN'
                            ? 'Staff ID'
                            : 'رقم الموظف'}
                        </th>

                        <th>
                          {language === 'EN'
                            ? 'Phone'
                            : 'الهاتف'}
                        </th>

                        <th>
                          {language === 'EN'
                            ? 'Role'
                            : 'الدور'}
                        </th>

                        <th>
                          {language === 'EN'
                            ? 'Work Time'
                            : 'وقت العمل'}
                        </th>

                        <th>
                          {language === 'EN'
                            ? 'Salary'
                            : 'الراتب'}
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

                      {staff.length === 0 ? (

                        <tr>

                          <td
                            colSpan="8"
                            className="text-center"
                          >

                            <div className="admin-management-empty">

                              <div className="admin-empty-icon">

                                <i className="bi bi-people"></i>

                              </div>

                              <h3>
                                {language === 'EN'
                                  ? 'No Staff Members Yet'
                                  : 'لا يوجد موظفون بعد'}
                              </h3>

                              <p>
                                {language === 'EN'
                                  ? 'Add a staff member using the form above.'
                                  : 'أضف موظفاً باستخدام النموذج أعلاه.'}
                              </p>

                            </div>

                          </td>

                        </tr>

                      ) : (

                        staff.map((member, index) => (

                          <tr key={index}>

                            <td>
                              <strong>
                                {member.name}
                              </strong>
                            </td>

                            <td>
                              {member.id}
                            </td>

                            <td>
                              {member.phone}
                            </td>

                            <td>
                              {member.role}
                            </td>

                            <td>
                              {member.workTime}
                            </td>

                            <td>
                              KWD {member.salary}
                            </td>

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
                                  ? language === 'EN'
                                    ? 'Active'
                                    : 'نشط'
                                  : language === 'EN'
                                    ? 'Inactive'
                                    : 'غير نشط'}

                              </span>

                            </td>

                            <td>

                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => handleRemoveStaff(index)}
                                title={
                                  language === 'EN'
                                    ? 'Remove Staff'
                                    : 'إزالة الموظف'
                                }
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

        )}


        {/* =====================================================
            ================= CUSTOMER MANAGEMENT ==============
            ===================================================== */}

        {activePage === 'customers' && (

          <div className="admin-management-page">

            <div className="container">


              {/* Page Heading */}

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


              {/* Customer Table */}

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

                  <table className="table table-dark table-hover align-middle">

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


                            {/* Actions */}

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

        )}


        {/* =====================================================
            ================= OFFERS MANAGEMENT =================
            ===================================================== */}

        {activePage === 'offers' && (

          <div className="admin-management-page">

            <div className="container">


              {/* Page Heading */}

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


              {/* Offer Form */}

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
                        value={offerStatus}
                        onChange={(e) => setOfferStatus(e.target.value)}
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


                  {/* Form Buttons */}

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


                    {/* Cancel */}

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


              {/* Offers Table */}

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


                <div className="table-responsive">

                  <table className="table table-dark table-hover align-middle">

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
                                  ? 'Add an offer using the form above.'
                                  : 'أضف عرضاً باستخدام النموذج أعلاه.'}

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

                              {/* Edit */}

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


                              {/* Delete */}

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

        )}


        {/* =====================================================
            ================= REPORTS ==========================
            ===================================================== */}

        {activePage === 'reports' && (

          <div className="admin-panel admin-large-panel">

            <div className="admin-panel-title">

              <div>

                <span>
                  {language === 'EN'
                    ? 'REPORTS'
                    : 'التقارير'}
                </span>

                <h4>
                  {language === 'EN'
                    ? 'Bistro Reports'
                    : 'تقارير المطعم'}
                </h4>

              </div>

              <i className="bi bi-bar-chart-fill"></i>

            </div>


            <div className="row g-4">


              {/* Orders */}

              <div className="col-md-4">

                <div className="admin-stat-card">

                  <div className="admin-stat-icon">

                    <i className="bi bi-bag-check-fill"></i>

                  </div>

                  <div>

                    <p>
                      {language === 'EN'
                        ? 'Total Orders'
                        : 'إجمالي الطلبات'}
                    </p>

                    <h2>
                      0
                    </h2>

                  </div>

                </div>

              </div>


              {/* Reservations */}

              <div className="col-md-4">

                <div className="admin-stat-card">

                  <div className="admin-stat-icon">

                    <i className="bi bi-calendar-check-fill"></i>

                  </div>

                  <div>

                    <p>
                      {language === 'EN'
                        ? 'Reservations'
                        : 'الحجوزات'}
                    </p>

                    <h2>
                      0
                    </h2>

                  </div>

                </div>

              </div>


              {/* Feedback */}

              <div className="col-md-4">

                <div className="admin-stat-card">

                  <div className="admin-stat-icon">

                    <i className="bi bi-chat-square-heart-fill"></i>

                  </div>

                  <div>

                    <p>
                      {language === 'EN'
                        ? 'Feedback'
                        : 'التقييمات'}
                    </p>

                    <h2>
                      0
                    </h2>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}


        {/* =====================================================
            ================= SETTINGS ==========================
            ===================================================== */}

        {activePage === 'settings' && (

          <div className="admin-panel admin-large-panel">

            <div className="admin-panel-title">

              <div>

                <span>
                  {language === 'EN'
                    ? 'SYSTEM'
                    : 'النظام'}
                </span>

                <h4>
                  {language === 'EN'
                    ? 'Admin Settings'
                    : 'إعدادات المسؤول'}
                </h4>

              </div>

              <i className="bi bi-gear-fill"></i>

            </div>


            <div className="admin-empty-state">

              <i className="bi bi-gear"></i>

              <h5>
                {language === 'EN'
                  ? 'Settings'
                  : 'الإعدادات'}
              </h5>

              <p>
                {language === 'EN'
                  ? 'Admin system settings will be added here.'
                  : 'ستتم إضافة إعدادات نظام المسؤول هنا.'}
              </p>

            </div>

          </div>

        )}

      </div>

    </div>

  )

}


export default AdminDashboard