import { progress } from '@progress/jsdo-core'
import { conectar } from './common'

export const guardaExjuab = (values, registroActual) => {
    const useSubmit = true
    const { codabo, nombre } = values

    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'exjuab' })
        const dataSet = {
            CODABO: codabo,
            NOMBRE: nombre,
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
                .fill(`CODABO = ${registroActual.CODABO}`)
                .then(respuesta => {
                    const exjuab = jsdo.ttEXJUAB.findById(
                        respuesta.jsdo.getId()
                    )

                    exjuab.assign(dataSet)
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

export const borrarExjuab = registroActual => {
    const useSubmit = true
    const { codabo, nombre } = registroActual

    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'exjuab' })
        const dataSet = {
            CODABO: codabo,
            NOMBRE: nombre,
        }

        jsdo.fill(`CODABO = ${registroActual.CODABO}`).then(
            respuesta => {
                const exjuab = jsdo.ttEXJUAB.findById(respuesta.jsdo.getId())
                exjuab.remove(dataSet)

                return jsdo.saveChanges(useSubmit)
            },
            error => error
        )
    })
}

export const obtenerRegistrosExjuab = filtro => {
    return conectar().then(
        respuesta => {
            const { result } = respuesta

            if (result === 1 || result === 3) {
                const jsdo = new progress.data.JSDO({ name: 'exjuab' })

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
            console.log('error exjuab', error)
        }
    )
}
