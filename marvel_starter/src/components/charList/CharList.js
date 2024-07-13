import './charList.scss';
import { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
const CharList = () => {

    const [state, setState] = useState({
        charList: [],
        loading: true,
        error: false
    });

    const marvelService = new MarvelService();

    useEffect(() => {
        console.log('d')
        marvelService.getAllCharacters()
            .then(onCharListLoaded)
            .catch(onError)
    }, [])

    const onCharListLoaded = (charList) => {
        setState({
            charList,
            loading: false
        })
    };


    const onError = () => {
        setState({
            error: true,
            loading: false,
            charList: [],
        })
    }
    const renderItems = (arr) => {
        console.log('a')
        const items = arr.map(item => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            return (
                <li
                    className="char__item"
                    key={item.id}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const { charList, loading, error } = state;
    const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage /> : null;;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;
    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;