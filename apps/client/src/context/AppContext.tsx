import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext<any>({})
export default function AppContextProvider({ children }: any) {
  const [app, setApp] = useState<any>({});

  useEffect(() => {
    axios.get("http://localhost:4000/init").then((res) => {
      console.log(res.data);
      setApp(res.data);
    })
  }, [])

  return (
    <AppContext.Provider value={app}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext);
