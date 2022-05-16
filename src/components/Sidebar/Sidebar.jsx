import './Sidebar.css';
import F1Logo from '../../assets/f1_logo_white.svg';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="Sidebar">
            <div className="logo">
                <Link to="/">
                    <img src={F1Logo} alt="F1 Logo" />
                </Link>
                <span>F1 info dashboard</span>
            </div>
            <div className="menu">
                <div className="menuItem active">
                    <span><Link to="/drivers">Drivers</Link></span>
                </div>
                <div className="menuItem">
                    <span><Link to="/teams">Teams</Link></span>
                </div>
                <div className="menuItem">
                    <span><Link to="/races">Races</Link></span>
                </div>
                <div className="menuItem">
                    <span><Link to="/standings">Standings</Link></span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;