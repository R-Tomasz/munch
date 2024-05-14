import React, {useState} from "react";
import {Button} from "react-bootstrap";
import axios from "axios";
import {GET_CREATE_GAME} from "../api/urls";
import {Navigate} from "react-router-dom";
import Login from "./Login";

const initialRedirectState = {
    doRedirect: false,
    gameUuid: '',
}

const Home = () => {
    const [redirectState, setRedirectState] = useState(initialRedirectState);

    const createNewGame = (e) => {
        e.preventDefault();
        axios.get(GET_CREATE_GAME)
            .then((res) => {
                setRedirectState(prevState => ({
                    ...prevState,
                    doRedirect: true,
                    gameUuid: res.data.gameUuid,
                    cards: res.data.cards
                }))
            }).catch(err => {
        })
    }

    return (<>
        {redirectState.doRedirect
            ? (
                <Navigate to={'/game/' + redirectState.gameUuid}/>)
            : (<div className={'container'}>
                <Login/>
                <Button onClick={e => createNewGame(e)}>Nowa gra</Button>
                <div className={'my-5'}>
                    <h5>Wszystkie grafiki kart pochodzą z oryginalnej gry Munchkin wydawnictwa <a
                        href={"https://blackmonk.pl/"}>BlackMonk Games</a></h5>
                    <h5>Twórcą gry jest Steve Jackson, a wydawcą <a href={"http://www.sjgames.com/"}>Steve Jackson
                        Games</a> a
                        grafiki tworzył John Kovalic. Aplikacja ma charakter wyłącznie edukacyjny </h5>
                </div>
            </div>)}
    </>)
}

export default Home