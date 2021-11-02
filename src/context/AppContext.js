import React, { useState, createContext } from 'react'

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null)
    const [paginaActual, setPaginaActual] = useState(null)

    const guardaUsuario = usuario => {
        localStorage.setItem('usuario', JSON.stringify(usuario))
        setUsuario(usuario)
    }

    return (
        <AppContext.Provider
            value={{
                usuario,
                paginaActual,
                guardaUsuario,
                setPaginaActual,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
