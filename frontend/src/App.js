import './App.css';
import React, {useEffect, useRef} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Game from "./components/Game";
import {useDispatch} from "react-redux";
import {checkJwtToken} from "./services/auth/AuthAction";
import PageNotFound from "./components/PageNotFound";

const App = () => {

    const isUnmountedRef = useRef(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!isUnmountedRef.current) {
            dispatch(checkJwtToken())
                .then(() => {
                })
                .catch((err) => {
                });
        }
        return () => {
            isUnmountedRef.current = true;
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>

                <Route path="/game/:gameUuid" element={<Game/>}/>
                <Route path="/404" element={<PageNotFound/>}/>
                <Route path="*" element={<Navigate to="/404"/>}/>
            </Routes>
        </Router>
    );
}

export default App;