// This module sets the state for the full app. on main when App Wrapper is called
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfile } from '../data/auth';
import { useRouter } from "next/router"

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [profile, setProfile] = useState({})
    const [token, setToken] = useState("")
    // const router = useRouter()

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    }, [])

    // useEffect(() => {
    //     const authRoutes = ['/']
    //     if (token) {
    //         localStorage.setItem('token', token)
    //         if (authRoutes.includes(router.pathname)) {
    //             getUserProfile().then((profileData) => {
    //                 if (profileData) {
    //                     setProfile(profileData)
    //                 }
    //             })
    //         }
    //     }
    // }, [token])
//     return (
//         <AppContext.Provider value={{ profile, token, setToken, setProfile }}>
//             {children}
//         </AppContext.Provider>
//     );
// }

    return (
        <AppContext.Provider value={{ token, setToken }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}