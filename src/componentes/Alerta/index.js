import React from 'react'

// Componentes
import './styles.css'

const Alerta = ({ mensaje, tipo }) => {
    return (
        <div
            className={`caja-alerta ${
                tipo === 'error' ? 'caja-error' : 'caja-exito'
            }`}
        >
            {mensaje}
        </div>
    )
}

export default Alerta
