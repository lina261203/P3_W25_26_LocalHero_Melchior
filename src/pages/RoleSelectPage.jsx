import { useNavigate } from "react-router-dom";
import "../styles/pages/RoleSelectPage.css";

// Role aus Context
import { useRole } from "../App.jsx";

export default function RoleSelectPage() {
  const navigate = useNavigate();
  const { setRole } = useRole();

  function pick(nextRole) {
    setRole(nextRole);    
    navigate("/signup");   
  }

  return (
    <div className="roleSelect">
      <button
        type="button"
        className="roleHalf roleHalf--newbie"
        onClick={() => pick("newbie")}
      >
        <span className="roleHalf__label ">NEWBIE</span>
      </button>

      <div className="roleHint">
        <div className="roleHint__box">
          Klicke auf das für<br />
          dich zutreffende
        </div>
      </div>

      <button
        type="button"
        className="roleHalf roleHalf--local"
        onClick={() => pick("local")}
      >
        <span className="roleHalf__label local">LOCAL</span>
      </button>

    </div>
  );
}
