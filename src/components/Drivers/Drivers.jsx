import './Drivers.css';
import { useState, useEffect } from 'react';

const API = "https://ergast.com/api/f1";

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(false);
    // Load Drivers on page load (from API)
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            const res = await fetch(API + "/2022/drivers.json")
                .then((res) => res.json())
                .then((data) => data)
                .catch((err) => console.log(err));

            setLoading(false);
            //console.log(res.MRData.DriverTable.Drivers);

            setDrivers(res.MRData.DriverTable.Drivers);
        }

        loadData();
    }, [])

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="Drivers">
            <h2>Drivers</h2>
            {drivers.map((driver) => (
                <div className="driver" key={driver.driverId}>
                    <img src={require('../../assets/drivers/' + driver.driverId + '.png')} alt="imagem" />
                    {driver.permanentNumber} 
                    Name: {driver.givenName + " " + driver.familyName}
                    Nationality: {driver.nationality}
                    <a href={driver.url}>see more +</a>
                </div>
            ))}
        </div>
    )
}

export default Drivers;