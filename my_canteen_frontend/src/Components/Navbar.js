import './Navbar.css';

const Navbar = ({ role, userName }) => {
    return (
      <div className="navbar">
        <div>
          <h2>
            {role === "admin" ? "Admin" : "Customer"} Dashboard - Welcome {userName}
          </h2>
        </div>
      </div>
    );
};

export default Navbar;

  
  