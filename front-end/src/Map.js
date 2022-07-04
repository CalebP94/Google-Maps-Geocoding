import { GoogleMap, useLoadScript, Marker, Wrapper } from "@react-google-maps/api";
import { useEffect, useState, useMemo} from "react";
import axios from "axios";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Table from "./Table";
import Layout from "./Layout";
export default function Map() {
    
    const URL = "http://localhost:5000";
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDienyZ6LR0VlXwoDKREjQx4IUpEwmZpB8",
      });
    const studentOBJ = {
        studentID:"",
        studentName:"",
        parentName:"",
        address:"",
        city:"",
        state:"",
        zipcode:"",
        lat:"",
        long:""
    }
    const [submission, setSubmission] = useState(0);
    const [student, setStudent] = useState({...studentOBJ})
    const [allStudent, setAllStudent] = useState(null)
    const [newCenter, setNewCenter] = useState(null)
    const addressCenter = useMemo(() => ({newCenter}))
    const changeHandler = (event) => {
        if(event.target.name ==='studentID' || event.target.name === 'lat' || event.target.long === 'long'){
            setStudent({
                ...student,
                [event.target.name]: parseInt(event.target.value)
            });
        }
        setStudent({...student, [event.target.name]:event.target.value});
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            console.log("Submitted:", student);
            await axios.post(URL, {data: student});
        } catch (error) {
            console.log(error);
        }
    };
    const encoder = async(address) => {
        setSubmission(submission + 1)
        let string = `${student.address} ${student.city} ${student.state}`
        let obj = {address:string}
        console.log(obj)
        const result = await getGeocode(obj)
        const { lat, lng } = await getLatLng(result[0]);
        console.log({lat, lng})
        setNewCenter({lat, lng})
        student['lat'] = lat
        student['long'] = lng
        console.log(student)
    }
    useEffect (()=> {
        async function loadStudent(){
            const response = await fetch(URL);
            const students = await response.json();
            setAllStudent(students);
        }
        loadStudent();
    },[student]);
    const center = useMemo(() => ({ lat: 34.126374, lng: -80.883734 }), []);
   if(submission === 0) {return ( 
    <>

            <GoogleMap zoom={15} center={center} mapContainerClassName="map-container">
                <Marker position={center} />       
            </GoogleMap>
 
        <Layout />
        <section className="form-section">
            <div class="bg-dark rounded"> 
                <div class="bg-primary col-12 rounded-top">
                    <h2 class="text-white font-weight-bold">RICH 2</h2>
                </div>
                <form name="profileEdit" onSubmit={submitHandler} class="text-white bg-dark rounded p-4">

                    <div class="row mb-1">
                            <label class="form-label col"
                            htmlFor="studentID"> 
                                Student ID
                            </label>
                                <input
                                    id="studentID"
                                    name="studentID"
                                    type="text"
                                    class="col-9"
                                    value={student.studentID}
                                    onChange={changeHandler}
                                /> 
                    </div>
                    <div class="row mb-1">
                            <label htmlFor="studentName" class="form-label col"> Student Name</label>
                                <input
                                id="studentName"
                                name="studentName"
                                type="text"
                                class="col-9"
                                value={student.studentName}
                                onChange={changeHandler}
                            />
                    </div>
                    <div class="row mb-1">
                            <label htmlFor="parentName" class="form-label col"> Parent Name</label>
                                    <input
                                    id="parentName"
                                    name="parentName"
                                    type="text"
                                    class="col-9"
                                    value={student.parentName}
                                    onChange={changeHandler}
                                />
                    </div>
                    <div class="row mb-1">
                            <label htmlFor="address" class="form-label col"> Address</label>
                                <input
                                id="address"
                                name="address"
                                type="text"
                                class="col-9"
                                value={student.address}
                                onChange={changeHandler}
                            />
                    </div>
                    <div class="row mb-1">
                                <label htmlFor="city" class="form-label col"> City</label>
                                    <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    class="col-9"
                                    value={student.city}
                                    onChange={changeHandler}
                                />
                    </div>
                    <div class="row mb-1">
                                <label htmlFor="state" class="form-label col"> State</label>
                                    <input
                                    id="state"
                                    name="state"
                                    type="text"
                                    class="col-9"
                                    value={student.state}
                                    onChange={changeHandler}
                                />
                    </div>
                    <div class="row mb-4">
                                <label htmlFor="zipcode" class="form-label col"> Zipdcode</label>
                                    <input
                                    id="zipcode"
                                    name="zipcode"
                                    type="text"
                                    class="col-9"
                                    value={student.zip}
                                    onChange={changeHandler}
                                />
                    </div>


                    <button class="btn btn-warning mr-3" type="submit">
                        Save
                    </button>

                    <input  class="btn btn-warning" type="button" value="Encode" onClick={encoder}>
                    </input>
                </form>
            </div>
        </section>
    </>
    )}
    return ( 
        <>
        <GoogleMap zoom={20} center={newCenter} mapContainerClassName="map-container" mapTypeId= '3125281ec3dd3ea6'>
            <Marker position={newCenter} />       
        </GoogleMap>
        <Layout />
        <section className="form-section">
            <div class="bg-dark rounded"> 
                <div class="bg-primary col-12 rounded-top">
                    <h2 class="text-white font-weight-bold">RICH 2</h2>
                </div>
                <form name="profileEdit" onSubmit={submitHandler} class="text-white bg-dark rounded p-4">

                    <div class="row mb-1">
                            <label class="form-label col"
                            htmlFor="studentID"> 
                                Student ID
                            </label>
                                <input
                                    id="studentID"
                                    name="studentID"
                                    type="text"
                                    class="col-9"
                                    value={student.studentID}
                                    onChange={changeHandler}
                                /> 
                    </div>
                    <div class="row mb-1">
                            <label htmlFor="studentName" class="form-label col"> Student Name</label>
                                <input
                                id="studentName"
                                name="studentName"
                                type="text"
                                class="col-9"
                                value={student.studentName}
                                onChange={changeHandler}
                            />
                    </div>
                    <div class="row mb-1">
                            <label htmlFor="parentName" class="form-label col"> Parent Name</label>
                                    <input
                                    id="parentName"
                                    name="parentName"
                                    type="text"
                                    class="col-9"
                                    value={student.parentName}
                                    onChange={changeHandler}
                                />
                    </div>
                    <div class="row mb-1">
                            <label htmlFor="address" class="form-label col"> Address</label>
                                <input
                                id="address"
                                name="address"
                                type="text"
                                class="col-9"
                                value={student.address}
                                onChange={changeHandler}
                            />
                    </div>
                    <div class="row mb-1">
                                <label htmlFor="city" class="form-label col"> City</label>
                                    <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    class="col-9"
                                    value={student.city}
                                    onChange={changeHandler}
                                />
                    </div>
                    <div class="row mb-1">
                                <label htmlFor="state" class="form-label col"> State</label>
                                    <input
                                    id="state"
                                    name="state"
                                    type="text"
                                    class="col-9"
                                    value={student.state}
                                    onChange={changeHandler}
                                />
                    </div>
                    <div class="row mb-4">
                                <label htmlFor="zipcode" class="form-label col"> Zipdcode</label>
                                    <input
                                    id="zipcode"
                                    name="zipcode"
                                    type="text"
                                    class="col-9"
                                    value={student.zip}
                                    onChange={changeHandler}
                                />
                    </div>


                    <button class="btn btn-warning mr-3" type="submit">
                        Save
                    </button>

                    <input  class="btn btn-warning" type="button" value="Encode" onClick={encoder}>
                    </input>
                </form>
            </div>
        </section>
        </>
    );
  }

