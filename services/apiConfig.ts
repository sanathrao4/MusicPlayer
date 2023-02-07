import axios from 'axios';


const apiKey = 'OTM5OTUyOWUtN2I0Ny00MjY5LWI2NzEtY2EzM2IwYmNlODg0'
export const baseUrl = 'https://api.napster.com/v2.2'


const httpClient = axios.create({
    baseURL: baseUrl,
    headers: {
        'apiKey': apiKey
    },
});

export default httpClient