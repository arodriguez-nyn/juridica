import { useState, createContext } from 'react'

const SolaresContext = createContext()

export const SolaresContextProvider = ({ children }) => {
    const [registroActualExpeju, setRegistroActualExpeju] = useState(null)
    const [registroActualExjute, setRegistroActualExjute] = useState(null)
    const [registroActualExjuab, setRegistroActualExjuab] = useState(null)
    const [registroActualExjure, setRegistroActualExjure] = useState(null)
    const [registroActualObras, setRegistroActualObras] = useState(null)

    const [filtroExpeju, setFiltroExpeju] = useState('')
    const [filtroExjute, setFiltroExjute] = useState('')
    const [filtroExjuab, setFiltroExjuab] = useState('')
    const [filtroExjure, setFiltroExjure] = useState('')
    const [filtroObras, setFiltroObras] = useState('')
    const [camposFiltroExpeju, setCamposFiltroExpeju] = useState({
        CODEXP: '',
        NUMREC: '',
        NOMBRE_OBRA: '',
        NOMBRE_ABOGADO: '',
        DESCRIPCION_TEMA: '',
        DESCRIPCION_ASUNTO: '',
        NOMBRE_RESPONSABLE: '',
        FECTOP: '',
        ESTADO: '',
    })
    const [camposFiltroExjute, setCamposFiltroExjute] = useState({
        DESCRI: '',
    })
    const [camposFiltroExjuab, setCamposFiltroExjuab] = useState({
        NOMBRE: '',
    })
    const [camposFiltroExjure, setCamposFiltroExjure] = useState({
        NOMBRE: '',
    })
    const [camposFiltroObras, setCamposFiltroObras] = useState({
        NOMOBR: '',
    })
    const [ordenacionExjute, setOrdenacionExjute] = useState(null)
    const [ordenacionExpeju, setOrdenacionExpeju] = useState(null)
    const [ordenacionExjuab, setOrdenacionExjuab] = useState(null)
    const [ordenacionExjure, setOrdenacionExjure] = useState(null)
    const [ordenacionObras, setOrdenacionObras] = useState(null)
    const [paginaExpeju, setPaginaExpeju] = useState(1)
    const [paginaExjute, setPaginaExjute] = useState(1)
    const [paginaExjuab, setPaginaExjuab] = useState(1)
    const [paginaExjure, setPaginaExjure] = useState(1)
    const [paginaObras, setPaginaObras] = useState(1)

    return (
        <SolaresContext.Provider
            value={{
                registroActualExpeju,
                registroActualExjute,
                registroActualExjuab,
                registroActualExjure,
                registroActualObras,
                filtroExpeju,
                filtroExjute,
                filtroExjuab,
                filtroExjure,
                filtroObras,
                camposFiltroExpeju,
                camposFiltroExjute,
                camposFiltroExjuab,
                camposFiltroExjure,
                camposFiltroObras,
                paginaExjute,
                paginaExpeju,
                paginaExjuab,
                paginaExjure,
                paginaObras,
                ordenacionExjute,
                ordenacionExpeju,
                ordenacionExjuab,
                ordenacionExjure,
                ordenacionObras,
                setFiltroExpeju,
                setFiltroExjute,
                setFiltroExjuab,
                setFiltroExjure,
                setFiltroObras,
                setCamposFiltroExpeju,
                setCamposFiltroExjute,
                setCamposFiltroExjuab,
                setCamposFiltroExjure,
                setCamposFiltroObras,
                setPaginaExpeju,
                setPaginaExjute,
                setPaginaExjuab,
                setPaginaExjure,
                setPaginaObras,
                setRegistroActualExpeju,
                setRegistroActualExjute,
                setRegistroActualExjuab,
                setRegistroActualExjure,
                setRegistroActualObras,
                setOrdenacionExpeju,
                setOrdenacionExjute,
                setOrdenacionExjuab,
                setOrdenacionExjure,
                setOrdenacionObras,
            }}
        >
            {children}
        </SolaresContext.Provider>
    )
}

export default SolaresContext
