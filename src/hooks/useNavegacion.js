import { useState, useEffect, useContext } from 'react'

import AppContext from 'context/AppContext'

import { contarRegistros } from 'services/common'

const useNavegacion = ({ tabla, obtenerRegistros }) => {
    const { paginaActual, setPaginaActual } = useContext(AppContext)
    const [numeroPaginas, setNumeroPaginas] = useState(0)
    const [numeroRegistros, setNumeroRegistros] = useState(0)
    const [ablFilter, setAblFilter] = useState(null)
    const [orderBy, setOrderBy] = useState('')
    const [numeroLineas, setNumeroLineas] = useState(10)

    const handleSiguiente = () => {
        const pagina =
            paginaActual < numeroPaginas ? paginaActual + 1 : numeroPaginas

        setPaginaActual(pagina)
    }

    const handleAnterior = () => {
        const pagina = paginaActual > 1 ? paginaActual - 1 : paginaActual

        setPaginaActual(pagina)
    }

    const handlePrimero = () => {
        setPaginaActual(1)
    }

    const handleUltimo = () => {
        setPaginaActual(numeroPaginas)
    }

    const modificaNumeroLineas = lineas => {
        setNumeroLineas(lineas)
    }

    useEffect(async () => {
        /* Tenemos que poner específicamente !== null porque si está en blanco
            no funciona la llamada condicional */
        if (ablFilter !== null && paginaActual !== 0) {
            const filtro = {
                //skip: (Math.max(paginaActual, 1) - 1) * numeroLineas,
                //skip: numeroLineas * (paginaActual - 1),
                skip:
                    paginaActual === 1
                        ? numeroLineas * (paginaActual - 1)
                        : numeroLineas * (paginaActual - 1) + 1,
                top: parseInt(numeroLineas),
                filter: ablFilter,
                sort: [orderBy],
            }

            try {
                await obtenerRegistros(filtro)

                await contarRegistros(ablFilter, tabla).then(
                    numeroRegistros => {
                        if (numeroRegistros < numeroLineas) {
                            setNumeroPaginas(1)
                        } else if (numeroRegistros % numeroLineas === 0) {
                            setNumeroPaginas(
                                Math.round(numeroRegistros / numeroLineas)
                            )
                        } else {
                            setNumeroPaginas(
                                Math.trunc(numeroRegistros / numeroLineas) + 1
                            )
                        }
                        setNumeroRegistros(numeroRegistros)
                    }
                )
            } catch (error) {
                error => console.log('error useNavegacion', error)
            }
        }
    }, [ablFilter, paginaActual, numeroLineas, orderBy])

    return {
        paginaActual,
        numeroPaginas,
        numeroRegistros,
        setPaginaActual,
        setAblFilter,
        setOrderBy,
        handlePrimero,
        handleSiguiente,
        handleAnterior,
        handleUltimo,
        setNumeroPaginas,
        setNumeroRegistros,
        modificaNumeroLineas,
    }
}

export default useNavegacion
