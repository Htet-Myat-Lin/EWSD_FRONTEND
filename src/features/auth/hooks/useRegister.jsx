import { useMutation } from "@tanstack/react-query"
import { AuthService } from "../../../api/services/auth-service"
import { toast } from "react-toastify"

export const useRegister = () => {
    return useMutation({
        mutationFn: AuthService.register,
        onSuccess: (data) => {
            toast.success("Registration successful!")
            localStorage.setItem("access_token", data.access_token)
        },
        onError: (error) => console.error("Registration error:", error)
    })
}