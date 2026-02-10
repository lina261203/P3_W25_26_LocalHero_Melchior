// Wiederverwendbare Card (Container für Inhalte)
import "../styles/components/Card.css";

export default function Card({ title, children, onClick, className = "" }) {
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      className={`card ${onClick ? "card--clickable" : ""} ${className}`}
      onClick={onClick}
      type={onClick ? "button" : undefined}
    >
      {title && <h3 className="card__title">{title}</h3>}
      {children}
    </Tag>
  );
}
