import md5 from 'md5';


class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = '2f40d8e3128997a1b69208e193d5b33d'
    _privateKey = 'f190072fc4cca1a7ccecea1781f8a3e3b06bdbbc'
    _baseOffset = 210;

    //getResource takes url as an argument then sends fetch reguest and hold it in res var,
    //Then it checks if our reguest is rejected or fulfilled.If Fulfilled then returns data in json format.
    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status : ${res.status}`);
        }

        return await res.json();
    };

    //We have two functions to extract data fetched from api.First func getAllCharacters to get an array of all characters and getCharacter
    //to get just one character.Since we get all these data every character has a lot of data that we are not going to use .So we use func _transformData
    //to extract data we need.
    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._authParams()}`);
        return res.data.results.map(this._transformCharacter)
    }

    //getChar returns only one char 
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?&${this._authParams()}`);
        return this._transformCharacter(res.data.results[0]);
    }
    //this function will be used every time when we fetch char to extract only data we need
    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
    //we use _authParams to create hash
    _authParams = () => {
        const ts = new Date().getTime();
        const hash = md5(ts + this._privateKey + this._apiKey);
        return `ts=${ts}&apikey=${this._apiKey}&hash=${hash}`;
    };

};


export default MarvelService