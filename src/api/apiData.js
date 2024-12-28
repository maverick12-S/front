const API_BASE_URL = "http://localhost:8080/apiData";

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