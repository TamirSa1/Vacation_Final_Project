import { Card, Image } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom"
import axios from 'axios';

function CardVacation(props: any) {
    const navigate = useNavigate();
    const options: any = { day: 'numeric', month: 'numeric', year: 'numeric' };

    async function followButton() {
        if (! localStorage.getItem("user")) {
            navigate("/login")
        } else {
            const followerObject = {
                FollowerUserID: JSON.parse(localStorage.getItem("user")!).UserID,
                FollowedVacationID: props.cardProps.VacationID
            }
            try {
                const result = await axios.post("http://localhost:4000/followers/adding" ,followerObject)
                console.log(result.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>

            <Card className='cardVacation'>
                <Card.Content extra className='cardContent'>
                    <Card.Header className='CardHeader'>{props.cardProps.Destination}</Card.Header>
                    <button onClick={followButton} className='followBtn'>Follow</button>
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

export default CardVacation;