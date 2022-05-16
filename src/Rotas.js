/*
    Referencia: https://www.w3schools.com/react/react_router.asp
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Drivers from "./components/Drivers/Drivers";
import Home from "./components/Home/Home";
import Races from "./components/Races/Races";
import Sidebar from "./components/Sidebar/Sidebar";
import Standings from "./components/Standings/Standings";
import Teams from "./components/Teams/Teams";

const Rotas = () => (
    <BrowserRouter>
        <Sidebar />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/drivers" element={<Drivers />} />
            <Route exact path="/teams" element={<Teams />} />
            <Route exact path="/races" element={<Races />} />
            <Route exact path="/standings" element={<Standings />} />
        </Routes>
    </BrowserRouter >
);

export default Rotas;