import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Player } from "../types/player";

const Login = () => {
  const URL = process.env.URL;
  const navigate = useNavigate();
  const [playerId, setPlayerId] = useState("");
  const [loginErrorFlag, setLoginErrorFlag] = useState(false);

  useEffect(() => {
    const playerId = localStorage.getItem("playerId");
    if (playerId) {
      navigate("/");
    }
  }, [navigate]);

  const login = async () => {
    //idでプレイヤーのステータスを取得する
    const res = await axios.get(`${URL}/users/${playerId}`);
    const data = await res.data;
    if(data){
      //stringに変換
      const playerData:Player[] = [data];
      let stringData = JSON.stringify(playerData);
      //ステータスをローカルストレージに保存
      localStorage.setItem("playerId", playerId);
      localStorage.setItem("playerStatus", stringData);
      navigate("/");
    }else{
      //ログイン失敗
      setLoginErrorFlag(true);
    }
  };

  const htmlLoginText = () => {
    if(loginErrorFlag){
      return (
        <p>ログインできませんでした</p>
      );
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="player id"
        value={playerId}
        onChange={(e) => {
          setPlayerId(e.target.value);
        }}
      />
      <button onClick={login}>Login</button>
      {htmlLoginText()}
    </div>
  );
};
export default Login;
