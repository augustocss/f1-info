import { useRef, useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
//import { TeamsInfo } from '../../Data.js';

const API = "https://ergast.com/api/f1";

const Home = () => {
    //const [lastRace, setLastRace] = useState([]);
    //const [upcomingRace, setUpcomingRace] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const last = useRef();
    const next = useRef();

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

            // load upcoming race
            const resUpcomingRace = await fetch(API + "/2022/" + nextRound + ".json")
                .then((res) => res.json())
                .then((data) => data)
                .catch((err) => {
                    console.log(err);
                    setError(true);
                });

            setLoading(false);
            //setLastRace(resLastRace.MRData.RaceTable.Races);
            last.current = resLastRace.MRData.RaceTable.Races[0].Results;
            //setUpcomingRace(resUpcomingRace.MRData.RaceTable.Races);
            next.current = resUpcomingRace.MRData.RaceTable.Races[0];
        }

        loadData();
    }, [])

    //console.log(last.current);

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className='homeTable'>
            <div className='homeRaces'>
                <h2>Last Round</h2>
                {(last.current).map((resu) => (
                    <div>{ resu.number }</div>
                ))}
            </div>
            <div className='homeRaces'>

            </div>
        </div>
    )
}

export default Home