import React, { useEffect } from "react";
import Modal from "./Modal";
import dayjs from 'dayjs';
import { Button, DatePicker, Form, Input, message, Upload, Radio  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { isLoggedIn } from "../helpers/auth";
import api from "../helpers/axios";
import type { NoticeType } from "antd/es/message/interface";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: () => void;
};

type RegisterFormValues = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  dateBirthday: dayjs.Dayjs;
  address?: string;
  gender: 1 | 2;
  telefono?: string;
};


const { Dragger } = Upload;

const RegisterModal: React.FC<Props> = ({isOpen, onClose, onSwitch}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if(isOpen){
      form.resetFields();
    }
  }, [isOpen]); 

  const messagelogin = (typetxt: NoticeType, contentTxt: string, durationTxt: number = 0) => {
    messageApi.open({
      type: typetxt || 'success',
      content: contentTxt,
      duration: durationTxt
    });
  };

  function createRegisterFormData(values: RegisterFormValues, fileList: any[]): FormData {
    const formData = new FormData();

    // Campos directos
    const fields: (keyof RegisterFormValues)[] = [
      'name',
      'lastname',
      'email',
      'password',
      'address',
      'gender',
      'telefono'
    ];

    fields.forEach((key) => {
      if (values[key]) {
        formData.append(key, String(values[key]));
      }
    });

    // Fecha de nacimiento (formato ISO)
    if (values.dateBirthday) {
      formData.append('dateBirthday', values.dateBirthday.toISOString());
    }

    // Imagen (campo 'photo')
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('photo', fileList[0].originFileObj);
    }

    return formData;
  }
  

  const onFinish = async (values: RegisterFormValues & { photo?: { fileList: any[] } }) => {
    if (!isLoggedIn || !isOpen) return;

    const fileList = values.photo?.fileList || [];

    messagelogin('loading', 'Espere un momento...', 2);

    try {
      const formData = createRegisterFormData(values, fileList);

      const response = await api.post("/register-user", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);
      messagelogin("success", "Registro exitoso", 1);
      onClose();
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
    }
  };

  return(
    <>
    {contextHolder}
      <Modal 
      titleModal="Bienvenido(a) a esta gran comunidad"
      isOpen={isOpen}
      onClose={onClose}
      onSwitch={onSwitch}
      size="xl"
      >
        <div className="w-full">
          <div className="flex flex-col items-center justify-center gap-5 mb-5">
            <button
              type="button"
              className="w-[60%] bg-gray-500 text-white shadow-md py-2 rounded-lg font-semibold 
              hover:-translate-y-1 hover:shadow-lg transition cursor-pointer"
            >
            <span>Registrate con Google</span><i className="fa-brands fa-google text-white ms-2"></i>
            </button>
            <div className="flex gap-3 items-center justify-center align-middle">
              <hr className="w-[150px] border-gray-300 mt-1"/>
              <span className="text-gray-400 my-3 text-sm">o completar el formulario</span> 
              <hr className="w-[150px] mt-1 border-gray-300" />
            </div>
          </div>
          <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-2"
        >
            
            <Form.Item 
            label="Nombres" 
            name="name"
            className="col-span-2 lg:col-span-1"
            rules={[
              { required: true, message: 'Por favor ingresa tus nombres' },
            ]}>
              <Input placeholder="Coloque sus nombres" maxLength={80} />
            </Form.Item>

            <Form.Item 
            label="Apellidos"
            name="lastname"
            className="col-span-2 lg:col-span-1"
            rules={[
              { required: true, message: 'Por favor ingresa tus apellidos' },
            ]}>
              <Input placeholder="coloque sus apellidos"  maxLength={100}/>
            </Form.Item>

            <Form.Item 
            label="Fecha de cumpleaños" 
            name="dateBirthday" 
            className="col-span-2 lg:col-span-1"
            rules={[
              { required: true, message: 'Por favor ingresa tu cumpleaños' },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();

                  const edad = dayjs().diff(value, 'year');
                  if (edad < 15) {
                    return Promise.reject(new Error('Debes tener al menos 15 años'));
                  }

                  return Promise.resolve();
                },
              }
            ]}>
              <DatePicker 
              className="w-full" 
              placeholder="Seleccione la fecha" />
            </Form.Item>

            <Form.Item 
            label="Dirección" 
            className="col-span-2 lg:col-span-1"
            name="address">
              <Input placeholder="coloque su dirección" maxLength={100} />
            </Form.Item>

            <Form.Item 
            label="Genero" 
            name="gender"
            className="col-span-2 lg:col-span-1"
            rules={[
              { required: true }
            ]}> 
              <Radio.Group defaultValue="1" >
                <Radio.Button value="1" checked={true}>Hombre</Radio.Button>
                <Radio.Button value="2">Mujer</Radio.Button>
              </Radio.Group>
            </Form.Item>
            
            <div className="py-5 mb-15 h-[200px] max-h-[230px] col-span-2">
              <Form.Item label="Foto de perfil" name="photo">
                <Dragger 
                multiple= {false}
                maxCount={1}
                listType="picture"
                accept=".jpg,.jpeg,.png"
                
                beforeUpload={(file) => {
                  const isImage = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
                  if (!isImage) {
                    messageApi.open({
                      type: 'warning',
                      content: 'Imagen no compatible',
                    duration: 2
                  });
                  return Upload.LIST_IGNORE;
                  }
                  return false;
                }}>
                  <p className="ant-upload-drag-icon">
                    <UserOutlined />
                  </p>
                  <p className="ant-upload-text">Sube tu foto para conocerte</p>
                  <p className="ant-upload-hint">
                    Solo arrastra y suelta la foto aqui (compatible con jpg, png)
                  </p>
                </Dragger>
              </Form.Item>
            </div>
      
            <div className="flex items-center justify-center align-middle col-span-2 mb-6">
              <hr className="w-[487px] border-gray-200 mt-1"/>
            </div>

            <Form.Item
              name="email"
              label="Correo Electrónico"
              className="col-span-2 lg:col-span-1"
              rules={[
                { required: true, message: 'Por favor ingresa tu Correo' },
                { type: 'email', message: 'El correo no es válido' },
                { min: 6, message: 'Debe tener al menos 6 caracteres' },
                { max: 255, message: 'No debe superar los 255 caracteres' },
                {
                  validator: async (_, value) => {
                    if (!value) return Promise.resolve();

                    try {
                      const response = await api.post('/verify-email', { email: value });

                      if (response.data.existe) {
                        return Promise.reject('Este correo ya está registrado');
                      }

                      return Promise.resolve();
                    } catch (error) {
                      return Promise.reject('Error al verificar el correo');
                    }
                  },
                },
              ]}
            >
              <Input
                placeholder="Coloca tu correo"
                type="email"
                maxLength={255}
                minLength={6}
              />
            </Form.Item>


            <Form.Item
            name="telefono"
            label="Teléfono"
             className="col-span-2 lg:col-span-1"
            rules={[
              { required: false , message: 'Por favor ingresa tu número' },
              {
                pattern: /^[0-9]{9}$/, // ejemplo para Perú: 9 dígitos
                message: 'Número inválido',
              },
              {
                  validator: async (_, value) => {
                    if (!value) return Promise.resolve();

                    try {
                      const response = await api.post('/verify-phone', { phone: value });

                      if (response.data.existe) {
                        return Promise.reject('Este telefono ya está registrado');
                      }

                      return Promise.resolve();
                    } catch (error) {
                      return Promise.reject('Error al verificar el telefono');
                    }
                  },
                },
            ]}>
              <Input maxLength={9} placeholder="Ej: 987654321" />
            </Form.Item>

            <Form.Item
            label="Contraseña"
            name="password"
             className="col-span-2 lg:col-span-1"
            rules={[
              { required: true, message: 'Porfavor ingrese ua contraseña válida' },
              { min: 5, message: 'Debe tener al menos 5 caracteres' },
              { max: 12, message: 'No debe superar los 12 caracteres' }
            ]}>
              <Input.Password maxLength={12} minLength={5} />
            </Form.Item>
          
            <div className="flex items-center justify-center align-middle col-span-2 mb-6 mt-5">
              <hr className="w-[487px] border-gray-200 mt-1"/>
            </div>

            <Form.Item className="col-span-2 flex justify-center">
              <Button type="primary" htmlType="submit">Registrarse</Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default RegisterModal;