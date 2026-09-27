import { useState } from 'react'

function CustomerFeedback({ language }) {

  // Stores the selected star rating
  const [rating, setRating] = useState(0)

  // Stores the selected experience
  const [experience, setExperience] = useState('')

  // Stores whether the form has been submitted
  const [submitted, setSubmitted] = useState(false)

  // Handles feedback form submission
  function handleSubmit(event) {
    event.preventDefault()

    if (rating === 0 || experience === '') {
      alert(
        language === 'EN'
          ? 'Please select a star rating and your overall experience.'
          : 'يرجى اختيار تقييم بالنجوم وتحديد تجربتك بشكل عام.'
      )

      return
    }

    setSubmitted(true)
  }

  return (

    <>

      {/* Main feedback section */}
      <div className="feedback-page">

        {/* Bootstrap container */}
        <div className="container">

          {/* Feedback heading */}
          <div className="feedback-heading text-center">

            <span className="feedback-subtitle">
              {language === 'EN'
                ? 'YOUR VOICE MATTERS'
                : 'رأيك يهمنا'}
            </span>

            <h1>
              {language === 'EN'
                ? 'We’d Love to Hear From You'
                : 'يسعدنا سماع رأيك'}
            </h1>

            <p>
              {language === 'EN'
                ? 'Tell us about your experience .'
                : 'أخبرنا عن تجربتك.'}
            </p>

          </div>

          {/* Feedback layout */}
          <div className="row justify-content-center">

            {/* Left side - Experience card */}
            <div className="col-lg-4 mb-4">

              <div className="feedback-welcome h-100">

                <div className="feedback-icon">
                  <i className="bi bi-chat-heart"></i>
                </div>

                <h3>
                  {language === 'EN'
                    ? 'Every Detail Matters'
                    : 'كل التفاصيل مهمة'}
                </h3>

                <p>
                  {language === 'EN'
                    ? 'From your first sip to your last bite, your feedback helps us make every visit special.'
                    : 'من أول رشفة إلى آخر لقمة، يساعدنا رأيك في جعل كل زيارة مميزة.'}
                </p>

                <hr />

                {/* Better food */}
                <div className="feedback-benefit">
                  <i className="bi bi-cup-hot"></i>

                  <span>
                    {language === 'EN'
                      ? 'Better food and drinks'
                      : 'طعام ومشروبات أفضل'}
                  </span>
                </div>

                {/* Better service */}
                <div className="feedback-benefit">
                  <i className="bi bi-heart"></i>

                  <span>
                    {language === 'EN'
                      ? 'Better customer service'
                      : 'خدمة عملاء أفضل'}
                  </span>
                </div>

                {/* Better experience */}
                <div className="feedback-benefit">
                  <i className="bi bi-stars"></i>

                  <span>
                    {language === 'EN'
                      ? 'A better dining experience'
                      : 'تجربة طعام أفضل'}
                  </span>
                </div>

                {/* Quote */}
                <div className="feedback-quote">
                  {language === 'EN'
                    ? '“Your experience inspires us to do better.”'
                    : '"تجربتك تلهمنا لنكون أفضل."'}
                </div>

              </div>

            </div>


            {/* Right side - Feedback form */}
            <div className="col-lg-7 mb-4">

              <div className="card feedback-card shadow">

                {submitted ? (

                  /* Thank-you message */
                  <div className="feedback-success text-center">

                    <i className="bi bi-check-circle-fill"></i>

                    <h2>
                      {language === 'EN'
                        ? 'Thank You!'
                        : 'شكراً لك!'}
                    </h2>

                    <p>
                      {language === 'EN'
                        ? 'We appreciate you taking the time to share your experience with us.'
                        : 'نقدّر وقتك ومشاركتك تجربتك معنا.'}
                    </p>

                    <button
                      type="button"
                      className="btn feedback-submit-btn"
                      onClick={() => {
                        setSubmitted(false)
                        setRating(0)
                        setExperience('')
                      }}
                    >
                      {language === 'EN'
                        ? 'Submit Another Feedback'
                        : 'إرسال تقييم آخر'}
                    </button>

                  </div>

                ) : (

                  <form onSubmit={handleSubmit}>

                    {/* Form heading */}
                    <h3 className="feedback-form-title">
                      {language === 'EN'
                        ? 'Share Your Experience'
                        : 'شاركنا تجربتك'}
                    </h3>

                    <p className="feedback-required-note">
                      {language === 'EN'
                        ? 'Fields marked * are required.'
                        : 'الحقول التي تحمل * مطلوبة.'}
                    </p>


                    {/* Name and phone */}
                    <div className="row">

                      {/* Name */}
                      <div className="col-md-6 mb-3">

                        <label className="form-label">
                          {language === 'EN'
                            ? 'Your Name *'
                            : 'اسمك *'}
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder={
                            language === 'EN'
                              ? 'Enter your name'
                              : 'أدخل اسمك'
                          }
                          required
                        />

                      </div>


                      {/* Phone */}
                      <div className="col-md-6 mb-3">

                        <label className="form-label">
                          {language === 'EN'
                            ? 'Phone Number'
                            : 'رقم الهاتف'}
                        </label>

                        <input
                          type="tel"
                          className="form-control"
                          placeholder={
                            language === 'EN'
                              ? 'Enter phone number'
                              : 'أدخل رقم الهاتف'
                          }
                        />

                      </div>

                    </div>


                    {/* Feedback category */}
                    <div className="mb-4">

                      <label className="form-label">
                        {language === 'EN'
                          ? 'Feedback Category *'
                          : 'فئة التقييم *'}
                      </label>

                      <select
                        className="form-select"
                        defaultValue=""
                        required
                      >

                        <option value="" disabled>
                          {language === 'EN'
                            ? 'Choose a category'
                            : 'اختر الفئة'}
                        </option>

                        <option value="food">
                          {language === 'EN'
                            ? 'Food & Drinks'
                            : 'الطعام والمشروبات'}
                        </option>

                        <option value="service">
                          {language === 'EN'
                            ? 'Customer Service'
                            : 'خدمة العملاء'}
                        </option>

                        <option value="staff">
                          {language === 'EN'
                            ? 'Staff'
                            : 'الموظفون'}
                        </option>

                        <option value="ambience">
                          {language === 'EN'
                            ? 'Ambience'
                            : 'الأجواء'}
                        </option>

                        <option value="other">
                          {language === 'EN'
                            ? 'Other'
                            : 'أخرى'}
                        </option>

                      </select>

                    </div>


                    {/* Star rating */}
                    <div className="mb-4">

                      <label className="form-label">
                        {language === 'EN'
                          ? 'Rate Your Visit *'
                          : 'قيّم زيارتك *'}
                      </label>

                      <div className="feedback-stars">

                        {[1, 2, 3, 4, 5].map((star) => (

                          <button
                            key={star}
                            type="button"
                            className={
                              star <= rating
                                ? 'star-btn selected'
                                : 'star-btn'
                            }
                            onClick={() => setRating(star)}
                            aria-label={`${star} stars`}
                          >
                            ★
                          </button>

                        ))}

                      </div>

                      {/* Rating text */}
                      <div className="rating-caption">

                        {rating === 0
                          ? (
                            language === 'EN'
                              ? 'Select a rating'
                              : 'اختر التقييم'
                          )
                          : rating === 1
                            ? (
                              language === 'EN'
                                ? 'Poor'
                                : 'سيئ'
                            )
                            : rating === 2
                              ? (
                                language === 'EN'
                                  ? 'Fair'
                                  : 'مقبول'
                              )
                              : rating === 3
                                ? (
                                  language === 'EN'
                                    ? 'Good'
                                    : 'جيد'
                                )
                                : rating === 4
                                  ? (
                                    language === 'EN'
                                      ? 'Very Good'
                                      : 'جيد جداً'
                                  )
                                  : (
                                    language === 'EN'
                                      ? 'Excellent!'
                                      : 'ممتاز!'
                                  )}

                      </div>

                    </div>


                    {/* Overall experience */}
                    <div className="mb-4">

                      <label className="form-label">
                        {language === 'EN'
                          ? 'Overall Experience *'
                          : 'تجربتك بشكل عام *'}
                      </label>

                      <div className="experience-options">

                        {[
                          {
                            value: 'excellent',
                            emoji: '😍',
                            en: 'Excellent',
                            ar: 'ممتازة'
                          },
                          {
                            value: 'good',
                            emoji: '🙂',
                            en: 'Good',
                            ar: 'جيدة'
                          },
                          {
                            value: 'average',
                            emoji: '😐',
                            en: 'Average',
                            ar: 'متوسطة'
                          },
                          {
                            value: 'poor',
                            emoji: '🙁',
                            en: 'Poor',
                            ar: 'سيئة'
                          }
                        ].map((option) => (

                          <button
                            key={option.value}
                            type="button"
                            className={
                              experience === option.value
                                ? 'experience-btn active'
                                : 'experience-btn'
                            }
                            onClick={() => setExperience(option.value)}
                          >

                            <span>
                              {option.emoji}
                            </span>

                            <small>
                              {language === 'EN'
                                ? option.en
                                : option.ar}
                            </small>

                          </button>

                        ))}

                      </div>

                    </div>


                    {/* Feedback message */}
                    <div className="mb-4">

                      <label className="form-label">
                        {language === 'EN'
                          ? 'Your Feedback *'
                          : 'ملاحظاتك *'}
                      </label>

                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder={
                          language === 'EN'
                            ? 'Tell us what you liked or what we can improve...'
                            : 'أخبرنا بما أعجبك أو بما يمكننا تحسينه...'
                        }
                        required
                        minLength="5"
                      />

                    </div>


                    {/* Optional photo upload */}
                    <div className="mb-4">

                      <label className="form-label">
                        {language === 'EN'
                          ? 'Attach a Photo (Optional)'
                          : 'إرفاق صورة (اختياري)'}
                      </label>

                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                      />

                    </div>


                    {/* Privacy note */}
                    <p className="feedback-privacy">

                      <i className="bi bi-shield-lock"></i>

                      {language === 'EN'
                        ? 'Your feedback helps us improve your experience.'
                        : 'تساعدنا ملاحظاتك في تحسين تجربتك.'}

                    </p>


                    {/* Submit button */}
                    <div className="d-grid">

                      <button
                        type="submit"
                        className="btn feedback-submit-btn"
                      >

                        {language === 'EN'
                          ? 'Submit Feedback'
                          : 'إرسال التقييم'}

                        <i className="bi bi-arrow-right ms-2"></i>

                      </button>

                    </div>

                  </form>

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </>

  )
}

export default CustomerFeedback