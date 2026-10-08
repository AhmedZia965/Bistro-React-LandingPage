import { useNavigate } from 'react-router-dom'

import StaffNavbar from './StaffNavbar'
import StaffFooter from './StaffFooter'

function StaffDashboard({ language, setLanguage }) {

  const navigate = useNavigate()


  // ================= DASHBOARD CARDS =================

  const dashboardCards = [

    {
      icon: 'bi-menu-button-wide',

      title: language === 'EN'
        ? 'Menu Management'
        : 'إدارة القائمة',

      description: language === 'EN'
        ? 'Add, edit and manage menu items.'
        : 'إضافة وتعديل وإدارة عناصر القائمة.',

      button: language === 'EN'
        ? 'Manage Menu'
        : 'إدارة القائمة',

      path: '/staff-menu',
    },


    {
      icon: 'bi-receipt',

      title: language === 'EN'
        ? 'Orders'
        : 'الطلبات',

      description: language === 'EN'
        ? 'View and manage customer orders.'
        : 'عرض وإدارة طلبات العملاء.',

      button: language === 'EN'
        ? 'View Orders'
        : 'عرض الطلبات',

      path: '/staff-orders',
    },


    {
      icon: 'bi-box-seam',

      title: language === 'EN'
        ? 'Inventory Management'
        : 'إدارة المخزون',

     description: language === 'EN'
  ? 'Manage ingredients and supplies.'
  : 'إدارة المخزون والمكونات والمواد الغذائية.',

      button: language === 'EN'
        ? 'Manage Inventory'
        : 'إدارة المخزون',

      path: '/staff-inventory',
    },

  ]


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

            {dashboardCards.map((card, index) => (

              <div
                className="col-md-6 col-lg-4"
                key={index}
              >

                <div className="staff-dashboard-card">


                  {/* Card Icon */}

                  <div className="staff-dashboard-icon">

                    <i className={`bi ${card.icon}`}></i>

                  </div>


                  {/* Card Title */}

                  <h3>

                    {card.title}

                  </h3>


                  {/* Card Description */}

                  <p>

                    {card.description}

                  </p>


                  {/* Card Button */}

                  <button
                    type="button"
                    className="staff-dashboard-btn"
                    onClick={() => navigate(card.path)}
                  >

                    {card.button}

                    <i className="bi bi-arrow-right ms-2"></i>

                  </button>


                </div>

              </div>

            ))}

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