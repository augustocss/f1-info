import './Standings.css';
import { useState, useEffect } from 'react';

const API = "https://ergast.com/api/f1";

const Standings = () => {
    const [constructors, setConstructors] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load Drivers/Constructors on page load (from API)
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            // load drivers
            const resDrivers = await fetch(API + "/2022/driverStandings.json")
                .then((res) => res.json())
                .then((data) => data)
                .catch((err) => console.log(err));

            // load constructors
            const resConstructors = await fetch(API + "/2022/constructorStandings.json")
                .then((res) => res.json())
                .then((data) => data)
                .catch((err) => console.log(err));

            setLoading(false);

            setDrivers(resDrivers.MRData.StandingsTable.StandingsLists[0].DriverStandings);

            setConstructors(resConstructors.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);

            //console.log(resDrivers.MRData.StandingsTable.StandingsLists[0]);
        }

        loadData();
    }, [])

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="standingsTable">
            <div className="standings">
                <h2>Drivers Standings</h2>
                {drivers.map((driver) => (
                    <div className="standing" key={driver.Driver.driverId}>
                        <div>{driver.position}º</div>
                        <div className="standingData">
                            <span>{driver.Driver.givenName + " " + driver.Driver.familyName}</span>
                            <span>{driver.Constructors[0].name}</span>
                        </div>
                        <div>{driver.points}</div>
                    </div>
                ))}
            </div>
            <div className="standings">
                <h2>Constructors Standings</h2>
                {constructors.map((constructor) => (
                    <div className="standing" key={constructor.Constructor.constructorId}>
                        <div>{constructor.position}º</div>
                        <div className="standingData">
                            <span>{constructor.Constructor.name}</span>
                            <span>{constructor.Constructor.nationality}</span>
                        </div>
                        <div>{constructor.points}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Standings;