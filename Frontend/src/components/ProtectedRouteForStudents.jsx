import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const ProtectedRouteForStudents = ({children})=>{
    const {user} = useSelector((state)=>state.user)
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user || user.role !== "student"){
            navigate("/")
        }
    },[user,navigate])
    return children ;
}