import './Drivers.css';
import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';


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

            setDrivers(res.MRData.DriverTable.Drivers.sort(function(a, b) {
                if(a.givenName < b.givenName) return -1;
                if(a.givenName > b.givenName) return 1;
                return 0;
            }));
        }

        loadData();
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="drivers">
            {drivers.map((driver) => (
                <div className="driver" key={driver.driverId}>
                    <div className="driverData">
                        <span>#{driver.permanentNumber}</span>
                        <span>{driver.givenName + " " + driver.familyName}</span>
                        <span>{driver.nationality}</span>
                        <span><a href={driver.url}>see more +</a></span>
                    </div>
                    <img src={require('../../assets/drivers/' + driver.driverId + '.png')} alt="imagem" />                    
                </div>
            ))}
        </div>
    )
}

export default Drivers;