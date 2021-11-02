import { useState } from 'react'

// Servicios
import { obtenerRegistrosAuxiliar } from 'services/auxiliares'

/* Estado para guardar el valor anterior de los campos auxiliares, para
    evitar consultas innecesarias a la bbdd
*/
const useLeaveObras = () => {
    const [obraActual, setObraActual] = useState(null)

    const leaveObras = (nuevoValor, inputData, setInputData) => {
        const filtro = `OBRA = ${nuevoValor}`

        obraActual !== nuevoValor &&
            obtenerRegistrosAuxiliar(filtro, 'obras').then(jsdo => {
                const { success, request } = jsdo
                if (success) {
                    const ttOBRAS = request.response.dsOBRAS.ttOBRAS

                    if (ttOBRAS) {
                        const registro = ttOBRAS[0] // Sólo habrá un registro

                        setInputData({
                            ...inputData,
                            nombreObra: registro.NOMOBR,
                        })
                        setObraActual(registro.OBRA)
                    } else {
                        setInputData({
                            ...setInputData,
                            nombreObra: '',
                        })
                    }
                } else {
                    console.log(jsdo)
                }
            })
    }

    return { leaveObras }
}

export default useLeaveObras
