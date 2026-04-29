import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../lib/api"

function Update(){

    const params=useParams()
    const id=params.id

    const navigate=useNavigate()

    const [newtitle,updatenewtitle]=useState("")
    const [newcontent,updatenewcontent]=useState("")


    const updatedata=async ()=>{

        try{
            const userdata=await fetch(`${API_URL}/update/${id}`,{
                method:"PUT",
                credentials: "include",
                headers:{
                    "content-Type":"application/json",
                },
                body:JSON.stringify({
                    uptitle:newtitle,
                    upcontent:newcontent
                })

            })

            const data=await userdata.json()

            if(data.status===200){
                alert("update success")
                navigate("/")
            }

            if(data.status===400){
                alert("no update")
            }


        }
        catch(error){
            alert(error)
        }
    }




    return(

        <div class="bg-gray-50 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div class="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 sm:p-8 border border-gray-200">
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Update Post</h1>
                
                <div class="mb-6">
                    <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        placeholder="Enter your post title here..." 
                        class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base placeholder-gray-400 text-gray-900"
                        onChange={(e)=>{
                            updatenewtitle(e.target.value)
                        }}
                    />
                </div>
                
                <div class="mb-8">
                    <label for="content" class="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea 
                        id="content" 
                        rows="10" 
                        placeholder="Start writing your amazing content..." 
                        class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base placeholder-gray-400 text-gray-900 resize-y"
                        onChange={(e)=>{
                            updatenewcontent(e.target.value)
                        }}
                    ></textarea>
                </div>
                
                <div class="flex justify-end">
                    <button 
                        type="submit" 
                        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-200"
                        onClick={updatedata}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>


    )
}

export default Update