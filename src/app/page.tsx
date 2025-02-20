"use client"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Users, Gamepad2, ArrowRight } from "lucide-react"
import { Nav } from "./components/layout/nav"
import { AnimatedBackground } from "./components/ui/animated-background"

// Carga dinámica del Footer
const Footer = dynamic(() => import("./components/layout/footer").then(mod => mod.Footer), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-gradient-to-t from-gray-900/50 to-transparent" />
})

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const pageTransition = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export default function Home() {
  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageTransition}
      >
        <Suspense fallback={null}>
          <AnimatedBackground />
        </Suspense>
        
        <Nav />
        
        <main className="min-h-screen">
          {/* Hero Section */}
          <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                className="text-center space-y-6"
                variants={fadeInUp}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Image
                    src="/images/esportshall.png"
                    alt="EsportsHall Logo"
                    width={120}
                    height={120}
                    className="mx-auto mb-8"
                    priority
                  />
                </motion.div>
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold leading-tight"
                  variants={fadeInUp}
                >
                  La Nueva Era del <span className="text-brand-yellow">Esport Español</span>
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto"
                  variants={fadeInUp}
                >
                  Únete a la plataforma centralizada de esports en España. Compite, conecta y crece con la comunidad.
                </motion.p>
                <motion.div 
                  className="flex justify-center gap-4 pt-8"
                  variants={fadeInUp}
                >
                  <button className="btn-primary">
                    Empezar Ahora
                  </button>
                  <button className="btn-secondary">
                    Saber Más
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <Suspense fallback={<div className="h-[400px]" />}>
            <section className="py-20">
              <div className="container mx-auto px-4">
                <motion.div
                  className="grid md:grid-cols-3 gap-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.2
                      }
                    }
                  }}
                >
                  <motion.div className="card" variants={fadeInUp}>
                    <Trophy className="w-12 h-12 text-brand-yellow mb-4" />
                    <h3 className="text-xl font-bold mb-2">Torneos Oficiales</h3>
                    <p className="text-gray-400">
                      Participa en torneos verificados con premios reales y reconocimiento oficial.
                    </p>
                  </motion.div>
                  <motion.div className="card" variants={fadeInUp}>
                    <Users className="w-12 h-12 text-brand-yellow mb-4" />
                    <h3 className="text-xl font-bold mb-2">Equipos Profesionales</h3>
                    <p className="text-gray-400">
                      Conecta con equipos profesionales y desarrolla tu carrera en los esports.
                    </p>
                  </motion.div>
                  <motion.div className="card" variants={fadeInUp}>
                    <Gamepad2 className="w-12 h-12 text-brand-yellow mb-4" />
                    <h3 className="text-xl font-bold mb-2">Comunidad Activa</h3>
                    <p className="text-gray-400">
                      Forma parte de una comunidad apasionada por los deportes electrónicos.
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </section>
          </Suspense>

          {/* CTA Section */}
          <Suspense fallback={<div className="h-[300px]" />}>
            <section className="py-20">
              <div className="container mx-auto px-4">
                <motion.div
                  className="max-w-4xl mx-auto text-center space-y-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-5xl font-bold">
                    ¿Listo para ser parte del futuro?
                  </h2>
                  <p className="text-xl text-gray-400">
                    Únete a miles de jugadores y equipos que ya son parte de la revolución del esport español.
                  </p>
                  <button className="btn-primary inline-flex items-center gap-2 group">
                    Comenzar Ahora
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </div>
            </section>
          </Suspense>
        </main>

        <Suspense fallback={<div className="h-[300px]" />}>
          <Footer />
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

