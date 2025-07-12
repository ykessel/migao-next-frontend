import { ImageResponse } from 'next/og'
import { getPropertyById } from '@/services/api-client'

// Image metadata
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
  const property = await getPropertyById(params.id)

  if (!property) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 64,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          Propiedad no encontrada
        </div>
      ),
      {
        ...size,
      }
    )
  }

  // Get the first image or use a placeholder
  const firstImage = property.images?.[0]?.url || '/placeholder.svg'
  
  // Format price
  const formattedPrice = new Intl.NumberFormat('es-CU', {
    style: 'currency',
    currency: property.currency || 'CUP',
    minimumFractionDigits: 0,
  }).format(property.rentPricePerMonth)

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
        }}
      >
        {/* Background Image */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${firstImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
          }}
        />
        
        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            padding: '60px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#667eea',
              }}
            >
              MiGao
            </div>
            <div
              style={{
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: '500',
              }}
            >
              Encuentra tu hogar ideal en Cuba
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxWidth: '800px',
            }}
          >
            {/* Title */}
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.2,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              {property.title}
            </div>

            {/* Description */}
            {property.description && (
              <div
                style={{
                  fontSize: '24px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.4,
                  maxWidth: '600px',
                }}
              >
                {property.description.length > 100 
                  ? `${property.description.substring(0, 100)}...` 
                  : property.description}
              </div>
            )}

            {/* Property Details */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '40px',
                marginTop: '20px',
              }}
            >
              {/* Price */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '12px',
                  padding: '16px 24px',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#667eea',
                }}
              >
                {formattedPrice}/mes
              </div>

              {/* Property Stats */}
              <div
                style={{
                  display: 'flex',
                  gap: '30px',
                }}
              >
                {property.rooms && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      color: 'white',
                    }}
                  >
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                      {property.rooms}
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.8 }}>
                      Habitaciones
                    </div>
                  </div>
                )}
                
                {property.bathrooms && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      color: 'white',
                    }}
                  >
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                      {property.bathrooms}
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.8 }}>
                      Baños
                    </div>
                  </div>
                )}

                {property.area && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      color: 'white',
                    }}
                  >
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                      {property.area}m²
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.8 }}>
                      Área
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              {property.location?.city && `${property.location.city}, Cuba`}
            </div>
            
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '14px',
                color: 'white',
                fontWeight: '500',
              }}
            >
              Ver detalles →
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}