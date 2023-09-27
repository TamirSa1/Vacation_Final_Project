import { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';

function ToggleButtons(props: any) {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);

    function paginationFilters(filteredArray: []) {
        let cardNumber = Math.ceil(filteredArray.length / 10)
        let array = [];
        for (let number = 1; number <= cardNumber; number++) {
            array.push(number);
        }
        props.setItems(array);
        props.setActive(1)
    }

    function filterArray1() {
        if (!checked1) {
            const filteredVacations = props.vacationsArray.filter((vacation: any) => {
                const startDate = new Date(vacation.StartDate);
                return startDate > new Date();
            });
            console.log(filteredVacations);
            props.setFilteredArray(filteredVacations)
            paginationFilters(filteredVacations)
        } else {
            const firstTenElements = props.vacationsArray.slice(0, 10);
            props.setFilteredArray(firstTenElements);
            paginationFilters(props.vacationsArray);
        }
        setChecked1(!checked1);
        setChecked2(false);
        setChecked3(false);
    }

    function filterArray2() {
        console.log(checked2)
        if (!checked2) {
            const currentDate = new Date();
            const filteredVacations = props.vacationsArray.filter((vacation: any) => {
                const startDate = new Date(vacation.StartDate);
                const endDate = new Date(vacation.EndDate);
                return currentDate >= startDate && currentDate <= endDate
            });
            console.log(filteredVacations);
            props.setFilteredArray(filteredVacations);
            paginationFilters(filteredVacations);
        } else {
            const firstTenElements = props.vacationsArray.slice(0, 10);
            props.setFilteredArray(firstTenElements)
            paginationFilters(props.vacationsArray);
        }
        setChecked2(!checked2);
        setChecked1(false);
        setChecked3(false);
    }

    function filteredArray3() {
        if (!checked3) {
            const filteredVacations = props.vacationsArray.filter((vacation: any) => {
                return vacation.IsFollowing === 1;
            })
            props.setFilteredArray(filteredVacations);
            paginationFilters(filteredVacations);
        } else {
            const firstTenElements = props.vacationsArray.slice(0, 10);
            props.setFilteredArray(firstTenElements)
            paginationFilters(props.vacationsArray);
        }
        setChecked3(!checked3);
        setChecked1(false);
        setChecked2(false);
    }

    return (
        <div>
            <div className="toggleBtnDiv">
                <div className='toggleButtonDiv'>
                    <p>Vacation that haven't started</p>
                    <ToggleButton
                        className="toggleButton1"
                        id="toggle-check1"
                        type="checkbox"
                        variant="outline-primary"
                        checked={checked1}
                        value="1"
                        onChange={() => filterArray1()}
                    >
                        Check
                    </ToggleButton>
                </div>

                <div className='toggleButtonDiv'>
                    <p>activated vacations</p>
                    <ToggleButton
                        className="toggleButton2"
                        id="toggle-check2"
                        type="checkbox"
                        variant="outline-primary"
                        checked={checked2}
                        value="2"
                        onChange={() => filterArray2()}
                    >
                        Check
                    </ToggleButton>
                </div>

                <div className='toggleButtonDiv'>
                    <p>Vacation followers</p>
                    <ToggleButton
                        className="toggleButton3"
                        id="toggle-check3"
                        type="checkbox"
                        variant="outline-primary"
                        checked={checked3}
                        value="3"
                        onChange={() => filteredArray3()}
                    >
                        Check
                    </ToggleButton>
                </div>

            </div>
        </div>
    )
}

export default ToggleButtons;