import React from 'react'
import { render } from 'react-dom'

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import MainApp from 'componentes/MainApp'

import '../static/css/framework.css'

render(<MainApp />, document.getElementById('root'))
