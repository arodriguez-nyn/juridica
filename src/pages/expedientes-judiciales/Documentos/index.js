import { useEffect, useState } from 'react'

// Servicios
import { guardaExjudo, obtenerRegistrosExjudo } from 'services/exjudo'
import { obtenerRegistrosAuxiliar } from 'services/auxiliares'
import { subirFicheros } from 'services/upload'

// Hooks
import useNavegacion from 'hooks/useNavegacion'

// Componentes
import Alerta from 'componentes/Alerta'

import './styles.css'

const DocumentosExpedientesJudiciales = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [inputData, setInputData] = useState({
        tema: '',
        asunto: '',
    })
    const { tema, asunto } = inputData
    const [mostrarBoton, setMostrarBoton] = useState(null)
    const [loading, setLoading] = useState(null)
    const [mensaje, setMensaje] = useState(null)
    const [filtro, setFiltro] = useState(null)
    const [lista, setLista] = useState([])
    const [temas, setTemas] = useState([])
    const tabla = 'exjudo'

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleChange = e => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        })
    }

    const guardarRegistro = () => {
        if (!inputData) {
            setMensaje({
                tipo: 'error',
                texto: 'Error al guardar los datos',
            })
            return
        }

        setLoading(true)
        guardaExjudo(inputData, null).then(respuesta => {
            /* Por defecto anulamos el state de las operaciones para que no salgan
               los mensajes en la pantalla de la lista
            */
            // setRegistroCreado(null)
            // setRegistroBorrado(null)
            // setRegistroModificado(null)

            setLoading(false)

            const { success } = respuesta

            if (success) {
                setMensaje({
                    tipo: 'exito',
                    texto: 'Documento guardado correctamente',
                })
            } else {
                setMensaje({
                    tipo: 'error',
                    texto: 'Error al guardar el documento',
                })
            }
        })
    }

    const handleFileInput = async e => {
        if (!tema || tema === '' || !asunto || asunto === '') {
            console.log('Debe seleccionar el tema y el asunto')
            return
        }

        const formData = new FormData()
        formData.append('tema', tema)
        formData.append('asunto', asunto)
        formData.append('archivos', e.target.files[0])

        try {
            await subirFicheros(formData, tema, asunto)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerRegistros = () => {
        setLoading(true)

        obtenerRegistrosExjudo(filtro).then(
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
                    const lista = request.response.dsEXJUDO.ttEXJUDO

                    if (lista) {
                        setLista(lista)
                    } else {
                        setLista(null)
                    }
                } else {
                    console.log('jsdo', jsdo)
                }
            },
            error => {
                setLoading(false)
                console.log('error Docs Exjudo', error)
            }
        )
    }

    const obtenerListaTemas = () => {
        obtenerRegistrosAuxiliar('', 'exjute').then(
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
                    const lista = request.response.dsEXJUTE.ttEXJUTE

                    if (lista) {
                        setTemas(lista)
                    } else {
                        setTemas(null)
                    }
                } else {
                    console.log('jsdo', jsdo)
                }
            },
            error => {
                setLoading(false)
                console.log('error Docs Exjudo', error)
            }
        )
    }

    // Hook para la paginación
    const { setAblFilter } = useNavegacion({
        tabla,
        obtenerRegistros,
    })

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        setMostrarBoton(tema && tema !== '' && asunto && asunto !== '')
    }, [tema, asunto])

    useEffect(() => {
        setAblFilter('')
    }, [inputData])

    useEffect(() => {
        obtenerListaTemas()
    }, [])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <form className='contenedor'>
            <h1 className='contenedor__h1'>
                Mantenimiento de Expedientes Judiciales
            </h1>
            {mensaje && <Alerta mensaje={mensaje.texto} tipo={mensaje.tipo} />}

            <div className='contenedor__main'>
                <h2 className='contenedor__main__h2'>Documentación</h2>
                {temas && temas.length >= 0 && (
                    <select
                        className='selector'
                        name='tema'
                        value={tema}
                        onChange={handleChange}
                    >
                        <option></option>
                        {temas.map(tema => (
                            <option key={tema.CODTEM}>{tema.DESCRI}</option>
                        ))}
                    </select>
                )}
                <select
                    className='selector'
                    name='asunto'
                    value={asunto}
                    onChange={handleChange}
                >
                    <option></option>
                    <option>Asunto 1</option>
                    <option>Asunto 2</option>
                    <option>Asunto 3</option>
                </select>
                <table className='tabla'>
                    <tbody className='tabla__tbody'>
                        <tr className='tabla__tr'>
                            <td className='tabla__td'>Documento 1</td>
                        </tr>
                        <tr className='tabla__tr'>
                            <td className='tabla__td'>Documento 2</td>
                        </tr>
                        <tr className='tabla__tr'>
                            <td className='tabla__td'>Documento 3</td>
                        </tr>
                    </tbody>
                </table>
                <footer className='documentacion-footer'>
                    {mostrarBoton && (
                        <label className='input-file footer__input-file'>
                            <input
                                className='btn footer__btn'
                                type='file'
                                onChange={handleFileInput}
                            />
                            <i className='fas fa-paperclip fa-lg'></i> Nuevo
                        </label>
                    )}
                </footer>
            </div>
        </form>
    )
}

export default DocumentosExpedientesJudiciales
