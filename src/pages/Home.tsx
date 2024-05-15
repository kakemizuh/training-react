import { useEffect } from "react";
import { useState } from "react";
import { Player } from "../types/player";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ShowStatus from "../components/ShowStatus";

const Home = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    //ローカルストレージからプレイヤーIdとプレイヤーステータスを取得
    const playerId = localStorage.getItem("playerId");
    const playerStatusString = localStorage.getItem("playerStatus");

    //なければログインページに遷移
    if (!playerId || playerStatusString == null) {
      navigate("/login");
    }else{
      //両方あればプレイヤーステータスをセット
      const playerStatus: Player[] = JSON.parse(playerStatusString);
      setPlayers(playerStatus);
    }
  }, [navigate]);

  const logout = () => {
    //ローカルストレージのデータを削除し、ログインページに遷移
    localStorage.removeItem("playerId");
    localStorage.removeItem("playerStatus");
    navigate("/login");
  };
  return (
    <>
      <h1>
        Home <button onClick={logout}>Logout</button>
      </h1>
      
      <ShowStatus playerStatus={players}/>

      {/* link */}
      <Link to="/">home</Link>
      <br />
      <Link to="player-status">player status</Link>
      <br />
      <Link to="item-list">item list</Link>
      <br />
      <Link to="gacha">gacha</Link>
    </>
  );
};
export default Home;
