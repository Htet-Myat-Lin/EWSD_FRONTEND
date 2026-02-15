import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { useGetCurrentUser } from '@/features/auth/hooks/useGetCurrentUser'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const { data, isPending } = useGetCurrentUser()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!isPending) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false)
      setUser(data?.user)
    }
  }, [isPending, data])

  const value = useMemo(() => ({
    user,
    setUser,
    loading
  }), [user, loading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
