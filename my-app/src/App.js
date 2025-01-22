import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AdminRegister from './components/admin/AdminRegister';
import CustomerRegister from './components/customer/CustomerRegister';
import Home from './pages/Home';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin/register' element={<AdminRegister/>}/>
        <Route path='/customer/register' element={<CustomerRegister/>}/>
        <Route path="/admin/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
