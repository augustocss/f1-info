import './Races.css';
import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';

const moment = require('moment');


const API = "https://ergast.com/api/f1";

const Races = () => {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(false);
    // Load Drivers on page load (from API)
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            const res = await fetch(API + "/2022.json")
                .then((res) => res.json())
                .then((data) => data)
                .catch((err) => console.log(err));

            setLoading(false);
            
            setRaces(res.MRData.RaceTable.Races);
        }

        loadData();
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="races">
            {races.map((race) => (
                <div className="race" key={race.Circuit.circuitId}>
                    <img src={require('../../assets/circuits/' + race.Circuit.circuitId + '.png')} alt="imagem" />
                    <div className="raceData">
                        <span>{race.raceName}</span>
                        <span><a href={"http://maps.google.com/maps?z=10&t=k&q=loc:" + race.Circuit.Location.lat + "+" + race.Circuit.Location.long}>{race.Circuit.circuitName}</a></span>
                        <span>{race.Circuit.Location.locality + " | " + race.Circuit.Location.country}</span>
                        <span>{moment(race.FirstPractice.date).format("DD") + "-" + moment(race.date).format("DD") + " " + moment(race.date).format("MMM")}</span>
                        <span><a href={race.url}>see more +</a></span>
                    </div>                    
                </div>
            ))}
        </div>
    )
}

export default Races;