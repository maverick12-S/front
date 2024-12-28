import React, { use, useState } from "react";
import { getProfileApi } from "../api/apiData";

const LevelTwo = () => {
    const[id, setId] = useState("");
    const[name, setName] = useState("");
    const[age, setAge] = useState("");

    const serchProfile = async (e) => {
        e.preventDefault();
        try{
            const profileData = await getProfileApi(id);
            setName(profileData.name);
            setAge(profileData.name);
        } catch(error){
            setName("入力されたidのユーザは存在しません");
        }
    };

    return(
        <div>
        <h1>Level 2 Page</h1>
        <p>リソースサーバーのDBからRestApiを用いてデータ取得</p>
        <form onSubmit={serchProfile}>
            <input
                type="text"
                placeholder="IDを入力"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <button type="submit">検索</button>
        </form>
        <div>
            <p>名前: {name}</p>
            <p>年齢: {age}</p>
        </div>
    </div>
);
};

export default LevelTwo;