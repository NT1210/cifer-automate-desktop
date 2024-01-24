import React, { useState } from 'react'
import { createContext } from 'react'

export const DBContext = createContext()

export const DBProvider = ({children}) => {

    const [connected, setConnected] = useState(false)
    const [data, setData] = useState([])

    return (
        <DBContext.Provider value={{connected, setConnected, data, setData}}> 
            {children}
        </DBContext.Provider>
    )
}