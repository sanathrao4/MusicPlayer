import httpClient, { baseUrl } from "../apiConfig"



const GetAlbumService = async (limit: number, offset: number) => {
    const reqUrl = `${baseUrl}`
    const reqParams = `/albums/top?limit=${limit}&offset=${offset}`
    const serviceUrl = reqUrl + reqParams
    const result = await httpClient.get(serviceUrl)

    return result
}

export default GetAlbumService