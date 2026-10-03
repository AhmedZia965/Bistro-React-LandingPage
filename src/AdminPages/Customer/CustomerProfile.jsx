import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function CustomerProfile({ language }) {

  const navigate = useNavigate()

  // Gets reward points from local storage
  const rewardPoints = localStorage.getItem('rewardPoints') || 0


  // Checks if the customer is logged in
  useEffect(() => {

    const isLoggedIn = sessionStorage.getItem('isLoggedIn')

    if (isLoggedIn !== 'true') {
      navigate('/login')
    }

  }, [navigate])


  // Handles logout
  function handleLogout() {

    sessionStorage.removeItem('isLoggedIn')

    navigate('/login')

  }


  return (

    <>

      {/* ================= PROFILE PAGE ================= */}

      <div className="profile-page">

        <div className="container">


          {/* ================= PROFILE HEADING ================= */}

          <div className="profile-heading text-center">

            <span className="profile-subtitle">

              {language === 'EN'
                ? 'MY ACCOUNT'
                : 'حسابي'}

            </span>


            <h1>

              {language === 'EN'
                ? 'My Profile'
                : 'ملفي الشخصي'}

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

                {language === 'EN'
                  ? 'WELCOME BACK'
                  : 'مرحباً بعودتك'}

              </span>


              <h2>

                {language === 'EN'
                  ? 'Customer'
                  : 'العميل'}

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

                  {language === 'EN'
                    ? 'Personal Information'
                    : 'المعلومات الشخصية'}

                </h3>


                <p>

                  {language === 'EN'
                    ? 'Your account information and contact details.'
                    : 'معلومات حسابك وبيانات الاتصال الخاصة بك.'}

                </p>


                {/* ================= PERSONAL DETAILS ================= */}

                {/* These values will come from Signup / Database later */}

                <div className="profile-info">


                  {/* ================= FULL NAME ================= */}

                  <div>

                    <span>

                      {language === 'EN'
                        ? 'Full Name'
                        : 'الاسم الكامل'}

                    </span>


                    <strong>

                    </strong>

                  </div>


                  {/* ================= EMAIL ================= */}

                  <div>

                    <span>

                      {language === 'EN'
                        ? 'Email'
                        : 'البريد الإلكتروني'}

                    </span>


                    <strong>

                    </strong>

                  </div>


                  {/* ================= PHONE ================= */}

                  <div>

                    <span>

                      {language === 'EN'
                        ? 'Phone'
                        : 'رقم الهاتف'}

                    </span>


                    <strong>

                    </strong>

                  </div>


                </div>


                <button
                  type="button"
                  className="profile-dashboard-btn"
                >

                  {language === 'EN'
                    ? 'Edit Profile'
                    : 'تعديل الملف الشخصي'}

                  <i className="bi bi-pencil ms-2"></i>

                </button>

              </div>

            </div>


            {/* ================= REWARDS ================= */}

            <div className="col-lg-4">

              <div className="profile-dashboard-card h-100">

                <div className="profile-dashboard-icon">

                  <i className="bi bi-gift"></i>

                </div>


                <h3>

                  {language === 'EN'
                    ? 'My Rewards'
                    : 'مكافآتي'}

                </h3>


                <p>

                  {language === 'EN'
                    ? 'Keep track of your Monarch Bistro rewards.'
                    : 'تابع مكافآتك في مونارك بيسترو.'}

                </p>


                {/* ================= REWARD POINTS ================= */}

                <div className="points-box">

                  <span>

                    {language === 'EN'
                      ? 'Available Points'
                      : 'النقاط المتاحة'}

                  </span>


                  <strong>

                    {rewardPoints}

                  </strong>


                  <small>

                    {language === 'EN'
                      ? 'Reward Points'
                      : 'نقاط المكافآت'}

                  </small>

                </div>


                <button
                  type="button"
                  className="profile-dashboard-btn"
                  onClick={() => {

                    localStorage.setItem('rewardPoints', rewardPoints)

                    navigate('/rewards')

                  }}
                >

                  {language === 'EN'
                    ? 'View Rewards'
                    : 'عرض المكافآت'}

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

                  {language === 'EN'
                    ? 'Order History'
                    : 'سجل الطلبات'}

                </h3>


                <p>

                  {language === 'EN'
                    ? 'View your recent and previous orders.'
                    : 'عرض طلباتك الحالية والسابقة.'}

                </p>


                {/* ================= ORDER HISTORY ================= */}

                {/* Orders will come from the database later */}

                <div className="order-history">

                </div>


                <button
                  type="button"
                  className="profile-dashboard-btn"
                >

                  {language === 'EN'
                    ? 'View Order History'
                    : 'عرض سجل الطلبات'}

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

                  {language === 'EN'
                    ? 'Saved Addresses'
                    : 'العناوين المحفوظة'}

                </h3>


                <p>

                  {language === 'EN'
                    ? 'Manage your saved delivery and pickup addresses.'
                    : 'إدارة عناوين التوصيل والاستلام المحفوظة.'}

                </p>


                {/* ================= ADDRESS LIST ================= */}

                {/* Addresses will come from the database later */}

                <div className="address-list">

                </div>


                <button
                  type="button"
                  className="profile-dashboard-btn"
                >

                  {language === 'EN'
                    ? 'Manage Addresses'
                    : 'إدارة العناوين'}

                  <i className="bi bi-plus-lg ms-2"></i>

                </button>

              </div>

            </div>


            {/* ================= ACCOUNT SETTINGS ================= */}

            <div className="col-lg-6">

              <div className="profile-dashboard-card h-100">

                <div className="profile-dashboard-icon">

                  <i className="bi bi-gear"></i>

                </div>


                <h3>

                  {language === 'EN'
                    ? 'Account Settings'
                    : 'إعدادات الحساب'}

                </h3>


                <p>

                  {language === 'EN'
                    ? 'Manage your account preferences and security.'
                    : 'إدارة تفضيلات الحساب والأمان.'}

                </p>


                {/* ================= SETTINGS LIST ================= */}

                <div className="settings-list">


                  {/* ================= CHANGE PASSWORD ================= */}

                  <div
                    onClick={() => {}}
                    style={{ cursor: 'pointer' }}
                  >

                    <i className="bi bi-lock"></i>

                    <span>

                      {language === 'EN'
                        ? 'Change Password'
                        : 'تغيير كلمة المرور'}

                    </span>

                    <i className="bi bi-chevron-right ms-auto"></i>

                  </div>


                  {/* ================= NOTIFICATIONS ================= */}

                  <div
                    onClick={() => {}}
                    style={{ cursor: 'pointer' }}
                  >

                    <i className="bi bi-bell"></i>

                    <span>

                      {language === 'EN'
                        ? 'Notifications'
                        : 'الإشعارات'}

                    </span>

                    <i className="bi bi-chevron-right ms-auto"></i>

                  </div>


                  {/* ================= LANGUAGE PREFERENCES ================= */}

                  <div
                    onClick={() => {}}
                    style={{ cursor: 'pointer' }}
                  >

                    <i className="bi bi-globe"></i>

                    <span>

                      {language === 'EN'
                        ? 'Language Preferences'
                        : 'تفضيلات اللغة'}

                    </span>

                    <i className="bi bi-chevron-right ms-auto"></i>

                  </div>


                </div>

              </div>

            </div>


            {/* ================= LOGOUT ================= */}

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

                  {language === 'EN'
                    ? 'Logout'
                    : 'تسجيل الخروج'}

                </button>

              </div>

            </div>


          </div>

        </div>

      </div>

    </>

  )

}

export default CustomerProfile