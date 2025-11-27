import { useToast } from '@hooks/useToast';
import './ToastContainer.scss';
import ToastItem from '@molecules/ToastItem';

const ToastContainer = () => {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
