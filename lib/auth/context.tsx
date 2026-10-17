'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'

export interface UserProfile {
  id: string
  name: string
  avatar_url?: string
  is_mock?: boolean
}

interface AuthContextType {
  user: UserProfile | null
  isLoading: boolean
  isConfigured: boolean
  loginWithDiscord: () => Promise<void>
  loginWithDevUser: (name?: string) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isConfigured: false,
  loginWithDiscord: async () => {},
  loginWithDevUser: () => {},
  logout: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isConfigured = isSupabaseConfigured()

  useEffect(() => {
    // 1. Check local mock session
    const storedMockUser = localStorage.getItem('animeindian_mock_user')
    if (storedMockUser) {
      try {
        setUser(JSON.parse(storedMockUser))
        setIsLoading(false)
        return
      } catch {
        localStorage.removeItem('animeindian_mock_user')
      }
    }

    // 2. Check Supabase session if configured
    if (isConfigured) {
      const supabase = createClient()
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Voter',
            avatar_url: session.user.user_metadata?.avatar_url,
          })
        }
        setIsLoading(false)
      })

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Voter',
            avatar_url: session.user.user_metadata?.avatar_url,
          })
        } else {
          setUser(null)
        }
      })

      return () => subscription.unsubscribe()
    } else {
      setIsLoading(false)
    }
  }, [isConfigured])

  const loginWithDiscord = async () => {
    if (!isConfigured) {
      // In development mode when Supabase/Discord credentials are not yet supplied,
      // provide instant simulated voter login
      loginWithDevUser('OtakuVoter#2026')
      return
    }

    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })
  }

  const loginWithDevUser = (name = 'OtakuVoter#2026') => {
    const devUser: UserProfile = {
      id: `usr-dev-${Date.now().toString(36)}`,
      name,
      avatar_url: '/images/nominees/zine.svg',
      is_mock: true,
    }
    localStorage.setItem('animeindian_mock_user', JSON.stringify(devUser))
    setUser(devUser)
  }

  const logout = async () => {
    localStorage.removeItem('animeindian_mock_user')
    if (isConfigured) {
      const supabase = createClient()
      await supabase.auth.signOut()
    }
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isConfigured,
        loginWithDiscord,
        loginWithDevUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
