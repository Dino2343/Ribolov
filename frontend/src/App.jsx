import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarPles from './components/NavBarPles'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/Pocetna'
import RibePregled from './pages/ribe/RibePregled'
import RibeDodaj from './pages/ribe/RibeDodaj'
import RibePromjena from './pages/ribe/RibePromjena'


function App() {
  return (
    <>
    <Container>
      <NavBarPles />
      
      <Routes>
        <Route path={RouteNames.HOME} element={<Pocetna />} />
        <Route path={RouteNames.RIBE_PREGLED} element={<RibePregled />} />
        <Route path={RouteNames.RIBE_NOVI} element={<RibeDodaj/>}/>
        <Route path={RouteNames.RIBE_PROMJENA} element={<RibePromjena/>}/>
      </Routes>

      <hr></hr>
      &copy; ribe
    </Container>

    </>
  )
}

export default App
