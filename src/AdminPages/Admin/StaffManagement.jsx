import { useState } from 'react'
import './Admin.css'

function StaffManagement({ language }) {

  // Stores all staff members
  const [staff, setStaff] = useState([])

  // Stores form values
  const [staffName, setStaffName] = useState('')
  const [staffId, setStaffId] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('Waiter')
  const [workTime, setWorkTime] = useState('Morning')
  const [salary, setSalary] = useState('')
  const [status, setStatus] = useState('Active')


  // Add Staff button does nothing for now
  function handleAddStaff(e) {

    e.preventDefault()

  }


  // Handles removing staff
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
              ? 'Staff Management'
              : 'إدارة الموظفين'}
          </h1>

          <p>
            {language === 'EN'
              ? 'Add and manage restaurant staff members.'
              : 'إضافة وإدارة موظفي المطعم.'}
          </p>

        </div>


        {/* ================= ADD STAFF FORM ================= */}

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


            {/* Add Button */}

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


        {/* ================= STAFF TABLE ================= */}

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


          {/* Table is always visible */}

          <div className="table-responsive">

            <table className="table table-dark table-hover align-middle">

              {/* ================= TABLE HEAD ================= */}

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


              {/* ================= TABLE BODY ================= */}

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
                            ? 'Staff records will appear here when the database is connected.'
                            : 'ستظهر سجلات الموظفين هنا عند ربط قاعدة البيانات.'}
                        </p>

                      </div>

                    </td>

                  </tr>

                ) : (

                  staff.map((member, index) => (

                    <tr key={index}>

                      {/* Staff Name */}

                      <td>
                        <strong>
                          {member.name}
                        </strong>
                      </td>


                      {/* Staff ID */}

                      <td>
                        {member.id}
                      </td>


                      {/* Phone */}

                      <td>
                        {member.phone}
                      </td>


                      {/* Role */}

                      <td>
                        {member.role}
                      </td>


                      {/* Work Time */}

                      <td>
                        {member.workTime}
                      </td>


                      {/* Salary */}

                      <td>
                        KWD {member.salary}
                      </td>


                      {/* Status */}

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


                      {/* Remove Staff */}

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
  )
}

export default StaffManagement