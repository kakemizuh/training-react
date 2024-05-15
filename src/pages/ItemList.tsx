import axios from "axios";
import { useEffect, useState } from "react";
import { Player } from "../types/player";
import { PlayerItem } from "../types/playerItem";
import GoHome from "../components/GoHome";
import ShowStatus from "../components/ShowStatus";
import { error } from "console";

const ItemList = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerItems, setPlayerItems] = useState<PlayerItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(()=>{
    playerDataUpdate();
  },[]);

  const healStatus = async (
    id: number
  ) => {
  const playerId = localStorage.getItem("playerId");
  const req = {
    itemId: id,
    count: 1
  };
  //useItemAPI
  axios.post(`http://localhost:3000/users/${playerId}/useItem`, req)
    .then(response => {
      //エラーメッセージを初期化
      setErrorMessage("");
      const data = response.data;

      //所持数の更新
      let playerItemsNew = playerItems.slice(0,playerItems.length);
      playerItemsNew.find((playerItemNew) => playerItemNew.itemId == data.itemId)!.itemCount = data.count;
      setPlayerItems(playerItemsNew);
      console.log(playerItems);

      //プレイヤーステータスの更新
      let playerDataString = localStorage.getItem("playerStatus");
      let playerData: Player[] = JSON.parse(playerDataString!);
      playerData[0].hp = data.player.hp;
      playerData[0].mp = data.player.mp;
      setPlayers(playerData);

      //プレイヤーステータスをローカルストレージに保存
      let stringData = JSON.stringify(playerData);
      localStorage.setItem("playerStatus", stringData);
    })
    .catch(error => {
      //エラーメッセージをセット
      setErrorMessage(error.response.data.message);
    })
  };

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
          {/* TODO 取得したデータ表示 */}
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
