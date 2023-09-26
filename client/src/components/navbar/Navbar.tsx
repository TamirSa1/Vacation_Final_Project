import { useEffect, useState } from 'react';
// import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
    const [admin, setAdmin] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        let isLoggedIn: any = null
        if (localStorage.getItem("user")) {
            isLoggedIn = JSON.parse(localStorage.getItem("user") ?? '');
            setUser(isLoggedIn);
        }
        if (isLoggedIn && isLoggedIn.Role === 'Admin') {
            setAdmin(true);
        }

    }, []);

    return (
        <div>
            <Navbar bg="primary" data-bs-theme="dark" className='navbar1'>
                    <Nav className="me-auto">
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                        <Nav.Link href="/register">Register</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/vacations">Vacations</Nav.Link>
                        {admin ? <div className='adminDivNavBar'>
                            <Nav.Link href="/vacationsAdmin">Vacations Admin</Nav.Link>
                            <Nav.Link href="/vacationsReport">Vacations Report</Nav.Link>
                        </div> : ''}
                    </Nav>
                        <div className='welcomeNavBar'>
                        {user ? <p className='welcomeUser'>Welcome, {user.FirstName} {user.LastName}</p> : <p>Welcome!</p>}
                        </div>
            </Navbar>
        </div>
    )
}

export default NavBar;