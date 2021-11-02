import { progress } from '@progress/jsdo-core'
import { obtenerRegistrosAuxiliar } from './auxiliares'
import { conectar } from './common'

export const guardaExjudo = (values, registroActual) => {
    const useSubmit = true
    const { numdoc, codtem, asunto, nomdoc } = values

    return conectar().then(async () => {
        const jsdo = new progress.data.JSDO({ name: 'exjudo' })
        const dataSet = {
            NUMDOC: numdoc,
            CODTEM: codtem,
            ASUNTO: asunto,
            NOMDOC: nomdoc,
        }

        if (!registroActual) {
            // Nuevo registro
            jsdo.add(dataSet)
            return jsdo.saveChanges(useSubmit).then(
                jsdo => jsdo,
                error => error
            )
        } else {
            return jsdo
                .fill(`NUMDOC = ${registroActual.NUMDOC}`)
                .then(respuesta => {
                    const exjudo = jsdo.ttEXJUDO.findById(
                        respuesta.jsdo.getId()
                    )
                    exjudo.assign(dataSet)
                    return jsdo.saveChanges(useSubmit)
                })
                .then(
                    jsdo => {
                        console.log('jsdo', jsdo)
                        return jsdo
                    },
                    error => error
                )
        }
    })
}

export const obtenerRegistrosExjudo = filtro => {
    return conectar().then(
        respuesta => {
            const { result } = respuesta

            if (result === 1 || result === 3) {
                const jsdo = new progress.data.JSDO({ name: 'exjudo' })

                return jsdo.fill(filtro).then(
                    jsdo => {
                        console.log('jsdo', jsdo)
                        return jsdo
                    },
                    error => {
                        return error
                    }
                )
            } else {
                return result
            }
        },
        error => {
            console.log('error exjudo', error)
        }
    )
}
