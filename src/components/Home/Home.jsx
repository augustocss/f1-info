import './Home.css';

import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
import { TeamsInfo } from '../../Data.js';

const API = "https://ergast.com/api/f1";

const Home = () => {
    const [lastRace, setLastRace] = useState([]);
    //    const [lastRaceName, setLastRaceName] = useState([]);    
    const [upcomingRace, setUpcomingRace] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nextRound, setNextRound] = useState(null);

    // fetch last race
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            // load last race
            const resLastRace = await fetch(API + "/current/last/results.json")
                .then((res) => res.json())
                .then((data) => data)
                .catch((err) => {
                    console.log(err);
                });

            // capturando o round atual (e incrementando 1) numa var temp pois o state abaixo nao fica imediatamente disponivel
            setNextRound(Number(resLastRace.MRData.RaceTable.Races[0].round) + 1);

            setLoading(false);
            setLastRace(resLastRace.MRData.RaceTable.Races);
        }
        loadData();
    }, []);
    console.log(lastRace);

    // fetch upcoming race
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            // load upcoming race
            const resUpcomingRace = await fetch(API + "/2022/" + nextRound + ".json")
                .then((res) => res.json())
                .then((data) => data)
                .catch((err) => {
                    console.log(err);
                });
            setLoading(false);
            setUpcomingRace(resUpcomingRace.MRData.RaceTable.Races);
        }
        nextRound && loadData();

    }, [lastRace, nextRound]);
    //console.log(upcomingRace);

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className='homeTable'>
            {lastRace.map((race, i) => (
                <div className='lastRace' key={i} style={{ backgroundImage: `url("/${race.Circuit.circuitId}-photo.jpg")`, backgroundPosition: "center", backgroundSize: "cover"}}>
                    <h2>Last Race</h2>
                    <h6>{race.raceName}</h6>
                    {(race.Results).slice(0, 3).map((res, i) => (
                        <div className='lastResults' key={i} style={{ backgroundColor: (TeamsInfo.find(data => data.teamName === res.Constructor.constructorId)).teamColor }}>
                            <div id='resDriver'>{res.Driver.familyName}</div>
                            <div id='resPosition'>{res.position}</div>
                        </div>
                    ))}
                </div>
            ))}

            {upcomingRace.map((race, i) => (
                <div key={i} className='upcomingRace' style={{ backgroundImage: `url("/${race.Circuit.circuitId}-photo.jpg")`, backgroundPosition: "center", backgroundSize: "cover" }}>
                    <h2>Upcoming Race</h2>
                    <h6>{race.raceName}</h6>
                    <p>{race.Circuit.Location.locality}</p>
                    <p>{race.date}</p>
                </div>
            ))}
        </div>
    )
}

export default Home