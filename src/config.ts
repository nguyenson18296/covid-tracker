export const BASE_URL: string = "https://api.covid19api.com";

type TMETHOD = "POST" | "GET" | "PUT" | "DELETE";

export async function fetchAPI(path: string, method: TMETHOD, data?: any): Promise<any> {
    const res = await fetch(`${BASE_URL}/${path}`, {
        method,
        headers: {
          Accept: 'application/json'
        },
        body: JSON.stringify(data)
      })
      return res.json()
}
