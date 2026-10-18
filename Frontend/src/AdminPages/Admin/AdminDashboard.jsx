import '../Admin/Admin.css'
import { useState } from 'react'
import { NavLink, Outlet, useNavigate, useOutletContext } from 'react-router-dom'


// Reusable stat card
function StatCard({ icon, label, children, className }) {
  return (
    <div className={className}>
      <div className="admin-stat-card">
        <div className="admin-stat-icon">
          <i className={`bi ${icon}`}></i>
        </div>
        <div>
          <p>{label}</p>
          <h2>{children}</h2>
        </div>
      </div>
    </div>
  )
}


// ================= LAYOUT (sidebar + page area) =================

function AdminDashboard({ language }) {

  const t = (en, ar) => (language === 'EN' ? en : ar)

  const navigate = useNavigate()

  // Shared DATA only (page switching is now done by the router).
  // Replace these with API calls when the database is connected.
  const [staff, setStaff] = useState([])
  const [customers, setCustomers] = useState([])
  const [offers, setOffers] = useState([])

  // "to" is relative to the dashboard route, so no hard-coded base path
  const links = [
    { to: '.',         end: true, icon: 'bi-grid-1x2-fill',     label: t('Dashboard', 'لوحة التحكم') },
    { to: 'staff',     icon: 'bi-people-fill',       label: t('Staff Management', 'إدارة الموظفين') },
    { to: 'customers', icon: 'bi-person-lines-fill', label: t('Customer Management', 'إدارة العملاء') },
    { to: 'offers',    icon: 'bi-tag-fill',          label: t('Offers Management', 'إدارة العروض') },
    { to: 'reports',   icon: 'bi-bar-chart-fill',    label: t('Reports', 'التقارير') },
    { to: 'settings',  icon: 'bi-gear-fill',         label: t('Settings', 'الإعدادات') }
  ]

  return (

    <div className="admin-dashboard">

      <div className="admin-sidebar">

        <div className="admin-brand">
          <i className="bi bi-cup-hot-fill"></i>
          <span>{t('Monarch Bistro', 'مونارك بيسترو')}</span>
        </div>

        <div className="admin-sidebar-title">
          {t('ADMIN PANEL', 'لوحة الإدارة')}
        </div>

        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              isActive ? 'admin-sidebar-link active' : 'admin-sidebar-link'
            }
          >
            <i className={`bi ${link.icon}`}></i>
            <span>{link.label}</span>
          </NavLink>
        ))}

        <button
          className="admin-sidebar-logout"
          onClick={() => navigate('/admin-login')}
        >
          <i className="bi bi-box-arrow-left"></i>
          <span>{t('Logout', 'تسجيل الخروج')}</span>
        </button>

      </div>

      <div className="admin-main">
        {/* The current page renders here, based on the URL */}
        <Outlet context={{ language, staff, setStaff, customers, setCustomers, offers, setOffers }} />
      </div>

    </div>

  )

}

export default AdminDashboard


// ================= DASHBOARD HOME (index route) =================

export function AdminHome() {

  const { language, staff, customers } = useOutletContext()
  const t = (en, ar) => (language === 'EN' ? en : ar)

  return (

    <>

      <div className="admin-welcome">
        <div>
          <span>{t('WELCOME BACK', 'مرحباً بعودتك')}</span>
          <h1>{t('Good to see you, Admin!', 'سعيدون برؤيتك، أيها المسؤول!')}</h1>
          <p>{t('Here is an overview of your café management system.', 'إليك نظرة عامة على نظام إدارة المقهى الخاص بك.')}</p>
        </div>
        <i className="bi bi-cup-hot-fill"></i>
      </div>

      <div className="row g-4 admin-statistics">
        <StatCard className="col-xl-3 col-md-6" icon="bi-people-fill" label={t('Total Customers', 'إجمالي العملاء')}>
          {customers.length}
        </StatCard>
        <StatCard className="col-xl-3 col-md-6" icon="bi-person-badge-fill" label={t('Total Staff', 'إجمالي الموظفين')}>
          {staff.length}
        </StatCard>
        <StatCard className="col-xl-3 col-md-6" icon="bi-bag-check-fill" label={t('Total Orders', 'إجمالي الطلبات')}>
          0
        </StatCard>
        <StatCard className="col-xl-3 col-md-6" icon="bi-cash-stack" label={t('Total Revenue', 'إجمالي الإيرادات')}>
          0 <small>KWD</small>
        </StatCard>
      </div>

      <div className="row g-4 admin-bottom-section">

        <div className="col-lg-7">
          <div className="admin-panel">
            <div className="admin-panel-title">
              <div>
                <span>{t('ACTIVITY', 'النشاط')}</span>
                <h4>{t('Recent Activity', 'النشاط الأخير')}</h4>
              </div>
              <i className="bi bi-activity"></i>
            </div>
            <div className="admin-empty-state">
              <i className="bi bi-inbox"></i>
              <h5>{t('No Recent Activity', 'لا يوجد نشاط حديث')}</h5>
              <p>{t('New activity will appear here when your system has data.', 'سيظهر النشاط الجديد هنا عند وجود بيانات في النظام.')}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="admin-panel">
            <div className="admin-panel-title">
              <div>
                <span>{t('SYSTEM', 'النظام')}</span>
                <h4>{t('System Summary', 'ملخص النظام')}</h4>
              </div>
              <i className="bi bi-bar-chart-fill"></i>
            </div>
            <div className="admin-empty-state">
              <i className="bi bi-check-circle"></i>
              <h5>{t('System Ready', 'النظام جاهز')}</h5>
              <p>{t('Use the sidebar to manage your bistro.', 'استخدم القائمة الجانبية لإدارة المطعم.')}</p>
            </div>
          </div>
        </div>

      </div>

    </>

  )

}


// ================= REPORTS =================

export function AdminReports() {

  const { language } = useOutletContext()
  const t = (en, ar) => (language === 'EN' ? en : ar)

  return (

    <div className="admin-panel admin-large-panel">

      <div className="admin-panel-title">
        <div>
          <span>{t('REPORTS', 'التقارير')}</span>
          <h4>{t('Bistro Reports', 'تقارير المطعم')}</h4>
        </div>
        <i className="bi bi-bar-chart-fill"></i>
      </div>

      <div className="row g-4">
        <StatCard className="col-md-4" icon="bi-bag-check-fill" label={t('Total Orders', 'إجمالي الطلبات')}>0</StatCard>
        <StatCard className="col-md-4" icon="bi-calendar-check-fill" label={t('Reservations', 'الحجوزات')}>0</StatCard>
        <StatCard className="col-md-4" icon="bi-chat-square-heart-fill" label={t('Feedback', 'التقييمات')}>0</StatCard>
      </div>

    </div>

  )

}


// ================= SETTINGS =================

export function AdminSettings() {

  const { language } = useOutletContext()
  const t = (en, ar) => (language === 'EN' ? en : ar)

  return (

    <div className="admin-panel admin-large-panel">

      <div className="admin-panel-title">
        <div>
          <span>{t('SYSTEM', 'النظام')}</span>
          <h4>{t('Admin Settings', 'إعدادات المسؤول')}</h4>
        </div>
        <i className="bi bi-gear-fill"></i>
      </div>

      <div className="admin-empty-state">
        <i className="bi bi-gear"></i>
        <h5>{t('Settings', 'الإعدادات')}</h5>
        <p>{t('Admin system settings will be added here.', 'ستتم إضافة إعدادات نظام المسؤول هنا.')}</p>
      </div>

    </div>

  )

}
