import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
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
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/register">Register</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/vacations">Vacations</Nav.Link>
                        {admin ? <div>
                            <Nav.Link href="/vacationsAdmin">Vacations Admin</Nav.Link>
                            <Nav.Link href="/vacationsReport">Vacations Report</Nav.Link>
                        </div> : ''}
                        {user ? <p className='welcomeUser'>welcome {user.FirstName} {user.LastName}</p> : <p>welcome</p>}
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar;