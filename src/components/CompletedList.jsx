import {React, useState, useEffect} from "react";

//methods of firebase to get the firestore
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore'
import {db} from "../config/Firebase"
import Navbar from "./Navbar";
export default function CompletedList(){

        //READING DATA ---------------------------------------------------
        const [userList, setuserList] = useState([])
        //reference from database movies
        const completeUser = collection(db, "completeUser")
        //run movies from databse firebase
        // use effect to run when the component is render
        const getuserList = async() =>{
        // read the data from firestore
        try{
        const data = await getDocs(completeUser)
        const fileteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id, 
            }))
        console.log(fileteredData)
        setuserList(fileteredData)
        } catch (err){
            console.error(err)
        }
        }
        useEffect(()=>{
        getuserList()
        }, [])
    
    
    
        // Deleting User ------------------------------
    const deleteUser = async(id)=>{
        const ask = prompt(`Please Input "DELETE" to remove`);
            try{
                const userDoc = doc(db,"completeUser",id)
                ask == "DELETE" ? await deleteDoc(userDoc): alert("Invalid Input!")
                getuserList()
            
        }catch(err){
            console.error(err)
        }
        
    }

    //complete User
const undo = async(name, contact, email, time, date, id)=>{
    const userDoc = doc(db,"completeUser",id)
    const completeUser = collection(db, "user")
        try{
            await addDoc(completeUser, {
                name: name,
                email: email,
                contact: contact,
                time: time,
                date: date
            })
            await deleteDoc(userDoc)
        getuserList()
        }catch(err){
    console.error(err)
}
}
        return(
            <div>
                <Navbar />
        <div className="h-full min-h-screen bg-blue-900 text-white flex justify-center items-center flex-col gap-10 w-full min-w-screen">
                    <p className="text-3xl uppercase">Completed Clients</p>
                    <table className="border-separate border-spacing-2 border border-slate-500 bg-gray-100 text-blue-900 rounded-lg table-auto text-sm">
            <thead>
                <tr>
                <th className=" p-2 ">Date</th>
                <th className=" p-2">Time</th>
                <th className=" p-2">Name</th>
                <th className=" hidden lg:table-cell p-2">Email</th>
                <th className=" p-2">Contact Number</th>
                <th className=" p-2">Status</th>
                </tr>
            </thead>
            <tbody>
                {/* READING DATA */}
                {userList.map((user) => (
                    
                    <tr>
                        <td className="px-1 lg:p-2">{user.date}</td>
                        <td className="px-1 lg:p-2">{user.time}</td>
                        <td className="px-1 lg:p-2">{user.name}</td>
                        <td className="px-1 hidden lg:table-cell lg:p-2">{user.contact}</td>
                        <td className="px-1 lg:p-2">{user.email}</td>
    
                        {/* button */}
                        <div className="p-2 flex gap-2 flex-col lg:flex-row">
                            <button className="border-2 border-pink-600 rounded-full px-3 py-1 text-pink-600 hover:bg-pink-600 hover:text-white" onClick={()=> deleteUser(user.id)}>Delete</button>
                            <button  className="border-2 border-blue-900 rounded-full px-3 py-1 hover:bg-blue-900 hover:text-white" onClick={()=> undo(user.name, user.email, user.contact, user.time, user.date, user.id)}>Undo</button>
                        </div>
                    </tr>
                    ))}
                </tbody>
        </table>
            </div>
            </div>
        )
}