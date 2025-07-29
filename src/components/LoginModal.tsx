import React, { useEffect } from "react";
import { useState } from "react";
import { message } from "antd";
import type { NoticeType } from "antd/es/message/interface";
import api from "../helpers/axios";
import Modal from "./Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: () => void;
};

const LoginModal: React.FC<Props> = ({isOpen, onClose, onSwitch}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage(); //Componente de ANTD

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    return;
    if (!email || !password) {
      messagelogin('warning', 'Completa todos los campos', 1);
      return;
    }
    messagelogin('loading', 'Espere un momento...');
    try {
      const response = await api.post("/login", {
        email,
        password
      });

      const token = response.data.token;

      localStorage.setItem('token', token);
      messagelogin('success', 'Bienvenido', 1);
    } catch (error: any) {
      messagelogin('error', 'Credenciales incorrectas', 1);
      console.log(error);
    }
  };

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
            className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-700 text-gray-800 mb-4"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            <button className="text-blue-800 ms-2 cursor-pointer" onClick={onSwitch}>Create una cuenta aquí</button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default LoginModal;