import { useState } from "react";
import RandomChar from '../randomChar/RandomChar'

import decoration from '../../resources/img/vision.png';
import CharList from "../charList/CharList";
import ErrorBoundary from '../ErrorBoundary/errorBoundary'
import CharInfo from '../charInfo/CharInfo'

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

./////////
return (
    <>
        <ErrorBoundary>
            <RandomChar />
        </ErrorBoundary>

        <div className="char__content">
            <ErrorBoundary>
                <CharList onCharSelected={onCharSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
                <CharInfo charId={selectedChar} />
            </ErrorBoundary>
        </div>
        <img src={decoration} alt="vision" className="bg-decoration" />
    </>

)
};

export default MainPage;