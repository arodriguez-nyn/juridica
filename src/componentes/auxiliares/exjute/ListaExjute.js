import { useState } from 'react'

// Componentes
import ModalConfirmacion from 'componentes/modales/ModalConfirmacion'

const ListaExpeju = ({
    lista,
    numeroRegistros,
    borrarRegistro,
    obtieneRegistroActual,
}) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [confirmacion, setConfirmacion] = useState(false)
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null)

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleClick = registro => {
        obtieneRegistroActual(registro)
    }

    const handleDelete = registro => {
        setRegistroSeleccionado(registro)
        setConfirmacion(true)
    }

    const handleAceptarConfirmacion = () => {
        setConfirmacion(false)

        borrarRegistro(registroSeleccionado)
    }

    const handleCancelarConfirmacion = () => {
        setRegistroSeleccionado(null)
        setConfirmacion(false)
    }

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
            <table className='tabla'>
                <thead className='tabla__thead'>
                    <tr>
                        <th className='tabla__th'>Descripción del Tema</th>
                    </tr>
                </thead>
                <tbody>
                    {lista &&
                        lista.length > 0 &&
                        lista.map(registro => (
                            <tr className='tabla__tr' key={registro.CODTEM}>
                                <td
                                    className='tabla__td'
                                    onClick={() => handleClick(registro)}
                                >
                                    {registro.DESCRI}
                                </td>
                                <td
                                    className='tabla__td table__del-th'
                                    onClick={() => handleDelete(registro)}
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
            </footer>
        </>
    )
}

export default ListaExpeju
