import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersTable from './UsersTable';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UsersTable />} />
                <Route path="/add" element={<AddUser />} />
                <Route path="/update/:id" element={<UpdateUser />} />
            </Routes>
        </Router>
    );
}

export default App;
