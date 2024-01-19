import * as React from 'react'

type AppContextType = {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const AppContext = React.createContext<AppContextType>({} as AppContextType)

export const AppContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [user, setUser] = React.useState<User>()

  React.useEffect(() => {
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } 
  }, [])

  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>
}
