/* -------------------------------------------------------------------- */
/* ---------------------- LIBRERÍA DE UTILIDADES ---------------------- */
/* -------------------------------------------------------------------- */

// Cambia la fecha para mostrar, de formato AAAA-MM-DD a  DD/MM/AAAA
export const formateaFecha = fechaOriginal => {
    if (fechaOriginal === '' || !fechaOriginal) return ''

    const dia = fechaOriginal.substr(8, 2)
    const mes = fechaOriginal.substr(5, 2)
    const ano = fechaOriginal.substr(0, 4)

    return `${dia}/${mes}/${ano}`
}
