import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Outlet } from 'react-router-dom';
import App from './App';
import CreateTask from './Components/CreateTask';
import ErrorElement from './Components/ErrorElements';
import NotFound from './Components/NotFound';
import UpdateTask from './Components/UpdateTask/UpdateTask';
import InsecureContent from './InsecureContent/InsecureContent';


export default function Routing() {

    let route = createBrowserRouter(createRoutesFromElements(
        <Route element={<Outlet />} errorElement={<ErrorElement/>} >
            <Route index element={<App />} />
            <Route path='/note' element={<InsecureContent />} />
            <Route path='/createtask' element={<CreateTask />} />
            <Route path='/taskupdate' element={<UpdateTask />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    ))


    return (
        <>
            <RouterProvider router={route} />
        </>
    )
}