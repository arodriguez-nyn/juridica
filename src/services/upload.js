import axios from 'axios'
import { obtenerRegistrosAuxiliar } from './auxiliares'

const BASE_URL = 'http://localhost:7020/nynweb/'

const clienteAxios = axios.create({
    withCredentials: true,
    BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const subirFicheros = async (formData, tema, asunto) => {
    const url = `http://localhost:7020/nynweb/web/upload?`

    await clienteAxios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}
