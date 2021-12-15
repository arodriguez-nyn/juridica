import { useState, useEffect } from 'react'

// Dependencias
import { obtenerRegistrosAuxiliar } from 'services/auxiliares'

// Componentes
// import { Boton, ContenedorModalAyuda, TablaAyuda, WrapperAyuda } from '../../UI'
import Navegacion from 'componentes/Navegacion'

// Hooks
import useNavegacionExjuab from 'hooks/navegacion/useNavegacionExjuab'

const ModalAyudaExjuab = ({
    mostrarModal,
    handleAceptarAyudaAbogado,
    handleCancelarAyudaAbogado,
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
    const tabla = 'exjuab'

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const obtenerRegistros = filtro => {
        obtenerRegistrosAuxiliar(filtro, tabla).then(jsdo => {
            const { success, request } = jsdo
            if (success) {
                const lista = request.response.dsEXJUAB.ttEXJUAB
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
            const filtro = `CODABO >= ${value === '' ? 0 : parseInt(value)}`
            setAblFilter(filtro)
        } else if (label === 'Nombre') {
            const filtro = `NOMBRE MATCHES '*${value}*'`
            setAblFilter(filtro)
        }
    }

    const handleClick = registro => {
        handleAceptarAyudaAbogado(registro)
    }

    const handleCancel = () => {
        handleCancelarAyudaAbogado()
    }

    // Hook para la paginación
    const {
        paginaActualExjuab,
        numeroPaginasExjuab,
        numeroRegistros,
        setPaginaExjuab,
        setAblFilter,
        handlePrimero,
        handleSiguiente,
        handleAnterior,
        handleUltimo,
    } = useNavegacionExjuab({
        tabla,
        obtenerRegistros,
    })

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        if (!mostrarModal) return

        setAblFilter('')
        setPaginaExjuab(1)
    }, [mostrarModal])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            {mostrarModal && (
                <div className='contenedor-ayuda'>
                    <div className='main-ayuda'>
                        <h2>Listado de Abogados Exp. Judiciales</h2>
                        <Navegacion
                            paginaActual={paginaActualExjuab}
                            numeroPaginas={numeroPaginasExjuab}
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
                                    <i className='fas fa-arrow-right'></i>
                                </button>
                            </div>
                        </form>
                        <table className='tabla-ayuda'>
                            <thead className='tabla-ayuda__thead'>
                                <tr>
                                    <th className='tabla-ayuda__th'>Código</th>
                                    <th className='tabla-ayuda__th'>Nombre</th>
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
                                            key={registro.CODABO}
                                        >
                                            <td className='tabla-ayuda__td'>
                                                {registro.CODABO}
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

export default ModalAyudaExjuab
