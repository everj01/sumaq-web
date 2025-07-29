import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useModal = () => {
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => {setIsOpen(false); navigate(-1);};
  const toggle = () => setIsOpen(prev => !prev);

  return {isOpen, open, close, toggle};
}