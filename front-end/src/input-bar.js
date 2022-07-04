import React, {useState, useEffect} from "react";
import axios from "axios"
import GeoCoder from "./geocoder";

export default function SideBar(){

    const URL = "https://googlemaps-nodejs-backend.herokuapp.com/"

    const studentOBJ = {
        studentID:"",
        studentName:"",
        parentName:"",
        address:"",
        city:"",
        state:"",
        zipcode:""
    }
        
    const [student, setStudent] = useState({...studentOBJ})
    const [allStudent, setAllStudent] = useState(null)
    const [errors, setErrors] = useState(null);
    const changeHandler = (event) => {
        if(event.target.name ==='studentID'){
            setStudent({
                ...student,
                [event.target.name]: parseInt(event.target.value)
            })
        }
        setStudent({...student, [event.target.name]:event.target.value})
    }
    
    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            console.log("Submitted:", student);
            await axios.post(URL, {data: student})
        } catch (error) {
            console.log(error);
        }
        };

          useEffect (()=> {
            async function loadStudent(){
                const response = await fetch(URL);
                const students = await response.json();
                setAllStudent(students);
            }
            loadStudent();
            
        },[student]);
          return (
            <div className="form-structure">
                <div>
                    <form name="profileEdit" onSubmit={submitHandler}>
                    <div className="profile-edit">
                                <label htmlFor="studentID"> Student ID:</label>
                                    <input
                                    id="studentID"
                                    name="studentID"
                                    type="text"
                                    value={student.studentID}
                                    onChange={changeHandler}
                                />
                        </div>
                        <div className="profile-edit">
                                <label htmlFor="studentName"> Student Name:</label>
                                    <input
                                    id="studentName"
                                    name="studentName"
                                    type="text"
                                    value={student.studentName}
                                    onChange={changeHandler}
                                />
                        </div>
                        <div className="profile-edit">
                                <label htmlFor="parentName"> Parent Name:</label>
                                    <input
                                    id="parentName"
                                    name="parentName"
                                    type="text"
                                    value={student.parentName}
                                    onChange={changeHandler}
                                />
                        </div>
                        <div className="profile-edit">
                                <label htmlFor="address"> Address:</label>
                                    <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    value={student.address}
                                    onChange={changeHandler}
                                />
                        </div>
                        <div className="profile-edit">
                                <label htmlFor="city"> City:</label>
                                    <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    value={student.city}
                                    onChange={changeHandler}
                                />
                        </div>
                        <div className="profile-edit">
                                <label htmlFor="state"> State:</label>
                                    <input
                                    id="state"
                                    name="state"
                                    type="text"
                                    value={student.state}
                                    onChange={changeHandler}
                                />
                        </div>
                        <div className="profile-edit">
                                <label htmlFor="zipcode"> Zipdcode:</label>
                                    <input
                                    id="zipcode"
                                    name="zipcode"
                                    type="text"
                                    value={student.zip}
                                    onChange={changeHandler}
                                />
                        </div>
                        <button type="submit">Save</button>
                        <GeoCoder allStudent={allStudent}/>
                    </form>
                </div>
            </div>
          );
        }
