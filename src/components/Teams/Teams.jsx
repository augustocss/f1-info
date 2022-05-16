import './Teams.css';
import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
import { TeamsInfo } from '../../Data.js';

const API = "https://ergast.com/api/f1";

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    // Load Drivers on page load (from API)
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            const res = await fetch(API + "/2022/constructors.json")
                .then((res) => res.json())
                .then((data) => data)
                .catch((err) => console.log(err));

            setLoading(false);
            //console.log(res.MRData.DriverTable.Drivers);

            setTeams(res.MRData.ConstructorTable.Constructors);
        }

        loadData();
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="teams">
            {teams.map((team) => (
                <div className="team" key={team.constructorId}>                    
                    <img src={require('../../assets/teams/' + team.constructorId + '.png')} alt="imagem" />
                    <div className="teamData">
                        <span>{team.name}</span>
                        <span>{team.nationality}</span>
                        <span><a href={team.url}>see more +</a></span>
                    </div>                    
                </div>
            ))}
        </div>
    )
}

export default Teams;