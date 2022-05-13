import './Races.css';
import { useState, useEffect } from 'react';

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
            //console.log(res.MRData.DriverTable.Drivers);

            setRaces(res.MRData.RaceTable.Races);
        }

        loadData();
    }, [])

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="races">
            {races.map((race) => (
                <div className="race" key={race.Circuit.circuitId}>
                    <img src={require('../../assets/circuits/' + race.Circuit.circuitId + '.png')} alt="imagem" />
                    <div className="raceData">
                        <span>{race.raceName}</span>
                        <span>{race.Circuit.circuitName}</span>
                        <span><a href={"http://maps.google.com/maps?z=10&t=k&q=loc:" + race.Circuit.Location.lat + "+" + race.Circuit.Location.long}>{race.Circuit.Location.locality + " | " + race.Circuit.Location.country}</a></span>
                        <span><a href={race.url}>see more +</a></span>
                    </div>                    
                </div>
            ))}
        </div>
    )
}

export default Races;