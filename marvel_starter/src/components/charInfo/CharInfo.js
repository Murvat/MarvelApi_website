import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';


import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';



const CharInfo = ({ charId }) => {
    const [state, setState] = useState({
        char: null,
        loading: false,
        error: false,
    }
    )

    const marvelService = new MarvelService();


    useEffect(
        () => updateChar(), [charId])


    const updateChar = () => {
        if (!charId) {
            return;
        };

        onCharLoading();

        marvelService
            .getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)

    };


    const onCharLoaded = (char) => {
        setState({
            char,
            loading: false,
            error: false,

        })
    };
    const onCharLoading = () => {
        setState({
            ...state,
            loading: true,
            error: false,
        })
    };
    const onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }


    const { char, loading, error } = state
    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) && char ? <View char={charId} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }

    <>
        <div className="char__basics">
            <img src={thumbnail} alt={name} style={imgStyle} />
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
            {description}        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {comics.length > 0 ? null : 'There is no comics with this character'}
            {
                comics.map((item, i) => {
                    if (i > 9) return;

                    <li key={i}
                        className="char__comics-item">
                        {item.name}                    </li>

                })
            }
        </ul>
    </>

}

export default CharInfo;