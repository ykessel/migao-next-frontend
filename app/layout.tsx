import { Metadata } from "next";
import { ClientProviders } from "@/components/providers/client-providers";
import { ConditionalNavigation } from "@/components/app-components/conditional-navigation";
import Footer from "@/components/ui/footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://migao-next-frontend.vercel.app"),
  title: {
    default: "MiGao - Encuentra tu hogar ideal en Cuba",
    template: "%s | MiGao",
  },
  description:
    "Plataforma líder para encontrar propiedades en alquiler en Cuba",
  keywords: [
    "alquiler",
    "propiedades",
    "Cuba",
    "vivienda",
    "apartemento",
    "habana",
    "negacio",
    "playa",
  ],
  openGraph: {
    title: "MiGao - Encuentra tu hogar ideal en Cuba",
    description:
      "Plataforma líder para encontrar propiedades en alquiler en Cuba",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "MiGao - Plataforma de propiedades en Cuba",
      },
    ],
    url: "https://migao-next-frontend.vercel.app",
    siteName: "MiGao",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiGao - Encuentra tu hogar ideal en Cuba",
    description:
      "Plataforma líder para encontrar propiedades en alquiler en Cuba",
    images: ["/opengraph-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState?: unknown;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <ClientProviders dehydratedState={dehydratedState}>
          <div className="flex flex-col min-h-screen">
            <ConditionalNavigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
