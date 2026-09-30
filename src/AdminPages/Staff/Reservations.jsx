// Remove this:
// import { useNavigate } from 'react-router-dom'

import StaffNavbar from './StaffNavbar'
import StaffFooter from './StaffFooter'

function StaffReservations({ language, setLanguage }) {

  // Stores reservations
  const reservations = []

  return (

    <>

      {/* Staff Navbar */}

      <StaffNavbar
        language={language}
        setLanguage={setLanguage}
      />


      <div className="staff-reservations-page">

        <div className="container">


          {/* ================= PAGE HEADING ================= */}

          <div className="staff-reservations-heading text-center">

            <span className="staff-subtitle">

              {language === 'EN'
                ? 'STAFF PORTAL'
                : 'بوابة الموظفين'}

            </span>


            <h1>

              {language === 'EN'
                ? 'Reservations'
                : 'الحجوزات'}

            </h1>


            <p>

              {language === 'EN'
                ? 'View and manage customer table reservations.'
                : 'عرض وإدارة حجوزات طاولات العملاء.'}

            </p>

          </div>


          {/* ================= RESERVATIONS TABLE ================= */}

          <div className="staff-reservations-items">


            {/* Table Heading */}

            <div className="d-flex justify-content-between align-items-center mb-4">

              <h2 className="mb-0">

                {language === 'EN'
                  ? 'Current Reservations'
                  : 'الحجوزات الحالية'}

              </h2>


              <span className="staff-reservation-count">

                {reservations.length}{' '}

                {language === 'EN'
                  ? reservations.length === 1
                    ? 'Reservation'
                    : 'Reservations'
                  : 'حجوزات'}

              </span>

            </div>


            {/* ================= TABLE ================= */}

            <div className="table-responsive">

              <table className="staff-reservations-table">

                {/* ================= TABLE HEAD ================= */}

                <thead>

                  <tr>

                    <th>
                      {language === 'EN'
                        ? 'Reservation ID'
                        : 'رقم الحجز'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Customer Name'
                        : 'اسم العميل'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Phone'
                        : 'الهاتف'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Table'
                        : 'الطاولة'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Date'
                        : 'التاريخ'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Time'
                        : 'الوقت'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Guests'
                        : 'الضيوف'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Status'
                        : 'الحالة'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Actions'
                        : 'الإجراءات'}
                    </th>

                  </tr>

                </thead>


                {/* ================= TABLE BODY ================= */}

                <tbody>

                  {reservations.length === 0 ? (

                    <tr>

                      <td
                        colSpan="9"
                        className="text-center"
                      >

                        <div className="staff-reservations-empty">

                          <div className="staff-reservation-icon">

                            <i className="bi bi-calendar-check"></i>

                          </div>


                          <h3>

                            {language === 'EN'
                              ? 'No Reservations Yet'
                              : 'لا توجد حجوزات بعد'}

                          </h3>


                          <p>

                            {language === 'EN'
                              ? 'Reservation records will appear here when the database is connected.'
                              : 'ستظهر سجلات الحجوزات هنا عند ربط قاعدة البيانات.'}

                          </p>

                        </div>

                      </td>

                    </tr>

                  ) : (

                    reservations.map((reservation, index) => (

                      <tr key={index}>


                        {/* Reservation ID */}

                        <td>
                          {reservation.id}
                        </td>


                        {/* Customer Name */}

                        <td>

                          <strong>
                            {reservation.customerName}
                          </strong>

                        </td>


                        {/* Phone */}

                        <td>
                          {reservation.phone}
                        </td>


                        {/* Table */}

                        <td>
                          {reservation.table}
                        </td>


                        {/* Date */}

                        <td>
                          {reservation.date}
                        </td>


                        {/* Time */}

                        <td>
                          {reservation.time}
                        </td>


                        {/* Guests */}

                        <td>
                          {reservation.guests}
                        </td>


                        {/* Status */}

                        <td>

                          <span
                            className={
                              reservation.status === 'Confirmed'
                                ? 'staff-reservation-confirmed'
                                : 'staff-reservation-pending'
                            }
                          >

                            {reservation.status}

                          </span>

                        </td>


                        {/* Actions */}

                        <td>

                          {/* Confirm */}

                          <button
                            type="button"
                            className="staff-reservation-confirm-btn me-1"
                            title={
                              language === 'EN'
                                ? 'Confirm Reservation'
                                : 'تأكيد الحجز'
                            }
                          >

                            <i className="bi bi-check-lg"></i>

                          </button>


                          {/* Cancel */}

                          <button
                            type="button"
                            className="staff-reservation-cancel-btn"
                            title={
                              language === 'EN'
                                ? 'Cancel Reservation'
                                : 'إلغاء الحجز'
                            }
                          >

                            <i className="bi bi-x-lg"></i>

                          </button>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>


          {/* ================= BACK BUTTON ================= */}

          <div className="text-center staff-reservations-back">

            <button
              type="button"
              className="staff-back-btn"
            >

              <i className="bi bi-arrow-left me-2"></i>

              {language === 'EN'
                ? 'Back to Dashboard'
                : 'العودة إلى لوحة التحكم'}

            </button>

          </div>


        </div>

      </div>


      {/* Staff Footer */}

      <StaffFooter language={language} />

    </>

  )

}

export default StaffReservations