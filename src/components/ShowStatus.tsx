import { useNavigate } from "react-router-dom";
import { Player } from "../types/player";
type Props = {
    playerStatus: Player[];
}
//プレイヤーステータスを表示
const ShowStatus = (props: Props) => {
    return (
        <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>名前</th>
            <th>hp</th>
            <th>mp</th>
            <th>money</th>
          </tr>
        </thead>
        <tbody>
          {props.playerStatus.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.hp}</td>
              <td>{d.mp}</td>
              <td>{d.money}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}

export default ShowStatus;