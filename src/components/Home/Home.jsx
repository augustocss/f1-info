import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
import { TeamsInfo } from '../../Data.js';

const moment = require('moment');
const API = "https://ergast.com/api/f1";

const Home = () => {
    const [lastRace, setLastRace] = useState([]);
    const [upcomingRace, setUpcomingRace] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            // load last race
            const resLastRace = await fetch(API + "/current/last/results.json")
                .then((res) => res.json())
                .then((data) => data)
                .catch((err) => {
                    console.log(err);
                    setError(true);
                });

            // capturando o round atual (e incrementando 1) numa var temp pois o state abaixo nao fica imediatamente disponivel
            const nextRound = Number(resLastRace.MRData.RaceTable.Races[0].round) + 1;

            setLastRace(resLastRace.MRData.RaceTable.Races);

            // load upcoming race
            const resUpcomingRace = await fetch(API + "/2022/" + nextRound + ".json")
                .then((res) => res.json())
                .then((data) => data)
                .catch((err) => {
                    console.log(err);
                    setError(true);
                });

            setLoading(false);

            setUpcomingRace(resUpcomingRace.MRData.RaceTable.Races);
        }

        loadData();
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }

    if (error) {
        return (
            <div>Falha no carregamento</div>
        )
    }


    return (
        <div>Home</div>
    )
}

export default Home