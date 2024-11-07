import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-md'
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-xl w-full mx-4 ${maxWidth}`} style={{ maxHeight: 'calc(100% - 4rem)', overflowY: 'auto' }}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              {title && <h2 className="text-2xl font-bold text-gray-800">{title}</h2>}
              {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-6">{children}</div>
      </div>
    </div>
  );
}
