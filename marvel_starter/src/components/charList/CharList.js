import './charList.scss';
import { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
const CharList = ({ onCharSelected }) => {

    const [state, setState] = useState({
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
    });

    const marvelService = new MarvelService();

    useEffect(() => {
        onReguest(state.offset);
        console.log(charList)
    }, [])

    const onReguest = (offset) => {
        onCharListLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }
    const onCharListLoading = () => {
        setState({
            ...state,
            newItemLoading: true,
        })
    }

    const onCharListLoaded = (newCharList) => {
        console.log(newCharList)
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        setState(({ offset, charList }) => ({
            ...state,
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    };


    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false,
        })
    }


    const renderItems = (arr) => {
        const items = arr.map(item => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            return (
                <li
                    className="char__item"
                    key={item.id}
                    onClick={() => onCharSelected(item.id)}>
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

    const { charList, loading, error, offset, newItemLoading, charEnded } = state;
    const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage /> : null;;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;
    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onReguest(offset)}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div >
    )
}

export default CharList;