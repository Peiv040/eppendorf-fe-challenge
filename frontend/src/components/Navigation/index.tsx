import React from 'react'
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import lang from '../../locales/en.json'

import './navigation.css';

const Navigation: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isBaseURL = location.pathname === "/";   

    return (
        <nav>
            {!isBaseURL &&
                <Button
                    variant='contained'
                    onClick={() => navigate('/')}
                >
                    {lang.back}
                </Button>
            }
        </nav>
    )
}

export default Navigation;
