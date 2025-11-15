import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Heart, 
  Search, 
  Camera, 
  Star, 
  Users, 
  Shield, 
  Smartphone,
  Home,
  Filter,
  Globe,
  CheckCircle,
  ArrowRight,
  Upload,
  MessageCircle,
  Eye,
  Building2,
  Target
} from "lucide-react";
import Link  from "next/link";

export default function AboutUs() {
  return (
    <div className="bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50">
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="mx-auto w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mb-6">
            <Building2 className="w-12 h-12 text-teal-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 px-2">
            Acerca de <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">MiGao</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto px-4 leading-relaxed">
            La plataforma más completa para encontrar y publicar propiedades en alquiler en Cuba. 
            Conectamos propietarios con inquilinos de manera fácil, segura y transparente.
          </p>
        </div>

        {/* Platform Overview */}
        <Card className="mb-12 md:mb-16 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center text-2xl md:text-3xl">
              <Home className="w-8 h-8 mb-3 sm:mb-0 sm:mr-4 text-teal-600" />
              ¿Qué es MiGao?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
              MiGao es una plataforma moderna y fácil de usar que revoluciona la forma de buscar y publicar 
              propiedades en alquiler en Cuba. Nuestra misión es hacer que el proceso de encontrar el hogar perfecto 
              sea más accesible, transparente y eficiente para todos.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
              Fundada en 2024, MiGao ha crecido para convertirse en una de las plataformas más confiables 
              para la búsqueda de propiedades en el mercado cubano, ofreciendo herramientas avanzadas y una 
              experiencia de usuario excepcional.
            </p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-4">
              Características Principales
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Descubre las herramientas que hacen de MiGao la mejor opción para encontrar tu hogar ideal
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Map Integration */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-teal-200 transition-colors">
                    <MapPin className="w-6 h-6 text-teal-600" />
                  </div>
                  Mapa Interactivo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-base leading-relaxed">
                  Visualiza todas las propiedades en un mapa interactivo. Encuentra ubicaciones exactas, 
                  explora vecindarios y descubre lugares de interés cercanos.
                </p>
              </CardContent>
            </Card>

            {/* Favorites */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <div className="w-12 h-12 bg-coral-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-coral-200 transition-colors">
                    <Heart className="w-6 h-6 text-coral-500" />
                  </div>
                  Lista de Favoritos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-base leading-relaxed">
                  Guarda tus propiedades favoritas para consultarlas más tarde. Organiza, compara y 
                  comparte tu lista con familiares y amigos.
                </p>
              </CardContent>
            </Card>

            {/* Advanced Search */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                    <Search className="w-6 h-6 text-blue-600" />
                  </div>
                  Búsqueda Avanzada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-base leading-relaxed">
                  Filtra propiedades por precio, ubicación, tipo, número de habitaciones, amenidades 
                  y mucho más para encontrar exactamente lo que buscas.
                </p>
              </CardContent>
            </Card>

            {/* Photo Gallery */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                    <Camera className="w-6 h-6 text-purple-600" />
                  </div>
                  Galería de Fotos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-base leading-relaxed">
                  Sube múltiples fotos de alta calidad para mostrar tu propiedad. Los usuarios pueden 
                  ver cada detalle antes de contactarte.
                </p>
              </CardContent>
            </Card>

            {/* User Reviews */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-yellow-200 transition-colors">
                    <Star className="w-6 h-6 text-yellow-500" />
                  </div>
                  Sistema de Reseñas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-base leading-relaxed">
                  Lee y deja reseñas sobre propiedades y propietarios. Construye confianza en la 
                  comunidad con experiencias reales.
                </p>
              </CardContent>
            </Card>

            {/* Mobile Responsive */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                    <Smartphone className="w-6 h-6 text-green-600" />
                  </div>
                  Móvil Optimizado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-base leading-relaxed">
                  Diseño completamente responsivo que funciona perfectamente en dispositivos móviles, 
                  tablets y computadoras.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Publishing Guide */}
        <Card className="mb-12 md:mb-16 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center text-2xl md:text-3xl">
              <Upload className="w-8 h-8 mb-3 sm:mb-0 sm:mr-4 text-teal-600" />
              Guía para Publicar tu Propiedad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-8 text-lg md:text-xl leading-relaxed">
              Publicar tu propiedad en MiGao es fácil y rápido. Sigue estos pasos para crear 
              una publicación atractiva y efectiva:
            </p>
            
            <div className="space-y-6 md:space-y-8">
              {/* Step 1 */}
              <div className="flex items-start space-x-4 md:space-x-6">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl shadow-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg md:text-xl mb-3">Información Básica</h3>
                  <p className="text-gray-600 mb-3 text-base md:text-lg">
                    Completa los datos esenciales de tu propiedad:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 md:ml-6 text-base md:text-lg">
                    <li>Título descriptivo y atractivo</li>
                    <li>Descripción detallada de la propiedad</li>
                    <li>Tipo de propiedad (apartamento, casa, estudio)</li>
                    <li>Número de habitaciones y baños</li>
                    <li>Área en metros cuadrados</li>
                  </ul>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-4 md:space-x-6">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl shadow-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg md:text-xl mb-3">Precios y Condiciones</h3>
                  <p className="text-gray-600 mb-3 text-base md:text-lg">
                    Establece las condiciones de alquiler:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 md:ml-6 text-base md:text-lg">
                    <li>Precio mensual de alquiler</li>
                    <li>Moneda (CUP, USD, EUR)</li>
                    <li>Depósito de seguridad</li>
                    <li>Tiempo mínimo y máximo de estadía</li>
                    <li>Número máximo de huéspedes</li>
                    <li>Tarifa de limpieza (opcional)</li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-4 md:space-x-6">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl shadow-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg md:text-xl mb-3">Servicios y Amenidades</h3>
                  <p className="text-gray-600 mb-3 text-base md:text-lg">
                    Destaca las comodidades que ofreces:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 md:ml-6 text-base md:text-lg">
                    <li>Servicios básicos (agua, electricidad, gas)</li>
                    <li>Internet WiFi, aire acondicionado, TV</li>
                    <li>Electrodomésticos (refrigerador, lavadora, microondas)</li>
                    <li>Espacios adicionales (balcón, terraza, jardín, garaje)</li>
                    <li>Propiedad amueblada o sin amueblar</li>
                  </ul>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start space-x-4 md:space-x-6">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl shadow-lg">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg md:text-xl mb-3">Fotos de Calidad</h3>
                  <p className="text-gray-600 mb-3 text-base md:text-lg">
                    Sube imágenes que muestren lo mejor de tu propiedad:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 md:ml-6 text-base md:text-lg">
                    <li>Fotos bien iluminadas y de alta resolución</li>
                    <li>Múltiples ángulos de cada habitación</li>
                    <li>Espacios exteriores (balcón, terraza, jardín)</li>
                    <li>Detalles importantes y amenidades</li>
                    <li>Vista desde la propiedad (si es atractiva)</li>
                  </ul>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start space-x-4 md:space-x-6">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl shadow-lg">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg md:text-xl mb-3">Ubicación en el Mapa</h3>
                  <p className="text-gray-600 mb-3 text-base md:text-lg">
                    Selecciona la ubicación exacta de tu propiedad:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 md:ml-6 text-base md:text-lg">
                    <li>Elige provincia y municipio</li>
                    <li>Marca la ubicación exacta en el mapa interactivo</li>
                    <li>Verifica que la dirección sea correcta</li>
                    <li>Los usuarios podrán ver lugares de interés cercanos</li>
                  </ul>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex items-start space-x-4 md:space-x-6">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl shadow-lg">
                  6
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg md:text-xl mb-3">Información de Contacto</h3>
                  <p className="text-gray-600 mb-3 text-base md:text-lg">
                    Proporciona formas de contacto para los interesados:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 md:ml-6 text-base md:text-lg">
                    <li>Número de WhatsApp</li>
                    <li>Usuario de Telegram</li>
                    <li>Número de teléfono</li>
                    <li>Horarios de contacto preferidos</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-8 p-3 md:p-4 bg-teal-50 rounded-lg">
              <div className="flex items-start md:items-center mb-2">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-teal-600 mr-2 mt-0.5 md:mt-0 flex-shrink-0" />
                <h4 className="font-semibold text-teal-800 text-sm md:text-base">Consejos para una Publicación Exitosa</h4>
              </div>
              <ul className="text-teal-700 space-y-1 ml-6 md:ml-7 text-sm md:text-base">
                <li>• Sé honesto y detallado en la descripción</li>
                <li>• Actualiza la disponibilidad regularmente</li>
                <li>• Responde rápidamente a las consultas</li>
                <li>• Mantén las fotos actualizadas</li>
                <li>• Ofrece precios competitivos</li>
              </ul>
            </div>

            <div className="mt-6 text-center">
              <Link href={'/publish'}>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base">
                  Publicar mi Propiedad
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* User Experience Features */}
        <Card className="mb-12 md:mb-16 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center text-2xl md:text-3xl">
              <Users className="w-8 h-8 mb-3 sm:mb-0 sm:mr-4 text-teal-600" />
              Experiencia de Usuario Superior
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-3 flex items-center">
                  <Eye className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600 flex-shrink-0" />
                  Para Inquilinos
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Búsqueda intuitiva con filtros avanzados</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Visualización en mapa con lugares de interés</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Lista de favoritos personalizada</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Contacto directo con propietarios</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Galerías de fotos de alta calidad</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 md:mt-0">
                <h3 className="font-semibold text-base md:text-lg mb-3 flex items-center">
                  <Home className="w-4 h-4 md:w-5 md:h-5 mr-2 text-teal-600 flex-shrink-0" />
                  Para Propietarios
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Publicación fácil y rápida</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Gestión completa de propiedades</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Múltiples canales de contacto</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Estadísticas de visualizaciones</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Herramientas de promoción</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advantages */}
        <Card className="mb-12 md:mb-16 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center text-2xl md:text-3xl">
              <Star className="w-8 h-8 mb-3 sm:mb-0 sm:mr-4 text-yellow-500" />
              Ventajas Competitivas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <MapPin className="w-6 h-6 md:w-8 md:h-8 text-teal-600" />
                </div>
                <h3 className="font-semibold text-base md:text-lg mb-2">Ubicación Precisa</h3>
                <p className="text-gray-600 text-xs md:text-sm">
                  Mapa interactivo que muestra la ubicación exacta y lugares de interés cercanos como 
                  hospitales, escuelas, restaurantes, transporte público y más.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Heart className="w-6 h-6 md:w-8 md:h-8 text-coral-500" />
                </div>
                <h3 className="font-semibold text-base md:text-lg mb-2">Favoritos Inteligentes</h3>
                <p className="text-gray-600 text-xs md:text-sm">
                  Guarda, organiza y comparte tus propiedades favoritas. Recibe notificaciones cuando 
                  haya cambios en tus propiedades guardadas.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Filter className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-base md:text-lg mb-2">Búsqueda Avanzada</h3>
                <p className="text-gray-600 text-xs md:text-sm">
                  Filtros inteligentes por precio, ubicación, amenidades, disponibilidad y más. 
                  Encuentra exactamente lo que buscas en segundos.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Shield className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-base md:text-lg mb-2">Seguridad y Confianza</h3>
                <p className="text-gray-600 text-xs md:text-sm">
                  Verificación de propiedades, sistema de reseñas y reportes. Construimos una 
                  comunidad segura y confiable.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-base md:text-lg mb-2">Comunicación Directa</h3>
                <p className="text-gray-600 text-xs md:text-sm">
                  Contacto directo con propietarios vía WhatsApp, Telegram o teléfono. 
                  Sin intermediarios, comunicación fluida.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Globe className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-base md:text-lg mb-2">Cobertura Nacional</h3>
                <p className="text-gray-600 text-xs md:text-sm">
                  Propiedades en todas las provincias de Cuba. Desde La Habana hasta Santiago, 
                  encuentra tu hogar ideal en cualquier lugar.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Places of Interest */}
        <Card className="mb-12 md:mb-16 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center text-2xl md:text-3xl">
              <MapPin className="w-8 h-8 mb-3 sm:mb-0 sm:mr-4 text-teal-600" />
              Lugares de Interés Cercanos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4 md:mb-6 text-lg md:text-xl leading-relaxed">
              Nuestro sistema automáticamente identifica y muestra lugares importantes cerca de cada propiedad:
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
              {[
                { name: "Hospitales", icon: "🏥" },
                { name: "Escuelas", icon: "🏫" },
                { name: "Restaurantes", icon: "🍽️" },
                { name: "Transporte", icon: "🚌" },
                { name: "Hoteles", icon: "🏨" },
                { name: "Policía", icon: "👮" },
                { name: "Farmacias", icon: "💊" },
                { name: "Bancos", icon: "🏦" },
                { name: "Gasolineras", icon: "⛽" },
                { name: "Supermercados", icon: "🛒" },
                { name: "Parques", icon: "🌳" },
                { name: "Iglesias", icon: "⛪" },
                { name: "Correos", icon: "📮" },
                { name: "Bibliotecas", icon: "📚" },
                { name: "Museos", icon: "🏛️" },
                { name: "Cines", icon: "🎬" },
                { name: "Centros Comerciales", icon: "🛍️" },
                { name: "Aeropuertos", icon: "✈️" },
                { name: "Estaciones", icon: "🚂" },
                { name: "Universidades", icon: "🎓" }
                             ].map((place, index) => (
                 <div key={index} className="flex items-center space-x-1 md:space-x-2 p-2 md:p-3 bg-gray-50 rounded-lg">
                   <span className="text-base md:text-xl flex-shrink-0">{place.icon}</span>
                   <span className="text-xs md:text-sm text-gray-700 leading-tight">{place.name}</span>
                 </div>
               ))}
            </div>
            
            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-xs md:text-sm">
                <strong>💡 Consejo:</strong> Esta información ayuda a los inquilinos a evaluar la conveniencia 
                de la ubicación según sus necesidades específicas, como proximidad al trabajo, escuelas para 
                sus hijos, o servicios de salud.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Our Values */}
        <Card className="mb-12 md:mb-16 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl md:text-3xl">Nuestros Valores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start space-x-2 md:space-x-3">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">Transparencia</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Información clara y honesta en cada publicación. Sin costos ocultos ni sorpresas.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 md:space-x-3">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">Compromiso</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Dedicados a brindar la mejor experiencia tanto a propietarios como inquilinos.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 md:space-y-4 mt-6 md:mt-0">
                <div className="flex items-start space-x-2 md:space-x-3">
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">Innovación</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Constantemente mejoramos nuestros servicios con nuevas funcionalidades.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 md:space-x-3">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">Integridad</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Operamos con los más altos estándares éticos en todas nuestras actividades.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">¿Listo para comenzar?</h2>
          <p className="text-base md:text-lg mb-6 opacity-90 px-2">
            Únete a nuestra comunidad y descubre por qué MiGao es la mejor opción para 
            encontrar o publicar propiedades en Cuba.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link href="/publish">
              <Button className="bg-white text-teal-600 hover:bg-gray-100 px-6 md:px-8 py-2 md:py-3 text-sm md:text-base w-full sm:w-auto">
                Publicar Propiedad
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600 px-6 md:px-8 py-2 md:py-3 text-sm md:text-base w-full sm:w-auto">
                Explorar Propiedades
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 