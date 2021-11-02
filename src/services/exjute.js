import { progress } from '@progress/jsdo-core'
import { conectar } from './common'

export const guardaExjute = (values, registroActual) => {
    const useSubmit = true
    const { codtem, descri } = values

    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'exjute' })
        const dataSet = {
            CODTEM: codtem,
            DESCRI: descri,
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
                .fill(`CODTEM = ${registroActual.CODTEM}`)
                .then(respuesta => {
                    const exjute = jsdo.ttEXJUTE.findById(
                        respuesta.jsdo.getId()
                    )

                    exjute.assign(dataSet)
                    return jsdo.saveChanges(useSubmit)
                })
                .then(
                    jsdo => {
                        return jsdo
                    },
                    error => error
                )
        }
    })
}

export const borrarExjute = registroActual => {
    const useSubmit = true
    const { codtem, descri } = registroActual

    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'exjute' })
        const dataSet = {
            CODTEM: codtem,
            DESCRI: descri,
        }

        jsdo.fill(`CODTEM = ${registroActual.CODTEM}`).then(
            respuesta => {
                const exjute = jsdo.ttEXJUTE.findById(respuesta.jsdo.getId())
                exjute.remove(dataSet)

                return jsdo.saveChanges(useSubmit)
            },
            error => error
        )
    })
}

export const obtenerRegistrosExjute = filtro => {
    return conectar().then(
        respuesta => {
            const { result } = respuesta

            if (result === 1 || result === 3) {
                const jsdo = new progress.data.JSDO({ name: 'exjute' })

                return jsdo.fill(filtro).then(
                    jsdo => {
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
            console.log('error exjute', error)
        }
    )
}
