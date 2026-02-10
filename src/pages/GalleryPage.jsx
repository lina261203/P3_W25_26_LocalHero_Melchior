import BottomNav from "../components/BottomNav.jsx";
import "../styles/pages/GalleryPage.css";

const items = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  locked: i < 2,
  label: "DA staunst du.",
}));

export default function GalleryPage() {
  return (
    <div className="galleryPage">
      <div className="galleryCard">
        <h1 className="galleryTitle">Galerie</h1>

        <div className="galleryGrid">
          {items.map((it) => (
            <button
              key={it.id}
              className={`galleryTile ${it.locked ? "isLocked" : ""}`}
              type="button"
            >
              {it.locked && <span className="lockBadge" aria-hidden>🔒</span>}
              <span className="tileFooter">{it.label}</span>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
