import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  HelpCircle, 
  Search, 
  Home, 
  Shield,
  Users, 
  Phone,
  Mail,
  MessageCircle,
  Upload,
  Info
} from "lucide-react";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | MiGao',
  description: 'Encuentra respuestas a las preguntas más comunes sobre MiGao, la plataforma de alquiler de propiedades en Cuba',
}

const faqData = [
  {
    category: "General",
    icon: HelpCircle,
    color: "teal",
    questions: [
      {
        question: "¿Qué es MiGao?",
        answer: "MiGao es una plataforma moderna y completa para encontrar y publicar propiedades en alquiler en Cuba. Conectamos propietarios con inquilinos de manera fácil, segura y transparente, ofreciendo herramientas avanzadas de búsqueda y un mapa interactivo."
      },
      {
        question: "¿Es gratuito usar MiGao?",
        answer: "Sí, MiGao es completamente gratuito para los usuarios. Puedes buscar propiedades, guardar favoritos, contactar propietarios y publicar tu propiedad sin ningún costo. Nuestro objetivo es facilitar el acceso a la vivienda en Cuba."
      },
      {
        question: "¿En qué ciudades está disponible MiGao?",
        answer: "MiGao está disponible en toda Cuba, incluyendo La Habana, Santiago de Cuba, Camagüey, Holguín, Santa Clara, Cienfuegos, Matanzas, Pinar del Río, Las Tunas, Granma, Guantánamo, Artemisa, Mayabeque, Villa Clara, Sancti Spíritus, Ciego de Ávila y el Municipio Especial Isla de la Juventud."
      }
    ]
  },
  {
    category: "Búsqueda de Propiedades",
    icon: Search,
    color: "blue",
    questions: [
      {
        question: "¿Cómo puedo buscar propiedades?",
        answer: "Puedes buscar propiedades de varias maneras: usando la barra de búsqueda principal, aplicando filtros por precio, ubicación, tipo de propiedad, número de habitaciones, o explorando el mapa interactivo. También puedes guardar búsquedas favoritas para consultarlas más tarde."
      },
      {
        question: "¿Puedo filtrar propiedades por precio?",
        answer: "Sí, puedes establecer un rango de precios mínimo y máximo. Los precios se muestran en diferentes monedas (CUP, EUR, USD) y puedes ordenar los resultados por precio de menor a mayor o viceversa."
      },
      {
        question: "¿Cómo funciona el mapa interactivo?",
        answer: "El mapa interactivo te permite ver todas las propiedades en su ubicación exacta. Puedes hacer zoom, moverte por diferentes áreas, y hacer clic en los marcadores para ver información básica de cada propiedad. También puedes activar filtros directamente desde el mapa."
      },
      {
        question: "¿Puedo guardar propiedades en favoritos?",
        answer: "Sí, puedes guardar propiedades en tu lista de favoritos haciendo clic en el ícono del corazón. Puedes acceder a tus favoritos desde el menú de navegación, organizarlos, compararlos y compartirlos con familiares y amigos."
      }
    ]
  },
  {
    category: "Publicar Propiedades",
    icon: Upload,
    color: "green",
    questions: [
      {
        question: "¿Cómo puedo publicar mi propiedad?",
        answer: "Para publicar tu propiedad, haz clic en 'Publicar Propiedad' en el menú de navegación. Completa el formulario con la información básica, detalles, precios, amenidades, sube fotos y selecciona la ubicación en el mapa. El proceso es simple y guiado paso a paso."
      },
      {
        question: "¿Qué información necesito para publicar?",
        answer: "Necesitarás: título y descripción de la propiedad, tipo de propiedad, número de habitaciones y baños, área en metros cuadrados, precio de alquiler, ubicación exacta, fotos de la propiedad, información de contacto y detalles sobre amenidades disponibles."
      },
      {
        question: "¿Puedo subir múltiples fotos de mi propiedad?",
        answer: "Sí, puedes subir múltiples fotos de alta calidad para mostrar tu propiedad desde diferentes ángulos. Te recomendamos incluir fotos de todas las habitaciones, baños, cocina, áreas comunes y vistas exteriores para atraer más inquilinos potenciales."
      },
      {
        question: "¿Cuánto tiempo tarda en aparecer mi publicación?",
        answer: "Las publicaciones aparecen inmediatamente después de ser enviadas. Sin embargo, recomendamos revisar toda la información antes de publicar para asegurar que esté completa y atractiva para los posibles inquilinos."
      }
    ]
  },
  {
    category: "Contacto y Comunicación",
    icon: MessageCircle,
    color: "purple",
    questions: [
      {
        question: "¿Cómo puedo contactar a un propietario?",
        answer: "Puedes contactar a los propietarios de varias maneras: a través de WhatsApp, Telegram, llamada telefónica o correo electrónico. Los datos de contacto aparecen en cada publicación de propiedad. Te recomendamos ser respetuoso y claro en tu mensaje inicial."
      },
      {
        question: "¿Mi información de contacto es segura?",
        answer: "Sí, tu información de contacto está protegida. Solo se muestra a usuarios registrados y no se comparte con terceros. MiGao utiliza medidas de seguridad para proteger la privacidad de todos los usuarios."
      },
      {
        question: "¿Puedo programar visitas a las propiedades?",
        answer: "Sí, puedes coordinar visitas directamente con los propietarios a través de los canales de contacto disponibles. Te recomendamos acordar horarios convenientes para ambas partes y ser puntual en las citas."
      }
    ]
  },
  {
    category: "Seguridad y Confianza",
    icon: Shield,
    color: "orange",
    questions: [
      {
        question: "¿Es seguro usar MiGao?",
        answer: "Sí, MiGao implementa múltiples medidas de seguridad para proteger a todos los usuarios. Verificamos las publicaciones, protegemos la información personal y fomentamos la transparencia en todas las transacciones."
      },
      {
        question: "¿Cómo puedo verificar que una propiedad es real?",
        answer: "Revisa las fotos detalladas, la información completa de la propiedad, los datos del propietario y las reseñas si están disponibles. Siempre visita la propiedad antes de firmar cualquier contrato y solicita documentación legal cuando sea necesario."
      },
      {
        question: "¿Qué hago si encuentro una publicación sospechosa?",
        answer: "Si encuentras una publicación que parece fraudulenta o sospechosa, puedes reportarla usando el botón de reporte en la página de la propiedad. Nuestro equipo revisará la denuncia y tomará las medidas necesarias."
      }
    ]
  },
  {
    category: "Cuenta y Perfil",
    icon: Users,
    color: "pink",
    questions: [
      {
        question: "¿Cómo creo una cuenta en MiGao?",
        answer: "Puedes crear una cuenta fácilmente usando tu cuenta de Google. Simplemente haz clic en 'Iniciar sesión' y selecciona 'Iniciar sesión con Google'. No necesitas contraseña adicional y el proceso es completamente seguro."
      },
      {
        question: "¿Puedo editar mi perfil?",
        answer: "Sí, puedes editar tu perfil desde la sección 'Mi Perfil' en el menú de navegación. Puedes actualizar tu información personal, número de teléfono y configuraciones de seguridad."
      },
      {
        question: "¿Cómo puedo cerrar sesión?",
        answer: "Para cerrar sesión, ve a 'Mi Perfil' y haz clic en el botón 'Cerrar sesión' en la pestaña de Seguridad. También puedes cerrar sesión desde cualquier página usando el menú de usuario."
      }
    ]
  }
];

const getColorClasses = (color: string) => {
  const colorMap = {
    teal: "bg-teal-100 text-teal-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    pink: "bg-pink-100 text-pink-600"
  };
  return colorMap[color as keyof typeof colorMap] || "bg-gray-100 text-gray-600";
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="mx-auto w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mb-6">
            <HelpCircle className="w-12 h-12 text-teal-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 px-2">
            Preguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">Frecuentes</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto px-4 leading-relaxed">
            Encuentra respuestas rápidas a las preguntas más comunes sobre MiGao. 
            Si no encuentras lo que buscas, no dudes en contactarnos.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              {/* Category Header */}
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <div className={`w-full h-full rounded-full flex items-center justify-center ${getColorClasses(category.color)}`}>
                    <category.icon className="w-8 h-8" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {category.category}
                </h2>
              </div>

              {/* Questions Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {category.questions.map((faq, questionIndex) => (
                  <Card key={questionIndex} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-start text-lg md:text-xl group-hover:text-teal-600 transition-colors">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${getColorClasses(category.color)}`}>
                          <Info className="w-4 h-4" />
                        </div>
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-base leading-relaxed pl-11">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-16 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-teal-600" />
            </div>
            <CardTitle className="text-2xl md:text-3xl">
              ¿No encontraste tu respuesta?
            </CardTitle>
            <p className="text-gray-600 text-lg">
              Nuestro equipo está aquí para ayudarte. Contáctanos y te responderemos lo antes posible.
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">soporte@migao.cu</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Teléfono</h3>
                <p className="text-gray-600">+53 5XX XXX XXXX</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                <p className="text-gray-600">+53 5XX XXX XXXX</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="h-12 px-8 text-lg font-medium bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Link href="/" className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Volver al Inicio
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 px-8 text-lg font-medium border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                <Link href="/publish" className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Publicar Propiedad
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 