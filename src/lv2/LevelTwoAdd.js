import { useState } from "react";
import { setProfileApi } from "../api/apiData";

const LevelTwoAdd = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [message, setMessage] = useState("");

    const getFormItem = async (e) => {
        e.preventDefault();
        if (!id || !name || !age) {
            setMessage("全てのフィールドを入力してください。");
            return;
        }
        try {
            const profileData = await setProfileApi(id, name, age);
            setMessage(profileData.message); // テキストをメッセージに設定
        } catch (error) {
            setMessage(`エラーが発生しました: ${error.message}`);
        }
    };
    return (
        <div>
            <h1>Level 2 AddUserPage</h1>
            <p>リソースサーバーのDBへRestApiを用いてデータ保存</p>
            <form onSubmit={getFormItem}>
                <input
                    type="text"
                    placeholder="IDを入力"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="名前を入力"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="年齢を入力"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <button type="submit">登録</button>
            </form>
            <div>
                <p>入力したユーザー情報は以下の内容です。</p>
                <p>名前: {name}</p>
                <p>年齢: {age}</p>

                <p>{message}</p>
            </div>
        </div>
    );
};

export default LevelTwoAdd;
