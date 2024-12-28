const API_BASE_URL = "http://localhost:8080/api";

export const formCallApi = async (name) => {
    const response = await fetch(`${API_BASE_URL}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name }), // ユーザー入力のデータをJSON形式で送信
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    return response.json(); // サーバーからのJSONレスポンスを返す
};

export const getHelloMessage = async () => {
    const response = await fetch(`${API_BASE_URL}/hello`);
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    // 修正点: response.text() を正しく呼び出す
    return response.text();
};

export const showDate = async () =>{
    const response = await fetch(`${API_BASE_URL}/add`);
    if(!response.ok){
        throw new Error("Failed to fetch data");
    }
    return response.text();
}
