import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import StaffNavbar from './StaffNavbar'
import StaffFooter from './StaffFooter'

function StaffLogin({ language, setLanguage }) {

  const navigate = useNavigate()

  const [staffId, setStaffId] = useState('')
  const [password, setPassword] = useState('')


  // Handles staff login
  function handleLogin(event) {

    event.preventDefault()

    // Stores staff login status
    sessionStorage.setItem('staffLoggedIn', 'true')

    // Goes to Staff Dashboard
    navigate('/staff-dashboard')

  }


  return (

    <>

      {/* Staff Navbar */}
      <StaffNavbar
        language={language}
        setLanguage={setLanguage}
      />


      <div className="staff-login-page">

        <div className="staff-login-card">


          {/* ================= LOGIN HEADING ================= */}

          <div className="staff-login-heading">

            <i className="bi bi-person-badge"></i>

            <span>
              {language === 'EN'
                ? 'STAFF PORTAL'
                : 'بوابة الموظفين'}
            </span>

            <h1>

              {language === 'EN'
                ? 'Staff Login'
                : 'تسجيل دخول الموظفين'}

            </h1>

            <p>

              {language === 'EN'
                ? 'Sign in to access the staff portal.'
                : 'سجل الدخول للوصول إلى بوابة الموظفين.'}

            </p>

          </div>


          {/* ================= LOGIN FORM ================= */}

          <form onSubmit={handleLogin}>


            {/* Staff ID */}

            <div className="staff-input-group">

              <label>

                {language === 'EN'
                  ? 'Staff ID'
                  : 'معرف الموظف'}

              </label>

              <input
                type="text"
                placeholder={
                  language === 'EN'
                    ? 'Enter Staff ID'
                    : 'أدخل معرف الموظف'
                }
                value={staffId}
                onChange={(event) => setStaffId(event.target.value)}
                required
              />

            </div>


            {/* Password */}

            <div className="staff-input-group">

              <label>

                {language === 'EN'
                  ? 'Password'
                  : 'كلمة المرور'}

              </label>

              <input
                type="password"
                placeholder={
                  language === 'EN'
                    ? 'Enter Password'
                    : 'أدخل كلمة المرور'
                }
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

            </div>


            {/* Login Button */}

            <button
              type="submit"
              className="staff-login-btn"
            >

              {language === 'EN'
                ? 'Login'
                : 'تسجيل الدخول'}

              <i className="bi bi-arrow-right ms-2"></i>

            </button>


          </form>


          {/* Back to Website */}

          <button
            type="button"
            className="staff-back-btn"
            onClick={() => navigate('/')}
          >

            <i className="bi bi-arrow-left me-2"></i>

            {language === 'EN'
              ? 'Back to Website'
              : 'العودة إلى الموقع'}

          </button>


        </div>

      </div>


      {/* Staff Footer */}
      <StaffFooter language={language} />

    </>

  )

}

export default StaffLogin