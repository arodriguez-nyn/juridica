import { useContext, useState, useEffect } from 'react'

// Dependencias
import { useHistory } from 'react-router-dom'

// Servicios
import {
    guardaExjuab,
    borrarExjuab,
    obtenerRegistrosExjuab,
} from 'services/exjuab'

// Contexto
import SolaresContext from 'context/SolaresContext'
import AppContext from 'context/AppContext'

// Hooks
import useNavegacionExjuab from 'hooks/navegacion/useNavegacionExjuab'

// Componentes
import Alerta from 'componentes/Alerta'
import FiltroListaExjuab from 'componentes/filtros/FiltroListaExjuab'
import ModalLoading from 'componentes/modales/ModalLoading'
import FormularioExjuab from 'componentes/auxiliares/Exjuab/FormularioExjuab'
import ListaExjuab from 'componentes/auxiliares/Exjuab/ListaExjuab'
import Navegacion from 'componentes/Navegacion'

import './styles.css'

const Exjuab = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [lista, setLista] = useState([])
    const { usuario } = useContext(AppContext)
    const [mensaje, setMensaje] = useState(null)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const {
        ordenacion,
        filtroActualExjuab,
        registroActualExjuab,
        setRegistroActualExjuab,
        setOrdenacionExjuab,
    } = useContext(SolaresContext)
    const listaOrdenacion = ['Abogado', 'Abogado Desc']
    const tabla = 'exjuab'

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const gestionErrores = mensaje => {
        const inicio = mensaje.indexOf(':') + 2
        const fin = mensaje.indexOf('(') - 1
        setMensaje({
            tipo: 'error',
            texto: mensaje.substring(inicio, fin),
        })
    }

    const guardarRegistro = (
        accion = '',
        registro = { codabo: 0, descri: '' }
    ) => {
        accion !== 'Volver' && setLoading(true)

        guardaExjuab(registro, registroActualExjuab).then(respuesta => {
            accion !== 'Volver' && setLoading(false)

            const { success } = respuesta

            if (success) {
                setRegistroActualExjuab(
                    respuesta.request.response.dsEXJUAB.ttEXJUAB[0]
                )
                // obtenerRegistros(filtroActualExjuab)

                actualizarVista(filtroActualExjuab, paginaExjuab, ordenacion)
                accion !== 'Volver' &&
                    setMensaje({
                        tipo: 'exito',
                        texto: 'Registro guardado correctamente',
                    })
                accion === 'Volver' && history.push('/expeju/formulario')
            } else {
                const error = respuesta.request.response._errors[0]._errorMsg
                gestionErrores(error)
            }
        })
    }

    const borrarRegistro = registroActual => {
        borrarExjuab(registroActual)
            .then(() => {
                setMensaje({
                    tipo: 'exito',
                    texto: 'Registro eliminado correctamente',
                })
                // setPaginaExjuab(paginaExjuab ? paginaExjuab : 1)
                actualizarVista(filtroActualExjuab, paginaExjuab, ordenacion)
            })
            .catch(error => {
                console.log(error)
                setMensaje({
                    tipo: 'error',
                    texto: 'Error al eliminar el registro',
                })
            })
    }

    const obtenerRegistros = (filtro = '') => {
        if (!usuario) return

        setLista(null)
        setLoading(true)

        obtenerRegistrosExjuab(filtro).then(
            jsdo => {
                setLoading(false)
                if (!jsdo) {
                    // Sesión caducada
                    guardaUsuario(null)
                    history.push('/')
                    return
                }

                const { success, request } = jsdo
                if (success) {
                    const lista = request.response.dsEXJUAB.ttEXJUAB
                    if (lista) {
                        setLista(lista)
                    } else {
                        setLista(null)
                    }
                } else {
                }
                return jsdo
            },
            error => {
                setLoading(false)
                console.log('error ListaExjuab', error)
                return error
            }
        )
    }

    const obtieneRegistroActual = registro => {
        setRegistroActualExjuab(registro)
    }

    const modificaOrdenacion = campo => {
        let campoOrdenacion = ''
        switch (campo) {
            case 'Abogado':
                campoOrdenacion = {
                    nombre: 'NOMBRE',
                    descripcion: 'Abogado',
                }
                break
            case 'Abogado Desc':
                campoOrdenacion = {
                    nombre: 'NOMBRE DESC',
                    descripcion: 'Abogado Desc',
                }
                break
        }
        setOrderBy(campoOrdenacion.nombre)
        setOrdenacionExjuab(campoOrdenacion)
    }

    // Hook para la paginación
    const {
        paginaExjuab,
        numeroPaginas,
        numeroRegistros,
        numeroLineas,
        setOrderBy,
        handlePrimero,
        handleSiguiente,
        handleAnterior,
        handleUltimo,
        modificaNumeroLineas,
        actualizarVista,
    } = useNavegacionExjuab({
        obtenerRegistros,
        tabla,
    })

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        if (!usuario) return

        if (ordenacion && ordenacion.nombre) setOrderBy(ordenacion.nombre)

        actualizarVista(filtroActualExjuab, paginaExjuab, ordenacion)
    }, [usuario, filtroActualExjuab, ordenacion])

    useEffect(() => {
        setRegistroActualExjuab(null)
    }, [])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <ModalLoading mostrarModal={loading} />
            <div className='contenedor'>
                <h1 className='contenedor__h1'>
                    Mantenimiento de Abogados de Expedientes Judiciales
                </h1>
                {mensaje && (
                    <Alerta mensaje={mensaje.texto} tipo={mensaje.tipo} />
                )}

                <div className='contenedor__main'>
                    <FormularioExjuab
                        registroActual={registroActualExjuab}
                        guardarRegistro={guardarRegistro}
                        setMensaje={setMensaje}
                        obtieneRegistroActual={obtieneRegistroActual}
                    />
                    <div className='lista'>
                        <h2 className='contenedor__main__h2'>
                            Lista de Abogados de Expedientes
                        </h2>
                        <FiltroListaExjuab actualizarVista={actualizarVista} />
                        {lista && (
                            <Navegacion
                                campoOrdenacion={ordenacion}
                                ordenacion={listaOrdenacion}
                                paginaActual={paginaExjuab}
                                numeroPaginas={numeroPaginas}
                                numeroLineas={numeroLineas}
                                handleAnterior={handleAnterior}
                                handleSiguiente={handleSiguiente}
                                handlePrimero={handlePrimero}
                                handleUltimo={handleUltimo}
                                modificaNumeroLineas={modificaNumeroLineas}
                                modificaOrdenacion={modificaOrdenacion}
                            />
                        )}

                        <ListaExjuab
                            lista={lista}
                            numeroRegistros={numeroRegistros}
                            borrarRegistro={borrarRegistro}
                            obtieneRegistroActual={obtieneRegistroActual}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Exjuab
