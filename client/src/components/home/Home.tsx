import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        let isLoggedIn: any = null
        if (localStorage.getItem("user")) isLoggedIn = JSON.parse(localStorage.getItem("user") ?? '');
        if (isLoggedIn) {
            navigate('/vacations');
        } 
        else {
            navigate('/login');
        }
    }, []);

    return (
        <div>

        </div>
    )
}

export default Home