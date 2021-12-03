import { useState, useEffect } from 'react'

// Dependencias
import { useHistory } from 'react-router-dom'

import './styles.css'

const FormularioExjuab = ({
    registroActual,
    guardarRegistro,
    setMensaje,
    obtieneRegistroActual,
}) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [inputData, setInputData] = useState({
        nombre: '',
    })
    const { nombre } = inputData
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

        if (!nombre || nombre === '') {
            return 'El nombre es obligatorio'
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
            nombre: '',
        })
        setMensaje(null)
    }

    const handleBack = () => {
        history.push('/expeju/formulario')
    }

    const handleClear = () => {
        obtieneRegistroActual(null)
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
            nombre: registroActual.NOMBRE,
        })
    }, [registroActual])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <form>
                <h2 className='contenedor__main__h2'>
                    Formulario Abogados Expediente
                </h2>
                <div className='grid col-1'>
                    <label className='form__label' htmlFor='exjuab-nombre'>
                        Nombre del Abogado
                    </label>
                    <input
                        className='form__input span-3'
                        name='nombre'
                        type='text'
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <footer className='grid col-2'>
                    <div className='temas-footer'>
                        <button
                            className='btn footer__btn'
                            width='120px'
                            type='button'
                            onClick={handleClear}
                        >
                            Alta
                        </button>
                        <button
                            className='btn footer__btn'
                            type='button'
                            onClick={handleGuardar}
                        >
                            Guardar
                        </button>
                    </div>
                    {/* <div className='footer2'>
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
                    </div> */}
                </footer>
            </form>
        </>
    )
}

export default FormularioExjuab
