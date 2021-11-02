import { useState } from 'react'

// Servicios
import { obtenerRegistrosAuxiliar } from 'services/auxiliares'

/* Estado para guardar el valor anterior de los campos auxiliares, para
    evitar consultas innecesarias a la bbdd
*/
const useLeaveExjuab = () => {
    const [exjuabActual, setExjuabActual] = useState(null)

    const leaveExjuab = (nuevoValor, inputData, setInputData) => {
        const filtro = `CODABO = ${nuevoValor}`

        exjuabActual !== nuevoValor &&
            obtenerRegistrosAuxiliar(filtro, 'exjuab').then(jsdo => {
                const { success, request } = jsdo
                if (success) {
                    const ttEXJUAB = request.response.dsEXJUAB.ttEXJUAB

                    if (ttEXJUAB) {
                        const registro = ttEXJUAB[0] // Sólo habrá un registro

                        setInputData({
                            ...inputData,
                            nombreAbogado: registro.NOMBRE,
                        })
                        setExjuabActual(registro.CODABO)
                    } else {
                        setInputData({
                            ...setInputData,
                            nombreAbogado: '',
                        })
                    }
                } else {
                    console.log(jsdo)
                }
            })
    }

    return { leaveExjuab }
}

export default useLeaveExjuab
