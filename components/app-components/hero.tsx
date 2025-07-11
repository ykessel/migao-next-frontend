import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Search, MapPin, Home, Users, Star} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {PROPERTY_TYPE} from "@/constants/property-type.enum";
import Image from 'next/image';

interface HeroProps {
    onSearch: (filters: { search: string; propertyType: string; minPrice: number; maxPrice: number; rooms: number; furnished: string }) => void;
    selectedAddress?: string;
}

export const Hero = ({onSearch, selectedAddress}: HeroProps) => {
    const [,setSearchLocation] = useState("");

    useEffect(() => {
        if (selectedAddress) {
            setSearchLocation(selectedAddress);
        }
    }, [selectedAddress]);

    const handleSearch = () => {
        onSearch({
            search: location,
            propertyType: propertyType,
            minPrice: 0,
            maxPrice: 5000,
            rooms: 0,
            furnished: "any"
        });
        
        // Scroll to properties list
        const propertiesList = document.getElementById('properties-list');
        if (propertiesList) {
            window.scrollTo({
                top: propertiesList.offsetTop - 100, // Offset by 100px to account for header
                behavior: 'smooth'
            });
        }
    };

    const [location, setLocation] = useState("")
    const [propertyType, setPropertyType] = useState("")

    const popularSearches = ["Habana", "Playa", "Terraza", "Amueblado", "Admite mascotas", "Con piscina"]

    const stats = [
        {icon: Home, label: "Propiedades", value: "10,000+"},
        {icon: Users, label: "Usuarios activos", value: "50,000+"},
        {icon: Star, label: "Calificación promedio", value: "4.8"},
    ]

    return (
        <div className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
            {/* Optimized Next.js Background Image */}
            <Image
                src="/havana.webp"
                alt="Havana city background"
                fill
                priority
                fetchPriority="high"
                quality={60}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                className="object-cover object-center z-0"
            />
            {/* Gradient Overlays for better contrast */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Encuentra tu{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Hogar Perfecto
            </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Descubre increíbles apartamentos y casas en alquiler en las mejores ubicaciones del mundo. Tu
                        nuevo hogar te
                        está esperando.
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-6 mb-12">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex items-center gap-2 text-white/90">
                                <stat.icon className="w-5 h-5 text-orange-400"/>
                                <span className="font-semibold">{stat.value}</span>
                                <span className="text-sm">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enhanced Search Form */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20">
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        {/* Location Input */}
                        <div className="flex-1 relative">
                            <MapPin
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                            <Input
                                type="text"
                                placeholder="Ingresa ciudad o barrio"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="pl-12 h-14 text-lg border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                            />
                        </div>

                        {/* Property Type Select */}
                        <div className="lg:w-64">
                            <Select value={propertyType} onValueChange={setPropertyType}>
                                <SelectTrigger aria-label="Property type select button"
                                    className="h-14 text-lg border-gray-200 focus:border-teal-500 focus:ring-teal-500">
                                    <SelectValue placeholder="Tipo de propiedad"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(PROPERTY_TYPE).map(([key, value]) => (
                                        <SelectItem key={key} value={key}>{value}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Search Button */}
                        <Button
                            size="lg"
                            className="h-14 px-8 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                            onClick={handleSearch}
                            aria-label="Search properties button"
                        >
                            <Search className="w-5 h-5 mr-2"/>
                            Buscar Propiedades
                        </Button>
                    </div>

                    {/* Popular Searches */}
                    <div className="text-center">
                        <p className="text-gray-600 mb-3 font-medium">Búsquedas populares:</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {popularSearches.map((search, index) => (
                                <Badge
                                    key={index}
                                    variant="outline"
                                    className="cursor-pointer hover:bg-teal-100 hover:text-teal-700 transition-colors duration-200 px-4 py-2"
                                    onClick={() => {
                                        setLocation(search);
                                        handleSearch();
                                    }}
                                >
                                    {search}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Additional Features */}
                <div className="mt-8 text-center">
                    <div className="flex flex-wrap justify-center gap-6 text-white/80">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-sm">Verificación de propiedades</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-sm">Tours virtuales disponibles</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span className="text-sm">Soporte 24/7</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Elements for Visual Interest */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse z-30"></div>
            <div className="absolute bottom-32 right-16 w-32 h-32 bg-orange-400/20 rounded-full blur-2xl animate-pulse delay-1000 z-30"></div>
        </div>
    );
};
