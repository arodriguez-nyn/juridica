import { progress } from '@progress/jsdo-core'
import { conectar } from './common'

export const obtenerRegistrosAuxiliar = (filtro = '', tabla = '') => {
    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: tabla })

        return jsdo.fill(filtro).then(
            jsdo => {
                return jsdo
            },
            error => error
        )
    })
}
