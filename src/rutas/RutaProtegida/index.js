import { useContext, useEffect, useState } from 'react'

// Dependencias
import { Route, Redirect } from 'react-router-dom'

// Contexto
import AppContext from 'context/AppContext'

const RutaProtegida = ({ component: Component, ...props }) => {
    const { usuario, guardaUsuario } = useContext(AppContext)

    useEffect(() => {
        const usuarioLocalStorage = localStorage.getItem('usuario', usuario)
        if (usuarioLocalStorage) {
            guardaUsuario(JSON.parse(usuarioLocalStorage))
        }
    }, [])

    return (
        <Route
            {...props}
            render={props =>
                usuario ? <Component {...props} /> : <Redirect to='/' />
            }
        />
    )
}

export default RutaProtegida
