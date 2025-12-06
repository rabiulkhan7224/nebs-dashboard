const BASE_URL= "http://206.162.244.135:6001/api/v1"

export async function authFetch<T>(endpoint:string,
    options:RequestInit={}
):Promise<T>{
    const res = await fetch(`${BASE_URL}${endpoint}`,{
        ...options,
        headers:{
          "Content-Type": "application/json",
          ...options.headers
        }

    })


    const data = await res.json();

    if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data as T;
    
}