import { useState } from 'react'

import './styles.css'

// Componentes
// import Menu from 'componentes/Menu'
import Header from 'componentes/Header'

const SolaresLayout = ({ children }) => {
    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const showParentMenu = show => {
        setShowMenu(show)
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <Header />
            {/* <Menu showParentMenu={showParentMenu} />
            <main className={`solares-layout ${showMenu ? 'menu--show' : ''}`}>
                {children}
            </main> */}
            <main className='solares-layout'>{children}</main>
        </>
    )
}

export default SolaresLayout
