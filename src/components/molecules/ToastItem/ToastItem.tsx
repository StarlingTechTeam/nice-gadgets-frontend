import { useCallback, useEffect, useState } from 'react';
import { useToast, type Toast } from '@hooks/useToast';
import './ToastItem.scss';

interface ToastItemProps {
  toast: Toast;
}

const ToastItem = ({ toast }: ToastItemProps) => {
  const { removeToast } = useToast();
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      removeToast(toast.id);
    }, 300);
  }, [toast.id, removeToast]);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.duration, toast.id, handleClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return 'ℹ';
    }
  };

  return (
    <div
      className={`toast toast--${toast.type} ${isExiting ? 'toast--exiting' : ''}`}
      role="alert"
    >
      <div className="toast__icon">{getIcon()}</div>

      <div className="toast__content">
        <p className="toast__message">{toast.message}</p>

        {toast.action && (
          <button
            className="toast__action"
            onClick={() => {
              toast.action?.onClick();
              handleClose();
            }}
          >
            {toast.action.label}
          </button>
        )}
      </div>

      <button
        className="toast__close"
        onClick={handleClose}
        aria-label="Close notification"
      >
        <span>X</span>
      </button>
    </div>
  );
};

export default ToastItem;
