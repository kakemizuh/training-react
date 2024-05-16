import { useNavigate } from "react-router-dom";

//Homeに戻るボタン
const GoHome = () => {
    const navigate = useNavigate();
    return (
        <>
        <br />
        <br />
        <button onClick={() => navigate("/")}>Homeに戻る</button>
        </>
    )
}

export default GoHome;