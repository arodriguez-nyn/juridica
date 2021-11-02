import { useState } from 'react'

// Servicios
import { obtenerRegistrosAuxiliar } from 'services/auxiliares'

/* Estado para guardar el valor anterior de los campos auxiliares, para
    evitar consultas innecesarias a la bbdd
*/
const useLeaveExjute = () => {
    const [exjuteActual, setExjuteActual] = useState(null)

    const leaveExjute = (nuevoValor, inputData, setInputData) => {
        const filtro = `CODTEM = ${nuevoValor}`

        exjuteActual !== nuevoValor &&
            obtenerRegistrosAuxiliar(filtro, 'exjute').then(jsdo => {
                const { success, request } = jsdo
                if (success) {
                    const ttEXJUTE = request.response.dsEXJUTE.ttEXJUTE

                    if (ttEXJUTE) {
                        const registro = ttEXJUTE[0] // Sólo habrá un registro

                        setInputData({
                            ...inputData,
                            descripcionTema: registro.DESCRI,
                        })
                        setExjuteActual(registro.CODTEM)
                    } else {
                        setInputData({
                            ...inputData,
                            descripcionTema: '',
                        })
                    }
                } else {
                    console.log(jsdo)
                }
            })
    }

    return { leaveExjute }
}

export default useLeaveExjute
