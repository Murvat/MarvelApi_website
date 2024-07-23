import md5 from 'md5';
import { useHttp } from '../hooks/http.hook';


const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = '2f40d8e3128997a1b69208e193d5b33d'
    const _privateKey = 'f190072fc4cca1a7ccecea1781f8a3e3b06bdbbc'
    const _baseOffset = 210;

    //getResource takes url as an argument then sends fetch reguest and hold it in res var,
    //Then it checks if our reguest is rejected or fulfilled.If Fulfilled then returns data in json format.
    // const getResource = async (url) => {
    //     let res = await fetch(url);
    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status : ${res.status}`);
    //     }

    //     return await res.json();
    // };

    //We have two functions to extract data fetched from api.First func getAllCharacters to get an array of all characters and getCharacter
    //to get just one character.Since we get all these data every character has a lot of data that we are not going to use .So we use func _transformData
    //to extract data we need.
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}characters?limit=9&offset=${offset}&${_authParams()}`);
        return res.data.results.map(_transformCharacter)
    }

    //getChar returns only one char 
    const getCharacter = async (id) => {
        const res = await request(
            `${_apiBase}characters/${id}?&${_authParams()}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(
            `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
        );
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }



    //this function will be used every time when we fetch char to extract only data we need
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description
                ? `${char.description.slice(0, 210)}...`
                : "There is no description for this character",
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
    //we use _authParams to create hash
    const _authParams = () => {
        const ts = new Date().getTime();
        const hash = md5(ts + _privateKey + _apiKey);
        return `ts=${ts}&apikey=${_apiKey}&hash=${hash}`;
    };
    return {
        loading,
        error,
        clearError,
        getAllCharacters,
        getCharacter,
        getAllComics,
        getComic,
    };
};


export default useMarvelService;