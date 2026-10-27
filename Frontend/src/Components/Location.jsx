
import "./Component.css";

function Location({ language = "EN" }) {
    const isArabic = language === "AR";

    return (
        <div
            className="location-page py-5"
            dir={isArabic ? "rtl" : "ltr"}
        >
            <div className="container py-5">

                {/* Page Heading */}
                <div className="location-heading text-center mb-5">
                    <p className="location-eyebrow text-uppercase mb-3">
                        {isArabic ? "اعثر علينا" : "YOUR TABLE AWAITS"}
                    </p>

                    <h1 className="fw-bold mb-4">
                        {isArabic ? "زورونا في مونارك" : "Find Your Way to Monarch"}
                        <span className="location-dot">.</span>
                    </h1>

                    <p className="location-description mx-auto">
                        {isArabic
                            ? "اكتشف أجواء مونارك بيسترو واستمتع بأشهى المأكولات في أجواء أنيقة ومريحة."
                            : "Discover Monarch Bistro, where exceptional flavours meet an elegant atmosphere. We look forward to making your next visit memorable."}
                    </p>
                </div>

                {/* Location Information */}
                <div className="row g-4 align-items-stretch mb-5">

                    {/* Restaurant Address */}
                    <div className="col-lg-6">
                        <div className="location-card h-100">
                            <div className="location-card-icon">
                                <i className="bi bi-geo-alt-fill"></i>
                            </div>

                            <p className="location-card-label">
                                {isArabic ? "تفضل بزيارتنا" : "COME FIND US"}
                            </p>

                            <h3>
                                {isArabic ? "عنوان المطعم" : "Our Location"}
                            </h3>

                            <p className="location-address">
                                {isArabic
                                    ? "أضف عنوان المطعم هنا"
                                    : "Add your restaurant address here"}
                            </p>

                            <p className="location-card-description">
                                {isArabic
                                    ? "نحن بانتظار زيارتكم لتجربة طعام مميزة."
                                    : "Stop by and enjoy freshly prepared food in a welcoming setting."}
                            </p>

                            <a
                                href="https://www.google.com/maps"
                                target="_blank"
                                rel="noreferrer"
                                className="location-link"
                            >
                                {isArabic ? "افتح الخرائط" : "Open Google Maps"}
                                <i className="bi bi-arrow-up-right"></i>
                            </a>
                        </div>
                    </div>

                    {/* Opening Hours */}
                    <div className="col-lg-6">
                        <div className="location-card h-100">
                            <div className="location-card-icon">
                                <i className="bi bi-clock-fill"></i>
                            </div>

                            <p className="location-card-label">
                                {isArabic ? "نحن بانتظاركم" : "PLAN YOUR VISIT"}
                            </p>

                            <h3>
                                {isArabic ? "ساعات العمل" : "Opening Hours"}
                            </h3>

                            <div className="location-hours">
                                <div className="location-hours-row">
                                    <span>
                                        {isArabic ? "الأحد - الخميس" : "Sunday – Thursday"}
                                    </span>
                                    <span>
                                        {isArabic ? "أضف الوقت" : "Add opening hours"}
                                    </span>
                                </div>

                                <div className="location-hours-row">
                                    <span>
                                        {isArabic ? "الجمعة - السبت" : "Friday – Saturday"}
                                    </span>
                                    <span>
                                        {isArabic ? "أضف الوقت" : "Add opening hours"}
                                    </span>
                                </div>
                            </div>

                            <p className="location-card-description">
                                {isArabic
                                    ? "يرجى التحقق من ساعات العمل قبل زيارتنا."
                                    : "Please check our opening hours before planning your visit."}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Contact Section */}
                <div className="location-contact text-center">
                    <i className="bi bi-chat-dots-fill location-contact-icon"></i>

                    <p className="location-eyebrow">
                        {isArabic ? "هل لديك استفسار؟" : "WE'RE HERE TO HELP"}
                    </p>

                    <h2>
                        {isArabic
                            ? "نتطلع إلى التواصل معكم"
                            : "Have Questions Before Your Visit?"}
                    </h2>

                    <p className="location-description mx-auto">
                        {isArabic
                            ? "تواصل معنا لمعرفة المزيد عن المطعم وخدماتنا."
                            : "Get in touch with our team for information about our restaurant and services."}
                    </p>

                    <p className="location-contact-detail">
                        <i className="bi bi-telephone-fill"></i>
                        {isArabic
                            ? "أضف رقم هاتف المطعم"
                            : "Add your restaurant phone number"}
                    </p>

                    <p className="location-contact-detail">
                        <i className="bi bi-envelope-fill"></i>
                        {isArabic
                            ? "أضف البريد الإلكتروني للمطعم"
                            : "Add your restaurant email"}
                    </p>
                </div>

                {/* Bottom Message */}
                <div className="location-footer-text text-center mt-5">
                    <i className="bi bi-heart-fill"></i>
                    <p>
                        {isArabic
                            ? "في مونارك، كل زيارة تصنع ذكرى جميلة."
                            : "At Monarch, every visit is an opportunity to create something memorable."}
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Location;
