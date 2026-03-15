import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Showcase from '../components/Showcase'
import Specs from '../components/Specs'
import BuyCTA from '../components/BuyCTA'
import Footer from '../components/Footer'

export default function Home({ images }) {
  return (
    <>
      <Navbar />
      <Hero imageUrl={images?.hero} />
      <Features images={images} />
      <Showcase images={images} />
      <Specs imageUrl={images?.specs} />
      <BuyCTA />
      <Footer />
    </>
  )
}
