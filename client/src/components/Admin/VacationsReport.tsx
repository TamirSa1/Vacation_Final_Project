import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { CSVLink } from "react-csv";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

function VacationsReport() {
    const [destinationsArray, setDestinationsArray] = useState<any[]>([]);
    const [followersArray, setFollowersArray] = useState<any[]>([]);
    const [arrayCsv, setArrayCsv] = useState<any[]>([]);

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Vacations Report',
                font : {
                    size :25,
                    family : 'Helvetica'
                }
            },
        },
    };


    const data = {
        labels: destinationsArray,
        datasets: [
            {
                label: 'Followers Number',
                data: followersArray,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'white',
            },
        ],
    };

    async function getVacations() {
        const followerId = JSON.parse(localStorage.getItem("user")!).UserID;
        try {
            const result = await axios.get(`http://localhost:4000/vacations/${followerId}`)
            console.log(result.data);
            let xArray = result.data.map((vacation: any) => {
                return vacation.Destination
            })
            setDestinationsArray(xArray)
            let yArray = result.data.map((vacation: any) => {
                return vacation.FollowerCount
            });
            setFollowersArray(yArray);
            let newArray = [];
            newArray.push(["Destinations", "Followers"])
            for (let index = 0; index < result.data.length; index++) {
                const element = result.data[index];
                newArray.push([element.Destination, element.FollowerCount])
            }
            setArrayCsv(newArray);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getVacations()
    }, [])

    return (
        <div className='reportDiv'>
            <CSVLink filename={"Vacations Report.csv"}
                className="btn btn-primary" data={arrayCsv}>Download CSV FIle</CSVLink>
            <div className='divChart'>
                <Line style={{ width: "80%" }} options={options} data={data} />
            </div>
        </div>
    )
}

export default VacationsReport