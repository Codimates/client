
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import UserContextProvider from './context/UserContext';
import HomePage from './pages/HomePage';
import SignPage from './pages/SignandRegPage/SignPage';
import RegisterPage from './pages/SignandRegPage/RegisterPage';
import LandingPage from './pages/customerPages/LandingPage';
import ProtectedRoute from './protectedRouters/ProtectedRoute';



axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <UserContextProvider>
        <Toaster position='bottom-right' toastOptions={{duration: 3000}}></Toaster>
        <Routes>

          <Route path="/" element={<HomePage/>} />
          <Route path='/signin' element={<SignPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>

          <Route path='/home' element={<ProtectedRoute><LandingPage/></ProtectedRoute>}/>
          
          
        </Routes>
      </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
