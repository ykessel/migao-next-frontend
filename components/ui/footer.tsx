import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-emerald-500">MiGao</h3>
          <p className="text-sm leading-relaxed">
            Encuentra tu hogar ideal en Cuba. Plataforma líder para alquiler de propiedades.
          </p>
          <div className="flex space-x-4 pt-2">
            <Link href="#" className="text-gray-400 hover:text-emerald-500 transition-colors" aria-label="Facebook">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-emerald-500 transition-colors" aria-label="Twitter">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-emerald-500 transition-colors" aria-label="Instagram">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-emerald-500 transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Navegación</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-emerald-500 transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-emerald-500 transition-colors">
                Propiedades
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-emerald-500 transition-colors">
                Acerca de Nosotros
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-emerald-500 transition-colors">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal & Resources */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Legal y Recursos</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-emerald-500 transition-colors">
                Términos de Servicio
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-emerald-500 transition-colors">
                Política de Privacidad
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-emerald-500 transition-colors">
                Preguntas Frecuentes
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-emerald-500 transition-colors">
                Ayuda
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Contáctanos</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-500" />
              <Link href="mailto:info@migao.com" className="hover:text-emerald-500 transition-colors">
                info@migao.com
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-500" />
              <Link href="tel:+1234567890" className="hover:text-emerald-500 transition-colors">
                +1 (234) 567-890
              </Link>
            </div>
            <Link href="/contact" className="inline-block mt-4 text-emerald-500 hover:underline text-sm">
              Ir a la página de contacto
            </Link>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} MiGao. Todos los derechos reservados.
      </div>
    </footer>
  )
}
