function Rewards({ language }) {

  // Checks if the customer is logged in
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'

  // Gets the customer's reward points
  const rewardPoints = localStorage.getItem('rewardPoints') || 0


  return (

    <div className="rewards-page">

      <div className="container">


        {/* ================= REWARDS HEADING ================= */}

        <div className="rewards-heading text-center">

          <span className="rewards-subtitle">

            {language === 'EN'
              ? 'REWARD PROGRAM'
              : 'برنامج المكافآت'}

          </span>


          <h1>

            {language === 'EN'
              ? 'Earn Points. Enjoy More.'
              : 'اكسب النقاط واستمتع بالمزيد.'}

          </h1>


          <p>

            {language === 'EN'
              ? 'Earn points with every purchase and redeem them for your favorite items.'
              : 'اكسب النقاط مع كل عملية شراء واستبدلها بأطعمتك المفضلة.'}

          </p>


          {/* Point Value */}

          <div className="reward-value">

            <i className="bi bi-coin"></i>

            <strong>
              1 Point = 20 Rs
            </strong>

          </div>

        </div>


        {/* ================= HOW IT WORKS ================= */}

        <div className="row g-4 mb-5">


          {/* Earn */}

          <div className="col-md-4">

            <div className="reward-card text-center">

              <div className="reward-icon">

                <i className="bi bi-cart-check"></i>

              </div>


              <h3>

                {language === 'EN'
                  ? 'Earn Points'
                  : 'اكسب النقاط'}

              </h3>


              <p>

                {language === 'EN'
                  ? 'Earn points whenever you purchase food or drinks.'
                  : 'اكسب النقاط عند شراء الطعام أو المشروبات.'}

              </p>

            </div>

          </div>


          {/* Collect */}

          <div className="col-md-4">

            <div className="reward-card text-center">

              <div className="reward-icon">

                <i className="bi bi-star"></i>

              </div>


              <h3>

                {language === 'EN'
                  ? 'Collect Points'
                  : 'اجمع النقاط'}

              </h3>


              <p>

                {language === 'EN'
                  ? 'Keep collecting points until you have enough for a reward.'
                  : 'استمر في جمع النقاط حتى تحصل على مكافأتك.'}

              </p>

            </div>

          </div>


          {/* Redeem */}

          <div className="col-md-4">

            <div className="reward-card text-center">

              <div className="reward-icon">

                <i className="bi bi-gift"></i>

              </div>


              <h3>

                {language === 'EN'
                  ? 'Redeem Rewards'
                  : 'استبدل المكافآت'}

              </h3>


              <p>

                {language === 'EN'
                  ? 'Use your points to redeem your favorite café items.'
                  : 'استخدم نقاطك لاستبدال أطعمتك المفضلة.'}

              </p>

            </div>

          </div>


        </div>


        {/* ================= REWARD ITEMS ================= */}

        <div className="rewards-section">


          <div className="text-center mb-4">

            <h2>

              {language === 'EN'
                ? 'Redeem Your Points'
                : 'استبدل نقاطك'}

            </h2>


            <p>

              {language === 'EN'
                ? 'Choose from our café favorites.'
                : 'اختر من أطباق ومشروبات مقهانا المفضلة.'}

            </p>

          </div>


          <div className="row g-4">


          </div>

        </div>


        {/* ================= LOGIN / POINTS SECTION ================= */}

        <div className="rewards-login text-center">

          <div className="reward-login-icon">

            <i className="bi bi-person-circle"></i>

          </div>


          <h2>

            {isLoggedIn

              ? (
                language === 'EN'
                  ? 'Your Reward Points'
                  : 'نقاط المكافآت الخاصة بك'
              )

              : (
                language === 'EN'
                  ? 'Check Your Points'
                  : 'تحقق من نقاطك'
              )

            }

          </h2>


          <p>

            {isLoggedIn

              ? (
                language === 'EN'
                  ? `You currently have ${rewardPoints} reward points available.`
                  : `لديك حالياً ${rewardPoints} نقطة مكافآت متاحة.`
              )

              : (
                language === 'EN'
                  ? 'Log in to view your personal reward points and redeem your rewards.'
                  : 'سجل الدخول لعرض نقاط المكافآت الشخصية واستبدال مكافآتك.'
              )

            }

          </p>


          {isLoggedIn ? (

            <div className="reward-value">

              <i className="bi bi-coin"></i>

              <strong>
                {rewardPoints} Points
              </strong>

            </div>

          ) : (

            <button
              type="button"
              className="rewards-login-btn"
            >

              {language === 'EN'
                ? 'Login to My Account'
                : 'تسجيل الدخول إلى حسابي'}

              <i className="bi bi-arrow-right ms-2"></i>

            </button>

          )}


        </div>


      </div>

    </div>

  )

}


export default Rewards