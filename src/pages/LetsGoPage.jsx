import { useSearchParams, useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton.jsx";
import "../styles/pages/LetsGoPage.css";

import { useRole } from "../App.jsx";

export default function LetsGoPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const { role } = useRole();
  const appt = params.get("appt");

  console.log("LETSGO role =", role, "url =", window.location.href);

  function goNext() {
    if (!role) return;

  
    if (appt) {
      navigate(`/walking?appt=${encodeURIComponent(appt)}`);
    } else {
      navigate("/walking");
    }
  }

  const isLocal = role === "local";

  return (
    <div className={`letsGoPage ${isLocal ? "isLocal" : "isNewbie"}`}>
      <div className="letsGoScreen">
        <h1 className="letsGoTitle">
          LOS<br />
          GEHT&apos;S
        </h1>

        <p className="letsGoSubtitle">
          {isLocal ? "Suche dir einen Newbie!" : "Suche dir einen Local!"}
          <br />
          {isLocal
            ? "Sein Homescreen erscheint hellblau"
            : "Sein Homescreen erscheint dunkelblau"}
        </p>

        <div className="letsGoCta">
          <PrimaryButton
            variant="walk"
            label={"Klicke um walk&talk\nzu starten"}
            onClick={goNext}
          />
        </div>
      </div>
    </div>
  );
}
