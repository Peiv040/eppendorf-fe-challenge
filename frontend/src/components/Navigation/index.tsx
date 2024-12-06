import React from 'react'
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';

import './navigation.css';

const Navigation: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isBaseURL = location.pathname === "/";   

    return (
        <nav>
            {!isBaseURL && <Button variant='contained' onClick={() => navigate('/')}>Back</Button>}
        </nav>
    )
}

export default Navigation;
