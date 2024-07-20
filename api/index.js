import axios from "axios"

const API_KEY = process.env.EXPO_PUBLIC_UNSPLASH_API;

const baseURL = "https://api.unsplash.com/photos/?client_id=" + API_KEY

const searchURL = "https://api.unsplash.com/search/photos?client_id=" + API_KEY

const formattedUrl = (parameters) => {
    let url = baseURL + ``
    if (!parameters) return url;
    let paramKeys = Object.keys(parameters);
    paramKeys.map((key) => {
        let value = key == 'query' ? encodeURIComponent(parameters[key]) : parameters[key];
        url += `&${key}=${value}`
    });
    // console.log(('final url: ', url))
    return url;
}

const formattedSearchUrl = (parameters) => {
    let url = searchURL + ``
    if (!parameters) return url;
    let paramKeys = Object.keys(parameters);
    paramKeys.map((key) => {
        let value = key == 'query' ? encodeURIComponent(parameters[key]) : parameters[key];
        url += `&${key}=${value}`
    });
    // console.log(('final url: ', url))
    return url;
}

export const apiCall = async (parameters) => {
    try {
        const response = await axios.get(formattedUrl(parameters))
        const { data } = response;
        return { success: true, data }
    } catch (error) {
        console.log("error: ", error.message)
        return { success: false, msg: error.message }
    }
}
export const apiSearchCall = async (parameters) => {
    try {
        const response = await axios.get(formattedSearchUrl(parameters))
        const { data } = response;
        return { success: true, data }
    } catch (error) {
        console.log("error: ", error.message)
        return { success: false, msg: error.message }
    }
}