import { useState, useContext, useEffect } from 'react'

// Contexto
import SolaresContext from 'context/SolaresContext'

import { formateaFecha } from 'util'

import './styles.css'

const FiltroListaExpeju = ({ actualizarVista }) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [filtroExpandido, setFiltroExpandido] = useState(false)
    const { setFiltroExpeju, camposFiltroExpeju, setCamposFiltroExpeju } =
        useContext(SolaresContext)
    const [inputFiltro, setInputFiltro] = useState(
        camposFiltroExpeju
            ? {
                  expediente: camposFiltroExpeju.CODEXP,
                  recurso: camposFiltroExpeju.NUMREC,
                  obra: camposFiltroExpeju.NOMBRE_OBRA,
                  abogado: camposFiltroExpeju.NOMBRE_ABOGADO,
                  tema: camposFiltroExpeju.DESCRIPCION_TEMA,
                  asunto: camposFiltroExpeju.DESCRIPCION_ASUNTO,
                  responsable: camposFiltroExpeju.NOMBRE_RESPONSABLE,
                  fechaTope: camposFiltroExpeju.FECTOP,
                  estado: camposFiltroExpeju.ESTADO,
              }
            : {
                  expediente: '',
                  recurso: '',
                  obra: '',
                  abogado: '',
                  recurso: '',
                  tema: '',
                  asunto: '',
                  responsable: '',
                  fechaTope: '',
                  estado: '',
              }
    )
    const {
        expediente,
        obra,
        abogado,
        recurso,
        tema,
        asunto,
        responsable,
        fechaTope,
        estado,
    } = inputFiltro

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    /* Declaramos esta función porque la pide el hook */
    const handleSubmit = e => {
        e.preventDefault()

        setFiltroExpandido(false)

        // Montamos los filtros
        const filtroExpediente =
            inputFiltro.expediente === ''
                ? ''
                : `CODEXP MATCHES '*${inputFiltro.expediente}*'`
        const filtroObra =
            inputFiltro.obra === ''
                ? ''
                : `NOMBRE_OBRA MATCHES '*${inputFiltro.obra}*'`
        const filtroAbogado =
            inputFiltro.abogado === ''
                ? ''
                : `NOMBRE_ABOGADO MATCHES '*${inputFiltro.abogado}*'`
        const filtroRecurso =
            inputFiltro.recurso === ''
                ? ''
                : `NUMREC MATCHES '*${inputFiltro.recurso}*'`
        const filtroTema =
            inputFiltro.tema === ''
                ? ''
                : `DESCRIPCION_TEMA MATCHES '*${inputFiltro.tema}*'`
        const filtroAsunto =
            inputFiltro.asunto === ''
                ? ''
                : `ASUNTO MATCHES '*${inputFiltro.asunto}*'`
        const filtroResponsable =
            inputFiltro.responsable === ''
                ? ''
                : `NOMBRE_RESPONSABLE MATCHES '*${inputFiltro.responsable}*'`
        const filtroFechaTope =
            inputFiltro.fechaTope === ''
                ? ''
                : `FECTOP = ${formateaFecha(inputFiltro.fechaTope)}`
        const filtroEstado =
            inputFiltro.estado === '' ? '' : `ESTADO = '${inputFiltro.estado}'`

        let ablFilter = ''
        if (filtroExpediente !== '') {
            ablFilter = `${filtroExpediente} `
        }

        if (filtroObra !== '') {
            ablFilter =
                ablFilter === '' ? filtroObra : `${ablFilter} AND ${filtroObra}`
        }

        if (filtroAbogado !== '') {
            ablFilter =
                ablFilter === ''
                    ? filtroAbogado
                    : `${ablFilter} AND ${filtroAbogado}`
        }

        if (filtroRecurso !== '') {
            ablFilter =
                ablFilter === ''
                    ? filtroRecurso
                    : `${ablFilter} AND ${filtroRecurso}`
        }

        if (filtroTema !== '') {
            ablFilter =
                ablFilter === '' ? filtroTema : `${ablFilter} AND ${filtroTema}`
        }

        if (filtroAsunto !== '') {
            ablFilter =
                ablFilter === ''
                    ? filtroAsunto
                    : `${ablFilter} AND ${filtroAsunto}`
        }

        if (filtroResponsable !== '') {
            ablFilter =
                ablFilter === ''
                    ? filtroResponsable
                    : `${ablFilter} AND ${filtroResponsable}`
        }

        if (filtroFechaTope !== '') {
            ablFilter =
                ablFilter === ''
                    ? filtroFechaTope
                    : `${ablFilter} AND ${filtroFechaTope}`
        }

        if (filtroEstado !== '') {
            ablFilter =
                ablFilter === ''
                    ? filtroEstado
                    : `${ablFilter} AND ${filtroEstado}`
        }

        // Guardamos en el contexto para recuperarlo al reentrar en la pantalla
        setCamposFiltroExpeju({
            CODEXP: inputFiltro.expediente,
            NUMREC: inputFiltro.recurso,
            NOMBRE_OBRA: inputFiltro.obra,
            NOMBRE_ABOGADO: inputFiltro.abogado,
            DESCRIPCION_TEMA: inputFiltro.tema,
            DESCRIPCION_ASUNTO: inputFiltro.asunto,
            NOMBRE_RESPONSABLE: inputFiltro.responsable,
            FECTOP: inputFiltro.fechaTope,
            ESTADO: inputFiltro.estado,
        })
        actualizarVista(ablFilter, 1, '')
        setFiltroExpeju(ablFilter)
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
            expediente: '',
            recurso: '',
            obra: '',
            abogado: '',
            tema: '',
            asunto: '',
            responsable: '',
            fechaTope: '',
            estado: '',
        })
        actualizarVista('', 1, '')
        setFiltroExpeju('')
    }

    useEffect(() => {
        camposFiltroExpeju &&
            setInputFiltro({
                expediente: camposFiltroExpeju.CODEXP,
                recurso: camposFiltroExpeju.NUMREC,
                obra: camposFiltroExpeju.NOMBRE_OBRA,
                abogado: camposFiltroExpeju.NOMBRE_ABOGADO,
                tema: camposFiltroExpeju.DESCRIPCION_TEMA,
                asunto: camposFiltroExpeju.DESCRIPCION_ASUNTO,
                responsable: camposFiltroExpeju.NOMBRE_RESPONSABLE,
                fechaTope: camposFiltroExpeju.FECTOP,
                estado: camposFiltroExpeju.ESTADO,
            })
    }, [camposFiltroExpeju])

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
                                <label htmlFor='filtro-expediente'>
                                    Expediente
                                </label>
                                <input
                                    id='filtro-expediente'
                                    className='form__input'
                                    name='expediente'
                                    value={expediente}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor='filtro-recurso'>Recurso</label>
                                <input
                                    id='filtro-recurso'
                                    className='form__input'
                                    name='recurso'
                                    value={recurso}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='grid col-2'>
                            <div>
                                <label htmlFor='filtro-obra'>Obra</label>
                                <input
                                    id='filtro-obra'
                                    className='form__input'
                                    name='obra'
                                    value={obra}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor='filtro-abogado'>Abogado</label>
                                <input
                                    id='filtro-abogado'
                                    className='form__input'
                                    name='abogado'
                                    value={abogado}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='grid col-2'>
                            <div>
                                <label htmlFor='filtro-tema'>Tema</label>
                                <input
                                    id='filtro-tema'
                                    className='form__input'
                                    name='tema'
                                    value={tema}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor='filtro-asunto'>Asunto</label>
                                <input
                                    id='filtro-asunto'
                                    className='form__input'
                                    name='asunto'
                                    value={asunto}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='grid col-2'>
                            <div>
                                <label htmlFor='filtro-responsable'>
                                    Responsable
                                </label>
                                <input
                                    id='filtro-responsable'
                                    className='form__input'
                                    name='responsable'
                                    value={responsable}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='grid col-2'>
                                <div>
                                    <label htmlFor='filtro-fechaTope'>
                                        Fecha Tope
                                    </label>
                                    <input
                                        id='filtro-fecha-tope'
                                        type='date'
                                        className='form__input'
                                        name='fechaTope'
                                        value={fechaTope}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor='filtro-estado'>
                                        Estado
                                    </label>
                                    <select
                                        id='filtro-estado'
                                        className='selector'
                                        name='estado'
                                        value={estado}
                                        onChange={handleChange}
                                    >
                                        <option></option>
                                        <option value='Analizando'>
                                            Analizando
                                        </option>
                                        <option>Presentado</option>
                                        <option>Pte. Borrador y/o Susp.</option>
                                        <option>No presentar</option>
                                        <option>Recibido borrador</option>
                                    </select>
                                </div>
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

export default FiltroListaExpeju
