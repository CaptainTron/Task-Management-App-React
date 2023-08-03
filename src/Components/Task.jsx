import './Task.css'
export default function Tasks({ name, ID, description, status, date }) {
    return (
        <>
            <div className="TasksContainer">
                <p className='tasknamenID'>{name} <span className='taskID'>ID :  {ID}</span></p>
                <p>{description}</p>
                <p className='statusndate'><span className={`${status === "Pending" ? "Yellowcolor" : "Greencolor"}`}>{status}</span> <span className='taskdate'>{String(date)}</span></p>
            </div>
        </>
    )
}