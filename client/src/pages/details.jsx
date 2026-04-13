import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { MessageCircle, Bookmark, ThumbsUp, ThumbsDown, Send } from "lucide-react"


function Details(){

    const params=useParams()
    const id=params.id

    const [data,displaydata]=useState("")
    const [displayedit,setdispalyedit]=useState(0)

    const navigate=useNavigate()

    const [likecount,setlikecount]=useState(0)
    const [dislikecount,setdislikecount]=useState(0)


    


    useEffect(()=>{

        const displaydetails=async ()=>{

            try{
                const userdata=await fetch(`${import.meta.env.VITE_API_URL}/details/${id}`,{
                    credentials:"include" // include credentials (cookies, authorization headers, and TLS client certificates) when making the HTTP request.
                })
                const datax=await userdata.json()
                displaydata(datax.fulldata)

                if(datax.status!=401 && datax.checkvalid===datax.fulldata.username ){
                    setdispalyedit(1)
                }
            }
            catch(error){
                alert(error)
            }


        }

        displaydetails()
    },[])


    const deletedata=async ()=>{

        try{

            const userdata=await fetch(`${import.meta.env.VITE_API_URL}/delete/${id}`,{
                method:"DELETE",
                credentials: "include"
            })
            const data=await userdata.json()

            if(data.status===404){
                alert("blog not found")
            }

            if(data.status===200){
                alert("post deleted successfully")
                navigate("/")
            }

            if(data.status===400){
                alert("error")
            }


        }
        catch(error){
            alert(error)
        }
    }


    return(
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-10 max-w-3xl w-full">
                <h1 className="md:text-3xl sm:text-2xl font-extrabold text-gray-900 mb-3">{data.title}</h1>
                <p className="md:text-xl sm:text-sm text-gray-600 mb-6">
                by <span className="font-medium text-gray-800">{data.username}</span>
                </p>

                <div className="text-gray-800 leading-relaxed space-y-4 md:text-base sm:text-sm">
                    <div>
                        <p>{data.content}</p>
                    </div>
                </div>

                <div className="mt-5 flex gap-x-5">
                    <div className="flex gap-x-2 hover:text-blue-400 hover:cursor-pointer transition-all duration-300" onClick={()=>{setlikecount(prev=>prev==0 ? 1 : 0),likes()}}>
                        <ThumbsUp className={`w-5 h-5 ${likecount===1 && "fill-current text-blue-600"}`}  />
                    </div>
                    <div className="flex gap-x-2 hover:text-red-600 hover:cursor-pointer transition-all duration-200"onClick={()=>{setdislikecount(prev=>prev==0 ? 1 : 0),dislike()}}>
                        <ThumbsDown className={`w-5 h-5 ${dislikecount===1 && "fill-current text-red-600"} `}   />
                    </div>
                    <MessageCircle  className="w-5 h-5 hover:text-gray-400 transition-all duration-300"/>
                    <Bookmark />
                </div>

                <div className="mt-5 flex space-x-4">

                    {
                        displayedit===1 && (

                            <>
                                <a href={`/update/${data._id}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                                Edit
                                </a>
                                <a  className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200 hover:cursor-pointer " onClick={deletedata}>
                                Delete
                                </a>
                            </>

                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Details