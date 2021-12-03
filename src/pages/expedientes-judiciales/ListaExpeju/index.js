import { useState, useEffect, useContext } from 'react'

// Dependencias
import { useHistory } from 'react-router-dom'
import XLSX from 'xlsx'

// Servicios
import { obtenerRegistrosExpeju, borrarExpeju } from 'services/expeju'

// Componentes
import ModalLoading from 'componentes/modales/ModalLoading'
import Alerta from 'componentes/Alerta'
import Navegacion from 'componentes/Navegacion'
import FiltroListaExpeju from 'componentes/filtros/FiltroListaExpeju'
import ModalConfirmacion from 'componentes/modales/ModalConfirmacion'

// Contexto
import AppContext from 'context/AppContext'
import SolaresContext from 'context/SolaresContext'

// Hooks
import useNavegacionExpeju from 'hooks/navegacion/useNavegacionExpeju'

import { formateaFecha, autoFitCells } from 'util'
import './styles.css'

const ListaExpeju = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [lista, setLista] = useState([])
    const [listaExcel, setListaExcel] = useState([])
    const [mensaje, setMensaje] = useState(null)
    const { usuario } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [confirmacion, setConfirmacion] = useState(false)
    const {
        ordenacion,
        filtroExpeju,
        registroActualExpeju,
        setRegistroActualExpeju,
    } = useContext(SolaresContext)
    const listaOrdenacion = [
        'Expediente',
        'Expediente Desc',
        'Tema',
        'Tema Desc',
        'Abogado',
        'Abogado Desc',
        'Responsable',
        'Responsable Desc',
        'Recurso',
        'Recurso Desc',
        'Estado',
        'Estado Desc',
        'Fecha Tope',
        'Fecha Tope Desc',
    ]
    const tabla = 'expeju'

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleClickExport = () => {
        const filtro = {
            skip: 0,
            top: numeroRegistros,
            filter: filtroExpeju,
        }

        obtenerRegistrosExcel(filtro)
    }

    const exportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(listaExcel)
        const listaExcelLength = autoFitCells(listaExcel)

        var wscols = [
            { width: listaExcelLength[0] },
            { width: listaExcelLength[1] },
            { width: listaExcelLength[2] },
            { width: listaExcelLength[3] },
            { width: listaExcelLength[4] },
            { width: listaExcelLength[5] },
            { width: listaExcelLength[6] },
            { width: listaExcelLength[7] },
        ]

        ws['!cols'] = wscols

        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
        XLSX.writeFile(wb, 'Lista Expedientes.xlsx')
    }

    const obtenerRegistros = (filtro = '') => {
        if (!usuario) return

        setLista(null)
        setLoading(true)

        obtenerRegistrosExpeju(filtro).then(
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
                    const lista = request.response.dsEXPEJU.ttEXPEJU
                    if (lista) {
                        const listaDefinitiva = lista.map(registro => {
                            // Mapeamos los valores calculados no obligatorios y fecha nulos a blanco
                            return {
                                ...registro,
                                FECTOP: registro.FECTOP ? registro.FECTOP : '',
                                NOMBRE_OBRA: registro.NOMBRE_OBRA || '',
                                NOMBRE_RESPONSABLE:
                                    registro.NOMBRE_RESPONSABLE || '',
                            }
                        })

                        setLista(listaDefinitiva)
                        setOrderBy('DESCRIPCION_TEMA')
                    } else {
                        setLista(null)
                    }
                }
                return jsdo
            },
            error => {
                setLoading(false)
                console.log('error ListaExpeju', error)
                return error
            }
        )
    }

    const obtenerRegistrosExcel = (filtro = '') => {
        if (!usuario) return

        setListaExcel(null)
        setLoading(true)

        obtenerRegistrosExpeju(filtro).then(
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
                    const listaExcel = request.response.dsEXPEJU.ttEXPEJU
                    if (listaExcel) {
                        const listaDefinitiva = listaExcel.map(registro => {
                            // Mapeamos los valores calculados no obligatorios y fecha nulos a blanco
                            return {
                                ...registro,
                                FECTOP: registro.FECTOP ? registro.FECTOP : '',
                                NOMBRE_OBRA: registro.NOMBRE_OBRA || '',
                                NOMBRE_RESPONSABLE:
                                    registro.NOMBRE_RESPONSABLE || '',
                            }
                        })

                        setListaExcel(
                            listaDefinitiva.map(elemento => {
                                return {
                                    Tema: elemento.DESCRIPCION_TEMA,
                                    Asunto: elemento.ASUNTO,
                                    Comentarios: elemento.OBSERV,
                                    Abogado: elemento.NOMBRE_ABOGADO,
                                    Estado: elemento.ESTADO,
                                    'Fecha Tope': formateaFecha(
                                        elemento.FECTOP
                                    ),
                                }
                            })
                        )
                    }
                }
                return jsdo
            },
            error => {
                setLoading(false)
                console.log('error ListaExpeju', error)
                return error
            }
        )
    }

    const handleClick = registro => {
        setRegistroActualExpeju(registro)

        history.push('/expeju/formulario')
    }

    const handleNuevo = () => {
        setRegistroActualExpeju(null)
        history.push('/expeju/formulario')
    }

    const modificaOrdenacion = campo => {
        let campoOrdenacion = ''
        switch (campo) {
            case 'Expediente':
                campoOrdenacion = {
                    nombre: 'CODEXP',
                    descripcion: 'Expediente',
                }
                break
            case 'Expediente Desc':
                campoOrdenacion = {
                    nombre: 'CODEXP DESC',
                    descripcion: 'Expediente Desc',
                }
                break
            case 'Tema':
                campoOrdenacion = {
                    nombre: 'DESCRIPCION_TEMA',
                    descripcion: 'Tema',
                }
                break
            case 'Tema Desc':
                campoOrdenacion = {
                    nombre: 'DESCRIPCION_TEMA DESC',
                    descripcion: 'Tema Desc',
                }
                break
            case 'Abogado':
                campoOrdenacion = {
                    nombre: 'NOMBRE_ABOGADO',
                    descripcion: 'Abogado',
                }
                break
            case 'Abogado Desc':
                campoOrdenacion = {
                    nombre: 'NOMBRE_ABOGADO DESC',
                    descripcion: 'Abogado Desc',
                }
                break
            case 'Responsable':
                campoOrdenacion = {
                    nombre: 'NOMBRE_RESPONSABLE',
                    descripcion: 'Responsable',
                }
                break
            case 'Responsable Desc':
                campoOrdenacion = {
                    nombre: 'NOMBRE_RESPONSABLE DESC',
                    descripcion: 'Responsable Desc',
                }
                break
            case 'Recurso':
                campoOrdenacion = {
                    nombre: 'NUMREC',
                    descripcion: 'Recurso',
                }
                break
            case 'Recurso Desc':
                campoOrdenacion = {
                    nombre: 'NUMREC DESC',
                    descripcion: 'Recurso Desc',
                }
                break
            case 'Estado':
                campoOrdenacion = {
                    nombre: 'ESTADO',
                    descripcion: 'Estado',
                }
                break
            case 'Estado Desc':
                campoOrdenacion = {
                    nombre: 'ESTADO DESC',
                    descripcion: 'Estado Desc',
                }
                break
            case 'Fecha Tope':
                campoOrdenacion = {
                    nombre: 'FECTOP',
                    descripcion: 'Fecha Tope',
                }
                break
            case 'Fecha Tope Desc':
                campoOrdenacion = {
                    nombre: 'FECTOP DESC',
                    descripcion: 'Fecha Tope Desc',
                }
                break
        }
        setOrderBy(campoOrdenacion.nombre)
        setOrdenacionExpeju(campoOrdenacion)
    }

    const handleDelete = registro => {
        if (!registro) return

        setRegistroActualExpeju(registro)
        setConfirmacion(true)
    }

    const handleAceptarConfirmacion = () => {
        setConfirmacion(false)

        borrarExpeju(registroActualExpeju)
            .then(() => {
                setMensaje({
                    tipo: 'exito',
                    texto: 'Registro eliminado correctamente',
                })
                actualizarVista(filtroExpeju, paginaExpeju, ordenacion)
            })
            .catch(error => {
                console.log(error)
                setMensaje({
                    tipo: 'error',
                    texto: 'Error al eliminar el registro',
                })
            })
    }

    const handleCancelarConfirmacion = () => {
        setRegistroActualExpeju(null)
        setConfirmacion(false)
    }

    // Hook para la paginación
    const {
        paginaExpeju,
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
    } = useNavegacionExpeju({
        tabla,
        obtenerRegistros,
    })

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        if (!usuario) return

        if (ordenacion && ordenacion.nombre) setOrderBy(ordenacion.nombre)

        actualizarVista(filtroExpeju, paginaExpeju, ordenacion)
    }, [usuario, filtroExpeju, ordenacion])

    useEffect(() => {
        if (!listaExcel || listaExcel.length === 0) return

        exportExcel()
    }, [listaExcel])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <ModalConfirmacion
                mostrarModal={confirmacion}
                handleAceptarConfirmacion={handleAceptarConfirmacion}
                handleCancelarConfirmacion={handleCancelarConfirmacion}
            />
            <ModalLoading mostrarModal={loading} color='#fff' />
            <div className='contenedor'>
                <h1 className='contenedor__h1'>
                    Mantenimiento de Expedientes Judiciales
                </h1>
                {mensaje && (
                    <Alerta mensaje={mensaje.texto} tipo={mensaje.tipo} />
                )}
                <div className='contenedor__main'>
                    <FiltroListaExpeju actualizarVista={actualizarVista} />
                    {lista && (
                        <Navegacion
                            campoOrdenacion={ordenacion}
                            ordenacion={listaOrdenacion}
                            paginaActual={paginaExpeju}
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
                    <h2 className='contenedor__main__h2'>
                        Lista de Expedientes
                    </h2>
                    <table className='tabla'>
                        <thead className='tabla__thead'>
                            <tr>
                                <th className='tabla__th'>Tema</th>
                                <th className='tabla__th'>Expediente</th>
                                <th className='tabla__th'>Abogado</th>
                                <th className='tabla__th'>Responsable</th>
                                <th className='tabla__th'>Recurso</th>
                                <th className='tabla__th'>Estado</th>
                                <th className='tabla__th'>Fecha Tope</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista &&
                                lista.length > 0 &&
                                lista.map(registro => (
                                    <tr
                                        className='tabla__tr'
                                        key={registro.NUMEXP}
                                    >
                                        <td
                                            className='tabla__td'
                                            onClick={() =>
                                                handleClick(registro)
                                            }
                                        >
                                            {registro.DESCRIPCION_TEMA}
                                        </td>
                                        <td
                                            className='tabla__td align-right'
                                            onClick={() =>
                                                handleClick(registro)
                                            }
                                        >
                                            {registro.CODEXP}
                                        </td>

                                        <td
                                            className='tabla__td'
                                            onClick={() =>
                                                handleClick(registro)
                                            }
                                        >
                                            {registro.NOMBRE_ABOGADO}
                                        </td>
                                        <td
                                            className='tabla__td'
                                            onClick={() =>
                                                handleClick(registro)
                                            }
                                        >
                                            {registro.NOMBRE_RESPONSABLE}
                                        </td>
                                        <td
                                            className='tabla__td'
                                            onClick={() =>
                                                handleClick(registro)
                                            }
                                        >
                                            {registro.NUMREC}
                                        </td>
                                        <td
                                            className='tabla__td align-center'
                                            onClick={() =>
                                                handleClick(registro)
                                            }
                                        >
                                            {registro.ESTADO}
                                        </td>
                                        <td
                                            className='tabla__td align-center'
                                            onClick={() =>
                                                handleClick(registro)
                                            }
                                        >
                                            {formateaFecha(registro.FECTOP)}
                                        </td>
                                        <td
                                            className='tabla__td table__del-th'
                                            onClick={() =>
                                                handleDelete(registro)
                                            }
                                            title='Eliminar registro'
                                        >
                                            <i className='far fa-trash-alt'></i>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <footer className='contenedor__footer'>
                        {numeroRegistros !== 0 && (
                            <span>{`${numeroRegistros} ${
                                numeroRegistros > 0 ? 'registros' : 'registro'
                            }`}</span>
                        )}
                        <div className='buttons-footer'>
                            <button
                                className='btn footer__btn'
                                type='button'
                                onClick={handleNuevo}
                            >
                                Alta
                            </button>
                            <button
                                className='btn footer__btn'
                                type='button'
                                onClick={handleClickExport}
                            >
                                Excel
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default ListaExpeju
