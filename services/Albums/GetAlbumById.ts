import httpClient, { baseUrl } from "../apiConfig"



const GetAlbumByIdService = async (albumId: string) => {
    const reqUrl = `${baseUrl}`
    const reqParams = `/albums/${albumId}`
    const serviceUrl = reqUrl + reqParams
    const result = await httpClient.get(serviceUrl)

    return result
}

export default GetAlbumByIdService