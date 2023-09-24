import './App.css'
import NavBar from './components/navbar/Navbar';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Vacations from './components/vacations/Vacations';
import VacationsAdmin from "./components/Admin/VacationsAdmin"
import VacationsReport from "./components/Admin/VacationsReport"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';

const routes = [
  {
    path: "/register",
    component: <Register></Register>,
    key: "register"
  },
  {
    path: "/login",
    component: <Login></Login>,
    key: "login"
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

  return (
    <div>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route index element={<Home></Home>}></Route>
          {routes.map((route) => {
            return <Route path={route.path} key={route.key} element={route.component} />
          })}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App