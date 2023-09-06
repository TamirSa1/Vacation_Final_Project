import './App.css'
import NavBar from './components/navbar/Navbar';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Vacations from './components/vacations/Vacations';

import { BrowserRouter, Routes, Route } from "react-router-dom";

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
}
]

function App() {

  return (
    <div>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          {routes.map((route) => {
            return <Route path={route.path} key={route.key} element={route.component} />
          })}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App