import './Sidebar.css';
import F1Logo from '../../assets/f1_logo_white.svg';

const Sidebar = () => {
    return (
        <div className="Sidebar">
            <div className="logo">
                <img src={F1Logo} alt="" />
                <span>F1 info dashboard</span>
            </div>
            <div className="menu">
                <div className="menuItem">
                    <span>Drivers</span>
                </div>
                <div className="menuItem">
                    <span>Teams</span>
                </div>
                <div className="menuItem">
                    <span>Circuits</span>
                </div>
                <div className="menuItem">
                    <span>Standings</span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;