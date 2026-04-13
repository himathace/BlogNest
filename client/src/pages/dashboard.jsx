import { useEffect,useState} from "react"
import { useNavigate} from "react-router-dom"
import Postcard from "../cards/postcard"
import Error from "../cards/error"
import {motion} from "motion/react"

function Dash(){

    const [display,setdispaly]=useState(0)
    const [loading,setLoading]=useState(true)
    const [myname,setmyname]=useState("")

    const navigate=useNavigate()

    const [searchblogs,setsearchblogs]=useState("")
    const [diserch,setdiserch]=useState([])

    const [catogary,setcatogary]=useState("")
    const [colorcatogary,setcolorcatogary]=useState(0)



    useEffect(()=>{

        const validate=async ()=>{

            setLoading(true)
            
            try{
                const userdata=await fetch("http://blog-production-75ce.up.railway.app/dashboard",{
                    method: "GET",
                    credentials: "include", // send or reserve cookies
                    headers:{
                        "content-Type":"application/json",
                    }
                })

                const data=await userdata.json()
                
                if(data.status === 401){
                    setdispaly(0)
                }

                if(data.status===200){
                    setmyname(data.name)
                    setdispaly(1)
                }
            }
            catch(error){
                alert(error)
                setdispaly(0)
            }
            finally{
                setLoading(false)
            }
        }

        validate()

        
    },[]) // run use effect every time path change


    const logout=async ()=>{

        try{
            const logoutuser=await fetch("http://blog-production-75ce.up.railway.app/logout",{
                method: "POST",
                credentials: "include",
                headers :{
                    "content-Type" : "application/json"
                }

            })
            const data=await logoutuser.json()
            alert(data.message)
            setdispaly(0)
            navigate("/")


        }
        catch(error){
            alert(error)
        }
    }


    useEffect(()=>{

        const searchblogsxx=async ()=>{

            try{

                const userdata=await fetch(`http://blog-production-75ce.up.railway.app?search=${searchblogs}&category=${catogary}`)
                const data=await userdata.json()
                setdiserch(data.message)


            }
            catch(error){
                alert(error)
            }
        }

        searchblogsxx()

    },[searchblogs,catogary])

    if(loading){

        return(
             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-600">Loading...</div>
            </div>
        )
    }

    
    return(

        <>
            <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
                <nav className="bg-white shadow-sm border-b border-gray-100 py-4 px-6 md:px-8">
                    <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div className="text-lg font-bold text-gray-900">BlogNest</div>
                    <ul className="flex space-x-6">

                        {
                            display === 1 ?  (
                                <>
                                    <li>
                                        <a className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 hover:cursor-pointer" onClick={logout}>log out</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/create" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                                            Create
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200" >
                                            {myname}
                                        </a>
                                    </li>
                                </>

                            ) : (
                                <li>
                                    <a href="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                                        Login
                                    </a>
                                </li>
                            )

                        }
                    </ul>
                    </div>
                </nav>

                {/* Main Content - Blog Posts */}
                <main className="max-w-6xl mx-auto py-10 px-6 md:px-8">
                    <h1 className="md:text-3xl font-bold text-center mb-8 text-gray-900 sm:text-xl">BLOG POSTS</h1>


                    <div className="mb-8">
                        <div className="relative max-w-md mx-auto">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                                className="h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            </div>
                            <input
                            type="text"
                            placeholder="Search blog posts..."
                            value={searchblogs}
                            onChange={(e)=>{setsearchblogs(e.target.value)}}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                            />  
                        </div>
                    </div>


                    <div className="flex gap-5 my-5">
                        <button className={`px-3 py-1 rounded-full text-sm font-mediumv ${ colorcatogary===0 ? "text-white bg-black" : "text-black bg-white"}   transition-colors duration-300`} onClick={()=>{setcatogary(""),setcolorcatogary(0)}} >All</button>

                        <button className={`px-3 py-1 rounded-full text-sm font-medium  border ${ colorcatogary===1 ? "text-white bg-black" : "text-black bg-white"} border-gray-300  transition-colors duration-300`} onClick={()=>{setcatogary("tech"),setcolorcatogary(1)}}>Tech</button>

                        <button className={`px-3 py-1 rounded-full text-sm font-medium ${ colorcatogary===2 ? "text-white bg-black" : "text-black bg-white"} border border-gray-300  transition-colors duration-300`} onClick={()=>{setcatogary("Business"),setcolorcatogary(2)}}>Business</button>

                        <button className={`px-3 py-1 rounded-full text-sm font-medium text-black border border-gray-300 ${ colorcatogary===3 ? "text-white bg-black" : "text-black bg-white"}   transition-colors duration-300`} onClick={()=>{setcatogary("health"),setcolorcatogary(3)}}>Health</button>

                        <button className={`px-3 py-1 rounded-full text-sm font-medium ${colorcatogary===4 ? "text-white bg-black" : "text-black bg-white"}  border border-gray-300   transition-colors duration-300`} onClick={()=>{setcatogary("education"),setcolorcatogary(4)}}>Education</button>

                        <button className={`px-3 py-1 rounded-full text-sm font-medium ${colorcatogary===5 ? "text-white bg-black " : "text-black bg-white"} text-black border border-gray-300   transition-colors duration-300`} onClick={()=>{setcatogary("other"),setcolorcatogary(5)}}>other</button>

                    </div>




            
                    <div className="md:grid md:grid-cols-3 gap-x-5 gap-y-5 sm:flex sm:flex-col">

                        {
                            diserch.map((val)=>{
                                return (
                                    <motion.div 
                                    key={val._id}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileHover={{scale:1.05}}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.4,
                                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.3},
                                    }}
                                >
                                    <Postcard post={val} />
                                </motion.div>

                                )
                            })

                        }
                    </div>

                    {
                        diserch.length===0 && <Error />
                    }
                </main>
            </div>
        </>
    )
}

export default Dash