import * as React from 'react'

type AppContextType = {
  user: UserDTO | undefined
  setUser: React.Dispatch<React.SetStateAction<UserDTO | undefined>>
}

export const AppContext = React.createContext<AppContextType>({} as AppContextType)

export const AppContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [user, setUser] = React.useState<UserDTO | undefined>()

  React.useEffect(() => {
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>
}
