import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { useGetCurrentUser } from '@/features/auth/hooks/useGetCurrentUser'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const { data, isPending: loading } = useGetCurrentUser()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (data?.user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(data.user)
    }
  }, [data])

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
