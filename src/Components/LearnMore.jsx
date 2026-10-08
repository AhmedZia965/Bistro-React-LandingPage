import '../App.css'

function LearnMore({ language }) {

  return (

    <div className="learn-more-page">

      {/* ================= HERO SECTION ================= */}

      <div className="learn-more-header text-center">

        <span className="learn-more-subtitle">
          {language === 'EN'
            ? 'DISCOVER MONARCH BISTRO'
            : 'اكتشف مونارك بيسترو'}
        </span>

        <h1>
          {language === 'EN'
            ? 'More Than Just a Meal'
            : 'أكثر من مجرد وجبة'}
        </h1>

        <p>
          {language === 'EN'
            ? 'A place where great food, rich coffee, and unforgettable moments come together.'
            : 'مكان يجتمع فيه الطعام الرائع والقهوة الغنية واللحظات التي لا تُنسى.'}
        </p>

      </div>


      {/* ================= ABOUT SECTION ================= */}

      <div className="container">

        <div className="row align-items-center g-5 learn-more-section">

          {/* ================= IMAGE ================= */}

          <div className="col-lg-6">

            <div className="learn-more-image">

              <img
                src="/Burger3.jpg"
                alt="Monarch Bistro Food"
              />

            </div>

          </div>


          {/* ================= TEXT ================= */}

          <div className="col-lg-6">

            <span className="learn-more-small-title">

              {language === 'EN'
                ? 'OUR STORY'
                : 'قصتنا'}

            </span>


            <h2>

              {language === 'EN'
                ? 'Made With Passion'
                : 'صُنع بشغف'}

            </h2>


            <p>

              {language === 'EN'
                ? 'At Monarch Bistro, we believe that food is more than something you eat. It is an experience that brings people together.'
                : 'في مونارك بيسترو، نؤمن بأن الطعام أكثر من مجرد شيء تأكله، فهو تجربة تجمع الناس معاً.'}

            </p>


            <p>

              {language === 'EN'
                ? 'From carefully prepared meals to handcrafted coffee, every detail is created to make your visit special.'
                : 'من الوجبات المحضرة بعناية إلى القهوة المصنوعة يدوياً، يتم الاهتمام بكل التفاصيل لجعل زيارتك مميزة.'}

            </p>


            {/* ================= FEATURES ================= */}

            <div className="row g-3 mt-3">


              <div className="col-md-6">

                <div className="learn-feature">

                  <i className="bi bi-cup-hot"></i>

                  <div>

                    <h5>
                      {language === 'EN'
                        ? 'Rich Coffee'
                        : 'قهوة غنية'}
                    </h5>

                    <p>
                      {language === 'EN'
                        ? 'Freshly prepared coffee.'
                        : 'قهوة محضرة طازجة.'}
                    </p>

                  </div>

                </div>

              </div>


              <div className="col-md-6">

                <div className="learn-feature">

                  <i className="bi bi-heart"></i>

                  <div>

                    <h5>
                      {language === 'EN'
                        ? 'Made With Love'
                        : 'صُنع بحب'}
                    </h5>

                    <p>
                      {language === 'EN'
                        ? 'Care in every bite.'
                        : 'اهتمام في كل لقمة.'}
                    </p>

                  </div>

                </div>

              </div>


              <div className="col-md-6">

                <div className="learn-feature">

                  <i className="bi bi-stars"></i>

                  <div>

                    <h5>
                      {language === 'EN'
                        ? 'Quality First'
                        : 'الجودة أولاً'}
                    </h5>

                    <p>
                      {language === 'EN'
                        ? 'Quality ingredients.'
                        : 'مكونات عالية الجودة.'}
                    </p>

                  </div>

                </div>

              </div>


              <div className="col-md-6">

                <div className="learn-feature">

                  <i className="bi bi-people"></i>

                  <div>

                    <h5>
                      {language === 'EN'
                        ? 'For Everyone'
                        : 'للجميع'}
                    </h5>

                    <p>
                      {language === 'EN'
                        ? 'A place to feel at home.'
                        : 'مكان تشعر فيه وكأنك في منزلك.'}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= EXPERIENCE SECTION ================= */}

        <div className="learn-experience text-center">

          <span className="learn-more-small-title">

            {language === 'EN'
              ? 'THE MONARCH EXPERIENCE'
              : 'تجربة مونارك'}

          </span>


          <h2>

            {language === 'EN'
              ? 'Good Food. Good Coffee. Good Moments.'
              : 'طعام جيد. قهوة جيدة. لحظات جميلة.'}

          </h2>


          <p>

            {language === 'EN'
              ? 'Whether you are meeting friends, enjoying a quiet coffee, or simply treating yourself, Monarch Bistro is made for your moments.'
              : 'سواء كنت تلتقي بأصدقائك أو تستمتع بقهوة هادئة أو تدلل نفسك، فإن مونارك بيسترو مصمم للحظاتك.'}

          </p>


          {/* ================= EXPERIENCE CARDS ================= */}

          <div className="row g-4 mt-4">


            <div className="col-md-4">

              <div className="experience-card">

                <i className="bi bi-egg-fried"></i>

                <h4>

                  {language === 'EN'
                    ? 'Fresh Food'
                    : 'طعام طازج'}

                </h4>

                <p>

                  {language === 'EN'
                    ? 'Prepared with care and quality ingredients.'
                    : 'محضر بعناية ومكونات عالية الجودة.'}

                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="experience-card">

                <i className="bi bi-cup-hot-fill"></i>

                <h4>

                  {language === 'EN'
                    ? 'Handcrafted Coffee'
                    : 'قهوة محضرة يدوياً'}

                </h4>

                <p>

                  {language === 'EN'
                    ? 'Enjoy rich coffee prepared just for you.'
                    : 'استمتع بقهوة غنية محضرة خصيصاً لك.'}

                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="experience-card">

                <i className="bi bi-house-heart"></i>

                <h4>

                  {language === 'EN'
                    ? 'Feel At Home'
                    : 'اشعر وكأنك في منزلك'}

                </h4>

                <p>

                  {language === 'EN'
                    ? 'A comfortable place for every moment.'
                    : 'مكان مريح لكل لحظة.'}

                </p>

              </div>

            </div>


          </div>

        </div>


        {/* ================= FINAL MESSAGE ================= */}

        <div className="learn-more-final text-center">

          <h2>

            {language === 'EN'
              ? 'Welcome to Monarch Bistro'
              : 'مرحباً بكم في مونارك بيسترو'}

          </h2>


          <p>

            {language === 'EN'
              ? 'Come hungry. Leave happy.'
              : 'تعال جائعاً، وغادر سعيداً.'}

          </p>


          <div className="learn-more-divider"></div>

        </div>

      </div>

    </div>
  )
}

export default LearnMore