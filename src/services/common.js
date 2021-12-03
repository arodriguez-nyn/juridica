import { progress } from '@progress/jsdo-core'

// const serviceURI = 'http://localhost:7020/nynweb'
// const catalogURI = 'http://localhost:7020/nynweb/static/nynwebService.json'

const serviceURI = 'https://192.168.1.221:8302/nynweb'
const catalogURI = 'https://192.168.1.221:8302/nynweb/static/nynwebService.json'

const authenticationModel = progress.data.Session.AUTH_TYPE_FORM
const name = 'sesionActualKey'

let sesionActual

export const conectar = (username = '', password = '') => {
    return progress.data
        .getSession({
            name,
            serviceURI,
            authenticationModel,
            catalogURI,
            username,
            password,
        })
        .then(respuesta => {
            sesionActual = respuesta
            return respuesta
        })
        .catch(error => {
            console.log('error conectar', error)
            return error
        })
}

export const contarRegistros = (filtro, tabla) => {
    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: tabla })
        const ablFilter = { filter: filtro }

        return jsdo.invoke('count', ablFilter).then(
            jsdo => {
                if (jsdo.success) {
                    const numeroRegistros = jsdo.request.response.numRecs
                    return numeroRegistros
                }
            },
            error => {
                console.log('error contarRegistros', error)
                return 0
            }
        )
    })
}

export const cerrarSesion = () => {
    return sesionActual.jsdosession.invalidate()
}
