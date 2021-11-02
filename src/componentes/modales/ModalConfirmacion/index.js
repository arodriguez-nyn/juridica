// Componentes
import './styles.css'

const ModalConfirmacion = ({
    mostrarModal,
    handleAceptarConfirmacion,
    handleCancelarConfirmacion,
}) => {
    const handleSubmit = e => {
        e.preventDefault()

        handleAceptarConfirmacion()
    }

    const handleCancel = () => {
        handleCancelarConfirmacion()
    }

    return (
        <>
            {mostrarModal && (
                <div className='contenedor-confirmacion'>
                    <div className='wrapper-confirmacion'>
                        <h1 className='confirmacion__h1'>
                            Mensaje de Confirmación
                        </h1>
                        <main className='confirmacion__main'>
                            <p>
                                ¿Está seguro de que desea eliminar este
                                registro?
                            </p>
                            <footer className='confirmacion__footer'>
                                <div className='grid col-2'>
                                    <button
                                        className='btn-confirmar'
                                        width='120px'
                                        type='button'
                                        onClick={handleSubmit}
                                    >
                                        Aceptar
                                    </button>
                                    <button
                                        className='btn'
                                        type='button'
                                        onClick={handleCancel}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </footer>
                        </main>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalConfirmacion
