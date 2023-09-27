import { useState, useRef } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function Login(props: any) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    let errorEmail: any = useRef(null);
    let correctEmail: any = useRef(null);
    let errorPassword: any = useRef(null);

    function clickLogin() {
        if (email === "") {
            errorEmail.current.style.display = "block";
            return
        }
        else {
            errorEmail.current.style.display = "none";
        }
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(mailformat)) {
            correctEmail.current.style.display = "block";
            return
        }
        if (password.length < 4) {
            errorPassword.current.style.display = "block";
            return
        }
        userLogin();
    }

    async function userLogin() {
        let loginObject = {
            Email: email,
            Password: password
        }
        try {
            const result = await axios.post("http://localhost:4000/users/login", loginObject)
            console.log(result.data);
            if (typeof result.data == "string") {
                alert(result.data);
            } else {
                localStorage.setItem("user", JSON.stringify(result.data));
                navigate("/vacations")
                props.setIsLogin(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <MDBContainer fluid>

                <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                                <div className="mb-4">
                                    <label>Email</label>
                                    <MDBInput value={email} onChange={(e) => setEmail(e.target.value)} id='form3' type='email' />
                                    <p ref={errorEmail} className='errorInput'>Fill the input to continue</p>
                                    <p ref={correctEmail} className='errorInput'>Incorrect Email</p>
                                </div>

                                <div className="mb-4">
                                    <label>Password</label>
                                    <MDBInput value={password} onChange={(e) => setPassword(e.target.value)} id='form4' type='password' />
                                    <p ref={errorPassword} className='errorInput'>The password shoul be a 4 characters</p>
                                </div>

                                <button onClick={clickLogin} className="loginBtn">Login</button>

                                <div className='registerDiv'>
                                    <p className='pRegister'>Don't have account?</p>
                                    <Link to="/register">Register</Link>
                                </div>

                            </MDBCol>

                            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                                <MDBCardImage src='https://t3.ftcdn.net/jpg/04/54/09/98/360_F_454099801_32LqElT2W1vgRQ6YRsp3h2IsKQxTCnaG.jpg' fluid />
                            </MDBCol>

                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>

            </MDBContainer>
        </div>
    )
}

export default Login;