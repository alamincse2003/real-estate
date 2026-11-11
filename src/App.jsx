import SmoothScroll from './components/SmoothScroll.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import LandingSections from './components/LandingSections.jsx'

export default function App() {
  return (
    <main id="top">
      <SmoothScroll />
      <Navbar />
      <Hero />
      <LandingSections />
    </main>
  )
}
