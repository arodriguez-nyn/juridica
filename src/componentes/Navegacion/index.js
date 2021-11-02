import './styles.css'

const Navegacion = ({
    campoOrdenacion,
    buttonSize,
    ordenacion,
    paginaActual,
    numeroPaginas,
    numeroLineas,
    handlePrimero,
    handleAnterior,
    handleSiguiente,
    handleUltimo,
    modificaNumeroLineas,
    modificaOrdenacion,
    mostrarNumeroLineas = true,
}) => {
    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleLineas = e => {
        modificaNumeroLineas(parseInt(e.target.value))
    }

    const handleOrdenacion = e => {
        modificaOrdenacion(e.target.value)
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <header className='navegacion'>
            <span className='navegacion__bloque'>
                <label className='bloque__label'>
                    {`Página ${paginaActual} de ${numeroPaginas}`}
                </label>
                {mostrarNumeroLineas && (
                    <>
                        <label
                            className='bloque__label'
                            htmlFor='lineas-pagina'
                        >
                            Líneas por pág.
                        </label>

                        <select
                            value={numeroLineas}
                            className='selector-lineas'
                            id='lineas-pagina'
                            onChange={handleLineas}
                        >
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                        </select>
                    </>
                )}
            </span>
            {ordenacion && ordenacion.length > 0 && (
                <span className='navegacion__bloque'>
                    <label className='bloque__label' htmlFor='cafiso-ordenar'>
                        Ordenar por:
                    </label>
                    <select
                        className='selector-lineas'
                        id='ordenacion'
                        onChange={handleOrdenacion}
                        value={
                            campoOrdenacion ? campoOrdenacion.descripcion : ''
                        }
                    >
                        {' '}
                        <option></option>
                        {ordenacion.map(campo => (
                            <option key={campo}>{campo}</option>
                        ))}
                    </select>
                </span>
            )}
            <span>
                <button
                    className='boton-navegacion'
                    size={buttonSize}
                    onClick={handlePrimero}
                >
                    <i className='fas fa-caret-left fa-2x'></i>
                    <i className='fas fa-caret-left fa-2x'></i>
                </button>
                <button
                    className='boton-navegacion'
                    size={buttonSize}
                    onClick={handleAnterior}
                >
                    <i className='fas fa-caret-left fa-2x'></i>
                </button>
                <button
                    className='boton-navegacion'
                    size={buttonSize}
                    onClick={handleSiguiente}
                >
                    <i className='fas fa-caret-right fa-2x'></i>
                </button>
                <button
                    className='boton-navegacion'
                    size={buttonSize}
                    onClick={handleUltimo}
                >
                    <i className='fas fa-caret-right fa-2x'></i>
                    <i className='fas fa-caret-right fa-2x'></i>
                </button>
            </span>
        </header>
    )
}

export default Navegacion
