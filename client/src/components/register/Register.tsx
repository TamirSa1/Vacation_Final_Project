import { useState, useRef } from 'react';
import {
    // MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    // MDBIcon,
    // MDBCheckbox
}
    from 'mdb-react-ui-kit';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    let errorFirstName: any = useRef(null)
    let errorLastName: any = useRef(null)
    let errorEmail: any = useRef(null)
    let correctEmail: any = useRef(null)
    let errorPassword: any = useRef(null)

    function ClickRegister() {
        if (firstName === "") {
            errorFirstName.current.style.display = "block";
            return
        }
        if (lastName === "") {
            errorLastName.current.style.display = "block";
            return
        }
        if (email === "") {
            errorEmail.current.style.display = "block";
            return
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
        addingUser()
    }

    async function addingUser() {
        let userObject = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Password: password
        }
        try {
            const result = await axios.post("http://localhost:4000/users/register", userObject)
            console.log(result.data);
            if (result.data === "Email is taken") {
                alert("Email is taken")
            } else {
                navigate("/vacation")
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

                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>

                                <div className="mb-4">
                                    <label>First Name</label>
                                    <MDBInput value={firstName} onChange={(e) => setFirstName(e.target.value)} id='form1' type='text' className='w-100' />
                                    <p ref={errorFirstName} className='errorInput'>Fill the input to continue</p>
                                </div>

                                <div className="mb-4">
                                    <label>Last Name</label>
                                    <MDBInput value={lastName} onChange={(e) => setLastName(e.target.value)} id='form2' type='text' />
                                    <p ref={errorLastName} className='errorInput'>Fill the input to continue</p>
                                </div>

                                <div className="mb-4">
                                    <label>Email</label>
                                    <MDBInput value={email} onChange={(e) => setEmail(e.target.value)} id='form3' type='email' />
                                    <p ref={errorEmail} className='errorInput'>Fill the input to continue</p>
                                    <p ref={correctEmail} className='errorInput'>Please use a valid email address</p>
                                </div>

                                <div className="mb-4">
                                    <label>Password</label>
                                    <MDBInput value={password} onChange={(e) => setPassword(e.target.value)} id='form4' type='password' />
                                    <p ref={errorPassword} className='errorInput'>The password shoul be a 4 characters</p>
                                </div>

                                <button onClick={ClickRegister} className='loginBtn'>Register</button>
                                <div className='registerDiv'>
                                    <p className='pRegister'>Already a member?</p>
                                    <Link to="/login">Login</Link>
                                </div>

                            </MDBCol>

                            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                                <MDBCardImage src='https://media.istockphoto.com/id/1295660412/vector/online-sign-up-click-on-the-registration-button-and-lead-conversion-process-hand-pushing-the.jpg?s=612x612&w=0&k=20&c=09-qd5BwDqypZIMjTK_vdn7c4Yxkb7TsRYZ6br8JVc4=' fluid />
                            </MDBCol>

                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>

            </MDBContainer>
        </div>
    )
}

export default Register;