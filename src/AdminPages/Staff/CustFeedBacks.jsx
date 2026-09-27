import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import StaffNavbar from './StaffNavbar'
import StaffFooter from './StaffFooter'

function StaffFeedback({ language, setLanguage }) {

  const navigate = useNavigate()


  // Checks if the staff member is logged in
  useEffect(() => {

    const staffLoggedIn = sessionStorage.getItem('staffLoggedIn')

    if (staffLoggedIn !== 'true') {
      navigate('/staff-login')
    }

  }, [navigate])


  return (

    <>

      {/* Staff Navbar */}

      <StaffNavbar
        language={language}
        setLanguage={setLanguage}
      />


      <div className="staff-feedback-page">

        <div className="container">


          {/* ================= PAGE HEADING ================= */}

          <div className="staff-feedback-heading text-center">

            <span className="staff-subtitle">

              {language === 'EN'
                ? 'STAFF PORTAL'
                : 'بوابة الموظفين'}

            </span>


            <h1>

              {language === 'EN'
                ? 'Customer Feedback'
                : 'آراء العملاء'}

            </h1>


            <p>

              {language === 'EN'
                ? 'View customer feedback and reviews.'
                : 'عرض ملاحظات وتقييمات العملاء.'}

            </p>

          </div>


          {/* ================= FEEDBACK FORM ================= */}

          <div className="staff-feedback-form">

            <h2>

              {language === 'EN'
                ? 'Customer Feedbacks'
                : 'آراء العملاء'}

            </h2>


            {/* Feedback data will be connected to database later */}

            <div className="staff-feedback-empty">

              {language === 'EN'
                ? 'No feedback available.'
                : 'لا توجد ملاحظات متاحة.'}

            </div>


          </div>


          {/* ================= BACK BUTTON ================= */}

          <div className="text-center staff-feedback-back">

            <button
              type="button"
              className="staff-back-btn"
              onClick={() => navigate('/staff-dashboard')}
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

export default StaffFeedback