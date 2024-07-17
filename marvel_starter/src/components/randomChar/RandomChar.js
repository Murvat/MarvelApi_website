import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';


const RandomChar = () => {


    const [state, setState] = useState(
        {
            char: {},//initial state of character that is empty before render,
            //after  getCharacter gets full
            loading: true,//Spinner state
            error: false,//error state
        }
    );

    const marvelService = new MarvelService();

    useEffect(() => {
        updateCharr();
    }, []);

    //func called after data get fetched 
    const onCharLoaded = (char) => {
        setState({
            char,
            loading: false,
            error: false
        })
    }

    //func called before data get fetched that pulls spinner
    const onCharLoading = () => {
        setState({
            ...state,
            loading: true,
            error: false
        })
    }
    //func that called in Error
    const onError = () => {
        setState({
            loading: false,
            error: true
        })
    }

    //Function to fetch random character 
    const updateCharr = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        onCharLoading();
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }
    const { char, loading, error } = state;
    //var that creates or not Error component
    const errorMessage = error ? <ErrorMessage /> : null;
    //var that creates or not Spinner component
    const spinner = loading ? <Spinner /> : null;
    //var that creates View component
    const content = !(loading || error) ? <View char={char} /> : null;
    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button
                    className="button button__main"
                    onClick={updateCharr}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }
    return (<div className="randomchar__block">
        <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle} />
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description}                    </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}

export default RandomChar;