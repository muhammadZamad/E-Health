import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle";
import CustomRoutes from './pages/Routes';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
  <>
  <CustomRoutes />
  <ToastContainer
position="bottom-left"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
  </>
  );
}

export default App;
