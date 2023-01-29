import { data } from "msw/lib/types/context";
import { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

const CheckDate = (props) => {
    const [exists, setExists] = useState();

    const fetchDate = () => {
        try{
            const {data} = axiosReq.get(`/bookings/?${props}`)
            setExists(data)
        }catch(error){
            console.log(error)
        }
    };

    useEffect(() => {
        fetchDate();
        }, [])
    
    return data
}

export default CheckDate;