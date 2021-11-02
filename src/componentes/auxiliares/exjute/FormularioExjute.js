import { useState, useEffect } from 'react'

// Dependencias
import { useHistory } from 'react-router-dom'

const FormularioExjute = ({ registroActual, guardarRegistro, setMensaje }) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [inputData, setInputData] = useState({
        descri: '',
    })
    const { descri } = inputData
    const history = useHistory()

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleChange = e => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        })
    }

    const validaRegistro = () => {
        if (!inputData) {
            return 'Error al guardar los datos'
        }

        if (!descri || descri === '') {
            return 'La descripción es obligatoria'
        }

        return ''
    }

    const handleGuardar = e => {
        e.preventDefault()

        const message = validaRegistro()

        if (message !== '') {
            setMensaje({
                tipo: 'error',
                texto: message,
            })
            return
        }
        setMensaje(null)
        guardarRegistro('', inputData)
    }

    const handleGuardarVolver = () => {
        const message = validaRegistro()

        if (message !== '') {
            setMensaje({
                tipo: 'error',
                texto: message,
            })
            return
        }

        setMensaje(null)
        guardarRegistro('Volver', inputData)
    }

    const clear = () => {
        setInputData({
            descri: '',
        })
        setMensaje(null)
    }

    const handleBack = () => {
        history.push('/expeju/formulario')
    }

    const handleClear = () => {
        clear()
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        if (!registroActual) {
            clear()
            return
        }

        setInputData({
            descri: registroActual.DESCRI,
        })
    }, [registroActual])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <form>
                <h2 className='contenedor__main__h2'>
                    Formulario Tema Expediente
                </h2>
                <div className='grid col-1'>
                    <label className='form__label' htmlFor='exjute-descri'>
                        Descripción del Tema
                    </label>
                    <input
                        className='form__input span-3'
                        name='descri'
                        type='text'
                        value={descri}
                        onChange={handleChange}
                    />
                </div>
                <footer className='grid col-2'>
                    <div className='footer1'>
                        <button
                            className='btn footer__btn'
                            width='120px'
                            type='button'
                            onClick={handleClear}
                        >
                            Alta
                        </button>
                    </div>
                    <div className='footer2'>
                        <button
                            className='btn footer__btn'
                            type='button'
                            onClick={handleGuardar}
                        >
                            Guardar
                        </button>
                        <button
                            className='btn footer__btn'
                            type='button'
                            onClick={handleGuardarVolver}
                        >
                            Guardar y Volver
                        </button>
                        <button
                            className='btn footer__btn'
                            type='button'
                            onClick={handleBack}
                        >
                            Volver
                        </button>
                    </div>
                </footer>
            </form>
        </>
    )
}

export default FormularioExjute
