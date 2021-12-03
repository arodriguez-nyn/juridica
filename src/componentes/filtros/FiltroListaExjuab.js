import { useState, useContext, useEffect } from 'react'

// Contexto
import SolaresContext from 'context/SolaresContext'

import './styles.css'

const FiltroListaExjuab = ({ actualizarVista }) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [filtroExpandido, setFiltroExpandido] = useState(false)
    const { setFiltroExjuab, camposFiltroExjuab, setCamposFiltroExjuab } =
        useContext(SolaresContext)
    const [inputFiltro, setInputFiltro] = useState(
        camposFiltroExjuab
            ? {
                  nombre: camposFiltroExjuab.NOMBRE,
              }
            : {
                  nombre: '',
              }
    )
    const { nombre } = inputFiltro

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    /* Declaramos esta función porque la pide el hook */
    const handleSubmit = e => {
        e.preventDefault()

        setFiltroExpandido(false)

        // Montamos los filtros
        const filtroAbogados =
            inputFiltro.nombre === ''
                ? ''
                : `NOMBRE MATCHES '*${inputFiltro.nombre}*'`
        let ablFilter = ''
        if (filtroAbogados !== '') {
            ablFilter = `${filtroAbogados} `
        }

        // Guardamos en el contexto para recuperarlo al reentrar en la pantalla
        setCamposFiltroExjuab({
            NOMBRE: inputFiltro.nombre,
        })

        actualizarVista(ablFilter, 1, '')
        setFiltroExjuab(ablFilter)
    }

    const handleChange = e => {
        setInputFiltro({
            ...inputFiltro,
            [e.target.name]: e.target.value,
        })
    }

    const handleLimpiar = () => {
        setFiltroExpandido(false)
        setInputFiltro({
            nombre: '',
        })
        actualizarVista('', 1, '')
        setFiltroExjuab('')
    }

    useEffect(() => {
        camposFiltroExjuab &&
            setInputFiltro({
                nombre: camposFiltroExjuab.NOMBRE,
            })
    }, [camposFiltroExjuab])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <div className='contenedor-filtro'>
            <header className='contenedor-filtro__header'>
                <h1 className='contendor-filtro__h1'>Filtros</h1>
                <span
                    className='contendor-filtro__toggle'
                    onClick={() => setFiltroExpandido(!filtroExpandido)}
                >
                    <i className='fas fa-bars fa-lg'></i>
                </span>
            </header>
            {filtroExpandido && (
                <form onSubmit={handleSubmit}>
                    <main className='contenedor-filtro__main'>
                        <div className='grid col-2'>
                            <div>
                                <label htmlFor='filtro-tema'>
                                    Nombre Abogado
                                </label>
                                <input
                                    id='filtro-abogado'
                                    className='form__input'
                                    name='nombre'
                                    value={nombre}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </main>
                    <footer className='contenedor-filtro__footer'>
                        <button className='btn' width='120px' type='submit'>
                            Aplicar
                        </button>
                        <button
                            className='btn contenedor-filtro__last-btn'
                            type='button'
                            onClick={handleLimpiar}
                        >
                            Limpiar
                        </button>
                    </footer>
                </form>
            )}
        </div>
    )
}

export default FiltroListaExjuab
