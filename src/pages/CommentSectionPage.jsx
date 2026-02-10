import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BottomNav from "../components/BottomNav.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import "../styles/pages/CommentSectionPage.css";
import { User } from "lucide-react";


const ARTICLES = {
  weltkulturerbe: {
    title: "Lokale Perspektiven",
    heading: "Was ich mit der Mathildenhöhe verbinde",
    body: "Die Mathildenhöhe fühlt sich für mich jedes Mal ein bisschen wie ein Abstand zum Alltag an. Obwohl sie mitten in Darmstadt liegt, ist sie ruhiger, offener und irgendwie entschleunigt. Man kommt her, um zu spazieren, den Blick schweifen zu lassen oder einfach kurz rauszukommen ohne wirklich „wohin“ zu müssen. Was ich an der Mathildenhöhe mag, ist diese besondere Atmosphäre zwischen Geschichte und Weite. Die Gebäude erzählen viel über die Stadt, ohne sich aufzudrängen, und die Aussicht macht es leicht, kurz stehen zu bleiben. Für mich ist das ein Ort, an dem Gespräche automatisch ruhiger werden und man sich Zeit nimmt für die Umgebung, aber auch füreinander. Als Local ist die Mathildenhöhe kein Ort für jeden Tag, aber einer, zu dem man gerne zurückkommt, wenn man Abstand braucht oder Darmstadt einmal aus einer anderen Perspektive sehen möchte."
  },

  landesmuseum: {
    title: "Lokale Perspektiven",
    heading: "Für die Kunst-Liebhaber",
    body: "Das Landesmuseum gehört für mich zu den Orten in Darmstadt, die man leicht unterschätzt. Von außen wirkt es eher ruhig und zurückhaltend, fast ein bisschen unscheinbar. Gerade als Local geht man oft daran vorbei, ohne reinzugehen bis man es dann doch tut und merkt, wie vielseitig dieser Ort eigentlich ist. Besonders in Erinnerung geblieben ist mir eine Ausstellung, die sich mit Naturkunde und Artenvielfalt beschäftigt hat. Viele wissen gar nicht, dass das Landesmuseum eine der bedeutendsten naturkundlichen Sammlungen in Hessen besitzt. Zwischen Präparaten, Skeletten und interaktiven Stationen wurde deutlich, wie eng Wissenschaft, Geschichte und Gegenwart hier zusammenkommen. Es war eine Ausstellung, die nicht nur informiert hat, sondern auch zum Nachdenken angeregt hat über Umwelt, Verantwortung und den eigenen Blick auf Natur. Was ich am Landesmuseum schätze, ist genau diese Mischung: Es ist kein lautes Museum, kein Ort, den man schnell „abhakt“. Man kann sich Zeit lassen, immer wieder Neues entdecken und auch beim zweiten oder dritten Besuch andere Schwerpunkte setzen. Für mich ist es ein Ort, der zeigt, dass Darmstadt nicht nur technisch und modern ist, sondern auch kulturell und wissenschaftlich tief verwurzelt.",
  },
  hundertwasser: {
    title: "Lokale Perspektiven",
    heading: "Architektur-Fans aufgepasst",
    body: "Die Waldspirale ist einer dieser Orte, an denen ich immer merke, wie ungewöhnlich Darmstadt eigentlich ist. Als Local läuft man irgendwann fast selbstverständlich daran vorbei, aber jedes Mal, wenn ich stehen bleibe, entdecke ich etwas Neues. Kein Fenster gleicht dem anderen, nichts verläuft wirklich gerade, und genau das macht den Ort so spannend. Viele wissen, dass die Waldspirale von Friedensreich Hundertwasser entworfen wurde, aber erst vor Ort versteht man, was das bedeutet. Das Gebäude wirkt weniger wie ein Wohnhaus und mehr wie eine Landschaft: begrünte Dächer, organische Formen, Farben, die sich verändern, je nachdem, wie das Licht gerade fällt. Es ist Architektur, die sich bewusst gegen Ordnung und Gleichförmigkeit stellt. Was ich an der Waldspirale besonders mag, ist, dass sie kein klassisches Ausflugsziel ist. Menschen wohnen hier, gehen ihrem Alltag nach, während andere stehen bleiben, fotografieren oder einfach schauen. Für mich ist sie ein Ort, an dem Stadt, Kunst und Leben direkt aufeinandertreffen und an dem man merkt, dass Darmstadt Raum für Eigenwilligkeit lässt.",
  },
  luisenplatz: {
    title: "Lokale Perspektiven",
    heading: "Meine Eindrücke zum Luisenplatz",
    body: "Der Luisenplatz ist für mich kein klassischer Ort zum Verweilen, sondern eher ein Knotenpunkt des Alltags. Hier kreuzen sich Wege, Termine und Geschichten. Man kommt an, steigt um, verabredet sich „am Luli“ und ist meistens schneller wieder weg, als man geplant hat. Genau das macht ihn aber auch so besonders. Was ich am Luisenplatz mag, ist diese ständige Bewegung. Straßenbahnen kommen und gehen, Menschen aus ganz unterschiedlichen Richtungen treffen hier kurz aufeinander. Studierende, Berufstätige, Menschen auf dem Weg zum Einkaufen oder einfach nur durch die Stadt. Wenn man genauer hinschaut, merkt man, wie sehr dieser Ort das Tempo von Darmstadt widerspiegelt: nicht ganz hektisch, aber immer in Bewegung. Gleichzeitig ist der Luisenplatz mehr als nur ein Verkehrsknotenpunkt. Rundherum gibt es Cafés, kleine Läden und Ecken, die man oft erst wahrnimmt, wenn man sich bewusst Zeit nimmt. Setzt man sich kurz hin oder bleibt stehen, verändert sich der Blick: Man beobachtet, hört Gesprächsfetzen, sieht bekannte Gesichter. Für mich ist das ein Ort, an dem Stadtleben sehr direkt spürbar wird. Als Local verbinde ich mit dem Luisenplatz weniger Sehenswürdigkeiten als Routinen. Treffpunkte, Abkürzungen, Wartemomente. Und vielleicht gerade deshalb ist er ein guter Ort, um anzukommen nicht, weil er erklärt wird, sondern weil man ihn erlebt.",
  },
};

const SEED_COMMENTS = [
  {
    id: "c1",
    name: "Max Lochmann",
    date: "Nov 22, 2025",
    text: "Das klingt sehr cool, wie so der Dreh und Angelpunkt von Darmstadt",
  },
  {
    id: "c2",
    name: "Lara Brüher",
    date: "Jan 15, 2026",
    text: "Ich bin großer Fan von Zimtschnecken, gibt'ts die da irgendwo?",
  },
  {
    id: "c3",
    name: "Neo Seelig",
    date: "Feb 12, 2026",
    text: "Wow voll schön, da muss ich auch mal hin :)",
  },
];

function makeId() {
  return (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`);
}

export default function CommentSectionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const article = ARTICLES[id] ?? ARTICLES.weltkulturerbe;

  const [comments, setComments] = useState(() => SEED_COMMENTS);
  const [draft, setDraft] = useState("");

  const canSend = draft.trim().length > 0;

  function send() {
    if (!canSend) return;

    const text = draft.trim();
    setComments((prev) => [
      ...prev,
      { id: makeId(), name: "Du", date: "Heute", text },
    ]);
    setDraft("");
  }

  const placeholder = useMemo(() => "teile deine Gedanken…", []);

  return (
    <div className="commentPage">
      <div className="commentPhoneFrame">
        <header className="commentHeader">
          <button
            className="commentBack"
            type="button"
            onClick={() => navigate("/impressions")}
          >
            ←
          </button>

          <h2>{article.title}</h2>

          <div className="commentHeaderSpacer" />
        </header>

        <main className="pageContent sectionMain">
          <section className="commentArticleCard">
            <h3>{article.heading}</h3>
            <p>{article.body}</p>
          </section>

          <section className="commentList">
            {comments.map((c) => (
              <div className="commentItem" key={c.id}>
                <div className="avatarDot" aria-hidden="true">
                  <User className="avatarIcon" />
                </div>

                <div className="commentBubble">
                  <div className="commentTop">
                    <span className="commentName">{c.name}</span>
                    <span className="commentDate">{c.date}</span>
                  </div>
                  <div className="commentText">{c.text}</div>
                </div>
              </div>
            ))}
          </section>
        </main>

        <section className="commentComposer">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                send();
              }
            }}
          />

          <PrimaryButton variant="commentSend" label="Senden" onClick={send} disabled={!canSend} />
        </section>

        <BottomNav />
      </div>
    </div>
  );
}
