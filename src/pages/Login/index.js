import { useState, useContext } from 'react'

// Dependencias
import { useHistory } from 'react-router-dom'

// Componentes
import logo from '/static/img/logo-horiz-nn-rgb-amarillo.svg'
import ModalLoading from 'componentes/modales/ModalLoading'
import Alerta from 'componentes/Alerta'

// Servicios
import { conectar } from 'services/common'
import { obtenerRegistrosUsuari } from 'services/usuari'

// Contexto
import AppContext from 'context/AppContext'

import './styles.css'

const Login = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [inputData, setInputData] = useState({
        nombre: '',
        password: '',
    })
    const [mensaje, setMensaje] = useState(null)
    const { nombre, password } = inputData
    const [loading, setLoading] = useState(false)
    const { guardaUsuario } = useContext(AppContext)
    const history = useHistory()

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const login = () => {
        conectar(nombre, password).then(
            respuesta => {
                const { result } = respuesta
                if (result === 1 || result === 3) {
                    return obtenerRegistrosUsuari(`USUARI = '${nombre}'`).then(
                        respuestaUsuario => {
                            setLoading(false)

                            if (respuestaUsuario) {
                                const usuario = {
                                    codigo: respuestaUsuario.request.response
                                        .dsUSUARI.ttUSUARI[0].USUARI,
                                    nombre: respuestaUsuario.request.response
                                        .dsUSUARI.ttUSUARI[0].CONCEP,
                                }

                                guardaUsuario(usuario)
                                history.push('/expeju/lista')
                            }
                        },
                        error => {
                            setLoading(false)
                            console.log('Error al obtener el usuario', error)
                        }
                    )
                } else {
                    guardaUsuario(null)
                    setLoading(false)
                    setMensaje('Usuario o contraseña incorrectos.')
                }
            },
            error => {
                console.log('error login', error)
            }
        )
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (!inputData) {
            setMensaje('Las credenciales no puede estar en blanco')
            return
        }

        if (!nombre || nombre === '') {
            setMensaje('Introduce el código de usuario')
            return
        }

        if (!password || password === '') {
            setMensaje('Introduce la contraseña')
            return
        }

        setMensaje(null)

        setLoading(true)
        login()
    }

    const handleChange = e => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        })
    }

    /* ------------------------------------------------------------------- */
    /* --------------------------- RENDERIZADO --------------------------- */
    /* ------------------------------------------------------------------- */
    return (
        <>
            <ModalLoading mostrarModal={loading} />
            <div className='background'>
                <div className='contenedor-login'>
                    <img
                        className='contenedor-login__logo'
                        src={logo}
                        alt='Logo'
                    />
                    <div className='card contenedor-login__caja-login'>
                        <form onSubmit={handleSubmit}>
                            <h2 className='display-2 contenedor-login__titulo'>
                                Identifícate para iniciar la sesión
                            </h2>
                            <div className='contenedor-login__campo-agrupado'>
                                <input
                                    className=' campo-agrupado__campo'
                                    id='nombre'
                                    name='nombre'
                                    type='text'
                                    placeholder='Introduce el código de usuario'
                                    value={nombre}
                                    // ref={nombreRef}
                                    onChange={handleChange}
                                />
                                <i className='fa fa-user campo-agrupado__icono'></i>
                            </div>

                            <div className='contenedor-login__campo-agrupado'>
                                <input
                                    className='campo-agrupado__campo'
                                    id='password'
                                    name='password'
                                    type='password'
                                    placeholder='Introduce la contraseña'
                                    value={password}
                                    // ref={passwordRef}
                                    onChange={handleChange}
                                />
                                <i className='fa fa-lock campo-agrupado__icono'></i>
                            </div>
                            {mensaje && (
                                <Alerta mensaje={mensaje} tipo='error' />
                            )}
                            <button
                                className='btn contenedor-login__btn-submit'
                                type='submit'
                            >
                                Entrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
