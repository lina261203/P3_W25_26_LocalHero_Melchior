import "../styles/components/PrimaryButton.css";

export default function PrimaryButton({
  label,
  children,
  onClick,
  disabled = false,
  variant = "primary",
}) {
  return (
    <button
      className={`primaryButton ${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children ?? label}
    </button>
  );
}
