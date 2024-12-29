const API_BASE_URL = "http://localhost:8080/apiData";


export const getAllProfileApi = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/allId`);
        
        // レスポンスが正常かどうか確認
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        
        // JSON を解析して返却
        return await response.json();
    } catch (error) {
        console.error("Error in getAllProfileApi:", error.message);
        throw error; // 呼び出し元でエラーをキャッチさせる
    }
};

export const getProfileApi = async (id) => {
    const response = await fetch(`${API_BASE_URL}/id`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id}),
    });

    if(!response.ok){
        throw new Error("Failed to fetch data");
    }

    return response.json();
}


export const deleteProfileApi = async (id) => {
    const response = await fetch(`${API_BASE_URL}/delete`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id}),
    });

    if(!response.ok){
        throw new Error("Failed to fetch data");
    }

    return response.json();
}


export const setProfileApi = async (id,name,age) =>{
    const response = await fetch(`${API_BASE_URL}/add`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id,name,age}),
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(`Failed to fetch data: ${errorData.message || "Unknown error"}`);
    }

    return response.json();
}