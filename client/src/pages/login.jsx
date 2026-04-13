import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Login(){

    const [newusername,setusername]=useState("")
    const [newpassword,setpassword]=useState("")

    const navigate=useNavigate()

    async function googlelog(){
        try{
            window.location.href = "http://blog-production-75ce.up.railway.app/auth/google"
        }
        catch(error){
            alert(error)
        }

    }


    const letuserlogin=async (e)=>{
        e.preventDefault()


        try{

            const responce=await fetch("http://blog-production-75ce.up.railway.app/login",{
                method:"POST",
                credentials:"include",
                headers:{
                    "content-type":"application/Json"
                },
                body:JSON.stringify({            // converts a JavaScript object (or array) into a JSON string.
                    username:newusername,
                    password:newpassword
                })
            })

            const data=await responce.json()  // converts  JSON string  into  JavaScript object.

            if(data.status===200){
                localStorage.setItem("jwttoken",data.token)
                alert(data.message)
                navigate("/")
            }
            else if(data.status===400){
                alert(data.message)
            }

            


        }
        catch(error){
            alert(error)
        }
    }
    
    return(
            
        <div className="flex min-h-screen justify-center items-center bg-[#f5f5f5]">
            <div className=" w-96 rounded-xl p-10 bg-white shadow-xl">
                <div className="text-center text-2xl  mb-2 font-medium">Welcome back</div>
                <div className="text-slate-500 mb-10 text-center text-sm">Please enter your details to sign in</div>
                <div className="mb-6">
                    <label for="email" className="block mb-3 text-sm font-semibold">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" className="w-full rounded-md h-10 p-4 border border-[#e1e1e1] focus:outline-none focus:ring-2 focus:ring-gray-700 " onChange={(e)=>{
                        setusername(e.target.value)
                    }} required></input>
                </div>
                <div className="mb-4">
                    <label for="password" className="block mb-3 text-sm font-semibold">Password</label>
                    <input type="password" id="password" placeholder="••••••••" className="w-full rounded-md h-10 p-4 border border-[#e1e1e1]  focus:outline-none focus:ring-2 focus:ring-gray-700" onChange={(e)=>{
                        setpassword(e.target.value)
                    }} required></input>
                </div>
                <div className="text-right text-gray-600 mb-4">
                    <label className="text-sm">Forget password?</label>
                </div>
                <div className="mb-4">
                    <button className="w-full h-12 bg-black rounded-lg text-white font-medium hover:bg-gray-800" onClick={letuserlogin}>Sign in</button> 
                </div>
                <div className="mb-4 flex items-center" >
                    <div className="flex-1 border-t border-[#e1e1e1]"></div>
                    <span className="px-6 text-slate-500 text-sm">or</span>
                    <div className="flex-1 border-t border-[#e1e1e1]"></div>
                </div>
                <div className="mb-6">
                    <button className="w-full flex justify-center items-center border h-12 rounded-lg gap-x-3 text-sm text-[#333]" onClick={googlelog}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        Continue with Google
                    </button>
                </div>

                <div className="flex justify-center text-sm text-[#666] gap-x-2">
                    Don't have an account? <a href="/register" className="text-black font-semibold"> Sign up</a>
                </div>

            </div>
        </div>

    )
}

export default Login