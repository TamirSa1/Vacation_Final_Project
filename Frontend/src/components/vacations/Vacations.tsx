import axios from "axios";
import { useEffect, useState } from "react";
import CardVacation from "./CardVacation";
import Pagination from 'react-bootstrap/Pagination';
import ToggleButtons from "./ToggleButtons";
import { useNavigate } from 'react-router-dom';

function Vacations() {
    const [vacationsArray, setVacationsArray] = useState<any[]>([]);
    const [filteredArray, setFilteredArray] = useState<any[]>([]);
    const [items, setItems] = useState<any[]>([]);
    const [active, setActive] = useState<number>(1);
    const navigate = useNavigate();

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
        const followerId = JSON.parse(localStorage.getItem("user")!).UserID;
        try {
            const result = await axios.get(`/vacations/${followerId}`)
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

    return (
        <div>
            <h1 className="vacationH1">Vacations</h1>

            <ToggleButtons vacationsArray={vacationsArray} setFilteredArray={setFilteredArray} filteredArray={filteredArray} setItems={setItems}
            setActive={setActive}/>

            <div className='divCard'>
                {filteredArray.map(oneVacation => {
                    return (
                        <div key={oneVacation.VacationID}>
                            <CardVacation cardProps={oneVacation} vacationsArray={vacationsArray} setVacationsArray={setVacationsArray} setFilteredArray={setFilteredArray}></CardVacation>
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
        </div>
    )
}

export default Vacations;