export interface Municipality {
    id: string;
    name: string;
}

export interface Province {
    id: string;
    name: string;
    municipalities: Municipality[];
}

export const CUBA_PROVINCES: Province[] = [
    {
        id: "pinar-del-rio",
        name: "Pinar del Río",
        municipalities: [
            { id: "consolacion-del-sur", name: "Consolación del Sur" },
            { id: "guane", name: "Guane" },
            { id: "la-palma", name: "La Palma" },
            { id: "los-palacios", name: "Los Palacios" },
            { id: "mantua", name: "Mantua" },
            { id: "minas-de-matahambre", name: "Minas de Matahambre" },
            { id: "pinar-del-rio", name: "Pinar del Río" },
            { id: "san-juan-y-martinez", name: "San Juan y Martínez" },
            { id: "san-luis", name: "San Luis" },
            { id: "sandino", name: "Sandino" },
            { id: "vinales", name: "Viñales" }
        ]
    },
    {
        id: "artemisa",
        name: "Artemisa",
        municipalities: [
            { id: "alquizar", name: "Alquízar" },
            { id: "artemisa", name: "Artemisa" },
            { id: "bauta", name: "Bauta" },
            { id: "caimito", name: "Caimito" },
            { id: "candelaria", name: "Candelaria" },
            { id: "guanajay", name: "Guanajay" },
            { id: "güira-de-melena", name: "Güira de Melena" },
            { id: "mariel", name: "Mariel" },
            { id: "san-antonio-de-los-banos", name: "San Antonio de los Baños" },
            { id: "san-cristobal", name: "San Cristóbal" }
        ]
    },
    {
        id: "la-habana",
        name: "La Habana",
        municipalities: [
            { id: "arroyo-naranjo", name: "Arroyo Naranjo" },
            { id: "boyeros", name: "Boyeros" },
            { id: "centro-habana", name: "Centro Habana" },
            { id: "cerro", name: "Cerro" },
            { id: "cotorro", name: "Cotorro" },
            { id: "diez-de-octubre", name: "Diez de Octubre" },
            { id: "guanabacoa", name: "Guanabacoa" },
            { id: "habana-del-este", name: "Habana del Este" },
            { id: "habana-vieja", name: "Habana Vieja" },
            { id: "la-lisa", name: "La Lisa" },
            { id: "marianao", name: "Marianao" },
            { id: "plaza-de-la-revolucion", name: "Plaza de la Revolución" },
            { id: "playa", name: "Playa" },
            { id: "regla", name: "Regla" },
            { id: "san-miguel-del-padron", name: "San Miguel del Padrón" }
        ]
    },
    {
        id: "mayabeque",
        name: "Mayabeque",
        municipalities: [
            { id: "batabano", name: "Batabanó" },
            { id: "bejucal", name: "Bejucal" },
            { id: "guines", name: "Güines" },
            { id: "jaruco", name: "Jaruco" },
            { id: "madruga", name: "Madruga" },
            { id: "melena-del-sur", name: "Melena del Sur" },
            { id: "nueva-paz", name: "Nueva Paz" },
            { id: "quivican", name: "Quivicán" },
            { id: "san-jose-de-las-lajas", name: "San José de las Lajas" },
            { id: "san-nicolas", name: "San Nicolás" },
            { id: "santa-cruz-del-norte", name: "Santa Cruz del Norte" }
        ]
    },
    {
        id: "matanzas",
        name: "Matanzas",
        municipalities: [
            { id: "calimete", name: "Calimete" },
            { id: "cienfuegos", name: "Cienfuegos" },
            { id: "colon", name: "Colón" },
            { id: "jaguey-grande", name: "Jagüey Grande" },
            { id: "jovellanos", name: "Jovellanos" },
            { id: "limonar", name: "Limonar" },
            { id: "los-arabos", name: "Los Arabos" },
            { id: "marti", name: "Martí" },
            { id: "matanzas", name: "Matanzas" },
            { id: "pedro-betancourt", name: "Pedro Betancourt" },
            { id: "perico", name: "Perico" },
            { id: "union-de-reyes", name: "Unión de Reyes" },
            { id: "varadero", name: "Varadero" }
        ]
    },
    {
        id: "cienfuegos",
        name: "Cienfuegos",
        municipalities: [
            { id: "abreus", name: "Abreus" },
            { id: "aguada-de-pasajeros", name: "Aguada de Pasajeros" },
            { id: "cienfuegos", name: "Cienfuegos" },
            { id: "cruces", name: "Cruces" },
            { id: "cumanayagua", name: "Cumanayagua" },
            { id: "lajas", name: "Lajas" },
            { id: "palmira", name: "Palmira" },
            { id: "rodas", name: "Rodas" }
        ]
    },
    {
        id: "villa-clara",
        name: "Villa Clara",
        municipalities: [
            { id: "caibarien", name: "Caibarién" },
            { id: "camajuani", name: "Camajuaní" },
            { id: "cifuentes", name: "Cifuentes" },
            { id: "corralillo", name: "Corralillo" },
            { id: "encrucijada", name: "Encrucijada" },
            { id: "manicaragua", name: "Manicaragua" },
            { id: "placetas", name: "Placetas" },
            { id: "quemado-de-güines", name: "Quemado de Güines" },
            { id: "ranchuelo", name: "Ranchuelo" },
            { id: "remedios", name: "Remedios" },
            { id: "sagua-la-grande", name: "Sagua la Grande" },
            { id: "santa-clara", name: "Santa Clara" },
            { id: "santo-domingo", name: "Santo Domingo" }
        ]
    },
    {
        id: "sancti-spiritus",
        name: "Sancti Spíritus",
        municipalities: [
            { id: "cabaiguan", name: "Cabaiguán" },
            { id: "fomento", name: "Fomento" },
            { id: "jatibonico", name: "Jatibonico" },
            { id: "la-sierpe", name: "La Sierpe" },
            { id: "sancti-spiritus", name: "Sancti Spíritus" },
            { id: "trinidad", name: "Trinidad" },
            { id: "yaguajay", name: "Yaguajay" }
        ]
    },
    {
        id: "ciego-de-avila",
        name: "Ciego de Ávila",
        municipalities: [
            { id: "baragua", name: "Baraguá" },
            { id: "bolivia", name: "Bolivia" },
            { id: "chambas", name: "Chambas" },
            { id: "ciego-de-avila", name: "Ciego de Ávila" },
            { id: "ciro-redondo", name: "Ciro Redondo" },
            { id: "florencia", name: "Florencia" },
            { id: "majagua", name: "Majagua" },
            { id: "moron", name: "Morón" },
            { id: "primero-de-enero", name: "Primero de Enero" },
            { id: "venezuela", name: "Venezuela" }
        ]
    },
    {
        id: "camaguey",
        name: "Camagüey",
        municipalities: [
            { id: "camaguey", name: "Camagüey" },
            { id: "carlos-manuel-de-cespedes", name: "Carlos Manuel de Céspedes" },
            { id: "esmeralda", name: "Esmeralda" },
            { id: "florida", name: "Florida" },
            { id: "guaimaro", name: "Guáimaro" },
            { id: "jimaguayu", name: "Jimaguayú" },
            { id: "minas", name: "Minas" },
            { id: "najasa", name: "Najasa" },
            { id: "nuevitas", name: "Nuevitas" },
            { id: "santa-cruz-del-sur", name: "Santa Cruz del Sur" },
            { id: "sibanicu", name: "Sibanicú" },
            { id: "sierra-de-cubitas", name: "Sierra de Cubitas" },
            { id: "vertientes", name: "Vertientes" }
        ]
    },
    {
        id: "las-tunas",
        name: "Las Tunas",
        municipalities: [
            { id: "amancio", name: "Amancio" },
            { id: "colombia", name: "Colombia" },
            { id: "jesus-meneses", name: "Jesús Meneses" },
            { id: "jobabo", name: "Jobabo" },
            { id: "las-tunas", name: "Las Tunas" },
            { id: "manati", name: "Manatí" },
            { id: "puerto-padre", name: "Puerto Padre" }
        ]
    },
    {
        id: "holguin",
        name: "Holguín",
        municipalities: [
            { id: "antilla", name: "Antilla" },
            { id: "baguanos", name: "Báguanos" },
            { id: "banes", name: "Banes" },
            { id: "cacocum", name: "Cacocum" },
            { id: "calixto-garcia", name: "Calixto García" },
            { id: "cueto", name: "Cueto" },
            { id: "frank-pais", name: "Frank País" },
            { id: "gibara", name: "Gibara" },
            { id: "holguin", name: "Holguín" },
            { id: "mayari", name: "Mayarí" },
            { id: "moa", name: "Moa" },
            { id: "rafael-freyre", name: "Rafael Freyre" },
            { id: "sagua-de-tanamamo", name: "Sagua de Tánamo" },
            { id: "urbano-norris", name: "Urbano Norris" }
        ]
    },
    {
        id: "granma",
        name: "Granma",
        municipalities: [
            { id: "bartolome-maso", name: "Bartolomé Masó" },
            { id: "bayamo", name: "Bayamo" },
            { id: "buey-arriba", name: "Buey Arriba" },
            { id: "campechuela", name: "Campechuela" },
            { id: "cauto-cristo", name: "Cauto Cristo" },
            { id: "guisa", name: "Guisa" },
            { id: "jiguani", name: "Jiguaní" },
            { id: "manzanillo", name: "Manzanillo" },
            { id: "media-luna", name: "Media Luna" },
            { id: "niquero", name: "Niquero" },
            { id: "pilon", name: "Pilón" },
            { id: "rio-cauto", name: "Río Cauto" },
            { id: "yara", name: "Yara" }
        ]
    },
    {
        id: "santiago-de-cuba",
        name: "Santiago de Cuba",
        municipalities: [
            { id: "contramaestre", name: "Contramaestre" },
            { id: "guama", name: "Guamá" },
            { id: "mella", name: "Mella" },
            { id: "palma-soriano", name: "Palma Soriano" },
            { id: "san-luis", name: "San Luis" },
            { id: "santiago-de-cuba", name: "Santiago de Cuba" },
            { id: "segundo-frente", name: "Segundo Frente" },
            { id: "songo-la-maya", name: "Songo-La Maya" },
            { id: "tercer-frente", name: "Tercer Frente" }
        ]
    },
    {
        id: "guantanamo",
        name: "Guantánamo",
        municipalities: [
            { id: "baracoa", name: "Baracoa" },
            { id: "caimanera", name: "Caimanera" },
            { id: "el-salvador", name: "El Salvador" },
            { id: "guantanamo", name: "Guantánamo" },
            { id: "imias", name: "Imías" },
            { id: "maisi", name: "Maisí" },
            { id: "manuel-tames", name: "Manuel Tames" },
            { id: "niceto-perez", name: "Niceto Pérez" },
            { id: "san-antonio-del-sur", name: "San Antonio del Sur" },
            { id: "yateras", name: "Yateras" }
        ]
    },
    {
        id: "isla-de-la-juventud",
        name: "Isla de la Juventud",
        municipalities: [
            { id: "isla-de-la-juventud", name: "Isla de la Juventud" }
        ]
    }
]; 