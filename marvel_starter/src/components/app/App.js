import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../ErrorBoundary/errorBoundary";

import decoration from '../../resources/img/vision.png';
import { useState } from "react";

const App = () => {
    //state to get id of choosen char
    const [state, setState] = useState({
        selectedChart: null,
    })

    const onCharSelected = (id) => {
        setState({
            selectedChart: id
        })

    }


    return (
        <div className="app">
            <AppHeader />
            <main>
                <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>
                <div className="char__content">
                    {/* <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={state.selectedChart} />
                    </ErrorBoundary> */}
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    )
}

export default App;