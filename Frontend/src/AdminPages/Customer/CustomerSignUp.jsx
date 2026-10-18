
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Signup validation rules

const signupSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must have at least 2 characters'),

  lastName: z.string()
    .min(2, 'Last name must have at least 2 characters'),

  email: z.string()
    .email('Enter a valid email address'),

  phone: z.string()
    .regex(/^\+?[0-9]{8,10}$/, 'Enter a valid phone number (8-10 digits)'),

  password: z.string()
    .min(8, 'Password must have at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one digit')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})


function CustomerSignup({ language }) {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signupSchema)
  })

  // Handles signup form submission
  function handleSignup(data) {

    // Demo signup only
    console.log('Signup form submitted:', data)

    alert(
      language === 'EN'
        ? 'Form validation successful!'
        : 'تم التحقق من صحة النموذج بنجاح!'
    )
  }

  return (
    <>
      {/* Main signup section */}
      <div className="signup-page">

        {/* Bootstrap container */}
        <div className="container">

          {/* Signup row */}
          <div className="row justify-content-center align-items-stretch">

            {/* Left side - Signup form */}
            <div className="col-md-6">

              {/* Signup card */}
              <div className="card shadow p-4 signup-card">

                {/* Signup heading */}
                <h2 className="text-center mb-4">
                  {language === 'EN'
                    ? 'Create Customer Account'
                    : 'إنشاء حساب عميل'}
                </h2>

                {/* Signup form */}
                <form onSubmit={handleSubmit(handleSignup)}>

                  {/* First and Last Name */}
                  <div className="row">

                    {/* First Name */}
                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        {language === 'EN'
                          ? 'First Name'
                          : 'الاسم الأول'}
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder={
                          language === 'EN'
                            ? 'Enter first name'
                            : 'أدخل الاسم الأول'
                        }
                        {...register('firstName')}
                      />

                      {errors.firstName && (
                        <p className="text-danger mt-1">
                          {errors.firstName.message}
                        </p>
                      )}

                    </div>

                    {/* Last Name */}
                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        {language === 'EN'
                          ? 'Last Name'
                          : 'اسم العائلة'}
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder={
                          language === 'EN'
                            ? 'Enter last name'
                            : 'أدخل اسم العائلة'
                        }
                        {...register('lastName')}
                      />

                      {errors.lastName && (
                        <p className="text-danger mt-1">
                          {errors.lastName.message}
                        </p>
                      )}

                    </div>

                  </div>

                  {/* Email */}
                  <div className="mb-3">

                    <label className="form-label">
                      {language === 'EN'
                        ? 'Email'
                        : 'البريد الإلكتروني'}
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      placeholder={
                        language === 'EN'
                          ? 'Enter email'
                          : 'أدخل البريد الإلكتروني'
                      }
                      {...register('email')}
                    />

                    {errors.email && (
                      <p className="text-danger mt-1">
                        {errors.email.message}
                      </p>
                    )}

                  </div>

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

                  {/* Confirm Password */}
                  <div className="mb-4">

                    <label className="form-label">
                      {language === 'EN'
                        ? 'Confirm Password'
                        : 'تأكيد كلمة المرور'}
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      placeholder={
                        language === 'EN'
                          ? 'Confirm password'
                          : 'أكد كلمة المرور'
                      }
                      {...register('confirmPassword')}
                    />

                    {errors.confirmPassword && (
                      <p className="text-danger mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}

                  </div>

                  {/* Create Account button */}
                  <div className="d-grid">

                    <button
                      type="submit"
                      className="btn btn-dark"
                    >
                      {language === 'EN'
                        ? 'Create Account'
                        : 'إنشاء الحساب'}
                    </button>

                  </div>

                </form>

              </div>

            </div>

            {/* Right side - Signup image */}
            <div className="col-md-6">

              <img
                src="/Iced.jpg"
                className="img-fluid signup-image"
                alt="Signup"
              />

            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default CustomerSignup
