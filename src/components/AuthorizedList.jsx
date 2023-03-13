import {React, useState, useEffect} from "react";
import Navbar from "./Navbar";
//auth
import { auth,db } from "../config/Firebase";
import {createUserWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth"

import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore'
export default function AuthorizeduserList(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault()
        signIn()
    }
    //sign in
    const signIn = async() =>{
        try{
        await createUserWithEmailAndPassword(auth, email, password)
        onSubmitMovie()
        alert("User Added!")
        }
        catch (err){
            alert(err)
            console.error(err)
        }
    }

    //add user from Auth to firestore
        const AuthUserEmail = collection(db, "AuthUserEmail")
        const onSubmitMovie = async()=>{
            try{
            await addDoc(AuthUserEmail, {
                email: email
            })
            getuserList()
            window.location.reload();
            }catch(err){
                console.error(err)
        }
        }
    //relaod user
    const [userList, setuserList] = useState([])
    const getuserList = async() =>{
        // read the data from firestore
        try{
        const data = await getDocs(AuthUserEmail)
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
            const userDoc = doc(db,"AuthUserEmail",id)
            ask == "DELETE" ? await deleteDoc(userDoc): alert("Invalid Input!")
            getuserList()
        
    }catch(err){
        console.error(err)
    }
    
}
    //forgot Pass
    const resetPass = async(email) =>{
        try{
        await sendPasswordResetEmail(auth, email)
        alert("Forgot Password Email Send!")
        }
        catch (err){
            alert(err)
            console.error(err)
        }
    }
    return(
        <div>
            <Navbar />
            <div className="flex-col lg:flex-row flex justify-evenly items-center h-screen bg-blue-900">
            <div className="border-2 border-gray-900 bg-white rounded-xl h-72 w-96 p-10 flex gap-1 flex-col">
            <p className="text-center font-lg uppercase">Add Authorize User</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input type="email" id="email" 
                    className="border-2 border-gray-600 rounded-lg py-1 px-3" 
                    placeholder="Email Address"
                    onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" 
                    className="border-2 border-gray-600 rounded-lg  py-1 px-3" 
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit" className="border-2 border-blue-900 rounded-full p-1 w-36 self-center text-blue-900 hover:bg-blue-900 hover:text-white">Add User</button>
            </form>
            </div>
            <div>
            <table className="border-separate border-spacing-2  bg-gray-100 text-blue-900 rounded-lg table-auto text-sm">
            <thead>
                <tr>
                <th className="  p-2 ">Email</th>
                <th className="  p-2">Action</th>
                </tr>
            </thead>
            <tbody>
            {userList.map((user) => (
                
                <tr>
                    <td className="  p-2">{user.email}</td>
                    {/* button */}
                    <div className="  p-2 flex gap-2">
                        <button className="border-2 border-pink-600 rounded-full px-3 py-1 text-pink-600 hover:bg-pink-600 hover:text-white" onClick={()=> deleteUser(user.id)}>Delete</button>
                        <button  className="border-2 border-blue-900 rounded-full px-3 py-1 hover:bg-blue-900 hover:text-white" onClick={()=> resetPass(user.email)}>Forgot Password</button>
                    </div>
                    
                </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    )
}