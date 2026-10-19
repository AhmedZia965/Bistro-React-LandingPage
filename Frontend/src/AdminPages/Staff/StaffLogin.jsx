
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import StaffNavbar from './StaffNavbar'
import StaffFooter from './StaffFooter'

// Staff login validation rules
const staffLoginSchema = z.object({
  staffId: z.string()
    .trim()
    .min(1, 'Staff ID is required'),

  password: z.string()
    .min(8, 'Password must have at least 8 characters')
})

function StaffLogin({ language, setLanguage }) {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(staffLoginSchema)
  })

  // Handles staff login
  function handleLogin(data) {

    // Demo login: accepts valid form details
    console.log('Staff login submitted:', data)

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

          <form onSubmit={handleSubmit(handleLogin)}>

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
                {...register('staffId')}
              />

              {errors.staffId && (
                <p className="text-danger mt-1">
                  {language === 'EN'
                    ? errors.staffId.message
                    : 'معرف الموظف مطلوب'}
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
