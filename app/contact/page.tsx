import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"
import { ContactForm } from "@/components/contact/contact-form"

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Contáctanos</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        ¿Tienes alguna pregunta o necesitas ayuda? Envíanos un mensaje o contáctanos directamente.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form Section */}
                    <ContactForm />

                    {/* Contact Details & Social Media Section */}
                    <div className="space-y-8">
                        <Card className="p-6 shadow-lg rounded-xl">
                            <CardHeader className="p-0 pb-6">
                                <CardTitle className="text-2xl font-bold text-gray-800">Detalles de Contacto</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 space-y-4 text-gray-700">
                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                                    <p>
                                        <Link href="mailto:info@migao.com" className="hover:text-emerald-600 transition-colors">
                                            info@migao.com
                                        </Link>
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                                    <p>
                                        <Link href="tel:+1234567890" className="hover:text-emerald-600 transition-colors">
                                            +1 (234) 567-890
                                        </Link>
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                                    <p>
                                        Calle Ficticia 123, <br />
                                        Ciudad Ejemplo, CP 00000 <br />
                                        País Imaginario
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="p-6 shadow-lg rounded-xl">
                            <CardHeader className="p-0 pb-6">
                                <CardTitle className="text-2xl font-bold text-gray-800">Síguenos</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="flex space-x-6">
                                    <Link
                                        href="#"
                                        className="text-gray-600 hover:text-emerald-600 transition-colors"
                                        aria-label="Facebook"
                                    >
                                        <Facebook className="h-7 w-7" />
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-gray-600 hover:text-emerald-600 transition-colors"
                                        aria-label="Twitter"
                                    >
                                        <Twitter className="h-7 w-7" />
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-gray-600 hover:text-emerald-600 transition-colors"
                                        aria-label="Instagram"
                                    >
                                        <Instagram className="h-7 w-7" />
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-gray-600 hover:text-emerald-600 transition-colors"
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin className="h-7 w-7" />
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
