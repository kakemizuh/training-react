import axios from "axios";
import { useEffect, useState } from "react";
import { Player } from "../types/player";
import { PlayerItem } from "../types/playerItem";
import GoHome from "../components/GoHome";
import ShowStatus from "../components/ShowStatus";
import { error } from "console";

const ItemList = () => {
  const URL = process.env.URL;
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerItems, setPlayerItems] = useState<PlayerItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(()=>{
    playerDataUpdate();
  },[]);

  const fetchData = async (
    id: number
  ) => {
    const playerId = localStorage.getItem("playerId");
    const req = {
    itemId: id,
    count: 1
    };
    try{
      //useItemAPI
      const res = await axios.post(`${URL}/users/${playerId}/useItem`, req);
      const data = res.data;
      return data;
    }
    catch(error: any){
      //エラーメッセージをセット
      setErrorMessage(error.response.data.message);
      return null;
    }
  }

  const healStatus = async(
    id: number
  ) => {
    const result = await fetchData(id);
    if(result){
      //エラーメッセージを初期化
      setErrorMessage("");

      //所持数の更新
      let playerItemsNew = playerItems.slice(0,playerItems.length);
      playerItemsNew.find((playerItemNew) => playerItemNew.itemId == result.itemId)!.itemCount = result.count;
      setPlayerItems(playerItemsNew);

      //プレイヤーステータスの更新
      let playerDataString = localStorage.getItem("playerStatus");
      let playerData: Player[] = JSON.parse(playerDataString!);
      playerData[0].hp = result.player.hp;
      playerData[0].mp = result.player.mp;
      setPlayers(playerData);

      //プレイヤーステータスをローカルストレージに保存
      let stringData = JSON.stringify(playerData);
      localStorage.setItem("playerStatus", stringData);
    }
  }

  //プレイヤーステータスをローカルストレージから取得
  const playerDataUpdate = () => {
    const playerStatusString = localStorage.getItem("playerStatus");
    const playerStatus: Player[] = JSON.parse(playerStatusString!);
    setPlayers(playerStatus);
  }

  //指定したプレイヤーのプレイヤーアイテムを取得するAPI
  const getAPI = async () => {
    try {
        const playerId = localStorage.getItem("playerId");
        const res = await axios.get(`http://localhost:3000/users/${playerId}/getUserItems`);
        setPlayerItems(res.data);
      } catch (e) {
        console.error(e);
      }
  };

  return (
    <>
    <div>
      <h2 style={{ textAlign: "center" }}>PlayerItems</h2>
      <ShowStatus playerStatus={players}/>
      <button onClick={getAPI}>APIアクセス</button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>名前</th>
            <th>回復量</th>
            <th>値段</th>
            <th>アイテムタイプ</th>
            <th>所持数</th>
          </tr>
        </thead>
        <tbody>
          {playerItems.map((d) => (
            <tr key={d.item.id}>
              <td>{d.item.id}</td>
              <td>{d.item.name}</td>
              <td>{d.item.heal}</td>
              <td>{d.item.price}</td>
              <td>{d.item.itemType}</td>
              <td>{d.itemCount}</td>
              <td><button onClick={() => healStatus(d.item.id)}>使用する</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {errorMessage}
      <GoHome/>
    </div>
    </>
  );
};

export default ItemList;
