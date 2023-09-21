import axios from 'axios';
import { Card, Image } from 'semantic-ui-react'
import { useRef, useState } from "react";
import Popup from './Popup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CardVacationAdmin(props: any) {
    const [showPopup, setShowPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [destination, setDestination] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState<any>("");
    const [endDate, setEndDate] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState("");
    const options: any = { day: 'numeric', month: 'numeric', year: 'numeric' };

    let errorDestination: any = useRef(null);
    let errorDescription: any = useRef(null);
    let errorStartDate: any = useRef(null);
    let errorEndBeforeStart: any = useRef(null);
    let errorEndDate: any = useRef(null);
    let errorPrice: any = useRef(null);
    let errorPriceLarger: any = useRef(null);
    let errorImage: any = useRef(null);


    async function deleteVacationCard() {
        try {
            const result = await axios.delete(`http://localhost:4000/vacations/deleteVacation/${props.cardProps.VacationID}`)
            console.log(result.data);
            let afterDeleteArray = props.vacationsArray.filter((vacation: any) => vacation.VacationID !== props.cardProps.VacationID)
            props.setVacationsArray(afterDeleteArray);
            props.setFilteredArray(afterDeleteArray);
        } catch (error) {
            console.log(error);
        }
    }

    function confirmDelete() {
        setDeletePopup(!deletePopup)
    }

    function inputsVacation() {
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
        if (price === 0) {
            errorPrice.current.style.display = "block";
            return
        } else {
            errorPrice.current.style.display = "none";
        }
        if (price < 0 || price > 10000) {
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
        editVacation();
    };

    async function editVacation() {
        const vacationIDToUpdate = props.cardProps.VacationID;
        const updatedVacationData = {
            VacationID: vacationIDToUpdate,
            Destination: destination,
            Description: description,
            StartDate: startDate,
            EndDate: endDate,
            Price: price,
            ImageFileName: image
        }
        try {
            const response = await axios.put(`http://localhost:4000/vacations/editVacation/${vacationIDToUpdate}`, updatedVacationData);
            if (response.status === 204) {
                console.log("Vacation updated successfully");
                const clonedVacations = [...props.vacationsArray];
                const indexToEdit = clonedVacations.findIndex((vacation) => vacation.VacationID === vacationIDToUpdate);
                if (indexToEdit !== -1) {
                    clonedVacations[indexToEdit] = updatedVacationData;
                    props.setVacationsArray(clonedVacations);
                    props.setFilteredArray(clonedVacations);
                }
                setShowPopup(false);
                alert("Vacation Updated successfully");
            } else {
                console.error("Failed to update vacation");
            }
        } catch (error) {
            console.error("Error updating vacation:", error);
        }
    }

    function showEditPopUp() {
        setShowPopup(!showPopup)
        setDestination(props.cardProps.Destination)
        setDescription(props.cardProps.Description);
        setStartDate(new Date(props.cardProps.StartDate).toLocaleDateString('en-CA'));
        setEndDate(new Date(props.cardProps.EndDate).toLocaleDateString('en-CA'));
        setPrice(props.cardProps.Price);
        setImage(props.cardProps.ImageFileName);
    }

    return (
        <div>
            <Popup show={deletePopup} handleClose={confirmDelete}>
                <h3>Are you sure do you want to delete?</h3>
                <button onClick={deleteVacationCard} className='deleteBtnPopUp'>Yes</button>
            </Popup>

            <Popup show={showPopup} handleClose={showEditPopUp}>

                <label>Add Destination</label>
                <Form.Control value={destination} onChange={(e) => setDestination(e.target.value)} type="text" placeholder="Destination" />
                <p ref={errorDestination} className='errorInput'>Fill the input to continue</p>

                <label>Add Description</label>
                <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3} placeholder="Description" />
                <p ref={errorDescription} className='errorInput'>Fill the input to continue</p>

                <label>Add Start Date</label>
                <Form.Control className="startDateInputPopup" value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date" />
                <p ref={errorStartDate} className='errorInput'>Fill the input to continue</p>

                <label>Add End Date</label>
                <Form.Control className="endDateInputPopup" value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" />
                <p ref={errorEndDate} className='errorInput'>Fill the input to continue</p>
                <p ref={errorEndBeforeStart} className='errorInput'>End Date not valid</p>

                <label>Add Price</label>
                <Form.Control className="priceInputPopup" value={price} onChange={(e: any) => setPrice(e.target.value)} type="number" placeholder="Price $" min={0} max={10000} />
                <p ref={errorPrice} className='errorInput'>Fill the input to continue</p>
                <p ref={errorPriceLarger} className='errorInput'>Price must be 0 - 10,000</p>

                <label>Add Image</label>
                <Form.Control value={image} onChange={(e) => setImage(e.target.value)} type="text" placeholder="image url" />
                <p ref={errorImage} className='errorInput'>Fill the input to continue</p>

                <Button onClick={inputsVacation} className="addVacationBtnAdmin" variant="success">Edit</Button>
            </Popup>

            <Card className='cardVacation'>
                <Card.Header className='CardHeader'>{props.cardProps.Destination}</Card.Header>
                <Card.Content extra>
                    <button onClick={showEditPopUp}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                    </svg> Edit</button>
                    <button onClick={confirmDelete}>Delete</button>
                </Card.Content>
                <Image className='cardImg' src={props.cardProps.ImageFileName} />
                <Card.Content>
                    <Card.Meta>
                        <p className='date'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar2-event" viewBox="0 0 16 16">
                                <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                            </svg>
                            {new Date(props.cardProps.StartDate).toLocaleDateString(undefined, options)} - {new Date(props.cardProps.EndDate).toLocaleDateString(undefined, options)}</p>
                    </Card.Meta>
                    <Card.Description className='cardDescription'>{props.cardProps.Description}</Card.Description>
                    <Card className='priceCard'>Price - {props.cardProps.Price}$</Card>
                </Card.Content>

            </Card>

        </div>
    )
}

export default CardVacationAdmin;