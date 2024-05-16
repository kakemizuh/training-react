import axios from "axios";
import { useState } from "react";
import { Player } from "../types/player";
import GoHome from "../components/GoHome";
import ShowStatus from "../components/ShowStatus";
import { useEffect } from "react";

const Gacha = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [gachaResults, setGachaResults] = useState<any[]>([]);
  const [gachaCount, setGachaCount] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(()=>{
    playerDataUpdate();
  },[]);

  //ガチャを引く
  const fetchData = async (
    count: number
  ) => {
    const playerId = localStorage.getItem("playerId");
    const req = {
        count: count
    }
    try{
      //自分のapiサーバーにリクエストを送る
      const res = await axios.post(`http://localhost:3000/users/${playerId}/useGacha`, req);
      const data = res.data;
      return data;
    }
    catch(error: any){
      //エラーメッセージをセット
      setErrorMessage(error.response.data.message);
      return null;
    };
  };

  const gacha = async(
    count: number
  ) => {
    const result = await fetchData(count);
    if(result){
      //エラーメッセージを初期化
      setErrorMessage("");
      //ガチャの結果を格納
      const playerItemData: any[] = result.results;
      setGachaResults(playerItemData);

      //ローカルストレージのプレイヤーステータスを更新
      let playerDataString = localStorage.getItem("playerStatus");
      let playerData: Player[] = JSON.parse(playerDataString!);
      playerData[0].money = result.player.money;
      let stringData = JSON.stringify(playerData);
      localStorage.setItem("playerStatus", stringData);
      setPlayers(playerData);
    }
  }

  //プレイヤーステータスをローカルストレージから取得
  const playerDataUpdate = () => {
    const playerStatusString = localStorage.getItem("playerStatus");
    const playerStatus: Player[] = JSON.parse(playerStatusString!);
    setPlayers(playerStatus);
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Gacha</h2>
      <ShowStatus playerStatus={players}/>
      <input
        type="number"
        min="1"
        placeholder="回数を入力"
        value={gachaCount}
        onChange={(e) => {
          setGachaCount(Number(e.target.value));
        }}
      />
      <button onClick={() => gacha(gachaCount!)}>ガチャを引く</button>
      <br/>
      {errorMessage}
      <h2 style={{ textAlign: "left"}}>結果</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>個数</th>
          </tr>
        </thead>
        <tbody>
          {gachaResults.map((d) => (
            <tr key={d.itemId}>
              <td>{d.itemId}</td>
              <td>{d.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <GoHome />
    </div>
  );
};

export default Gacha;