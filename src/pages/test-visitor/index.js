import  React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as constants from '../../constants'
const base_url = constants.base_url

const Visitor = () => {
    const [visitor, setVisitor] = useState();
    useEffect(()=>{
        async function addVisitor() {
            const response = await axios.post(base_url+'/visitor/add-visitor')
        }
        addVisitor()
    },[])

    return (
        <>
        </>
    )
}

export default Visitor;
