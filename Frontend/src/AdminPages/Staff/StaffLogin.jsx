
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { staffLoginAxiosFunction } from '../../Services/StaffApi.js'

import StaffNavbar from './StaffNavbar'
import StaffFooter from './StaffFooter'

// Staff login validation rules
const staffLoginSchema = z.object({
  email: z.string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),

  password: z.string()
    .min(8, 'Password must have at least 8 characters')
})

function StaffLogin({ language, setLanguage }) {

  const navigate = useNavigate()
  const [loginError, setLoginError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(staffLoginSchema)
  })

  // Handles staff login
  async function handleLogin(data) {

    try {

      setLoginError('')

      const response = await staffLoginAxiosFunction(
        data.email,
        data.password
      )

      if (response.status === 200) {

        sessionStorage.setItem('staffId', response.data.staffId)
        sessionStorage.setItem('staffEmail', response.data.email)

        navigate('/staff-dashboard')
      }

    } catch (error) {

      setLoginError(
        error.response?.data?.message ||
        'Login failed. Please try again.'
      )

    }
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

          <form onSubmit={handleSubmit(handleLogin)}>

            {/* Email */}
            <div className="staff-input-group">

              <label>
                {language === 'EN'
                  ? 'Email'
                  : 'البريد الإلكتروني'}
              </label>

              <input
                type="email"
                placeholder={
                  language === 'EN'
                    ? 'Enter Email'
                    : 'أدخل البريد الإلكتروني'
                }
                {...register('email')}
              />

              {errors.email && (
                <p className="text-danger mt-1">
                  {language === 'EN'
                    ? errors.email.message
                    : 'يرجى إدخال بريد إلكتروني صحيح'}
                </p>
              )}

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
                {...register('password')}
              />

              {errors.password && (
                <p className="text-danger mt-1">
                  {language === 'EN'
                    ? errors.password.message
                    : 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل'}
                </p>
              )}

            </div>

            {/* Login Error */}
            {loginError && (
              <p className="text-danger mt-2">
                {loginError}
              </p>
            )}

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

        </div>

      </div>

      {/* Staff Footer */}
      <StaffFooter language={language} />

    </>
  )
}

export default StaffLogin
