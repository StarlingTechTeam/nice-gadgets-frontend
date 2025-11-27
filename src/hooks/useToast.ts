import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  addToast: (toast) => {
    const id = `${Date.now()}-${Math.random()}`;
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 3000,
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, newToast.duration);
    }
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),

  clearAll: () => set({ toasts: [] }),
}));

export const useToast = () => {
  const { toasts, addToast, removeToast, clearAll } = useToastStore();

  const showToast = (toast: Omit<Toast, 'id'>) => {
    addToast(toast);
  };

  const success = (message: string, action?: Toast['action']) => {
    addToast({ type: 'success', message, action });
  };

  const error = (message: string, action?: Toast['action']) => {
    addToast({ type: 'error', message, action });
  };

  const warning = (message: string, action?: Toast['action']) => {
    addToast({ type: 'warning', message, action });
  };

  const info = (message: string, action?: Toast['action']) => {
    addToast({ type: 'info', message, action });
  };

  return {
    toasts,
    showToast,
    success,
    error,
    warning,
    info,
    removeToast,
    clearAll,
  };
};
