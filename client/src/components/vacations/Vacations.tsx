import axios from "axios";
import { useEffect } from "react";

function Vacations() {

    async function getVacations(){
        try {
            const result = await axios.get("http://localhost:4000/vacations")
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getVacations()
    },[])

    return (
        <div>
            <h1>Vacations</h1>
        </div>
    )
}

export default Vacations;