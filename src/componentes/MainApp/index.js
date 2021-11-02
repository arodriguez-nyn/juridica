// Dependencias
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Contexto
import { AppContextProvider } from 'context/AppContext'
import { SolaresContextProvider } from 'context/SolaresContext'

// Componentes
import Login from 'pages/Login'
import FormularioExpeju from 'pages/expedientes-judiciales/FormularioExpeju'
import ListaExpeju from 'pages/expedientes-judiciales/ListaExpeju'
import SolaresLayout from 'componentes/layout/SolaresLayout'
import Exjute from 'pages/auxiliares/Exjute'
import RutaProtegida from 'rutas/RutaProtegida'

const MainApp = () => {
    return (
        <AppContextProvider>
            <SolaresContextProvider>
                <Router basename={'/nynweb/'}>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route exact path='/login/' component={Login} />

                        <SolaresLayout>
                            <RutaProtegida
                                exact
                                path='/expeju/lista'
                                component={ListaExpeju}
                            />
                            <RutaProtegida
                                exact
                                path='/expeju/formulario'
                                component={FormularioExpeju}
                            />
                            <RutaProtegida
                                exact
                                path='/exjute'
                                component={Exjute}
                            />
                        </SolaresLayout>
                        {/* <Route exact path='/expeju/documentos'>
                            <SolaresLayout>
                                <DocumentosExpedientesJudiciales />
                            </SolaresLayout>
                        </Route> */}
                    </Switch>
                </Router>
            </SolaresContextProvider>
        </AppContextProvider>
    )
}

export default MainApp
