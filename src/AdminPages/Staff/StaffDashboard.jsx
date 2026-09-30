import { useNavigate } from 'react-router-dom'

import StaffNavbar from './StaffNavbar'
import StaffFooter from './StaffFooter'

function StaffDashboard({ language, setLanguage }) {

  const navigate = useNavigate()


  return (

    <>

      {/* Staff Navbar */}

      <StaffNavbar
        language={language}
        setLanguage={setLanguage}
      />


      <div className="staff-dashboard-page">

        <div className="container">


          {/* ================= DASHBOARD HEADING ================= */}

          <div className="staff-dashboard-heading text-center">

            <span className="staff-subtitle">

              {language === 'EN'
                ? 'STAFF PORTAL'
                : 'بوابة الموظفين'}

            </span>


            <h1>

              {language === 'EN'
                ? 'Staff Dashboard'
                : 'لوحة تحكم الموظفين'}

            </h1>


            <p>

              {language === 'EN'
                ? 'Manage orders, menu items, and daily activities.'
                : 'إدارة الطلبات وعناصر القائمة والأنشطة اليومية.'}

            </p>

          </div>


          {/* ================= DASHBOARD CARDS ================= */}

          <div className="row g-4">


            


            {/* Menu */}

            <div className="col-md-6 col-lg-4">

              <div className="staff-dashboard-card">

                <div className="staff-dashboard-icon">

                  <i className="bi bi-menu-button-wide"></i>

                </div>


                <h3>

                  {language === 'EN'
                    ? 'Menu Management'
                    : 'إدارة القائمة'}

                </h3>


                <p>

                  {language === 'EN'
                    ? 'Add, edit and manage menu items.'
                    : 'إضافة وتعديل وإدارة عناصر القائمة.'}

                </p>


                <button
                  type="button"
                  className="staff-dashboard-btn"
                >

                  {language === 'EN'
                    ? 'Manage Menu'
                    : 'إدارة القائمة'}

                  <i className="bi bi-arrow-right ms-2"></i>

                </button>

              </div>

            </div>

             {/* Orders */}

            <div className="col-md-6 col-lg-4">

              <div className="staff-dashboard-card">

                <div className="staff-dashboard-icon">

                  <i className="bi bi-receipt"></i>

                </div>


                <h3>

                  {language === 'EN'
                    ? 'Orders'
                    : 'الطلبات'}

                </h3>


                <p>

                  {language === 'EN'
                    ? 'View and manage customer orders.'
                    : 'عرض وإدارة طلبات العملاء.'}

                </p>


                <button
                  type="button"
                  className="staff-dashboard-btn"
                >

                  {language === 'EN'
                    ? 'View Orders'
                    : 'عرض الطلبات'}

                  <i className="bi bi-arrow-right ms-2"></i>

                </button>

              </div>

            </div>
            
            {/* Reservations */}

            <div className="col-md-6 col-lg-4">

              <div className="staff-dashboard-card">

                <div className="staff-dashboard-icon">

                  <i className="bi bi-calendar-check"></i>

                </div>


                <h3>

                  {language === 'EN'
                    ? 'Reservations'
                    : 'الحجوزات'}

                </h3>


                <p>

                  {language === 'EN'
                    ? 'View and manage customer table reservations.'
                    : 'عرض وإدارة حجوزات طاولات العملاء.'}

                </p>


                <button
                  type="button"
                  className="staff-dashboard-btn"
                >

                  {language === 'EN'
                    ? 'View Reservations'
                    : 'عرض الحجوزات'}

                  <i className="bi bi-arrow-right ms-2"></i>

                </button>

              </div>

            </div>


          </div>


          {/* ================= LOGOUT ================= */}

          <div className="staff-logout text-center">

            <button
              type="button"
              className="staff-logout-btn"
            >

              <i className="bi bi-box-arrow-right me-2"></i>

              {language === 'EN'
                ? 'Logout'
                : 'تسجيل الخروج'}

            </button>

          </div>


        </div>

      </div>


      {/* Staff Footer */}

      <StaffFooter language={language} />

    </>

  )

}

export default StaffDashboard