import React from "react";
import PropTypes from "prop-types";
import "./Toast.css";

/**
 * Componente per mostrare notifiche temporanee (toast).
 * È progettato per essere usato con un sistema di gestione delle notifiche,
 * come un ToastProvider.
 */
const Toast = ({
  children,
  variant = "info",
  onClose,
  className = "",
  ...rest
}) => {
  const classNames = ["toast", `toast-${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} role="alert" {...rest}>
      <div className="toast-content">{children}</div>
      <button
        type="button"
        className="toast-close-button"
        aria-label="Close"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
};

Toast.propTypes = {
  /** Il contenuto del toast. */
  children: PropTypes.node.isRequired,
  /** Lo stile visivo del toast. */
  variant: PropTypes.oneOf(["success", "danger", "warning", "info"]),
  /** Funzione da chiamare quando il toast viene chiuso. */
  onClose: PropTypes.func.isRequired,
  /** Classi CSS aggiuntive. */
  className: PropTypes.string,
};

export default Toast;
