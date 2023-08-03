import "./UpdateTask.css"
import { useFormik } from 'formik';
import { Link, useSearchParams } from 'react-router-dom';
import { useState } from "react";



export default function UpdateTask() {


    const [params, Setparams] = useSearchParams()

    const validate = values => {
        const errors = {};
        if (!values.taskname) {
          errors.taskname = 'Required';
        } else if (values.taskname.length > 100) {
          errors.taskname = 'Must be 100 characters or less';
        }
      
        if (!values.description) {
          errors.description = 'Required';
        } else if (values.description.length > 100) {
          errors.description = 'Must be 100 characters or less';
        }
      
        if (!values.status) {
          errors.status = 'Required';
        }
      
        return errors;
      };

    const formik = useFormik({
        initialValues: {
            taskname: params.get("taskname"),
            description: params.get("description"),
            status: params.get("status")
        },
        validate,
        onSubmit: values => {
            Update()
        },
    });

    async function Update() {
        try {
            let res = await fetch(`http://localhost:5000/task?_id=${params.get("ID")}`, {
                method: "PATCH",
                headers: { 'content-type': "application/json" },
                body: JSON.stringify({
                    taskname: formik.values.taskname,
                    description: formik.values.description,
                    status: formik.values.status,
                    dateofcreation: new Date().toLocaleString()
                })
            })
            let data = await res.json()
            if (res.status === 200) alert("Successfully Updated !")
            else { alert(data.message) }
        } catch (error) {
            alert("Could Not Connect to Server...")
        }
    }

    async function DeleteTask() {
        try {
            let res = await fetch(`http://Task-Management-env.eba-kpg8gsit.ap-south-1.elasticbeanstalk.com/task?_id=${params.get("ID")}`, {
                method: "DELETE",
                headers: { 'content-type': "application/json" }
            })
            let data = await res.json()
            if (res.status === 200) alert("Successfully Deleted !")
            else { alert(data.message) }
        } catch (error) {
            alert("Could Not Connect to Server...")
        }
    }



    return (
        <div className='CreateTaskContainer'>
            <div className='forminnercontainer'>
                <h2 className="updatetaskheader" >Update Task</h2>
                <p style={{ color: "gray", fontStyle: "italic", margin: "0vh", fontSize: "2vh" }}>Task ID : {params.get("ID")}</p>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="taskname">Task Name :</label>
                    <input
                        id="taskname"
                        name="taskname"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.taskname}
                        autocomplete="off"
                    /> 
                    {formik.errors.taskname ? <div className="formError">{formik.errors.taskname}</div> : null}
                    <br />
                    <label htmlFor="description">Task Description :</label>
                    <input
                        id="description"
                        name="description"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        autocomplete="off"
                    />
                    {formik.errors.description ? <div className="formError">{formik.errors.description}</div> : null}
                    <br />
                    <label htmlFor="status">Task Status :</label>
                    <select
                        id="status"
                        name="status"
                        type="select"
                        onChange={formik.handleChange}
                        value={formik.values.status}
                        autocomplete="off"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>

                    </select>
                    {formik.errors.status ? <div className="formError">{formik.errors.status}</div> : null}
                    <br />
                    <div className="Updatetaskbtncontainer">
                        <button className='Updatesubmitbtn' type="submit">Update Task</button>
                        <div className='Updatesubmitbtn deletebtn' onClick={() => DeleteTask()}>Delete Task</div>
                    </div>
                </form>

                <p className="Backtodashboardbtrn">Back to <Link to="/">Dashboard</Link></p>
            </div>
        </div>
    );
};