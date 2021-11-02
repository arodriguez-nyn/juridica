import { useContext, useState, useEffect } from 'react'

// Dependencias
import NumberFormat from 'react-number-format'
import { useHistory } from 'react-router-dom'

// Servicios
import { guardaExpeju, borrarExpeju } from 'services/expeju'

// Contexto
import SolaresContext from 'context/SolaresContext'

// Componentes
import Alerta from 'componentes/Alerta'
import ModalLoading from 'componentes/modales/ModalLoading'
import ModalConfirmacion from 'componentes/modales/ModalConfirmacion'
import ModalAyudaObras from 'componentes/modales/ModalAyudaObras'
import ModalAyudaExjuab from 'componentes/modales/ModalAyudaExjuab'
import ModalAyudaExjure from 'componentes/modales/ModalAyudaExjure'
import ModalAyudaExjute from 'componentes/modales/ModalAyudaExjute'
import useLeaveObras from 'hooks/leave/useLeaveObras'
import useLeaveExjuab from 'hooks/leave/useLeaveExjuab'
import useLeaveExjure from 'hooks/leave/useLeaveExjure'
import useLeaveExjute from 'hooks/leave/useLeaveExjute'

import './styles.css'

const FormularioExpeju = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [mensaje, setMensaje] = useState(null)
    const [inputData, setInputData] = useState({
        numexp: 0,
        codexp: '',
        obra: 0,
        numrec: '',
        nombreObra: '',
        codtem: '',
        descripcionTema: '',
        asunto: '',
        codabo: 0,
        nombreAbogado: '',
        respon: 0,
        nombreResponsable: '',
        observ: '',
        fectop: '',
        estado: '',
    })
    const {
        numexp,
        codexp,
        obra,
        numrec,
        nombreObra,
        codtem,
        descripcionTema,
        asunto,
        codabo,
        nombreAbogado,
        respon,
        nombreResponsable,
        observ,
        fectop,
        estado,
    } = inputData
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [confirmacion, setConfirmacion] = useState(false)
    const [ayudaObra, setAyudaObra] = useState(false)
    const [ayudaAbogado, setAyudaAbogado] = useState(false)
    const [ayudaResponsable, setAyudaResponsable] = useState(false)
    const [ayudaTema, setAyudaTema] = useState(false)

    const { registroActualExpeju, setRegistroActualExpeju, paginaExpeju } =
        useContext(SolaresContext)

    const { leaveObras } = useLeaveObras()
    const { leaveExjuab } = useLeaveExjuab()
    const { leaveExjure } = useLeaveExjure()
    const { leaveExjute } = useLeaveExjute()

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const gestionErrores = mensaje => {
        const inicio = mensaje.indexOf(':') + 2
        const fin = mensaje.indexOf('(') - 1
        setMensaje({
            tipo: 'error',
            texto: mensaje.substring(inicio, fin),
        })
    }

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

        if (!codtem || codtem === 0) {
            return 'El tema del expediente es obligatorio'
        }

        if (!asunto || asunto === 0) {
            return 'El asunto del expediente es obligatorio'
        }

        if (!codabo || codabo === 0) {
            return 'El abogado externo del expediente es obligatorio'
        }

        if (!estado || estado === '') {
            return 'El estado del expediente es obligatorio'
        }

        return ''
    }

    const guardarRegistro = (accion = '') => {
        accion !== 'Volver' && setLoading(true)

        guardaExpeju(inputData, registroActualExpeju).then(respuesta => {
            /* Por defecto anulamos el state de las operaciones para que no salgan
               los mensajes en la pantalla de la lista
            */
            const { success } = respuesta

            accion !== 'Volver' && setLoading(false)

            if (success) {
                setRegistroActualExpeju(
                    respuesta.request.response.dsEXPEJU.ttEXPEJU[0]
                )
                accion !== 'Volver' &&
                    setMensaje({
                        tipo: 'exito',
                        texto: 'Registro guardado correctamente',
                    })
                accion === 'Volver' && history.push('/expeju/lista')
            } else {
                const error = respuesta.request.response._errors[0]._errorMsg
                gestionErrores(error)
            }
        })
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
        guardarRegistro()
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
        guardarRegistro('Volver')
    }

    const handleTemas = () => {
        history.push('/exjute')
    }

    const clear = () => {
        setRegistroActualExpeju(null)
        setInputData({
            numexp: 0,
            obra: 0,
            codexp: '',
            numrec: '',
            nombreObra: '',
            codtem: 0,
            descripcionTema: '',
            asunto: '',
            codabo: 0,
            nombreAbogado: '',
            respon: 0,
            nombreResponsable: '',
            observ: '',
            fectop: '',
            estado: '',
        })
        setMensaje(null)
    }

    const handleBack = () => {
        history.push('/expeju/lista')
    }

    const handleDelete = () => {
        if (!registroActualExpeju) return

        setConfirmacion(true)
    }

    const handleAceptarConfirmacion = () => {
        setConfirmacion(false)

        borrarExpeju(registroActualExpeju)
            .then(() => {
                setMensaje({
                    tipo: 'exito',
                    texto: 'Registro eliminado correctamente',
                })
                clear()
            })
            .catch(error => {
                console.log(error)
                setMensaje({
                    tipo: 'error',
                    texto: 'Error al eliminar el registro',
                })
            })
    }

    const handleCancelarConfirmacion = () => {
        setConfirmacion(false)
    }

    const handleAceptarAyudaObras = registroObra => {
        setAyudaObra(false)
        setInputData({
            ...inputData,
            obra: registroObra.OBRA,
            nombreObra: registroObra.NOMOBR,
        })
    }

    const handleCancelarAyudaObras = () => {
        setAyudaObra(false)
    }

    const handleAceptarAyudaAbogado = registroAbogado => {
        setAyudaAbogado(false)
        setInputData({
            ...inputData,
            codabo: registroAbogado.CODABO,
            nombreAbogado: registroAbogado.NOMBRE,
        })
    }

    const handleCancelarAyudaAbogado = () => {
        setAyudaAbogado(false)
    }

    const handleAceptarAyudaResponsable = registroResponsable => {
        setAyudaResponsable(false)
        setInputData({
            ...inputData,
            respon: registroResponsable.CODRES,
            nombreResponsable: registroResponsable.NOMBRE,
        })
    }

    const handleCancelarAyudaResponsable = () => {
        setAyudaResponsable(false)
    }

    const handleAceptarAyudaTema = registroTema => {
        setAyudaTema(false)
        setInputData({
            ...inputData,
            codtem: registroTema.CODTEM,
            descripcionTema: registroTema.DESCRI,
        })
    }

    const handleCancelarAyudaTema = () => {
        setAyudaTema(false)
    }

    const handleBlurObras = e => {
        const nuevoValor = parseInt(e.target.value)

        leaveObras(nuevoValor, inputData, setInputData)
    }

    const handleBlurExjuab = e => {
        const nuevoValor = parseInt(e.target.value)

        leaveExjuab(nuevoValor, inputData, setInputData)
    }

    const handleBlurExjure = e => {
        const nuevoValor = parseInt(e.target.value)

        leaveExjure(nuevoValor, inputData, setInputData)
    }

    const handleBlurExjute = e => {
        const nuevoValor = parseInt(e.target.value)

        leaveExjute(nuevoValor, inputData, setInputData)
    }

    const handleClear = () => {
        setInputData(null)
        clear()
    }

    const limpiarCodtem = () => {
        setInputData({
            ...inputData,
            codtem: 0,
            descripcionTema: '',
        })
    }

    const limpiarObra = () => {
        setInputData({
            ...inputData,
            obra: 0,
            nombreObra: '',
        })
    }

    const limpiarCodabo = () => {
        setInputData({
            ...inputData,
            codabo: 0,
            nombreAbogado: '',
        })
    }

    const limpiarRespon = () => {
        setInputData({
            ...inputData,
            respon: 0,
            nombreResponsable: '',
        })
    }

    console.log('paginaExpeju', paginaExpeju)

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        if (!registroActualExpeju) {
            clear()
            return
        }

        setInputData({
            numexp: registroActualExpeju.NUMEXP,
            codexp: registroActualExpeju.CODEXP,
            obra: registroActualExpeju.OBRA,
            numrec: registroActualExpeju.NUMREC,
            descripcionTema: registroActualExpeju.DESCRIPCION_TEMA,
            nombreObra: registroActualExpeju.NOMBRE_OBRA,
            codtem: registroActualExpeju.CODTEM,
            asunto: registroActualExpeju.ASUNTO,
            codabo: registroActualExpeju.CODABO,
            nombreAbogado: registroActualExpeju.NOMBRE_ABOGADO,
            respon: registroActualExpeju.RESPON,
            nombreResponsable: registroActualExpeju.NOMBRE_RESPONSABLE,
            observ: registroActualExpeju.OBSERV,
            fectop: registroActualExpeju.FECTOP
                ? registroActualExpeju.FECTOP
                : '',
            estado: registroActualExpeju.ESTADO,
        })
    }, [])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <ModalLoading mostrarModal={loading} />
            <ModalAyudaObras
                mostrarModal={ayudaObra}
                handleAceptarAyudaObras={handleAceptarAyudaObras}
                handleCancelarAyudaObras={handleCancelarAyudaObras}
            />
            <ModalAyudaExjuab
                mostrarModal={ayudaAbogado}
                handleAceptarAyudaAbogado={handleAceptarAyudaAbogado}
                handleCancelarAyudaAbogado={handleCancelarAyudaAbogado}
            />
            <ModalAyudaExjure
                mostrarModal={ayudaResponsable}
                handleAceptarAyudaResponsable={handleAceptarAyudaResponsable}
                handleCancelarAyudaResponsable={handleCancelarAyudaResponsable}
            />
            <ModalAyudaExjute
                mostrarModal={ayudaTema}
                handleAceptarAyudaTema={handleAceptarAyudaTema}
                handleCancelarAyudaTema={handleCancelarAyudaTema}
            />
            <ModalConfirmacion
                mostrarModal={confirmacion}
                handleAceptarConfirmacion={handleAceptarConfirmacion}
                handleCancelarConfirmacion={handleCancelarConfirmacion}
            />
            <form className='contenedor'>
                <h1 className='contenedor__h1'>
                    Mantenimiento de Expedientes Judiciales
                </h1>
                {mensaje && (
                    <Alerta mensaje={mensaje.texto} tipo={mensaje.tipo} />
                )}

                <div className='contenedor__main'>
                    <h2 className='contenedor__main__h2'>
                        Formulario Expediente Judicial
                    </h2>
                    <div className='grid col-2'>
                        <div className='grid col-3'>
                            <div>
                                <label
                                    className='form__label'
                                    htmlFor='expeju-numexp'
                                >
                                    Nº de Registro
                                </label>
                                <NumberFormat
                                    id='expeju-numexp'
                                    name='numexp'
                                    value={numexp}
                                    disabled
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    className='form__input align-right'
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label
                                    className='form__label'
                                    htmlFor='expeju-codexp'
                                >
                                    Nº de Expediente
                                </label>
                                <input
                                    id='expeju-codexp'
                                    className='form__input'
                                    name='codexp'
                                    value={codexp}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label
                                    className='form__label'
                                    htmlFor='expeju-numrec'
                                >
                                    Nº Recurso
                                </label>
                                <input
                                    d='expeju-numrec'
                                    name='numrec'
                                    value={numrec}
                                    className='form__input'
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label
                                    className='form__label'
                                    htmlFor='expeju-obra'
                                >
                                    Nº de Obra
                                </label>
                                <div className='grid col-4'>
                                    <div className='bloque-campo'>
                                        <NumberFormat
                                            id='expeju-obra'
                                            name='obra'
                                            value={obra}
                                            thousandSeparator={true}
                                            allowNegative={false}
                                            className='form__input align-right'
                                            onBlur={handleBlurObras}
                                            onChange={handleChange}
                                        />
                                        <button
                                            className='icono-buscar'
                                            type='button'
                                            title='Seleccionar el número de obra'
                                            onClick={() => setAyudaObra(true)}
                                        >
                                            <i className='fas fa-search fa-lg'></i>
                                        </button>
                                        <button
                                            className='icono-limpiar'
                                            type='button'
                                            onClick={limpiarObra}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    <input
                                        className='form__input span-3'
                                        name='nombreObra'
                                        value={nombreObra}
                                        type='text'
                                        readOnly
                                        value={nombreObra}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid col-2'>
                        <div>
                            <label
                                className='form__label'
                                htmlFor='expeju-codtem'
                            >
                                Tema
                                <span className='campo-obligatorio'>*</span>
                            </label>
                            <div className='grid col-4'>
                                <div
                                    className='bloque-campo'
                                    title='Campo obligatorio'
                                >
                                    <NumberFormat
                                        className='form__input'
                                        id='expeju-codtem'
                                        name='codtem'
                                        value={codtem}
                                        className='form__input align-right'
                                        onChange={handleChange}
                                        onBlur={handleBlurExjute}
                                    />
                                    <button
                                        className='icono-buscar'
                                        type='button'
                                        title='Seleccionar el código de tema'
                                        onClick={() => setAyudaTema(true)}
                                    >
                                        <i className='fas fa-search fa-lg'></i>
                                    </button>
                                    <button
                                        className='icono-limpiar'
                                        type='button'
                                        onClick={limpiarCodtem}
                                    >
                                        &times;
                                    </button>
                                </div>
                                <input
                                    className='form__input span-3'
                                    name='descripcionTema'
                                    type='text'
                                    readOnly
                                    value={descripcionTema}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                className='form__label'
                                htmlFor='expeju-asunto'
                            >
                                Asunto
                                <span className='campo-obligatorio'>*</span>
                            </label>
                            <input
                                className='form__input'
                                id='expeju-asunto'
                                name='asunto'
                                type='text'
                                value={asunto}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='grid col-2'>
                        <div>
                            <label
                                className='form__label'
                                htmlFor='expeju-abogado'
                            >
                                Abogado
                                <span className='campo-obligatorio'>*</span>
                            </label>
                            <div className='grid col-4'>
                                <div className='bloque-campo'>
                                    <NumberFormat
                                        id='expeju-abogado'
                                        name='codabo'
                                        value={codabo}
                                        title='Campo obligatorio'
                                        thousandSeparator={true}
                                        allowNegative={false}
                                        className='form__input align-right'
                                        onChange={handleChange}
                                        onBlur={handleBlurExjuab}
                                    />
                                    <button
                                        className='icono-buscar'
                                        type='button'
                                        title='Seleccionar el código del abogado'
                                        onClick={() => setAyudaAbogado(true)}
                                    >
                                        <i className='fas fa-search fa-lg'></i>
                                    </button>
                                    <button
                                        className='icono-limpiar'
                                        type='button'
                                        onClick={limpiarCodabo}
                                    >
                                        &times;
                                    </button>
                                </div>
                                <input
                                    className='form__input span-3'
                                    name='nombreAbogado'
                                    type='text'
                                    readOnly
                                    value={nombreAbogado}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                className='form__label'
                                htmlFor='expeju-responsable'
                            >
                                Responsable
                            </label>
                            <div className='grid col-4'>
                                <div className='bloque-campo'>
                                    <NumberFormat
                                        id='expeju-responsable'
                                        name='respon'
                                        value={respon}
                                        thousandSeparator={true}
                                        allowNegative={false}
                                        className='form__input align-right'
                                        onChange={handleChange}
                                        onBlur={handleBlurExjure}
                                    />
                                    <button
                                        className='icono-buscar'
                                        type='button'
                                        title='Seleccionar el código del responsable'
                                        onClick={() =>
                                            setAyudaResponsable(true)
                                        }
                                    >
                                        <i className='fas fa-search fa-lg'></i>
                                    </button>
                                    <button
                                        className='icono-limpiar'
                                        type='button'
                                        onClick={limpiarRespon}
                                    >
                                        &times;
                                    </button>
                                </div>
                                <input
                                    className='form__input span-3'
                                    name='nombreResponsable'
                                    type='text'
                                    readOnly
                                    value={nombreResponsable}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className='form__label' htmlFor='expeju-observ'>
                            Comentarios
                        </label>
                        <textarea
                            id='expeju-observ'
                            name='observ'
                            value={observ}
                            className='editor'
                            rows='10'
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className='grid col-2'>
                        <div className='grid col-2'>
                            <div>
                                <label
                                    className='form__label'
                                    htmlFor='expeju-fectop'
                                >
                                    Fecha Tope
                                </label>
                                <input
                                    className='form__input'
                                    id='expeju-fectop'
                                    name='fectop'
                                    type='date'
                                    value={fectop}
                                    onChange={handleChange}
                                ></input>
                            </div>
                            <div></div>
                        </div>
                        <div className='grid col-1'>
                            <div>
                                <label
                                    className='form__label'
                                    htmlFor='expeju-estado'
                                    name='estado'
                                    value={estado}
                                    onChange={handleChange}
                                >
                                    Estado
                                    <span className='campo-obligatorio'>*</span>
                                </label>
                                <select
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
                            {registroActualExpeju ? (
                                <button
                                    className='btn footer__btn'
                                    width='120px'
                                    type='button'
                                    onClick={handleDelete}
                                >
                                    Borrar
                                </button>
                            ) : (
                                <button
                                    className='btn-disabled footer__btn'
                                    type='button'
                                    onClick={handleDelete}
                                >
                                    Borrar
                                </button>
                            )}
                        </div>
                        <div className='footer2'>
                            <button
                                className='btn footer__btn'
                                type='button'
                                onClick={handleTemas}
                            >
                                Temas
                            </button>
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
                </div>
            </form>
        </>
    )
}

export default FormularioExpeju
