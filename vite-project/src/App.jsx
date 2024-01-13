import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Contact from './Components/Contact/Contact'
import Projects from './Components/Projects/Projects'
import About from './Components/About/About'
function App() {
  return (
    <main className='bg-slate-300/20 h-full'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
