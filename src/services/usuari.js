import { progress } from '@progress/jsdo-core'
import { conectar } from './common'

export const obtenerRegistrosUsuari = filtro => {
    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'usuari' })

        return jsdo.fill(filtro).then(
            jsdo => jsdo,
            error => error
        )
    })
}
