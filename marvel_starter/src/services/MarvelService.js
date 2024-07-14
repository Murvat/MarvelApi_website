import md5 from 'md5';


class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = '2f40d8e3128997a1b69208e193d5b33d'
    _privateKey = 'f190072fc4cca1a7ccecea1781f8a3e3b06bdbbc'

    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status : ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = async () => {
        const res = this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._authParams()}`);
        return res.data.results.map(this._transformCharacter)
    }
    getCharacter = async (id) => {
        const res = await await this.getResource(`${this._apiBase}characters/${id}?&${this._authParams()}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    _authParams = () => {
        const ts = new Date().getTime();
        const hash = md5(ts + this._privateKey + this._apiKey);
        return `ts=${ts}&apikey=${this._apiKey}&hash=${hash}`;
    };

};


export default MarvelService