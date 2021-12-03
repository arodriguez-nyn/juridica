/* -------------------------------------------------------------------- */
/* ---------------------- LIBRERÍA DE UTILIDADES ---------------------- */
/* -------------------------------------------------------------------- */
const MIN_CELLS_WIDTH = 15

// Cambia la fecha para mostrar, de formato AAAA-MM-DD a  DD/MM/AAAA
export const formateaFecha = fechaOriginal => {
    if (fechaOriginal === '' || !fechaOriginal) return ''

    const dia = fechaOriginal.substr(8, 2)
    const mes = fechaOriginal.substr(5, 2)
    const ano = fechaOriginal.substr(0, 4)

    return `${dia}/${mes}/${ano}`
}

// Autoajustamos las celdas del excel en función del objeto JSON con datos
export const autoFitCells = jsonObject => {
    const objectMaxLength = []

    for (let i = 0; i < jsonObject.length; i++) {
        let value = Object.values(jsonObject[i])

        for (let j = 0; j < value.length; j++) {
            if (typeof value[j] == 'number') {
                objectMaxLength[j] = 10
            } else {
                objectMaxLength[j] =
                    objectMaxLength[j] >= value[j].length
                        ? objectMaxLength[j]
                        : value[j].length
            }
            objectMaxLength[j] = Math.max(objectMaxLength[j], MIN_CELLS_WIDTH)
        }
    }
    return objectMaxLength
}
