"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Trophy, Users, Gamepad2, ArrowRight } from "lucide-react"
import Nav from "./components/nav"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/esportshall-logo.png"
              alt="EsportsHall Logo"
              width={120}
              height={120}
              className="mx-auto mb-8"
            />
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              La Nueva Era del <span className="text-brand-yellow">Esport Español</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
              Únete a la plataforma centralizada de esports en España. Compite, conecta y crece con la comunidad.
            </p>
            <div className="flex justify-center gap-4 pt-8">
              <button className="px-8 py-3 bg-brand-yellow text-background rounded-md hover:bg-opacity-90 transition-all font-medium">
                Empezar Ahora
              </button>
              <button className="px-8 py-3 border border-brand-yellow text-brand-yellow rounded-md hover:bg-brand-yellow/10 transition-all font-medium">
                Saber Más
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.div
              className="p-6 rounded-lg bg-background/40 backdrop-blur-sm border border-gray-800 hover:border-brand-yellow transition-all"
              variants={fadeInUp}
            >
              <Trophy className="w-12 h-12 text-brand-yellow mb-4" />
              <h3 className="text-xl font-bold mb-2">Torneos Oficiales</h3>
              <p className="text-gray-400">
                Participa en torneos verificados con premios reales y reconocimiento oficial.
              </p>
            </motion.div>
            <motion.div
              className="p-6 rounded-lg bg-background/40 backdrop-blur-sm border border-gray-800 hover:border-brand-yellow transition-all"
              variants={fadeInUp}
            >
              <Users className="w-12 h-12 text-brand-yellow mb-4" />
              <h3 className="text-xl font-bold mb-2">Equipos Profesionales</h3>
              <p className="text-gray-400">Conecta con equipos profesionales y desarrolla tu carrera en los esports.</p>
            </motion.div>
            <motion.div
              className="p-6 rounded-lg bg-background/40 backdrop-blur-sm border border-gray-800 hover:border-brand-yellow transition-all"
              variants={fadeInUp}
            >
              <Gamepad2 className="w-12 h-12 text-brand-yellow mb-4" />
              <h3 className="text-xl font-bold mb-2">Comunidad Activa</h3>
              <p className="text-gray-400">Forma parte de una comunidad apasionada por los deportes electrónicos.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold">¿Listo para ser parte del futuro?</h2>
            <p className="text-xl text-gray-400">
              Únete a miles de jugadores y equipos que ya son parte de la revolución del esport español.
            </p>
            <button className="group px-8 py-3 bg-brand-yellow text-background rounded-md hover:bg-opacity-90 transition-all font-medium inline-flex items-center gap-2">
              Comenzar Ahora
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 bg-background/40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Image
                src="/images/esportshall-logo.png"
                alt="EsportsHall Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-bold">EsportsHall</span>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} EsportsHall. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

