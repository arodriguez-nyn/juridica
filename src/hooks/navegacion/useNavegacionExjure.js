import { useState, useEffect, useContext } from 'react'

import SolaresContext from 'context/SolaresContext'

import { contarRegistros } from 'services/common'

const useNavegacionExjure = ({ tabla, obtenerRegistros }) => {
    const { paginaExjure, setPaginaExjure } = useContext(SolaresContext)
    const [numeroPaginas, setNumeroPaginas] = useState(0)
    const [numeroRegistros, setNumeroRegistros] = useState(0)
    const [ablFilter, setAblFilter] = useState('')
    const [orderBy, setOrderBy] = useState('')
    const [numeroLineas, setNumeroLineas] = useState(10)

    const handleSiguiente = () => {
        const pagina =
            paginaExjure < numeroPaginas ? paginaExjure + 1 : numeroPaginas

        setPaginaExjure(pagina)
    }

    const handleAnterior = () => {
        const pagina = paginaExjure > 1 ? paginaExjure - 1 : paginaExjure

        setPaginaExjure(pagina)
    }

    const handlePrimero = () => {
        setPaginaExjure(1)
    }

    const handleUltimo = () => {
        setPaginaExjure(numeroPaginas)
    }

    const modificaNumeroLineas = lineas => {
        setNumeroLineas(lineas)
    }

    const actualizarVista = async (ablFilter = '', pagina = 1) => {
        const filtro = {
            // skip:
            //     pagina === 1
            //         ? numeroLineas * (pagina - 1)
            //         : numeroLineas * (pagina - 1) + 1,
            skip: numeroLineas * (pagina - 1),
            top: parseInt(numeroLineas),
            filter: ablFilter,
            sort: [orderBy],
        }

        try {
            await obtenerRegistros(filtro)
            await contarRegistros(ablFilter, tabla).then(numeroRegistros => {
                if (numeroRegistros < numeroLineas) {
                    setNumeroPaginas(1)
                } else if (numeroRegistros % numeroLineas === 0) {
                    setNumeroPaginas(Math.round(numeroRegistros / numeroLineas))
                } else {
                    setNumeroPaginas(
                        Math.trunc(numeroRegistros / numeroLineas) + 1
                    )
                }
                setNumeroRegistros(numeroRegistros)
            })
        } catch (error) {
            error => console.log('error useNavegacion', error)
        }
    }

    useEffect(async () => {
        /* Tenemos que poner espec??ficamente !== null porque si est?? en blanco
            no funciona la llamada condicional */
        if (ablFilter !== null && paginaExjure !== 0) {
            actualizarVista(ablFilter, paginaExjure, orderBy)
        }
    }, [ablFilter, paginaExjure, numeroLineas, orderBy])

    return {
        paginaExjure,
        numeroPaginas,
        numeroRegistros,
        setPaginaExjure,
        numeroLineas,
        setAblFilter,
        setOrderBy,
        handlePrimero,
        handleSiguiente,
        handleAnterior,
        handleUltimo,
        setNumeroPaginas,
        setNumeroRegistros,
        modificaNumeroLineas,
        actualizarVista,
    }
}

export default useNavegacionExjure