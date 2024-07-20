import { useAuth } from "@/contexts/AuthContext"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { UNAUTHORIZED_URL } from "./router.const"

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth()

  return currentUser ? children : <Navigate to={UNAUTHORIZED_URL} replace />
}

export const protectedRoute = (step: ReactNode) => (
  <ProtectedRoute>{step}</ProtectedRoute>
)
