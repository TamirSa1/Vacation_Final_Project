// import { useState } from 'react';
// import ToggleButton from 'react-bootstrap/ToggleButton';

// function ToggleButtons() {
//     const [vacationsArray, setVacationsArray] = useState<any[]>([]);
//     const [checked1, setChecked1] = useState(false);
//     const [checked2, setChecked2] = useState(false);
//     const [checked3, setChecked3] = useState(false);

//     return (
//         <div>
//             <div className="toggleBtnDiv">
//                 <div>
//                     <p>Vacation that haven't started</p>
//                     <ToggleButton
//                         className="toggleButton1"
//                         id="toggle-check"
//                         type="checkbox"
//                         variant="outline-primary"
//                         checked={checked1}
//                         value="1"
//                         onChange={() => setChecked1(!checked1)}
//                     >
//                         Check
//                     </ToggleButton>
//                 </div>

//                 <div>
//                     <p>Vacation that haven't started</p>
//                     <ToggleButton
//                         className="toggleButton2"
//                         id="toggle-check"
//                         type="checkbox"
//                         variant="outline-primary"
//                         checked={checked2}
//                         value="1"
//                         onChange={() => setChecked2(!checked2)}
//                     >
//                         Check
//                     </ToggleButton>
//                 </div>

//                 <div>
//                     <p>Vacation that haven't started</p>
//                     <ToggleButton
//                         className="toggleButton3"
//                         id="toggle-check"
//                         type="checkbox"
//                         variant="outline-primary"
//                         checked={checked3}
//                         value="1"
//                         onChange={() => setChecked3(!checked3)}
//                     >
//                         Check
//                     </ToggleButton>
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default ToggleButtons;



import { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Vacations from './Vacations';

function ToggleButtons(props: any) {
    // const [vacationsArray, setVacationsArray] = useState<any[]>([]);
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);

    function filterArray1() {
        setChecked1(!checked1);
        setChecked2(false)
        if (checked1) {
            const filteredVacations = props.vacationsArray.filter((vacation: any) => {
                const startDate = new Date(vacation.StartDate);
                return startDate > new Date();
            });
            console.log(filteredVacations);
            props.setFilteredArray(filteredVacations)
        } else {
            props.setFilteredArray(props.vacationsArray)
        }
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

            props.setFilteredArray(filteredVacations)
        } else {
            props.setFilteredArray(props.vacationsArray)
        }
        setChecked2(!checked2);
        setChecked1(false);
    }

    return (
        <div>
            <div className="toggleBtnDiv">
                <div>
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

                <div>
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

                <div>
                    <p>Vacation followers</p>
                    <ToggleButton
                        className="toggleButton3"
                        id="toggle-check3"
                        type="checkbox"
                        variant="outline-primary"
                        checked={checked3}
                        value="3"
                        onChange={() => setChecked3(!checked3)}
                    >
                        Check
                    </ToggleButton>
                </div>

            </div>
        </div>
    )
}

export default ToggleButtons;