import React, {useEffect, useRef, useState} from "react";
import {Button} from "react-bootstrap";
import axios from "axios";
import {GET_CREATE_GAME} from "../api/urls";
import {useDispatch} from "react-redux";
import {checkJwtToken} from "../services/auth/AuthAction";
import {Link, Navigate} from "react-router-dom";
import Login from "./Login";

const initialRedirectState = {
    doRedirect: false,
    gameUuid: '',
    cards: ['']
}

const Home = () => {

    const [redirectState, setRedirectState] = useState(initialRedirectState);
    const isUnmountedRef = useRef(false);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (!isUnmountedRef.current) {
    //         dispatch(checkJwtToken())
    //             .then(() => {
    //             })
    //             .catch((err) => {
    //             });
    //     }
    //     return () => {
    //         isUnmountedRef.current = true;
    //     };
    // }, []);

    const handlecos = (e) => {
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
                <Navigate to={'/game/' + redirectState.gameUuid} state={redirectState.cards}/>)
            : (<>
                <Login/>
                <div>SIEMA HOME</div>
                <Button onClick={e => handlecos(e)}/>
            </>)}
        )
    </>)
}

export default Home