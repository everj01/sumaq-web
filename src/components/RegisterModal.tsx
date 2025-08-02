import React from "react";
import Modal from "./Modal";
import { Button, DatePicker, Form, Input, message, Upload, Radio  } from 'antd';
import { UserOutlined } from '@ant-design/icons';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: () => void;
};

const { Dragger } = Upload;

const RegisterModal: React.FC<Props> = ({isOpen, onClose, onSwitch}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: FormData) => {
    console.log('Valores enviados:', values);
    // axios.post('/user', values)
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
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
        <div className="w-full px-8">
          <div className="flex flex-col items-center justify-center gap-5 mb-5">
            <button
              type="button"
              className="w-[50%] bg-gray-500 text-white shadow-md py-2 rounded-lg font-semibold hover:-translate-y-1 hover:shadow-lg transition cursor-pointer"
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-2 w-full px-5">
            
            <Form.Item 
            label="Nombres" 
            name="name"
            rules={[
              { required: true, message: 'Por favor ingresa tus nombres' },
            ]}>
              <Input placeholder="Coloque sus nombres" maxLength={80} />
            </Form.Item>

            <Form.Item 
            label="Apellidos"
            name="lastname"
            rules={[
              { required: true, message: 'Por favor ingresa tus apellidos' },
            ]}>
              <Input placeholder="coloque sus apellidos"  maxLength={100}/>
            </Form.Item>

            <Form.Item 
            label="Fecha de cumpleaños" 
            name="dateBirthday" 
            rules={[
              { required: true, message: 'Por favor ingresa tu cumpleaños' },
            ]}>
              <DatePicker 
              className="w-full" 
              placeholder="Seleccione la fecha" />
            </Form.Item>

            <Form.Item 
            label="Dirección" 
            name="address">
              <Input placeholder="coloque su dirección" maxLength={100} />
            </Form.Item>

            <Form.Item 
            label="Genero" 
            name="gender"
            rules={[
              { required: true }
            ]}> 
              <Radio.Group defaultValue="1" >
                <Radio.Button value="1">Hombre</Radio.Button>
                <Radio.Button value="2">Mujer</Radio.Button>
              </Radio.Group>
            </Form.Item>
            
            <div className="col-span-2 py-5 mb-15 h-[200px] max-h-[230px]" >
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
            label="Correo Electronico" 
            rules={[
              { required: true, message: 'Por favor ingresa tu Correo' },
              { type: 'email', message: 'El correo no es válido' },
            ]}>
              <Input placeholder="Coloque su correo" maxLength={100}
              type="email"/>
            </Form.Item>

            <Form.Item
            name="telefono"
            label="Teléfono"
            rules={[
              { required: true, message: 'Por favor ingresa tu número' },
              {
                pattern: /^[0-9]{9}$/, // ejemplo para Perú: 9 dígitos
                message: 'Número inválido',
              },
            ]}>
              <Input maxLength={9} placeholder="Ej: 987654321" />
            </Form.Item>

            <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              { required: true, message: 'Porfavor ingrese ua contraseña válida' }
            ]}>
              <Input.Password maxLength={12} />
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