import { Navbar } from "@/components/homepage/navbar"
import { Hero } from "@/components/homepage/hero"
import { Services } from "@/components/homepage/services"
import { Features } from "@/components/homepage/features"
import { About } from "@/components/homepage/about"
import { Projects } from "@/components/homepage/projects"
import { Technologies } from "@/components/homepage/technologies"
import { Testimonials } from "@/components/homepage/testimonials"
import { CTA } from "@/components/homepage/cta"
import { Contact } from "@/components/homepage/contact"
import { Footer } from "@/components/homepage/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Features />
      <About />
      <Projects />
      <Technologies />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </main>
  )
}
