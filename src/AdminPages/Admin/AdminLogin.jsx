import { useState } from 'react'
import './Admin.css'
import { useNavigate } from 'react-router-dom'


function AdminLogin({ language, setLanguage }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Used to navigate to Admin Dashboard
  const navigate = useNavigate()


  // Handles Admin Login
  function handleLogin(e) {

    // Prevents page refresh
    e.preventDefault()

    // Temporary login until database is connected
    navigate('/admin-dashboard')

  }


  return (

    <div className="admin-login-page">

      <div className="admin-login-card">

        {/* ================= ADMIN LOGIN HEADING ================= */}

        <div className="admin-login-heading">

          <i className="bi bi-shield-lock"></i>

          <span>
            {language === 'EN'
              ? 'ADMIN PORTAL'
              : 'بوابة المسؤول'}
          </span>

          <h1>
            {language === 'EN'
              ? 'Admin Login'
              : 'تسجيل دخول المسؤول'}
          </h1>

          <p>
            {language === 'EN'
              ? 'Login to manage Monarch Bistro.'
              : 'سجل الدخول لإدارة مونارك بيسترو.'}
          </p>

        </div>


        {/* ================= LOGIN FORM ================= */}

        <form onSubmit={handleLogin}>

          {/* Email */}

          <div className="admin-input-group">

            <label>
              {language === 'EN'
                ? 'Email'
                : 'البريد الإلكتروني'}
            </label>

            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                language === 'EN'
                  ? 'Enter your email'
                  : 'أدخل بريدك الإلكتروني'
              }
            />

          </div>


          {/* Password */}

          <div className="admin-input-group">

            <label>
              {language === 'EN'
                ? 'Password'
                : 'كلمة المرور'}
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                language === 'EN'
                  ? 'Enter your password'
                  : 'أدخل كلمة المرور'
              }
            />

          </div>


          {/* Login Button */}

          <button
            type="submit"
            className="admin-login-btn"
          >
            {language === 'EN'
              ? 'Login'
              : 'تسجيل الدخول'}
          </button>

        </form>

      </div>

    </div>

  )
}


export default AdminLogin