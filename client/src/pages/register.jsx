import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../lib/api"

function Register(){

    const navigate=useNavigate()

    const [username,setusername]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [error,seterror]=useState(null)

    const send_credentails=async ()=>{

        try{

            const userdata=await fetch(`${API_URL}/register`,{
                method:"POST",
                headers:{
                    "content-type":"application/Json"
                },
                body:JSON.stringify({
                    inputname:username,
                    inputemail:email,
                    inputpassword:password
                })
            })

            const data=await userdata.json()

            if(data.status===200){
                alert("register success")
                navigate("/login")

            }
            else{
                
                if(data.errors && data.errors.length > 0){
                    // alert(data.errors[0].msg)
                    seterror(data.errors[0].msg)
                }
                else{
                    alert("registration falid")
                }

            }
        }
        catch(error){
            alert(error)
        }
    }


    return(

        <div className="flex min-h-screen justify-center items-center bg-[#f5f5f5]">
            <div className=" w-96 rounded-xl p-10 bg-white shadow-xl">
                <div className="text-center text-2xl  mb-2 font-medium">Create account</div>
                <div className="text-slate-500 mb-10 text-center text-sm">Please fill in your details to sign up</div>
                <div className="mb-6">
                    <label for="email" className="block mb-3 text-sm font-semibold">username</label>
                    <input type="email" id="email" placeholder="Enter your username" className={`w-full rounded-md h-10 p-4 border focus:outline-none focus:ring-2 focus:ring-gray-700 ${error && error.includes("Username") ? " border-2 border-red-800" : "border-[#e1e1e1]"}  `} onFocus={()=>seterror(null)} required onChange={(e)=>{setusername(e.target.value)}} ></input>
                    <p className="text-xs text-red-800" >{error && error.includes("Username") && error}</p>
                </div>
                <div className="mb-6">
                    <label for="email" className="block mb-3 text-sm font-semibold">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" className={`w-full rounded-md h-10 p-4 border  focus:outline-none focus:ring-2 focus:ring-gray-700  ${error && error.includes("Email") ? "border-2 border-red-800" : "border-[#e1e1e1]" } `} required onChange={(e)=>{setemail(e.target.value)}} onFocus={()=> seterror(null)} ></input>
                    <p className="text-xs text-red-800" >{error && error.includes("Email") && error}</p>
                </div>
                <div className="mb-6">
                    <label for="password" className="block mb-3 text-sm font-semibold">Password</label>
                    <input type="password" id="password" placeholder="••••••••" className={`w-full rounded-md h-10 p-4 border   focus:outline-none focus:ring-2 focus:ring-gray-700 ${ error && error.includes("Password") ? "border-2 border-red-800" : "border-[#e1e1e1]" } `} required onChange={(e)=>{setpassword(e.target.value)}} onFocus={()=> seterror(null)} ></input>
                    <p className="text-xs text-red-800" >{error && error.includes("Password") && error}</p>
                </div>
                <div className=" text-gray-500 mb-6 space-x-3 flex items-start">
                    <input type="checkbox" className="mt-1"></input>
                    <label className="text-sm">By creating an account, you agree to our <span className="font-bold">Terms of Service</span>  and <span className="font-bold"> Privacy Policy</span></label>
                </div>
                <div className="mb-4">
                    <button className="w-full h-12 bg-black rounded-lg text-white font-medium hover:bg-gray-800" onClick={send_credentails} >Create account</button> 
                </div>
                
                <div className="flex justify-center text-sm text-[#666] gap-x-2">
                    Don't have an account? <a href="/login" className="text-black font-semibold"> Sign in</a>
                </div>

            </div>
        </div>
    )
}

export default Register