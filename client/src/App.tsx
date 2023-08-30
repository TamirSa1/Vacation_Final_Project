import './App.css'
// import NavBar from './components/navbar/Navbar';
// import Games from './components/games/Games';
// import Teams from './components/teams/Teams';
// import NewTeam from './components/teams/NewTeam';
// import NewGame from './components/games/NewGame';
// import { BrowserRouter, Routes, Route } from "react-router-dom"; // ספרייה שיוצרת את הראוטים

// const routes = [
  // {
  //   path: "/games",
  //   component: <Games></Games>,
  //   key: "games"
  // },
  // {
  //   path: "/teams",
  //   component: <Teams></Teams>,
  //   key: "teams"
  // },
  // {
  //   path: "/newteam",
  //   component: <NewTeam></NewTeam>,
  //   key: "newteam"
  // },
  // {
  //   path: "/newGame",
  //   component: <NewGame></NewGame>,
  //   key: "newGame"
  // }

// ]

function App() {

  return (
    <div>
      {/* עוטף את כל הראוטים */}
      {/* <BrowserRouter> */}
        {/* הנאב בר נמצא פה כי הנאב בר תמיד נשאר למעלה ללא שינוי כשעוברים ראוט */}
        {/* <NavBar></NavBar> */}
        {/* ראוט נמצא פה כדי לעטוף את כל המערך שנוצר בשורה 7 */}
        {/* <Routes> */}
          {/* לעבור על המערך ולכל אחד יוצר ראוט */}
          {/* {routes.map((route) => { */}
            {/* return <Route path={route.path} key={route.key} element={route.component} /> */}
          {/* })} */}
        {/* </Routes> */}
      {/* </BrowserRouter> */}
    </div>
  )
}

export default App