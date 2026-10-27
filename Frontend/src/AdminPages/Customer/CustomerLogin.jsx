import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginAxiosFunction } from '../../Services/CustomerApi.js'

// Login validation rules
const loginSchema = z.object({
  phone: z.string()
    .trim()
    .min(8, 'Phone number must have at least 8 digits')
    .max(12, 'Phone number cannot exceed 12 characters')
    .regex(
      /^(?:\+[0-9]{8,11}|[0-9]{8,12})$/,
      'Enter a valid phone number (8-12 digits, optional +)'
    ),

  password: z.string()
    .min(8, 'Password must have at least 8 characters')
    .max(128, 'Password cannot exceed 128 characters')
})

function CustomerLogin({ language }) {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  // Handles login using the backend
  async function handleLogin(data) {
    try {
      const response = await loginAxiosFunction(data)
      console.log(response.data)
      sessionStorage.setItem('isLoggedIn', 'true')
      sessionStorage.setItem('customerId', response.data.customerId)

      // Redirect to the landing page after successful login
      navigate('/')
    } catch (error) {
      console.error('Login request failed:', error)

      alert(
        language === 'EN'
          ? 'Invalid phone number or password.'
          : 'رقم الهاتف أو كلمة المرور غير صحيحة.'
      )
    }
  }

  return (
    <>
      {/* Main login section */}
      <div className="login-page">

        {/* Bootstrap container */}
        <div className="container">

          {/* Login row */}
          <div className="row justify-content-center">

            {/* Login form */}
            <div className="col-md-6">

              {/* Login card */}
              <div className="card shadow p-4 login-card">

                {/* Login heading */}
                <h2 className="text-center mb-4">
                  {language === 'EN'
                    ? 'Customer Login'
                    : 'تسجيل دخول العميل'}
                </h2>

                {/* Login form */}
                <form onSubmit={handleSubmit(handleLogin)}>

                  {/* Phone Number */}
                  <div className="mb-3">
                    <label className="form-label">
                      {language === 'EN'
                        ? 'Phone Number'
                        : 'رقم الهاتف'}
                    </label>

                    <input
                      type="tel"
                      className="form-control"
                      placeholder={
                        language === 'EN'
                          ? 'Enter phone number'
                          : 'أدخل رقم الهاتف'
                      }
                      {...register('phone')}
                    />

                    {errors.phone && (
                      <p className="text-danger mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label">
                      {language === 'EN'
                        ? 'Password'
                        : 'كلمة المرور'}
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      placeholder={
                        language === 'EN'
                          ? 'Enter password'
                          : 'أدخل كلمة المرور'
                      }
                      {...register('password')}
                    />

                    {errors.password && (
                      <p className="text-danger mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Forgot Password */}
                  <div className="text-end mb-4">
                    <Link
                      to="/forgot-password"
                      className="login-link"
                    >
                      {language === 'EN'
                        ? 'Forgot Password?'
                        : 'هل نسيت كلمة المرور؟'}
                    </Link>
                  </div>

                  {/* Login button */}
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-dark"
                    >
                      {language === 'EN'
                        ? 'Login'
                        : 'تسجيل الدخول'}
                    </button>
                  </div>

                </form>

                {/* Signup message */}
                <p className="text-center mt-4">
                  {language === 'EN'
                    ? "Don't have an account? "
                    : 'ليس لديك حساب؟ '}

                  <Link
                    to="/signup"
                    className="login-link"
                  >
                    {language === 'EN'
                      ? 'Sign Up'
                      : 'إنشاء حساب'}
                  </Link>
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default CustomerLogin