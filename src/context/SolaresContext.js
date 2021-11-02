import { useState, createContext } from 'react'

const SolaresContext = createContext()

export const SolaresContextProvider = ({ children }) => {
    const [registroActualExpeju, setRegistroActualExpeju] = useState(null)
    const [registroActualExjute, setRegistroActualExjute] = useState(null)

    const [filtroExpeju, setFiltroExpeju] = useState('')
    const [filtroExjute, setFiltroExjute] = useState('')
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
    const [ordenacionExjute, setOrdenacionExjute] = useState(null)
    const [ordenacionExpeju, setOrdenacionExpeju] = useState(null)
    const [paginaExpeju, setPaginaExpeju] = useState(1)
    const [paginaExjute, setPaginaExjute] = useState(1)

    // const guardaOrdenacion = ordenacion => {
    //     setOrdenacion(ordenacion)
    // }

    // const guardaOrdenacionExpeju = ordenacion => {
    //     setOrdenacionExpeju(ordenacion)
    // }

    return (
        <SolaresContext.Provider
            value={{
                registroActualExpeju,
                registroActualExjute,
                filtroExpeju,
                filtroExjute,
                camposFiltroExpeju,
                camposFiltroExjute,
                paginaExjute,
                paginaExpeju,
                ordenacionExjute,
                ordenacionExpeju,
                setFiltroExpeju,
                setFiltroExjute,
                setCamposFiltroExpeju,
                setCamposFiltroExjute,
                setPaginaExpeju,
                setPaginaExjute,
                setRegistroActualExpeju,
                setRegistroActualExjute,
                setOrdenacionExpeju,
                setOrdenacionExjute,
            }}
        >
            {children}
        </SolaresContext.Provider>
    )
}

export default SolaresContext
