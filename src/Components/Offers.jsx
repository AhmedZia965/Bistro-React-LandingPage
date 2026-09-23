import '../App.css'

function Offers({ language }) {

  return (
    <section className="container py-5">

      <div className="text-center mb-5">

        <p className="sectionSubtitle">
          {language === 'EN'
            ? 'CRAFTED FOR THE CURIOUS'
            : 'مصنوعون لعشاق التفاصيل'}
        </p>

        <h2 className="sectionTitle">
          {language === 'EN'
            ? 'Come for the Coffee. Stay for the Atmosphere.'
            : 'تعال من أجل القهوة، وابقَ من أجل الأجواء.'}
        </h2>

      </div>

      <div className="row g-4">

        {/* Coffee */}
        <div className="col-md-4">

          <div className="offerCard text-center p-4">

            <i className="bi bi-cup-hot-fill offerIcon"></i>

            <h3>
              {language === 'EN'
                ? 'Specialty Coffee'
                : 'قهوة مميزة'}
            </h3>

            <p>
              {language === 'EN'
                ? 'From smooth espresso to hand-poured V60, every cup is carefully prepared.'
                : 'من الإسبريسو الناعم إلى قهوة V60 المحضرة يدوياً، كل كوب يُعد بعناية.'}
            </p>

          </div>

        </div>

        {/* Desserts */}
        <div className="col-md-4">

          <div className="offerCard text-center p-4">

            <i className="bi bi-cake2-fill offerIcon"></i>

            <h3>
              {language === 'EN'
                ? 'Fresh Desserts'
                : 'حلويات طازجة'}
            </h3>

            <p>
              {language === 'EN'
                ? 'Enjoy delicious cakes, pastries and sweet treats made for every mood.'
                : 'استمتع بالكعك والمعجنات والحلويات اللذيذة المصممة لكل مزاج.'}
            </p>

          </div>

        </div>

        {/* Good Moments */}
        <div className="col-md-4">

          <div className="offerCard text-center p-4">

            <i className="bi bi-stars offerIcon"></i>

            <h3>
              {language === 'EN'
                ? 'Good Moments'
                : 'لحظات جميلة'}
            </h3>

            <p>
              {language === 'EN'
                ? 'A warm atmosphere, good food and the perfect place to relax and enjoy your time.'
                : 'أجواء دافئة وطعام لذيذ ومكان مثالي للاسترخاء والاستمتاع بوقتك.'}
            </p>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Offers