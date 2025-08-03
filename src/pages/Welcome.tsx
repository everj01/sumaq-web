import { useNavigate, useLocation, useMatch, Link } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import { useAuth } from '../context/AuthContext';

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, isLoadingAuth } = useAuth();

  const matchLogin = useMatch("/login");
  const matchRegister = useMatch("/register");

  const isModalRouting = (modal: string): boolean => {
    if (modal === "login") return !!matchLogin;
    if (modal === "register") return !!matchRegister;
    return false;
  };

  const openModal = (modal: string) => {
    navigate(`/${ modal }`, { state: { backgroundLocation: location } });
  };  

  if (isLoadingAuth) {
    return null;
  }

  return(
    <>
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-300 flex flex-col items-center justify-center ">
      <div className="w-full h-[130px] md:h-[75px] bg-white fixed top-0 shadow-lg flex flex-col md:flex-row justify-around items-center">
          <h1 className="text-3xl font-bold text-teal-600">
              <i className="fa-solid fa-map-location-dot"></i>&nbsp;Sumaq
          </h1>
          
          <div className="flex gap-2">
            { !isAuthenticated && (
              <>
                <button
                  className="bg-white text-teal-600 border-teal-600 border-3 font-semibold px-6 py-2 rounded-full  hover:bg-teal-600 hover:text-white transition cursor-pointer"
                  onClick={() => openModal('login')}>
                  Iniciar Sesión
                </button>
                <button
                  className="bg-teal-600 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-teal-600 transition cursor-pointer"
                  onClick={() => openModal('register')}>
                  Registrar
                </button>
              </>
            ) }

            { isAuthenticated && (
              <>
                <button
                  className="bg-white text-teal-600 border-teal-600 border-3 font-semibold px-6 py-2 rounded-full  hover:bg-teal-600 hover:text-white transition cursor-pointer"
                  onClick={() => logout()}>
                  Cerrar Sesión
                </button>
              </>
            ) }
            
          </div>
      </div>
      <div className="flex flex-col gap-23 lg:flex-row items-center justify-between p-7 w-[96%] md:w-[72%] mt-[120px] lg:mt-0">
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-6xl font-bold leading-tight text-white">
            Descubre los rincones más especiales
          </h1>
          <p className="text-lg text-white font-semibold">
            Únete a una comunidad de exploradores que comparten los lugares más únicos y secretos de la ciudad. Desde cafeterías escondidas hasta miradores espectaculares.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            { !isAuthenticated && (
              <>
                <Link to="/login" className="bg-white text-teal-500 border-teal-500 font-semibold px-6 py-3 rounded-full shadow transition cursor-pointer hover:shadow-lg">
                  <i className="fa-solid fa-location-dot"></i>&nbsp;Explorar Mapa
                </Link>
                <Link to="/login" className="bg-teal-500 text-white font-semibold px-6 py-3 rounded-full shadow transition cursor-pointer hover:shadow-lg">
                  <i className="fa-solid fa-plus"></i>&nbsp;Agregar Lugar
                </Link>
              </>
            )}


             { isAuthenticated && (
              <>
                <Link to="/map" className="bg-white text-teal-500 border-teal-500 font-semibold px-6 py-3 rounded-full shadow transition cursor-pointer hover:shadow-lg">
                  <i className="fa-solid fa-location-dot"></i>&nbsp;Explorar Mapa
                </Link>
                <Link to="/addPost" className="bg-teal-500 text-white font-semibold px-6 py-3 rounded-full shadow transition cursor-pointer hover:shadow-lg">
                  <i className="fa-solid fa-plus"></i>&nbsp;Agregar Lugar
                </Link>
              </>
            )}
            
          </div>
        </div>

 
        <div className="lg:w-1/2 mt-12 lg:mt-0 space-y-8 bg-white rounded-4xl px-4 pb-12 pt-8 shadow-xl">
          {/* Tarjetas */}
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div className="flex-1 flex flex-col items-center justify-between text-center space-y-2">
              <div aria-hidden="true" className="text-2xl rounded-[50%] bg-teal-500 text-white w-[55px] h-[55px] flex items-center justify-center"><i className="fa-solid fa-magnifying-glass"></i></div>
              <h3 className="font-semibold">Explora</h3>
              <p className="text-sm">Descubre lugares únicos cerca de ti</p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-between text-center space-y-2">
              <div aria-hidden="true" className="text-2xl rounded-[50%] bg-teal-500 text-white w-[55px] h-[55px] flex items-center justify-center"><i className="fa-solid fa-camera"></i></div>
              <h3 className="font-semibold">Comparte</h3>
              <p className="text-sm">Sube fotos y comparte tus hallazgos</p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-between text-center space-y-2">
              <div aria-hidden="true" className="text-2xl rounded-[50%] bg-teal-500 text-white w-[55px] h-[55px] flex items-center justify-center"><i className="fa-solid fa-share-nodes"></i></div>
              <h3 className="font-semibold">Conecta</h3>
              <p className="text-sm">Únete a una comunidad </p>
            </div>
          </div>
        </div>
      </div>
    </div>


      { !isAuthenticated && (
        <>
          <LoginModal 
            isOpen={isModalRouting('login')}
            onClose={() => navigate("/")} 
            onSwitch={() => navigate("/register")} 
          />

          <RegisterModal 
            isOpen={isModalRouting('register')} 
            onClose={() => navigate("/")} 
            onSwitch={() => navigate("/login")} 
          />
        </>
      )}

           
   
    </>
  );
}

export default Welcome;