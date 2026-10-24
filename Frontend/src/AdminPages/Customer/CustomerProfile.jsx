
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCustomerProfileAxiosFunction } from '../../Services/api'

function CustomerProfile({ language }) {
  const navigate = useNavigate()

  // Stores customer details from the database
  const [customer, setCustomer] = useState(null)

  // Checks whether the customer is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem('isLoggedIn') === 'true' &&
    Boolean(sessionStorage.getItem('customerId'))
  )

  // Checks login status and retrieves customer details
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true'
    const customerId = sessionStorage.getItem('customerId')

    if (!loggedIn || !customerId) {
      setIsLoggedIn(false)
      navigate('/login', { replace: true })
      return
    }

    setIsLoggedIn(true)

    // Gets customer details from the backend
    getCustomerProfileAxiosFunction(customerId)
      .then((response) => {
        setCustomer(response.data)
      })
      .catch((error) => {
        console.error('Error retrieving customer profile:', error)
      })
  }, [navigate])

  // Gets reward points from the database
  const rewardPoints = customer ? customer.rewardPoints : 0

  // Handles logout
  function handleLogout() {
    sessionStorage.removeItem('isLoggedIn')
    sessionStorage.removeItem('customerId')

    setIsLoggedIn(false)
    setCustomer(null)

    navigate('/', { replace: true })
  }

  // Prevents the profile page from displaying when logged out
  if (!isLoggedIn) {
    return null
  }

  return (
    <>
      {/* ================= PROFILE PAGE ================= */}

      <div className="profile-page">
        <div className="container">

          {/* ================= PROFILE HEADING ================= */}

          <div className="profile-heading text-center">
            <span className="profile-subtitle">
              {language === 'EN' ? 'MY ACCOUNT' : 'حسابي'}
            </span>

            <h1>
              {language === 'EN' ? 'My Profile' : 'ملفي الشخصي'}
            </h1>

            <p>
              {language === 'EN'
                ? 'Manage your account, orders, rewards and saved information.'
                : 'قم بإدارة حسابك وطلباتك ومكافآتك ومعلوماتك المحفوظة.'}
            </p>
          </div>

          {/* ================= CUSTOMER WELCOME ================= */}

          <div className="profile-welcome">
            <div className="profile-welcome-icon">
              <i className="bi bi-person-circle"></i>
            </div>

            <div>
              <span>
                {language === 'EN' ? 'WELCOME BACK' : 'مرحباً بعودتك'}
              </span>

              <h2>
                {customer
                  ? `${customer.firstName} ${customer.lastName}`
                  : language === 'EN' ? 'Customer' : 'العميل'}
              </h2>

              <p>
                {language === 'EN'
                  ? 'Thank you for being part of Monarch Bistro.'
                  : 'شكراً لكونك جزءاً من مونارك بيسترو.'}
              </p>
            </div>
          </div>

          {/* ================= PROFILE CARDS ================= */}

          <div className="row g-4">

            {/* ================= PERSONAL INFORMATION ================= */}

            <div className="col-lg-4">
              <div className="profile-dashboard-card h-100">
                <div className="profile-dashboard-icon">
                  <i className="bi bi-person"></i>
                </div>

                <h3>
                  {language === 'EN' ? 'Personal Information' : 'المعلومات الشخصية'}
                </h3>

                <p>
                  {language === 'EN'
                    ? 'Your account information and contact details.'
                    : 'معلومات حسابك وبيانات الاتصال الخاصة بك.'}
                </p>

                <div className="profile-info">
                  <div>
                    <span>{language === 'EN' ? 'Full Name' : 'الاسم الكامل'}</span>
                    <strong>
                      {customer ? `${customer.firstName} ${customer.lastName}` : ''}
                    </strong>
                  </div>

                  <div>
                    <span>{language === 'EN' ? 'Email' : 'البريد الإلكتروني'}</span>
                    <strong>{customer ? customer.email : ''}</strong>
                  </div>

                  <div>
                    <span>{language === 'EN' ? 'Phone' : 'رقم الهاتف'}</span>
                    <strong>{customer ? customer.phone : ''}</strong>
                  </div>
                </div>

                {/* ================= EDIT PROFILE ================= */}

                {isLoggedIn && (
                  <Link to="/profile-management" className="profile-dashboard-btn">
                    {language === 'EN' ? 'Edit Profile' : 'تعديل الملف الشخصي'}
                    <i className="bi bi-pencil ms-2"></i>
                  </Link>
                )}
              </div>
            </div>

            {/* ================= REWARDS ================= */}

            <div className="col-lg-4">
              <div className="profile-dashboard-card h-100">
                <div className="profile-dashboard-icon">
                  <i className="bi bi-gift"></i>
                </div>

                <h3>
                  {language === 'EN' ? 'My Rewards' : 'مكافآتي'}
                </h3>

                <p>
                  {language === 'EN'
                    ? 'Keep track of your Monarch Bistro rewards.'
                    : 'تابع مكافآتك في مونارك بيسترو.'}
                </p>

                <div className="points-box">
                  <span>
                    {language === 'EN' ? 'Available Points' : 'النقاط المتاحة'}
                  </span>

                  <strong>{rewardPoints}</strong>

                  <small>
                    {language === 'EN' ? 'Reward Points' : 'نقاط المكافآت'}
                  </small>
                </div>

                <button
                  type="button"
                  className="profile-dashboard-btn"
                  onClick={() => navigate('/rewards')}
                >
                  {language === 'EN' ? 'View Rewards' : 'عرض المكافآت'}
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>
              </div>
            </div>

            {/* ================= ORDER HISTORY ================= */}

            <div className="col-lg-4">
              <div className="profile-dashboard-card h-100">
                <div className="profile-dashboard-icon">
                  <i className="bi bi-receipt"></i>
                </div>

                <h3>
                  {language === 'EN' ? 'Order History' : 'سجل الطلبات'}
                </h3>

                <p>
                  {language === 'EN'
                    ? 'View your recent and previous orders.'
                    : 'عرض طلباتك الحالية والسابقة.'}
                </p>

                <div className="order-history"></div>

                <button type="button" className="profile-dashboard-btn">
                  {language === 'EN' ? 'View Order History' : 'عرض سجل الطلبات'}
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>
              </div>
            </div>

            {/* ================= SAVED ADDRESSES ================= */}

            <div className="col-lg-6">
              <div className="profile-dashboard-card h-100">
                <div className="profile-dashboard-icon">
                  <i className="bi bi-geo-alt"></i>
                </div>

                <h3>
                  {language === 'EN' ? 'Saved Addresses' : 'العناوين المحفوظة'}
                </h3>

                <p>
                  {language === 'EN'
                    ? 'Manage your saved delivery and pickup addresses.'
                    : 'إدارة عناوين التوصيل والاستلام المحفوظة.'}
                </p>

                <div className="address-list"></div>

                {/* ================= MANAGE ADDRESSES ================= */}

                {isLoggedIn && (
                  <Link to="/addresses" className="profile-dashboard-btn">
                    {language === 'EN' ? 'Manage Addresses' : 'إدارة العناوين'}
                    <i className="bi bi-plus-lg ms-2"></i>
                  </Link>
                )}
              </div>
            </div>

            {/* ================= ACCOUNT SETTINGS ================= */}

            <div className="col-lg-6">
              <div className="profile-dashboard-card h-100">
                <div className="profile-dashboard-icon">
                  <i className="bi bi-gear"></i>
                </div>

                <h3>
                  {language === 'EN' ? 'Account Settings' : 'إعدادات الحساب'}
                </h3>

                <p>
                  {language === 'EN'
                    ? 'Manage your account preferences and security.'
                    : 'إدارة تفضيلات الحساب والأمان.'}
                </p>

                <div className="settings-list">
                  <div
                    onClick={() => navigate('/profile-management')}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="bi bi-lock"></i>
                    <span>
                      {language === 'EN' ? 'Change Password' : 'تغيير كلمة المرور'}
                    </span>
                    <i className="bi bi-chevron-right ms-auto"></i>
                  </div>

                  <div style={{ cursor: 'pointer' }}>
                    <i className="bi bi-bell"></i>
                    <span>
                      {language === 'EN' ? 'Notifications' : 'الإشعارات'}
                    </span>
                    <i className="bi bi-chevron-right ms-auto"></i>
                  </div>

                  <div style={{ cursor: 'pointer' }}>
                    <i className="bi bi-globe"></i>
                    <span>
                      {language === 'EN' ? 'Language Preferences' : 'تفضيلات اللغة'}
                    </span>
                    <i className="bi bi-chevron-right ms-auto"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= LOGOUT ================= */}

            {isLoggedIn && (
              <div className="col-12">
                <div className="profile-logout text-center">
                  <p>
                    {language === 'EN'
                      ? 'Finished with your account?'
                      : 'هل انتهيت من استخدام حسابك؟'}
                  </p>

                  <button
                    type="button"
                    className="profile-logout-btn"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    {language === 'EN' ? 'Logout' : 'تسجيل الخروج'}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerProfile
