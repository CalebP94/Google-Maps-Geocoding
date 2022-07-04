import { useEffect, useState, useMemo} from "react";
import Layout from "./Layout";
import TableDisplay from "./TableDisplay";
import "./App.css"

export default function Table(){
    //const URL = "http://localhost:5000"
    const URL = "https://googlemaps-nodejs-backend.herokuapp.com/"

    console.log("URL", URL)
    const [rootControlWork, setrootControlWork] = useState([]);
    //patern to populate variable with fetch from api in react... 
    useEffect(() => {
            
            const abortController = new AbortController(); // Create a new `AbortController`
            async function loadRootControl(){
                try{
                    const response = await fetch(`${URL}/Tables`,
                    {signal: abortController.signal}
                    );

                    const dataFromApi = await response.json();
                    setrootControlWork(dataFromApi.data);
        
                }
                catch (error) {
                    if (error.name === "AbortError") {
                    // Ignore `AbortError`
                    console.log("Aborted");
                    } else {
                    throw error;
                    }
                }  
            }
        loadRootControl()
        return () => {
            console.log("cleanup");
            abortController.abort(); // Cancels any pending request or response
        };
    },[]);

    console.log("RC", rootControlWork)


    return (
        <>
        {/* <div className="container-fluid">
            <div className="row h-100">
                <div className="col-lg-2 side-bar">
                    <SideBar/>
                </div>
            </div>
        </div> */}
        <div className="overscroll">
            <table className="table content-table">
                <thead>
                    <tr>
                        <th scope="col">Student ID</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Parent Name</th>
                        {/* <th scope="col">Length Treated</th> */}
                        <th scope="col">Address</th>
                        <th scope="col">City</th>
                        <th scope="col">State</th>
                        <th scope="col">Zip Code</th>
                        <th scope="col">Lattitude</th>
                        <th scope="col">Longitude</th>
                    </tr>
                </thead>
                {rootControlWork.map((rc)=> (
                <TableDisplay key={rc.object_id} table={rc}/>)
                )}
            </table>
        </div>
        <Layout />
        </>
    );

}