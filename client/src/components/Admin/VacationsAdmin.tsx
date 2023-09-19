import axios from "axios";
import { useEffect, useRef, useState } from "react";
import CardVacation from "./CardVacation";
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function VacationsAdmin() {
    const [vacationsArray, setVacationsArray] = useState<any[]>([]);
    const [filteredArray, setFilteredArray] = useState<any[]>([]);
    const [items, setItems] = useState<any[]>([]);
    const [active, setActive] = useState<number>(1);
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [destination, setDestination] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    let errorDestination: any = useRef(null);
    let errorDescription: any = useRef(null);
    let errorStartDate: any = useRef(null);
    let errorCurrentStartDate: any = useRef(null);
    let errorEndBeforeStart: any = useRef(null);
    let errorEndDate: any = useRef(null);
    let errorPrice: any = useRef(null);
    let errorPriceLarger: any = useRef(null);
    let errorImage: any = useRef(null);

    useEffect(() => {
        let cardNumber = Math.ceil(vacationsArray.length / 10)
        let array = [];
        for (let number = 1; number <= cardNumber; number++) {
            array.push(number);
        }
        setItems(array);
    }, [vacationsArray])

    function paginationClick(number: number) {
        setActive(number)
        let array = vacationsArray.slice((10 * (number - 1)), 10 * number)
        setFilteredArray(array);
    }

    async function getVacations() {
        try {
            const result = await axios.get("http://localhost:4000/vacations")
            console.log(result.data);
            setVacationsArray(result.data);
            const firstTenElements = result.data.slice(0, 10);
            setFilteredArray(firstTenElements);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let isLoggedIn: any = null
        if (localStorage.getItem("user")) isLoggedIn = JSON.parse(localStorage.getItem("user") ?? '');
        if (!isLoggedIn) {
            navigate('/login');
        }
        else {
            getVacations()
        }
    }, []);

    function openPopUp() {
        setShowPopup(!showPopup);
    }

    function addAdminVacation() {
        if (destination === "") {
            errorDestination.current.style.display = "block";
            return
        } else {
            errorDestination.current.style.display = "none";
        }
        if (description === "") {
            errorDescription.current.style.display = "block";
            return
        } else {
            errorDescription.current.style.display = "none";
        }
        if (startDate === "") {
            errorStartDate.current.style.display = "block";
            return
        } else {
            errorStartDate.current.style.display = "none";
        }
        if (new Date(startDate) < new Date()) {
            errorCurrentStartDate.current.style.display = "block";
            return
        } else {
            errorCurrentStartDate.current.style.display = "none";
        }
        if (endDate === "") {
            errorEndDate.current.style.display = "block";
            return
        } else {
            errorEndDate.current.style.display = "none";
        }
        if (new Date(endDate) < new Date(startDate)) {
            errorEndBeforeStart.current.style.display = "block";
            return
        } else {
            errorEndBeforeStart.current.style.display = "none";
        }
        if (price === "") {
            errorPrice.current.style.display = "block";
            return
        } else {
            errorPrice.current.style.display = "none";
        }
        if (price < "0" || price > "10000") {
            errorPriceLarger.current.style.display = "block";
            return
        } else {
            errorPriceLarger.current.style.display = "none";
        }
        if (image === "") {
            errorImage.current.style.display = "block";
            return
        } else {
            errorImage.current.style.display = "none";
        }
    }

    return (
        <div>
            <h1 className="vacationH1">Vacations Admin</h1>

            <Button onClick={openPopUp}>Add Vacation</Button>
            <Popup show={showPopup} handleClose={openPopUp}>

                <label>Add Destination</label>
                <Form.Control value={destination} onChange={(e) => setDestination(e.target.value)} type="text" placeholder="Destination" />
                <p ref={errorDestination} className='errorInput'>Fill the input to continue</p>

                <label>Add Description</label>
                <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3} placeholder="Description" />
                <p ref={errorDescription} className='errorInput'>Fill the input to continue</p>

                <label>Add start date</label>
                <Form.Control value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date" />
                <p ref={errorStartDate} className='errorInput'>Fill the input to continue</p>
                <p ref={errorCurrentStartDate} className='errorInput'>Start Date not valid</p>

                <label>Add end date</label>
                <Form.Control value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" />
                <p ref={errorEndDate} className='errorInput'>Fill the input to continue</p>
                <p ref={errorEndBeforeStart} className='errorInput'>End Date not valid</p>

                <label>Add Price</label>
                <Form.Control value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Price" min={0} max={10000} />
                <p ref={errorPrice} className='errorInput'>Fill the input to continue</p>
                <p ref={errorPriceLarger} className='errorInput'>Price must be 0 - 10,000</p>
                
                <label>Add Image</label>
                <Form.Control value={image} onChange={(e) => setImage(e.target.value)} type="text" placeholder="image url" />
                <p ref={errorImage} className='errorInput'>Fill the input to continue</p>

                <Button onClick={addAdminVacation} className="addVacationBtnAdmin" variant="success">Add</Button>
            </Popup>

            <div className='divCard'>
                {filteredArray.map(oneVacation => {
                    return (
                        <div key={oneVacation.VacationID}>
                            <CardVacation cardProps={oneVacation}></CardVacation>
                        </div>
                    )
                })}
            </div>
            <Pagination className="pagination">{items.map(number => {
                return (
                    <Pagination.Item onClick={() => paginationClick(number)} key={number} active={number === active}>
                        {number}
                    </Pagination.Item>
                )
            })}</Pagination>
        </div >
    )
}

export default VacationsAdmin;