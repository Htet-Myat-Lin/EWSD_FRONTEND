import { useMutation } from "@tanstack/react-query"
import { AuthService } from "../../../api/services/auth-service"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { toast } from "react-toastify"

export const useLogout = () => {
    const navigate = useNavigate()
    const { setUser } = useAuth()
    return useMutation({
        mutationFn: AuthService.logout,
        onSuccess: () => {
            localStorage.removeItem("access_token")
            setUser(null)
            navigate("/logout")
            toast.success("Logout successful!")
        }
    })
}