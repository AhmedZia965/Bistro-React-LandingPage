import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// ================= VALIDATION SCHEMAS =================


const profileSchema = z.object({
  fullName: z.string()
    .trim()
    .min(2, 'Name must have at least 2 characters')
    .max(75, 'Name cannot exceed 75 characters'),

  email: z.string()
    .trim()
    .email('Enter a valid email address')
    .max(254, 'Email cannot exceed 254 characters'),

 phone: z.string()
  .trim()
  .max(12, 'Phone number cannot exceed 12 characters')
  .refine(
    value => value === '' || /^(?:\+[0-9]{8,11}|[0-9]{8,12})$/.test(value),
    'Enter a valid phone number (8-12 digits, optional +)'
  )
})


const passwordSchema = z.object({

  currentPassword: z.string()
    .min(1, 'Enter your current password'),

  newPassword: z.string()
    .min(8, 'New password must have at least 8 characters')
    .max(50, 'Password cannot exceed 50 characters'),

  confirmPassword: z.string()
    .min(1, 'Please confirm your password')

}).refine(
  data => data.newPassword === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  }
)

function ProfileManagement({ language, type }) {

  const navigate = useNavigate()

  // Stores the selected management section
  const [section, setSection] = useState(type || 'profile')

  // ================= PROFILE FORM =================

  const {
    register: registerProfile,
    handleSubmit: handleProfileForm,
    formState: { errors: profileErrors }
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: ''
    }
  })

  // ================= PASSWORD FORM =================

  const {
    register: registerPassword,
    handleSubmit: handlePasswordForm,
    formState: { errors: passwordErrors }
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  // Handles profile form
  function handleProfileSubmit(data) {
    console.log('Profile Data:', data)
  }

  // Handles password form
  function handlePasswordSubmit(data) {
    console.log('Password Form Submitted')
  }

  // Handles logout
  function handleLogout() {
    navigate('/')
  }

  return (

    <div className="profile-management-page">

      <div className="container">

        {/* ================= PAGE HEADING ================= */}

        <div className="profile-management-heading text-center">

          <span>
            {language === 'EN'
              ? 'ACCOUNT MANAGEMENT'
              : 'إدارة الحساب'}
          </span>

          <h1>
            {language === 'EN'
              ? 'Profile Management'
              : 'إدارة الملف الشخصي'}
          </h1>

          <p>
            {language === 'EN'
              ? 'Manage your personal information and account details.'
              : 'قم بإدارة معلوماتك الشخصية وتفاصيل حسابك.'}
          </p>

        </div>

        {/* ================= MANAGEMENT OPTIONS ================= */}

        <div className="profile-management-options">

          {/* ================= EDIT PROFILE ================= */}

          <Link
            to="/profile-management"
            className={
              section === 'profile'
                ? 'management-option active'
                : 'management-option'
            }
            onClick={() => setSection('profile')}
          >

            <i className="bi bi-person"></i>

            {language === 'EN'
              ? 'Edit Profile'
              : 'تعديل الملف الشخصي'}

          </Link>

          {/* ================= CHANGE PASSWORD ================= */}

          <button
            type="button"
            className={
              section === 'password'
                ? 'management-option active'
                : 'management-option'
            }
            onClick={() => setSection('password')}
          >

            <i className="bi bi-lock"></i>

            {language === 'EN'
              ? 'Change Password'
              : 'تغيير كلمة المرور'}

          </button>

          {/* ================= ORDER HISTORY ================= */}

          <button
            type="button"
            className={
              section === 'orders'
                ? 'management-option active'
                : 'management-option'
            }
            onClick={() => setSection('orders')}
          >

            <i className="bi bi-receipt"></i>

            {language === 'EN'
              ? 'Order History'
              : 'سجل الطلبات'}

          </button>

          {/* ================= ADDRESSES ================= */}

          <Link
            to="/addresses"
            className="management-option"
          >

            <i className="bi bi-geo-alt"></i>

            {language === 'EN'
              ? 'Addresses'
              : 'العناوين'}

          </Link>

        </div>

        {/* ================= EDIT PROFILE FORM ================= */}

        {section === 'profile' && (

          <div className="profile-management-card">

            <h2>
              {language === 'EN'
                ? 'Edit Profile'
                : 'تعديل الملف الشخصي'}
            </h2>

            <p>
              {language === 'EN'
                ? 'Update your personal information.'
                : 'قم بتحديث معلوماتك الشخصية.'}
            </p>

            <form onSubmit={handleProfileForm(handleProfileSubmit)}>

              {/* ================= FULL NAME ================= */}

              <div className="mb-3">

                <label className="form-label">
                  {language === 'EN'
                    ? 'Full Name'
                    : 'الاسم الكامل'}
                </label>

                <input
                  type="text"
                  className="form-control"
                  {...registerProfile('fullName')}
                />

                {profileErrors.fullName && (
                  <small className="text-danger">
                    {profileErrors.fullName.message}
                  </small>
                )}

              </div>

              {/* ================= EMAIL ================= */}

              <div className="mb-3">

                <label className="form-label">
                  {language === 'EN'
                    ? 'Email'
                    : 'البريد الإلكتروني'}
                </label>

                <input
                  type="email"
                  className="form-control"
                  {...registerProfile('email')}
                />

                {profileErrors.email && (
                  <small className="text-danger">
                    {profileErrors.email.message}
                  </small>
                )}

              </div>

              {/* ================= PHONE ================= */}

              <div className="mb-3">

                <label className="form-label">
                  {language === 'EN'
                    ? 'Phone'
                    : 'رقم الهاتف'}
                </label>

                <input
                  type="tel"
                  className="form-control"
                  {...registerProfile('phone')}
                />

                {profileErrors.phone && (
                  <small className="text-danger">
                    {profileErrors.phone.message}
                  </small>
                )}

              </div>

              {/* ================= SAVE BUTTON ================= */}

              <button
                type="submit"
                className="profile-management-btn"
              >
                {language === 'EN'
                  ? 'Save Changes'
                  : 'حفظ التغييرات'}
              </button>

            </form>

          </div>

        )}

        {/* ================= CHANGE PASSWORD FORM ================= */}

        {section === 'password' && (

          <div className="profile-management-card">

            <h2>
              {language === 'EN'
                ? 'Change Password'
                : 'تغيير كلمة المرور'}
            </h2>

            <p>
              {language === 'EN'
                ? 'Update your account password.'
                : 'قم بتحديث كلمة مرور حسابك.'}
            </p>

            <form onSubmit={handlePasswordForm(handlePasswordSubmit)}>

              {/* ================= CURRENT PASSWORD ================= */}

              <div className="mb-3">

                <label className="form-label">
                  {language === 'EN'
                    ? 'Current Password'
                    : 'كلمة المرور الحالية'}
                </label>

                <input
                  type="password"
                  className="form-control"
                  {...registerPassword('currentPassword')}
                />

                {passwordErrors.currentPassword && (
                  <small className="text-danger">
                    {passwordErrors.currentPassword.message}
                  </small>
                )}

              </div>

              {/* ================= NEW PASSWORD ================= */}

              <div className="mb-3">

                <label className="form-label">
                  {language === 'EN'
                    ? 'New Password'
                    : 'كلمة المرور الجديدة'}
                </label>

                <input
                  type="password"
                  className="form-control"
                  {...registerPassword('newPassword')}
                />

                {passwordErrors.newPassword && (
                  <small className="text-danger">
                    {passwordErrors.newPassword.message}
                  </small>
                )}

              </div>

              {/* ================= CONFIRM PASSWORD ================= */}

              <div className="mb-3">

                <label className="form-label">
                  {language === 'EN'
                    ? 'Confirm Password'
                    : 'تأكيد كلمة المرور'}
                </label>

                <input
                  type="password"
                  className="form-control"
                  {...registerPassword('confirmPassword')}
                />

                {passwordErrors.confirmPassword && (
                  <small className="text-danger">
                    {passwordErrors.confirmPassword.message}
                  </small>
                )}

              </div>

              {/* ================= CHANGE PASSWORD BUTTON ================= */}

              <button
                type="submit"
                className="profile-management-btn"
              >
                {language === 'EN'
                  ? 'Change Password'
                  : 'تغيير كلمة المرور'}
              </button>

            </form>

          </div>

        )}

        {/* ================= ORDER HISTORY ================= */}

        {section === 'orders' && (

          <div className="profile-management-card">

            <h2>
              {language === 'EN'
                ? 'Order History'
                : 'سجل الطلبات'}
            </h2>

            <p>
              {language === 'EN'
                ? 'Your previous orders will appear here.'
                : 'ستظهر طلباتك السابقة هنا.'}
            </p>

            {/* Orders will come from the database later */}

            <div className="order-management-list">

            </div>

          </div>

        )}

        {/* ================= LOGOUT BUTTON ================= */}

        <div className="text-center mt-4">

          <button
            type="button"
            className="profile-management-btn"
            onClick={handleLogout}
          >
            {language === 'EN'
              ? 'Logout'
              : 'تسجيل الخروج'}
          </button>

        </div>

      </div>

    </div>

  )

}

export default ProfileManagement