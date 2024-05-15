import { Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import PlayerStatus from "../pages/PlayerStatus";
import ItemList from "../pages/ItemList";
import Gacha from "../pages/Gacha";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/player-status",
    element: <PlayerStatus />
  },
  {
    path: "/item-list",
    element: <ItemList />
  },
  {
    path: "/gacha",
    element: <Gacha />
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/",
    element: <Navigate to="/" />,
  },
];
export default routes;
