
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import HomePage from './pages/HomePage';


axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster position='bottom-right' toastOptions={{duration: 3000}}></Toaster>
        <Routes>

          <Route path="/" element={<HomePage/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
