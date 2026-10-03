import '../App.css'

function Offers({ language }) {

  const offers = [
    {
      icon: 'bi bi-cup-hot-fill',
      titleEN: 'Specialty Coffee',
      titleAR: 'قهوة مميزة',
      descriptionEN: 'From smooth espresso to hand-poured V60, every cup is carefully prepared.',
      descriptionAR: 'من الإسبريسو الناعم إلى قهوة V60 المحضرة يدوياً، كل كوب يُعد بعناية.'
    },
    {
      icon: 'bi bi-cake2-fill',
      titleEN: 'Fresh Desserts',
      titleAR: 'حلويات طازجة',
      descriptionEN: 'Enjoy delicious cakes, pastries and sweet treats made for every mood.',
      descriptionAR: 'استمتع بالكعك والمعجنات والحلويات اللذيذة المصممة لكل مزاج.'
    },
    {
      icon: 'bi bi-stars',
      titleEN: 'Good Moments',
      titleAR: 'لحظات جميلة',
      descriptionEN: 'A warm atmosphere, good food and the perfect place to relax and enjoy your time.',
      descriptionAR: 'أجواء دافئة وطعام لذيذ ومكان مثالي للاسترخاء والاستمتاع بوقتك.'
    }
  ]

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

        {offers.map((offer, index) => (

          <div className="col-md-4" key={index}>

            <div className="offerCard text-center p-4">

              <i className={`${offer.icon} offerIcon`}></i>

              <h3>
                {language === 'EN'
                  ? offer.titleEN
                  : offer.titleAR}
              </h3>

              <p>
                {language === 'EN'
                  ? offer.descriptionEN
                  : offer.descriptionAR}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  )
}

export default Offers