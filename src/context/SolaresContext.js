import { useState, createContext } from 'react'

const SolaresContext = createContext()

export const SolaresContextProvider = ({ children }) => {
    const [registroActualExpeju, setRegistroActualExpeju] = useState(null)
    const [registroActualExjute, setRegistroActualExjute] = useState(null)
    const [registroActualExjuab, setRegistroActualExjuab] = useState(null)

    const [filtroExpeju, setFiltroExpeju] = useState('')
    const [filtroExjute, setFiltroExjute] = useState('')
    const [filtroExjuab, setFiltroExjuab] = useState('')
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
    const [ordenacionExjute, setOrdenacionExjute] = useState(null)
    const [ordenacionExpeju, setOrdenacionExpeju] = useState(null)
    const [ordenacionExjuab, setOrdenacionExjuab] = useState(null)
    const [paginaExpeju, setPaginaExpeju] = useState(1)
    const [paginaExjute, setPaginaExjute] = useState(1)
    const [paginaExjuab, setPaginaExjuab] = useState(1)

    return (
        <SolaresContext.Provider
            value={{
                registroActualExpeju,
                registroActualExjute,
                registroActualExjuab,
                filtroExpeju,
                filtroExjute,
                filtroExjuab,
                camposFiltroExpeju,
                camposFiltroExjute,
                camposFiltroExjuab,
                paginaExjute,
                paginaExpeju,
                paginaExjuab,
                ordenacionExjute,
                ordenacionExpeju,
                ordenacionExjuab,
                setFiltroExpeju,
                setFiltroExjute,
                setFiltroExjuab,
                setCamposFiltroExpeju,
                setCamposFiltroExjute,
                setCamposFiltroExjuab,
                setPaginaExpeju,
                setPaginaExjute,
                setPaginaExjuab,
                setRegistroActualExpeju,
                setRegistroActualExjute,
                setRegistroActualExjuab,
                setOrdenacionExpeju,
                setOrdenacionExjute,
                setOrdenacionExjuab,
            }}
        >
            {children}
        </SolaresContext.Provider>
    )
}

export default SolaresContext
