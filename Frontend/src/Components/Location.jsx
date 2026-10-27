
import "./Component.css";

function Location({ language = "EN" }) {
    const isArabic = language === "AR";

    return (
        <div
            className="location-page py-5"
            dir={isArabic ? "rtl" : "ltr"}
        >
            <div className="container py-5 text-center">

                {/* Page Heading */}
                <p className="location-eyebrow text-uppercase mb-3">
                    {isArabic ? "اعثر علينا" : "FIND US"}
                </p>

                <h1 className="fw-bold mb-4">
                    {isArabic ? "موقعنا" : "Where We Are"}
                    <span className="location-dot">.</span>
                </h1>

                <p className="location-description mx-auto mb-4">
                    {isArabic
                        ? "تفضل بزيارتنا واستمتع بتجربة طعام مميزة في مونارك."
                        : "Visit Monarch Bistro and enjoy a memorable dining experience with great food and a welcoming atmosphere."}
                </p>

                {/* Restaurant Address */}
                <div className="location-card">

                    <i className="bi bi-geo-alt-fill location-icon d-block"></i>

                    <h4>
                        {isArabic ? "عنوان المطعم" : "Our Address"}
                    </h4>

                    <p className="location-address">
                        XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                    </p>

                </div>

                {/* Bottom Message */}
                <p className="location-footer-text">
                    {isArabic
                        ? "نتطلع إلى زيارتكم قريبًا."
                        : "We look forward to welcoming you soon."}
                </p>

            </div>
        </div>
    );
}

export default Location;
