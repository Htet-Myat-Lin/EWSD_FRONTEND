import { useMutation } from "@tanstack/react-query"
import { AuthService } from "../../../api/services/auth-service"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export const useRegister = () => {
    const navigate = useNavigate()
    const { setUser } = useAuth()

    return useMutation({
        mutationFn: AuthService.register,
        onSuccess: (data) => {
            localStorage.setItem("access_token", data.access_token)
            setUser(data?.user)
            navigate("/")
            toast.success("Registration successful!")
        },
        onError: (error) => console.error("Registration error:", error)
    })
}