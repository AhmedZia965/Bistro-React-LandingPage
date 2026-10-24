
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCustomerAddressesAxiosFunction } from '../../Services/api'

// ================= VALIDATION SCHEMAS =================

const profileSchema = z.object({
  firstName: z.string()
    .trim()
    .min(2, 'First name must have at least 2 characters')
    .max(75, 'First name cannot exceed 75 characters'),

  lastName: z.string()
    .trim()
    .min(2, 'Last name must have at least 2 characters')
    .max(75, 'Last name cannot exceed 75 characters'),

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

  // ================= LOGIN CHECK =================

  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem('isLoggedIn') === 'true' &&
    Boolean(sessionStorage.getItem('customerId'))
  )

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true'
    const customerId = sessionStorage.getItem('customerId')

    if (!loggedIn || !customerId) {
      setIsLoggedIn(false)
      navigate('/login', { replace: true })
    } else {
      setIsLoggedIn(true)
    }
  }, [navigate])

  const [section, setSection] = useState(type || 'profile')
  const [addresses, setAddresses] = useState([])
  const [addressLoading, setAddressLoading] = useState(false)
  const [addressError, setAddressError] = useState(false)

  // ================= RETRIEVE ADDRESSES =================

  useEffect(() => {
    const customerId = sessionStorage.getItem('customerId')
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true'

    if (!loggedIn || !customerId) return

    setAddressLoading(true)

    getCustomerAddressesAxiosFunction(customerId)
      .then((response) => {
        const savedAddresses = response.data.addresses ?? response.data

        setAddresses(
          Array.isArray(savedAddresses) ? savedAddresses : []
        )
      })
      .catch((error) => {
        console.error('Error retrieving addresses:', error)
        setAddressError(true)
      })
      .finally(() => {
        setAddressLoading(false)
      })
  }, [])

  // ================= PROFILE FORM =================

  const {
    register: registerProfile,
    handleSubmit: handleProfileForm,
    formState: { errors: profileErrors }
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
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

  // ================= SUBMIT PROFILE =================

  function handleProfileSubmit(data) {
    console.log('Profile Data:', data)
  }

  // ================= SUBMIT PASSWORD =================

  function handlePasswordSubmit(data) {
    console.log('Password Form Submitted')
  }

  // ================= LOGOUT =================

  function handleLogout() {
    sessionStorage.removeItem('isLoggedIn')
    sessionStorage.removeItem('customerId')

    setIsLoggedIn(false)
    navigate('/', { replace: true })
  }

  // Prevents the page from displaying when logged out
  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="profile-management-page">
      <div className="container">

        {/* ================= PAGE HEADING ================= */}

        <div className="profile-management-heading text-center">
          <span>
            {language === 'EN' ? 'ACCOUNT MANAGEMENT' : 'إدارة الحساب'}
          </span>

          <h1>
            {language === 'EN' ? 'Profile Management' : 'إدارة الملف الشخصي'}
          </h1>

          <p>
            {language === 'EN'
              ? 'Manage your personal information and account details.'
              : 'قم بإدارة معلوماتك الشخصية وتفاصيل حسابك.'}
          </p>
        </div>

        {/* ================= MANAGEMENT OPTIONS ================= */}

        <div className="profile-management-options">

          <button
            type="button"
            className={section === 'profile' ? 'management-option active' : 'management-option'}
            onClick={() => setSection('profile')}
          >
            <i className="bi bi-person me-2"></i>
            {language === 'EN' ? 'Edit Profile' : 'تعديل الملف الشخصي'}
          </button>

          <button
            type="button"
            className={section === 'password' ? 'management-option active' : 'management-option'}
            onClick={() => setSection('password')}
          >
            <i className="bi bi-lock me-2"></i>
            {language === 'EN' ? 'Change Password' : 'تغيير كلمة المرور'}
          </button>

          <button
            type="button"
            className={section === 'orders' ? 'management-option active' : 'management-option'}
            onClick={() => setSection('orders')}
          >
            <i className="bi bi-receipt me-2"></i>
            {language === 'EN' ? 'Order History' : 'سجل الطلبات'}
          </button>

          <button
            type="button"
            className={section === 'addresses' ? 'management-option active' : 'management-option'}
            onClick={() => setSection('addresses')}
          >
            <i className="bi bi-geo-alt me-2"></i>
            {language === 'EN' ? 'Addresses' : 'العناوين'}
          </button>

        </div>

        {/* ================= EDIT PROFILE ================= */}

        {section === 'profile' && (
          <div className="profile-management-card">
            <h2>{language === 'EN' ? 'Edit Profile' : 'تعديل الملف الشخصي'}</h2>

            <p>
              {language === 'EN'
                ? 'Update your personal information.'
                : 'قم بتحديث معلوماتك الشخصية.'}
            </p>

            <form onSubmit={handleProfileForm(handleProfileSubmit)}>

              <div className="mb-3">
                <label className="form-label">
                  {language === 'EN' ? 'First Name' : 'الاسم الأول'}
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...registerProfile('firstName')}
                />
                {profileErrors.firstName && (
                  <small className="text-danger">{profileErrors.firstName.message}</small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  {language === 'EN' ? 'Last Name' : 'اسم العائلة'}
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...registerProfile('lastName')}
                />
                {profileErrors.lastName && (
                  <small className="text-danger">{profileErrors.lastName.message}</small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  {language === 'EN' ? 'Email' : 'البريد الإلكتروني'}
                </label>
                <input
                  type="email"
                  className="form-control"
                  {...registerProfile('email')}
                />
                {profileErrors.email && (
                  <small className="text-danger">{profileErrors.email.message}</small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  {language === 'EN' ? 'Phone' : 'رقم الهاتف'}
                </label>
                <input
                  type="tel"
                  className="form-control"
                  {...registerProfile('phone')}
                />
                {profileErrors.phone && (
                  <small className="text-danger">{profileErrors.phone.message}</small>
                )}
              </div>

              <button type="submit" className="profile-management-btn">
                {language === 'EN' ? 'Save Changes' : 'حفظ التغييرات'}
              </button>

            </form>
          </div>
        )}

        {/* ================= CHANGE PASSWORD ================= */}

        {section === 'password' && (
          <div className="profile-management-card">
            <h2>{language === 'EN' ? 'Change Password' : 'تغيير كلمة المرور'}</h2>

            <p>
              {language === 'EN'
                ? 'Update your account password.'
                : 'قم بتحديث كلمة مرور حسابك.'}
            </p>

            <form onSubmit={handlePasswordForm(handlePasswordSubmit)}>

              <div className="mb-3">
                <label className="form-label">
                  {language === 'EN' ? 'Current Password' : 'كلمة المرور الحالية'}
                </label>
                <input
                  type="password"
                  className="form-control"
                  {...registerPassword('currentPassword')}
                />
                {passwordErrors.currentPassword && (
                  <small className="text-danger">{passwordErrors.currentPassword.message}</small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  {language === 'EN' ? 'New Password' : 'كلمة المرور الجديدة'}
                </label>
                <input
                  type="password"
                  className="form-control"
                  {...registerPassword('newPassword')}
                />
                {passwordErrors.newPassword && (
                  <small className="text-danger">{passwordErrors.newPassword.message}</small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  {language === 'EN' ? 'Confirm Password' : 'تأكيد كلمة المرور'}
                </label>
                <input
                  type="password"
                  className="form-control"
                  {...registerPassword('confirmPassword')}
                />
                {passwordErrors.confirmPassword && (
                  <small className="text-danger">{passwordErrors.confirmPassword.message}</small>
                )}
              </div>

              <button type="submit" className="profile-management-btn">
                {language === 'EN' ? 'Change Password' : 'تغيير كلمة المرور'}
              </button>

            </form>
          </div>
        )}

        {/* ================= ORDER HISTORY ================= */}

        {section === 'orders' && (
          <div className="profile-management-card">
            <h2>{language === 'EN' ? 'Order History' : 'سجل الطلبات'}</h2>
            <p>
              {language === 'EN'
                ? 'Your previous orders will appear here.'
                : 'ستظهر طلباتك السابقة هنا.'}
            </p>
            <div className="order-management-list"></div>
          </div>
        )}

        {/* ================= ADDRESSES ================= */}

        {section === 'addresses' && (
          <div className="profile-management-card">

            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
              <div>
                <h2 className="mb-2">
                  {language === 'EN' ? 'My Addresses' : 'عناويني'}
                </h2>
                <p className="mb-0">
                  {language === 'EN'
                    ? 'Your saved delivery addresses.'
                    : 'عناوين التوصيل المحفوظة.'}
                </p>
              </div>

              <span
                className="rounded-pill px-3 py-2"
                style={{
                  backgroundColor: '#f5f0e6',
                  color: '#800020',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                <i className="bi bi-geo-alt me-2"></i>
                {addresses.length} {language === 'EN' ? 'Saved' : 'محفوظ'}
              </span>
            </div>

            {addressLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border" style={{ color: '#800020' }} role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">
                  {language === 'EN' ? 'Loading your addresses...' : 'جارٍ تحميل عناوينك...'}
                </p>
              </div>
            ) : addressError ? (
              <div className="text-center py-5">
                <i className="bi bi-exclamation-circle" style={{ fontSize: '42px', color: '#800020' }}></i>
                <h5 className="mt-3">
                  {language === 'EN' ? 'Could not load addresses' : 'تعذر تحميل العناوين'}
                </h5>
                <p className="text-muted">
                  {language === 'EN'
                    ? 'Please try again later.'
                    : 'يرجى المحاولة مرة أخرى لاحقاً.'}
                </p>
              </div>
            ) : addresses.length > 0 ? (
              <div className="row g-4">
                {addresses.map((address, index) => (
                  <div className="col-12 col-md-6" key={address._id || index}>
                    <div
                      className="h-100 p-4"
                      style={{
                        backgroundColor: '#fbf8f3',
                        border: '1px solid #e8ded5',
                        borderTop: '4px solid #800020',
                        borderRadius: '14px',
                        boxShadow: '0 5px 18px rgba(13, 13, 13, 0.04)',
                        overflowWrap: 'anywhere'
                      }}
                    >
                      <div className="d-flex align-items-start gap-3 mb-3">
                        <div
                          className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                          style={{
                            width: '44px',
                            height: '44px',
                            backgroundColor: '#f0e2e3',
                            color: '#800020',
                            fontSize: '20px'
                          }}
                        >
                          <i className="bi bi-house-door"></i>
                        </div>

                        <div>
                          <h5 className="mb-1" style={{ color: '#800020', fontWeight: 700 }}>
                            {address.label ||
                              (language === 'EN'
                                ? `Address ${index + 1}`
                                : `العنوان ${index + 1}`)}
                          </h5>

                          {address.isDefault && (
                            <span
                              className="badge rounded-pill"
                              style={{ backgroundColor: '#800020', color: '#fff' }}
                            >
                              {language === 'EN' ? 'Default Address' : 'العنوان الافتراضي'}
                            </span>
                          )}
                        </div>
                      </div>

                      {[
                        {
                          icon: 'bi-geo-alt',
                          value: [
                            address.street,
                            address.building,
                            address.apartment
                          ].filter(Boolean).join(', ')
                        },
                        {
                          icon: 'bi-pin-map',
                          value: [
                            address.area,
                            address.city
                          ].filter(Boolean).join(', ')
                        },
                        {
                          icon: 'bi-telephone',
                          value: address.phone
                        },
                        {
                          icon: 'bi-chat-left-text',
                          value: address.notes
                        }
                      ].filter(item => item.value).map((item, detailIndex) => (
                        <div className="d-flex gap-2 mb-2" key={detailIndex}>
                          <i
                            className={`bi ${item.icon} mt-1`}
                            style={{ color: '#800020', minWidth: '18px' }}
                          ></i>
                          <span style={{ color: '#49413d', fontSize: '14px', lineHeight: 1.6 }}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="text-center py-5 px-3"
                style={{
                  backgroundColor: '#fbf8f3',
                  border: '1px dashed #d8c8be',
                  borderRadius: '14px'
                }}
              >
                <i className="bi bi-geo-alt" style={{ fontSize: '44px', color: '#800020' }}></i>
                <h5 className="mt-3">
                  {language === 'EN' ? 'No addresses yet' : 'لا توجد عناوين حتى الآن'}
                </h5>
                <p className="text-muted mb-0">
                  {language === 'EN'
                    ? 'Your saved addresses will appear here.'
                    : 'ستظهر عناوينك المحفوظة هنا.'}
                </p>
              </div>
            )}

          </div>
        )}

        {/* ================= LOGOUT BUTTON ================= */}

        <div className="text-center mt-4">
          <button
            type="button"
            className="profile-management-btn"
            onClick={handleLogout}
          >
            {language === 'EN' ? 'Logout' : 'تسجيل الخروج'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProfileManagement
