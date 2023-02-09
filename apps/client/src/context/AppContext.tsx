import { createContext, useContext, useEffect, useState } from "react";
import { useAxios } from "../utils/axiosHook";

const AppContext = createContext<any>({})
export default function AppContextProvider({ children }: any) {
  const [app, setApp] = useState<any>({});
  const { loaded, data } = useAxios("/init", {}, "GET");

  useEffect(() => {
    if (loaded) {
      setApp(data);
    }
  }, [loaded]);

  return (
    <AppContext.Provider value={app}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext);
