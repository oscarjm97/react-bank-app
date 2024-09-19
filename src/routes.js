import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Movements from './pages/Movements';
import Transfers from './pages/Transfers';
import Deposits from './pages/Deposits';
import Brokers from './pages/Brokers'; // Añadimos Brokers

const AppRoutes = ({ name }) => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard userName={name} />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/movements" element={<Movements />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="/deposits" element={<Deposits />} />
            <Route path="/brokers" element={<Brokers />} /> {/* Nueva ruta */}
        </Routes>
    );
};

export default AppRoutes;
