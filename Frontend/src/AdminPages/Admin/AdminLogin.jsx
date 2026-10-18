
import './Admin.css'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Admin login validation rules
const adminLoginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),

  password: z.string()
    .min(8, 'Password must have at least 8 characters')
})

function AdminLogin({ language, setLanguage }) {

  // Used to navigate to Admin Dashboard
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(adminLoginSchema)
  })

  // Handles Admin Login
  function handleLogin(data) {

    // Temporary login until authentication is connected
    console.log('Admin login submitted:', data)

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

        <form onSubmit={handleSubmit(handleLogin)}>

          {/* Email */}

          <div className="admin-input-group">

            <label>
              {language === 'EN'
                ? 'Email'
                : 'البريد الإلكتروني'}
            </label>

            <input
              type="email"
              {...register('email')}
              placeholder={
                language === 'EN'
                  ? 'Enter your email'
                  : 'أدخل بريدك الإلكتروني'
              }
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

          <div className="admin-input-group">

            <label>
              {language === 'EN'
                ? 'Password'
                : 'كلمة المرور'}
            </label>

            <input
              type="password"
              {...register('password')}
              placeholder={
                language === 'EN'
                  ? 'Enter your password'
                  : 'أدخل كلمة المرور'
              }
            />

            {errors.password && (
              <p className="text-danger mt-1">
                {language === 'EN'
                  ? errors.password.message
                  : 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل'}
              </p>
            )}

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
