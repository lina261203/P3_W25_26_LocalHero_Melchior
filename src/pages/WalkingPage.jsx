import { useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BottomNav from "../components/BottomNav.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import "../styles/pages/WalkingPage.css";
import DarmstadtLogo from "../assets/DarmstadtLogo.jpg";

// MUI npm package
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";

// NEW: role from context
import { useRole } from "../App.jsx";

export default function WalkingPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { role } = useRole(); // "newbie" | "local"
  const appt = params.get("appt"); // optional

  // --- Popups: role-based ---
  const POPUPS_LOCAL = useMemo(
    () => [
      "Wann merkst du, dass du irgendwo wirklich angekommen bist?",
      "Wer würde eher… den Umweg nehmen?",
      "Würdest du diesen Ort in deinen Alltag integrieren?",
      "Ist das hier ein Ort zum Ankommen – oder zum Weitergehen?",
      "Wofür nutzt man diesen Ort eigentlich? Ist das eher ein Durchgangsort oder ein Ziel?",
      "Was sieht man erst, wenn man länger hier lebt?",
      "Was sind drei Wörter, die diesen Ort beschreiben?",
    ],
    []
  );

  const POPUPS_NEWBIE = useMemo(
    () => [
      "Was fällt dir hier als Erstes auf?",
      "Wenn du diesen Ort jemandem beschreiben müsstest, was würdest du sagen?",
      "Was würdest du hier gern ausprobieren?",
      "Was macht diesen Ort für dich gerade neu?",
      "Welche Frage würdest du einem Local hier stellen?",
    ],
    []
  );

  const popups = role === "newbie" ? POPUPS_NEWBIE : POPUPS_LOCAL;

  // Snackbar state
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState(
    role === "newbie"
      ? "Willkommen beim Walk&Talk – entdecke die Stadt aus neuer Perspektive."
      : "Zeig deinen Spot – erzähl die Geschichte dieses Ortes."
  );

  // damit random nicht direkt das gleiche doppelt kommt
  const lastIndexRef = useRef(-1);

  function endWalk() {
    if (appt) {
      navigate(`/signup?appt=${encodeURIComponent(appt)}`);
    } else {
      navigate("/signup");
    }
  }

  function pickRandomPopup() {
    if (!popups || popups.length === 0) return "…";
    if (popups.length === 1) return popups[0];

    let idx = Math.floor(Math.random() * popups.length);
    if (idx === lastIndexRef.current) {
      idx = (idx + 1) % popups.length;
    }
    lastIndexRef.current = idx;
    return popups[idx];
  }

  function handleLogoClick() {
    setSnackMessage(pickRandomPopup());

    // retrigger auch wenn schon offen
    setSnackOpen(false);
    window.setTimeout(() => setSnackOpen(true), 10);
  }

  function handleSnackClose(event, reason) {
    if (reason === "clickaway") return;
    setSnackOpen(false);
  }

  const snackTitle = "Talking Pebbles";

  return (
    <div className="as">
      <div className="walkingPage">
      <div className="walkingPhoneFrame">
        <header className="walkingHeader">
          <h2>Talking Pebbles</h2>
        </header>

        <main className="walkingMain">
          <div className="walkingLogoWrapper">
            <button className="walkingLogo" type="button" onClick={handleLogoClick}>
              <img
                src={DarmstadtLogo}
                alt="Darmstadt Logo"
                className="walkingLogoImg"
                draggable={false}
              />
            </button>

            <p className="walkingHint">Klicke um Pop-ups zu aktivieren</p>

            {role === "newbie" ? (
              <p className="walkingHint">Du bist gerade als Newbie unterwegs.</p>
            ) : (
              <p className="walkingHint">Du bist gerade als Local unterwegs.</p>
            )}
          </div>
        </main>

        <div className="walkingAction">
          <PrimaryButton onClick={endWalk} variant="primary">
            walk&talk
            <br />
            beenden
          </PrimaryButton>
        </div>

        {/* Snackbar – Card-Style wie im Wireframe */}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackOpen}
          onClose={handleSnackClose}
          autoHideDuration={5500}
          key={snackMessage}
          sx={{ mt: 1.5 }}
        >
          <SnackbarContent
            sx={{
              background: "#fff",
              color: "#111",
              borderRadius: "16px",
              boxShadow: "0 12px 26px rgba(0,0,0,0.16)",
              padding: "14px 16px",
              minWidth: "min(340px, 86vw)",
              maxWidth: "min(420px, 92vw)",
            }}
            message={
              <div style={{ display: "grid", gap: "4px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.2 }}>
                  {snackTitle}
                </div>
                <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", lineHeight: 1.25 }}>
                  {snackMessage}
                </div>
              </div>
            }
          />
        </Snackbar>
      </div>
    </div>
      <BottomNav />
    </div>
  );
}