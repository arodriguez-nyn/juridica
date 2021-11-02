import { useState } from 'react'

// Servicios
import { obtenerRegistrosAuxiliar } from 'services/auxiliares'

const useLeaveExjure = () => {
    const [exjureActual, setExjureActual] = useState(null)

    const leaveExjure = (nuevoValor, inputData, setInputData) => {
        const filtro = `CODRES = ${nuevoValor}`

        exjureActual !== nuevoValor &&
            obtenerRegistrosAuxiliar(filtro, 'exjure').then(jsdo => {
                const { success, request } = jsdo
                if (success) {
                    const ttEXJURE = request.response.dsEXJURE.ttEXJURE

                    if (ttEXJURE) {
                        const registro = ttEXJURE[0] // Sólo habrá un registro

                        setInputData({
                            ...inputData,
                            nombreResponsable: registro.NOMBRE,
                        })
                        setExjureActual(registro.CODRES)
                    } else {
                        setInputData({
                            ...setInputData,
                            nombreResponsable: '',
                        })
                    }
                } else {
                    console.log(jsdo)
                }
            })
    }

    return { leaveExjure }
}

export default useLeaveExjure
