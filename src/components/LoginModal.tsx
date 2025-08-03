import React, { useEffect } from "react";
import { useState } from "react";
import { message } from "antd";
import type { NoticeType } from "antd/es/message/interface";
import api from "../helpers/axios";
import Modal from "./Modal";
import { isLoggedIn } from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: () => void;
};

const LoginModal: React.FC<Props> = ({isOpen, onClose, onSwitch}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage(); //Componente de ANTD
  const navigate = useNavigate();
  const { login } = useAuth();

  const messagelogin = (typetxt: NoticeType, contentTxt: string, durationTxt: number = 0) => {
    messageApi.open({
      type: typetxt || 'success',
      content: contentTxt,
      duration: durationTxt
    });
  };

  useEffect(() => {
    if(isOpen){
      setEmail('');
      setPassword('');

    }
  }, [isOpen]); 

  const esCorreoValido = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!isLoggedIn){
      return;
    }

    if(!isOpen){
      return;
    }

    if (!email || !password) {
      messagelogin('warning', 'Completa todos los campos', 1);
      return;
    }

    if(!(email.length >= 6 && email.length < 255) || !esCorreoValido(email)){
      messagelogin('warning', 'Correo no válido', 1);
      return;
    }

    if(!(password.length >= 5 && password.length <= 12)){
      messagelogin('warning', 'Contraseña no válida', 1);
      return;
    }

    messagelogin('loading', 'Espere un momento...', 2);
    try {
     const response = await api.post("/login", { email, password });
      const { token, user } = response.data;

      login(token, user);
      messagelogin("success", "Bienvenido", 1);
      navigate('/');
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 401 || status === 422) {
          messagelogin("error", data.message || "Credenciales incorrectas", 2);
        } else {
          messagelogin("error", data.message || "Error desconocido", 2);
        }
      } else {
        messagelogin("error", "No se pudo conectar al servidor", 2);
      }
    };
  }


  return(
    <>
      {contextHolder}
      <Modal 
        titleModal="Iniciar Sesión"
        isOpen={isOpen}
        onClose={onClose}
        onSwitch={onSwitch}
        size="lg"
      >
        <form className="space-y-1" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            minLength={6}
            maxLength={255}
            
            className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-700 text-gray-800 mb-4"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={12}
            minLength={5}
            className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-700 text-gray-800"
          />
          <button type="button" className="text-sm text-gray-500 ms-1 w-full cursor-pointer text-left">
            ¿Te olvidaste la contraseña?
          </button>
          <div className="flex content-center align-center gap-3 mt-8 w-full">
              <button
                type="submit"
                className="w-[50%] bg-teal-600 shadow-md text-white py-2  rounded-lg font-semibold hover:brightness-110 hover:shadow-lg transition cursor-pointer"
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                className="w-[50%] bg-white shadow-md py-2 rounded-lg font-semibold hover:brightness-150 hover:shadow-lg transition cursor-pointer"
              >
                <span>Entrar con Google</span><i className="fa-brands fa-google text-gray-600 ms-2"></i>
              </button>
          </div>
          <div className="flex justify-center text-base mt-6">
            <span className="text-center text-gray-600">¿No tienes cuenta?</span>
            <button className="text-blue-800 ms-2 cursor-pointer" type="button" onClick={onSwitch}>Create una cuenta aquí</button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default LoginModal;