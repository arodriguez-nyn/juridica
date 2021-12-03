import { useState, useEffect, useContext } from 'react'

import SolaresContext from 'context/SolaresContext'

import { contarRegistros } from 'services/common'

const useNavegacionExjuab = ({ tabla, obtenerRegistros }) => {
    const { paginaExjuab, setPaginaExjuab } = useContext(SolaresContext)
    const [numeroPaginas, setNumeroPaginas] = useState(0)
    const [numeroRegistros, setNumeroRegistros] = useState(0)
    const [ablFilter, setAblFilter] = useState('')
    const [orderBy, setOrderBy] = useState('')
    const [numeroLineas, setNumeroLineas] = useState(10)

    const handleSiguiente = () => {
        const pagina =
            paginaExjuab < numeroPaginas ? paginaExjuab + 1 : numeroPaginas

        setPaginaExjuab(pagina)
    }

    const handleAnterior = () => {
        const pagina = paginaExjuab > 1 ? paginaExjuab - 1 : paginaExjuab

        setPaginaExjuab(pagina)
    }

    const handlePrimero = () => {
        setPaginaExjuab(1)
    }

    const handleUltimo = () => {
        setPaginaExjuab(numeroPaginas)
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
        /* Tenemos que poner específicamente !== null porque si está en blanco
            no funciona la llamada condicional */
        if (ablFilter !== null && paginaExjuab !== 0) {
            actualizarVista(ablFilter, paginaExjuab, orderBy)
        }
    }, [ablFilter, paginaExjuab, numeroLineas, orderBy])

    return {
        paginaExjuab,
        numeroPaginas,
        numeroRegistros,
        setPaginaExjuab,
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

export default useNavegacionExjuab
