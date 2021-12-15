import { useState, useEffect } from 'react'

// Dependencias
import { obtenerRegistrosAuxiliar } from 'services/auxiliares'

// Componentes
// import { Boton, ContenedorModalAyuda, TablaAyuda, WrapperAyuda } from '../../UI'
import Navegacion from 'componentes/Navegacion'

// Hooks
import useNavegacionExjure from 'hooks/navegacion/useNavegacionExjure'

const ModalAyudaExjure = ({
    mostrarModal,
    handleAceptarAyudaResponsable,
    handleCancelarAyudaResponsable,
}) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [inputData, setInputData] = useState({
        label: '',
        value: '',
    })
    const { label, value } = inputData
    const [lista, setLista] = useState([])
    const tabla = 'exjure'

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const obtenerRegistros = filtro => {
        obtenerRegistrosAuxiliar(filtro, tabla).then(jsdo => {
            const { success, request } = jsdo
            if (success) {
                const lista = request.response.dsEXJURE.ttEXJURE
                setLista(lista)
            } else {
                console.log('ERROR', jsdo)
            }
        })
    }

    const handleChange = e => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (!inputData || !label || !value || label === '') return

        if (label === 'Código') {
            const filtro = `CODRES >= ${value === '' ? 0 : parseInt(value)}`
            setAblFilter(filtro)
        } else if (label === 'Nombre') {
            const filtro = `NOMBRE MATCHES '*${value}*'`
            setAblFilter(filtro)
        }
    }

    const handleClick = registro => {
        handleAceptarAyudaResponsable(registro)
    }

    const handleCancel = () => {
        handleCancelarAyudaResponsable()
    }

    // Hook para la paginación
    const {
        paginaExjure,
        numeroPaginas,
        numeroRegistros,
        setPaginaExjure,
        setAblFilter,
        handlePrimero,
        handleSiguiente,
        handleAnterior,
        handleUltimo,
    } = useNavegacionExjure({
        tabla,
        obtenerRegistros,
    })

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        if (!mostrarModal) return

        setAblFilter('')
        setPaginaExjure(1)
    }, [mostrarModal])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            {mostrarModal && (
                <div className='contenedor-ayuda'>
                    <div className='main-ayuda'>
                        <h2>Listado de Responsables</h2>
                        <Navegacion
                            paginaActual={paginaExjure}
                            numeroPaginas={numeroPaginas}
                            handleAnterior={handleAnterior}
                            handleSiguiente={handleSiguiente}
                            handlePrimero={handlePrimero}
                            handleUltimo={handleUltimo}
                            mostrarNumeroLineas={false}
                        />
                        <form onSubmit={handleSubmit}>
                            <div className='header-ayuda'>
                                <select
                                    className='selector header-ayuda__label'
                                    name='label'
                                    value={label}
                                    onChange={handleChange}
                                >
                                    <option></option>
                                    <option>Código</option>
                                    <option>Nombre</option>
                                </select>
                                <input
                                    type='text'
                                    className='form__input'
                                    name='value'
                                    value={value}
                                    onChange={handleChange}
                                ></input>
                                <button className='header-ayuda__btn'>
                                    <i className='fas fa-arrow-right fa-lg'></i>
                                </button>
                            </div>
                        </form>
                        <table className='tabla-ayuda'>
                            <thead className='tabla-ayuda__thead'>
                                <tr>
                                    <th className='tabla-ayuda__th'>Código</th>
                                    <th className='tabla-ayuda__th'>
                                        Descripción
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {lista &&
                                    lista.length > 0 &&
                                    lista.map(registro => (
                                        <tr
                                            className='tabla-ayuda__tr'
                                            onClick={() =>
                                                handleClick(registro)
                                            }
                                            key={registro.CODRES}
                                        >
                                            <td className='tabla-ayuda__td'>
                                                {registro.CODRES}
                                            </td>
                                            <td className='tabla-ayuda__td'>
                                                {registro.NOMBRE}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <footer className='main-ayuda__footer'>
                            {numeroRegistros !== 0 && (
                                <span>{`${numeroRegistros} registros`}</span>
                            )}
                            <button
                                className='btn'
                                type='button'
                                onClick={handleCancel}
                            >
                                Cancelar
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalAyudaExjure
