import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import AddPatient from './components/AddPatient';
import AddClinicalData from './components/AddClinicalData';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-patient" element={<AddPatient />} />
        <Route path="/add-clinical-data/:patientId" element={<AddClinicalData />} />
      </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={1000} position="bottom-center" />
    </div>
  );
}

export default App;
