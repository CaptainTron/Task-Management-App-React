import { Link } from "react-router-dom";

export default function NotFound() {



    return (
        <>
            <div className="NotFound">
                <h2>The Page You Are Looking For Does Not Exists</h2>
                <p>Go to <Link to='/'>Dashboard</Link></p>
            </div>
        </>
    )
}