function StaffFooter({ language }) {

  return (

    <footer className="staff-footer">

      <div className="container text-center">

        <p>
          © 2026 Monarch Bistro
        </p>

        <span>
          {language === 'EN'
            ? 'Staff Portal'
            : 'بوابة الموظفين'}
        </span>

      </div>

    </footer>
  )
}

export default StaffFooter