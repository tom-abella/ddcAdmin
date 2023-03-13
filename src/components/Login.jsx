import {React, useState,useEffect} from "react";
import logo from "../assets/logo.jpg"
import {signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
//auth firebase
import {auth} from '../config/Firebase'
import {useNavigate } from "react-router-dom";
import { useAtuth } from "../AuthContext/AuthContext";


export default function Login(){
    const navigate = useNavigate();
    //username and password
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
        // for Email and Pass sign in
        const signIn = async() =>{
            try{
            await signInWithEmailAndPassword(auth, email, password)
            // alert(" ✅ Success!")
            navigate("/record")
        }
            catch (err){
            console.error(err)
            alert("❌ Invalid Email and Password!")
            window.location.reload();
            }
        }
    
        //setting email (USE CONTEXT)
        // const {register} = useAtuth()
    
        //form sbmit
    const handleSubmit = (e) =>{
        
        e.preventDefault()
        signIn()
    }

        //onAuthStateChange
    // const [loginUser, setLoginUser] = useState(null)
    // useEffect(()=>{
    //     const unsubscribe = onAuthStateChanged(auth, user=>{
    //         setLoginUser(user)
    //     })
    //     return()=>{
    //         unsubscribe()
    //     }
    // },[])
    return(
        <div className="h-full min-h-screen flex justify-center items-center bg-blue-900 flex-col gap-20">
            <p className="text-lg md:text-2xl lg:text-4xl uppercase text-white font-semibold">Dones Dental Clinic Admin Control</p>
            <form className="flex flex-col gap-3 border-2 w-80 lg:w-96 lg:h-96 justify-center p-10 bg-white rounded-3xl" onSubmit={handleSubmit}>
            <img src={logo} alt=""  className="rounded-full w-20 mb-2 self-center"/>
                <label htmlFor="username" className="font-semibold">
                    Email
                </label>
                <input type="email" 
                placeholder="Enter your email" 
                className="border-b-2 outline-none focus:invalid:border-red-500 pb-2 focus:valid:border-blue-900 text-sm"
                onChange={(e)=>setEmail(e.target.value)}
                />
                <label htmlFor="password" className="mt-2 font-semibold">
                    Password
                </label>
                <input type="password" 
                placeholder="Enter your password" 
                className="border-b-2 outline-none focus:invalid:border-red-500 pb-2 focus:valid:border-blue-900 text-sm"
                onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit" className="mt-2 border-2 rounded-full hover:bg-blue-900 hover:text-white uppercase w-40 py-2 self-center hover:border-white bg-white border-blue-900 text-blue-900">Log in </button>
            </form> 
        </div>
    )
}