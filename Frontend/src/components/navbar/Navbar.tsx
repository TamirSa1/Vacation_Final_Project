import React , { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar(props: any) {
    const [admin, setAdmin] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        let isLoggedIn: any = null
        if (localStorage.getItem("user")) {
            isLoggedIn = JSON.parse(localStorage.getItem("user") ?? '');
            setUser(isLoggedIn);
        }
        if (isLoggedIn && isLoggedIn.role === 'Admin') {
            setAdmin(true);
        }
    }, [props.isLogin]);

    function logOut() {
        localStorage.removeItem("user");
        window.location.href = "/login";
    }

    return (
        <div>
            <Navbar bg="primary" data-bs-theme="dark" className='navbar1'>
                <Nav className="me-auto">
                    <Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/vacations">Vacations</Nav.Link>
                    {admin ? <div className='adminDivNavBar'>
                        <Nav.Link href="/vacationsAdmin">Vacations Admin</Nav.Link>
                        <Nav.Link href="/vacationsReport">Vacations Report</Nav.Link>
                    </div> : ''}
                </Nav>
                <div className='welcomeNavBar'>
                    {user ? <p className='welcomeUser'>Welcome, {user.firstname} {user.lastname}</p> : <p>Welcome!</p>}
                    {user ? <span onClick={logOut} className='logout'>LogOut</span> : <></>}
                </div>
            </Navbar>
        </div>
    )
}

export default NavBar;