import { Card, Image } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

function CardVacation(props: any) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(props.cardProps.followercount);
    const navigate = useNavigate();
    const options: any = { day: 'numeric', month: 'numeric', year: 'numeric' };

    useEffect(() => {
        if (props.cardProps.isfollowing == 1) {
            setIsFollowing(true);
        } else {
            setIsFollowing(false);
        }
    },[]);

    async function followButton() {
        if (!localStorage.getItem("user")) {
            navigate("/login")
        } else {
            const followerObject = {
                FollowerUserID: JSON.parse(localStorage.getItem("user")!).userid,
                FollowedVacationID: props.cardProps.vacationid
            }
            try {
                if (isFollowing) {
                    const result = await axios.delete(`/api/followers/removeFollower?FollowerUserID=${followerObject.FollowerUserID}&FollowedVacationID=${followerObject.FollowedVacationID}`)
                    console.log(result.data);
                    setIsFollowing(false);
                    const changingArray = props.vacationsArray.map((vacation: any) => {
                        if (vacation.vacationid === followerObject.FollowedVacationID) {
                            vacation.isfollowing = 0;
                        }
                        return vacation;
                    })
                    props.setVacationsArray(changingArray);
                    let number = Number(followersCount);
                    number -= 1;
                    setFollowersCount(number);
                } else {
                    const result = await axios.post("/api/followers/adding", followerObject)
                    console.log(result.data);
                    setIsFollowing(true);
                    const changingArray = props.vacationsArray.map((vacation: any) => {
                        if (vacation.vacationid === followerObject.FollowedVacationID) {
                            vacation.isfollowing = 1;
                        }
                        return vacation;
                    })
                    props.setVacationsArray(changingArray);
                    let number = Number(followersCount);
                    number += 1;
                    setFollowersCount(number);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>

            <Card className='cardVacation'>
                <Card.Content extra className='cardContent'>
                    <Card.Header className='CardHeader'>{props.cardProps.destination}</Card.Header>
                    <div>
                        <Button onClick={followButton} className='followBtn' style={{ backgroundColor: isFollowing ? "#0D6EFD" : "rgb(193, 78, 193)" }}>{isFollowing ? "Unfollow" : "Follow"}</Button>
                        <p className="fa fa-user-circle-o">Followers- {followersCount}</p>
                    </div>
                </Card.Content>
                <Image className='cardImg' src={props.cardProps.imagefilename} />
                <Card.Content>
                    <Card.Meta>
                        <p className='date'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar2-event" viewBox="0 0 16 16">
                                <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                            </svg>
                            {new Date(props.cardProps.startdate).toLocaleDateString(undefined, options)} - {new Date(props.cardProps.enddate).toLocaleDateString(undefined, options)}</p>
                    </Card.Meta>
                    <Card.Description className='cardDescription'>{props.cardProps.description}</Card.Description>
                    <Card className='priceCard'>Price - {props.cardProps.price}$</Card>
                </Card.Content>
            </Card>

        </div>
    )
}

export default CardVacation;