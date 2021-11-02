import { progress } from '@progress/jsdo-core'
import { conectar } from './common'

export const guardaExpeju = (values, registroActual) => {
    const useSubmit = true
    const {
        numexp,
        codexp,
        obra,
        numrec,
        nombreObra,
        codtem,
        descripcionTema,
        asunto,
        codabo,
        nombreAbogado,
        respon,
        nombreResponsable,
        observ,
        fectop,
        estado,
    } = values

    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'expeju' })
        const dataSet = {
            NUMEXP: numexp,
            CODEXP: codexp,
            OBRA: obra,
            NUMREC: numrec,
            NOMBRE_OBRA: nombreObra,
            CODTEM: codtem,
            DESCRIPCION_TEMA: descripcionTema,
            ASUNTO: asunto,
            CODABO: codabo,
            NOMBRE_ABOGADO: nombreAbogado,
            RESPON: respon,
            NOMBRE_RESPONSABLE: nombreResponsable,
            OBSERV: observ,
            FECTOP: fectop ? fectop : '',
            ESTADO: estado,
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
                .fill(`NUMEXP = ${registroActual.NUMEXP}`)
                .then(respuesta => {
                    const expeju = jsdo.ttEXPEJU.findById(
                        respuesta.jsdo.getId()
                    )
                    expeju.assign(dataSet)
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

export const borrarExpeju = registroActual => {
    const useSubmit = true
    const {
        numexp,
        codexp,
        obra,
        numrec,
        nombreObra,
        codtem,
        descripcionTema,
        asunto,
        codabo,
        nombreAbogado,
        respon,
        nombreResponsable,
        observ,
        fectop,
        estado,
    } = registroActual

    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'expeju' })
        const dataSet = {
            NUMEXP: numexp,
            CODEXP: codexp,
            OBRA: obra,
            NUMREC: numrec,
            NOMBRE_OBRA: nombreObra,
            CODTEM: codtem,
            DESCRIPCION_TEMA: descripcionTema,
            ASUNTO: asunto,
            CODABO: codabo,
            NOMBRE_ABOGADO: nombreAbogado,
            RESPON: respon,
            NOMBRE_RESPONSABLE: nombreResponsable,
            OBSERV: observ,
            FECTOP: fectop,
            ESTADO: estado,
        }

        jsdo.fill(`NUMEXP = ${registroActual.NUMEXP}`).then(
            respuesta => {
                const expeju = jsdo.ttEXPEJU.findById(respuesta.jsdo.getId())
                expeju.remove(dataSet)

                return jsdo.saveChanges(useSubmit)
            },
            error => error
        )
    })
}

export const obtenerRegistrosExpeju = filtro => {
    return conectar().then(
        respuesta => {
            const { result } = respuesta

            if (result === 1 || result === 3) {
                const jsdo = new progress.data.JSDO({ name: 'expeju' })

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
            console.log('error expeju', error)
        }
    )
}
