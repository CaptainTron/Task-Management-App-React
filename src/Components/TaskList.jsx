import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Tasks from "./Task"
const { v4: uuidv4 } = require('uuid');

export default function TaskList() {
    const [Fetched, SetFetched] = useState([])
    const [Isdata, SetIsdata] = useState({
        Datanow: false,
        fail: false
    })

    let tasks;
    async function GetData() {
        try {
            SetIsdata((p) => ({ ...p, Datanow: false }))
            let res = await fetch('http://Task-Management-env.eba-kpg8gsit.ap-south-1.elasticbeanstalk.com/task', {
                method: "GET",
                headers: { 'content-type': "application/json" }
            })
            let data = await res.json();
            SetFetched(data.task)
            SetIsdata((p) => ({ ...p, Datanow: true }))
        } catch (error) {
            SetIsdata((p) => ({ ...p, fail: true }))
            // alert("Could Not Connect To Server...")
        }
    }
    if (Fetched) {
        tasks = Fetched.length ? (Fetched.map((data) => (<div key={uuidv4()} className='FetchedDataContainer'><NavLink to={`taskupdate?ID=${data._id}&taskname=${data.taskname}&description=${data.description}&status=${data.status}`}> <Tasks name={data.taskname} ID={data._id} description={data.description} status={data.status} date={data.dateofcreation} /></NavLink></div>))) : (<p className='notaskstillnow'>No Tasks Till Now !</p>)
    }
    useEffect(() => {
        GetData();
    }, [])

    return (
        <>
            <div className='FetchedtasksContainerinReturn'>
                {Isdata.Datanow ? tasks : (Isdata.fail ? (<p className='notconnect'>Could not Connect to Server...</p>) : (<p className='loadingstate'>Loading...</p>))}
            </div>
        </>
    )
}