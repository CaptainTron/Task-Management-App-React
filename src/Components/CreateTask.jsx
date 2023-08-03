import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

const CreateTask = () => {

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
            taskname: '',
            description: '',
            status: 'Pending'
        },
        validate,
        onSubmit: values => {
            PostData();
        },
    });
    async function PostData() {
        try {
            let res = await fetch('http://Task-Management-env.eba-kpg8gsit.ap-south-1.elasticbeanstalk.com/task', {
                method: "POST",
                headers: { 'content-type': "application/json" },
                body: JSON.stringify({
                    taskname: formik.values.taskname,
                    description: formik.values.description,
                    status: formik.values.status,
                    dateofcreation: new Date().toLocaleString()
                })
            })
            let data = await res.json();
            if (res.status === 201) { alert("Successfully Created ") }
            else { alert(data.message) }
        } catch (error) {
            alert("Could Not Connect to Server...")
        }

    }
    return (
        <div className='CreateTaskContainer'>
            <div className='forminnercontainer'>
                <h2 className='createtaskheadings'>Create Task</h2>
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
                    <div className='createbtncontainer'>
                        <button id='submitbtn' type="submit">Create Task</button>

                    </div>
                </form>

                <p className='Backtodashboardbtrn'>Back to <Link to="/">Dashboard</Link></p>
            </div>
        </div>
    );
};

export default CreateTask

//     return (
//         <>

//         </>
//     )
// }