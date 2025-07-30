import React, { type ReactNode } from "react";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  titleModal: string;
  size: string;
  onClose: () => void;
  onSwitch: () => void;
  children: ReactNode;
};

const Modal: React.FC<Props>  = ({titleModal, isOpen, onClose, size, onSwitch: _onSwitch, children}: Props) =>  {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(()=>{
    if (isOpen) {
      setVisible(true);
      requestAnimationFrame(() => {
        setAnimating(true); // permite la animación de entrada
      });
    } else {
      setAnimating(false);
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if(!isOpen && !visible) return null;

  return(
    <>
      <div 
      className={`modal-backdrop ${ animating  ? "opacity-100" : "opacity-0 pointer-events-none" }`}>
        <div className={`bg-white rounded-2xl shadow-lg p-8 relative transform transition-all duration-200 w-[80%] max-h-[90vh] overflow-hidden grow ${
          size === 'sm' ? 'max-w-sm' :
          size === 'md' ? 'max-w-md' :
          size === 'lg' ? 'max-w-lg' :
          size === 'xl' ? 'max-w-3xl' :
          'max-w-xl'  
        } ${ animating  ? "scale-100 translate-y-0" : "scale-95 translate-y-2" }`}>
          <button
            className="modal-btn-close"
            onClick={onClose}
          >
            &times;
          </button>
          <h2 className="modal-title">
            {titleModal}
          </h2>
          <div className="max-h-[80vh] overflow-y-auto px-6 py-4">
            { children }
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;