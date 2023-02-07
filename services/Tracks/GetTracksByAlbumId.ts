import httpClient, { baseUrl } from "../apiConfig"



const GetTracksByAlbumIdService = async (albumId: string) => {
    const reqUrl = `${baseUrl}`
    const reqParams = `/albums/${albumId}/tracks`
    const serviceUrl = reqUrl + reqParams
    const result = await httpClient.get(serviceUrl)

    return result
}

export default GetTracksByAlbumIdService