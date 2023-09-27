import './App.css'
import NavBar from './components/navbar/Navbar';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Vacations from './components/vacations/Vacations';
import VacationsAdmin from "./components/Admin/VacationsAdmin"
import VacationsReport from "./components/Admin/VacationsReport"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import { useState } from 'react';

const routes = [
  {
    path: "/register",
    component: <Register></Register>,
    key: "register"
  },
  {
    path: "/vacations",
    component: <Vacations></Vacations>,
    key: "vacations"
  },
  {
    path: "/vacationsAdmin",
    component: <VacationsAdmin></VacationsAdmin>,
    key: "vacationsAdmin"
  },
  {
    path: "/vacationsReport",
    component: <VacationsReport></VacationsReport>,
    key: "vacationsReport"
  }
]

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <NavBar isLogin={isLogin}></NavBar>
        <Routes>
          <Route index element={<Home></Home>}></Route>
          <Route path="/login" element={<Login setIsLogin={setIsLogin}></Login>}></Route>
          {routes.map((route) => {
            return <Route path={route.path} key={route.key} element={route.component} />
          })}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App