import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import "../styles/pages/ExperienceSheetPage.css";

import MapImage from "../assets/ExperienceSheet.png";

const ICONS = [
  { id: "pin", label: "📍" },
  { id: "flag", label: "🚩" },
  { id: "music", label: "🎵" },
  { id: "food", label: "🍽️" },
  { id: "tree", label: "🌳" },
  { id: "house", label: "🏠" },
  { id: "tram", label: "🚋" },
  { id: "shop", label: "🏪" },
  { id: "sparkle", label: "✨" },
  { id: "heart", label: "🧡" },
];

export default function ExperienceSheetPage() {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const trayRef = useRef(null);

  const [placed, setPlaced] = useState([]);
  const [selectedIconId, setSelectedIconId] = useState(ICONS[0].id);
  const [isPublic, setIsPublic] = useState(false);

  const iconById = useMemo(() => {
    const m = new Map();
    ICONS.forEach((i) => m.set(i.id, i));
    return m;
  }, []);

  function scrollTray(dir) {
    const el = trayRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 140, behavior: "smooth" });
  }

  function placeAtClientPoint(clientX, clientY) {
    const mapEl = mapRef.current;
    if (!mapEl) return;

    const rect = mapEl.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const xPct = Math.max(0, Math.min(1, x / rect.width));
    const yPct = Math.max(0, Math.min(1, y / rect.height));

    const newId =
      (typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID()) ||
      `${Date.now()}-${Math.random()}`;

    setPlaced((prev) => [...prev, { id: newId, iconId: selectedIconId, xPct, yPct }]);
  }

  function onMapClick(e) {
    placeAtClientPoint(e.clientX, e.clientY);
  }

  function removePlaced(id) {
    setPlaced((prev) => prev.filter((p) => p.id !== id));
  }

  function goToGallery(publicFlag) {
    setIsPublic(publicFlag);
    navigate("/gallery");
  }

  return (
    <div className="sheetPage">
      <div className="sheetPhoneFrame">
        <header className="sheetHeader">
          <h2>Euer walk&amp;talk</h2>
        </header>

        <main className="pageContent sheetMain">
          {/* MAP */}
          <section className="sheetMapCard" ref={mapRef} onClick={onMapClick}>
            <img
              className="sheetMapImg"
              src={MapImage}
              alt="Stadtkarte Darmstadt"
              draggable={false}
            />

            {placed.map((p) => {
              const icon = iconById.get(p.iconId);
              return (
                <button
                  key={p.id}
                  type="button"
                  className="sheetPlacedIcon"
                  style={{ left: `${p.xPct * 100}%`, top: `${p.yPct * 100}%` }}
                  onClick={(ev) => {
                    ev.stopPropagation(); // sonst platziert map-click direkt wieder eins
                    removePlaced(p.id);
                  }}
                  title="Icon entfernen"
                >
                  {icon?.label ?? "?"}
                </button>
              );
            })}
          </section>

          {/* TRAY */}
          <section className="sheetNotesCard">
            <div className="sheetNotesHint">
              Wähle ein Icon aus, dann klicke auf die Karte um es zu platzieren.
            </div>

            <div className="sheetTray">
              <button
                className="sheetTrayArrow"
                type="button"
                onClick={() => scrollTray(-1)}
                aria-label="nach links"
              >
                ‹
              </button>

              <div className="sheetTrayScroller" ref={trayRef}>
                {ICONS.map((i) => {
                  const active = i.id === selectedIconId;
                  return (
                    <button
                      key={i.id}
                      type="button"
                      className={`sheetTrayItem ${active ? "isActive" : ""}`}
                      onClick={() => setSelectedIconId(i.id)}
                      title="Auswählen"
                    >
                      <span className="sheetTrayIcon">{i.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                className="sheetTrayArrow"
                type="button"
                onClick={() => scrollTray(1)}
                aria-label="nach rechts"
              >
                ›
              </button>
            </div>
          </section>

          {/* ACTIONS */}
          <section className="sheetActions">
            <PrimaryButton
              label={"für mich\nspeichern"}
              onClick={() => goToGallery(false)}
            />
            <PrimaryButton
              label={"öffentlich\nteilen"}
              onClick={() => goToGallery(true)}
            />
          </section>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
