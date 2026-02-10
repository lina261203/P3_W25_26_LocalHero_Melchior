import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav.jsx";
import "../styles/pages/LocalImpressionsPage.css";
import { User } from "lucide-react";


import imgMathildenhoehe from "../assets/Mathildenhoehe.jpg";
import imgLandesmuseum from "../assets/Landesmuseum.jpg";
import imgWaldspirale from "../assets/Waldspirale.jpg";
import imgLuisenplatz from "../assets/Luisenplatz.jpg";

const ARTICLES = [
  {
    id: "mathildenhoehe",
    tag: "Architektur",
    title: "UNESCO Welterbe Mathildenhöhe Darmstadt",
    author: "Lara Brüher",
    meta: "Jan 21, 2026 · 8 min to read",
    img: imgMathildenhoehe,
  },
  {
    id: "landesmuseum",
    tag: "Museen",
    title: "Ausstellungen im Landesmuseum Darmstadt",
    author: "Pauline Schmand",
    meta: "Jan 22, 2026 · 8 min to read",
    img: imgLandesmuseum,
  },
  {
    id: "waldspirale",
    tag: "Architektur",
    title: "Verrückter Wohnkomplex – die Waldspirale",
    author: "Diego Rollmann",
    meta: "Jan 23, 2026 · 8 min to read",
    img: imgWaldspirale,
  },
  {
    id: "luisenplatz",
    tag: "Marktplatz",
    title: "Was der Luisenplatz in Darmstadt alles zu bieten hat",
    author: "Lea Necker",
    meta: "Jan 24, 2026 · 8 min to read",
    img: imgLuisenplatz,
  },
];

export default function LocalImpressionsPage() {
  const navigate = useNavigate();

  return (
    <div className="impressionsPage">
      <div className="impressionsPhoneFrame">
        <header className="impressionsHeader">
          <h2>Lokale Perspektiven</h2>
        </header>

        <main className="pageContent impressionsMain">
          {ARTICLES.map((a) => (
            <button
              key={a.id}
              className="impressionsItem"
              type="button"
              onClick={() => navigate(`/impressions/${a.id}`)}
            >
              <div className="localCardImgWrap">
                <img className="localCardImg" src={a.img} alt={a.title} />
                <div className="badge">DA staunst du.</div>
              </div>

              <div className="impressionsText">
                <span className="impressionsTag">{a.tag}</span>
                <h3 className="impressionsTitle">{a.title}</h3>

                <div className="impressionsAuthorRow">
                  <div className="avatarDot" aria-hidden="true">
                    <User className="avatarIcon" />
                  </div>
                  <div className="impressionsMeta">
                    <div className="impressionsAuthor">{a.author}</div>
                    <div className="impressionsInfo">{a.meta}</div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
