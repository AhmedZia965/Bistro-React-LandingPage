import { useState } from 'react' 
 
function ProfileManagement({ language, type }) { 
 
  // Stores the selected management section 
  const [section, setSection] = useState(type || 'profile') 
 
 
  // Stores profile information 
  const [fullName, setFullName] = useState('') 
  const [email, setEmail] = useState('') 
  const [phone, setPhone] = useState('') 
 
 
  // Stores password information 
  const [currentPassword, setCurrentPassword] = useState('') 
  const [newPassword, setNewPassword] = useState('') 
  const [confirmPassword, setConfirmPassword] = useState('') 
 
 
  // Stores address information 
  const [address, setAddress] = useState('') 
 
 
  // Handles profile form 
  function handleProfileSubmit(event) { 
 
    event.preventDefault() 
 
  } 
 
 
  // Handles password form 
  function handlePasswordSubmit(event) { 
 
    event.preventDefault() 
 
  } 
 
 
  // Handles address form 
  function handleAddressSubmit(event) { 
 
    event.preventDefault() 
 
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
 
          <button 
            type="button" 
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
 
          </button> 
 
 
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
 
          <button 
            type="button" 
            className={ 
              section === 'address' 
                ? 'management-option active' 
                : 'management-option' 
            } 
            onClick={() => setSection('address')} 
          > 
 
            <i className="bi bi-geo-alt"></i> 
 
            {language === 'EN' 
              ? 'Addresses' 
              : 'العناوين'} 
 
          </button> 
 
 
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
 
 
            <form onSubmit={handleProfileSubmit}> 
 
 
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
                  value={fullName} 
                  onChange={(event) => setFullName(event.target.value)} 
                /> 
 
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
                  value={email} 
                  onChange={(event) => setEmail(event.target.value)} 
                /> 
 
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
                  value={phone} 
                  onChange={(event) => setPhone(event.target.value)} 
                /> 
 
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
 
 
            <form onSubmit={handlePasswordSubmit}> 
 
 
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
                  value={currentPassword} 
                  onChange={(event) => setCurrentPassword(event.target.value)} 
                /> 
 
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
                  value={newPassword} 
                  onChange={(event) => setNewPassword(event.target.value)} 
                /> 
 
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
                  value={confirmPassword} 
                  onChange={(event) => setConfirmPassword(event.target.value)} 
                /> 
 
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
 
 
        {/* ================= ADDRESS FORM ================= */} 
 
        {section === 'address' && ( 
 
          <div className="profile-management-card"> 
 
            <h2> 
 
              {language === 'EN' 
                ? 'Saved Address' 
                : 'العنوان المحفوظ'} 
 
            </h2> 
 
 
            <p> 
 
              {language === 'EN' 
                ? 'Add or update your saved address.' 
                : 'أضف أو حدّث عنوانك المحفوظ.'} 
 
            </p> 
 
 
            <form onSubmit={handleAddressSubmit}> 
 
 
              {/* ================= ADDRESS ================= */} 
 
              <div className="mb-3"> 
 
                <label className="form-label"> 
 
                  {language === 'EN' 
                    ? 'Address' 
                    : 'العنوان'} 
 
                </label> 
 
 
                <textarea 
                  className="form-control" 
                  rows="4" 
                  value={address} 
                  onChange={(event) => setAddress(event.target.value)} 
                > 
                </textarea> 
 
              </div> 
 
 
              {/* ================= SAVE ADDRESS ================= */} 
 
              <button 
                type="submit" 
                className="profile-management-btn" 
              > 
 
                {language === 'EN' 
                  ? 'Save Address' 
                  : 'حفظ العنوان'} 
 
              </button> 
 
 
            </form> 
 
          </div> 
 
        )} 
 
 
      </div> 
 
    </div> 
 
  ) 
 
} 
 
export default ProfileManagement