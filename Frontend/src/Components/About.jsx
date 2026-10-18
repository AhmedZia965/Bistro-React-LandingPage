import '../App.css'
import { Link } from 'react-router-dom'

function About({ language }) {

  return (

    <section className="container py-5">

      <div className="row align-items-center">

        <div className="col-md-6">

          <img
            src="/Cake2.jpg"
            className="AboutImage"
            alt="Bistro"
          />

        </div>


        <div className="col-md-6">

          <p className="sectionSubtitle">

            {language === 'EN'
              ? 'OUR STORY'
              : 'قصتنا'}

          </p>


          <h2 className="AboutTitle">

            {language === 'EN'
              ? 'More Than Just a Bistro'
              : 'أكثر من مجرد مطعم'}

          </h2>


          <p className="AboutText">

            {language === 'EN'
              ? 'Monarch Bistro is a place where good food, specialty coffee, and a warm atmosphere come together. We believe every meal should be more than just food — it should be a moment worth remembering.'
              : 'مونارك بيسترو هو مكان يجمع بين الطعام اللذيذ والقهوة المميزة والأجواء الدافئة. نؤمن بأن كل وجبة يجب أن تكون أكثر من مجرد طعام، بل لحظة تستحق أن تُذكر.'}

          </p>


          <Link
            to="/learn-more"
            className="AboutBtn"
            style={{ textDecoration: 'none' }}
          >

            {language === 'EN'
              ? 'Discover More'
              : 'اكتشف المزيد'}

          </Link>

        </div>

      </div>

    </section>

  )
}

export default About