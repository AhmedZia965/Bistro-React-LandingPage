import { useState } from 'react'
import './Admin.css'


function AdminLogin({ language, setLanguage }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Handles Admin Login
  function handleLogin(e) {

    e.preventDefault()

    // Temporary login until database is connected
    if (email !== '' && password !== '') {

      alert(
        language === 'EN'
          ? 'Admin Login Successful'
          : 'تم تسجيل دخول المسؤول بنجاح'
      )

    } else {

      alert(
        language === 'EN'
          ? 'Please enter email and password'
          : 'يرجى إدخال البريد الإلكتروني وكلمة المرور'
      )

    }

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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                language === 'EN'
                  ? 'Enter your email'
                  : 'أدخل بريدك الإلكتروني'
              }
              required
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
              required
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