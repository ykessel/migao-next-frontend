export interface Location {
    type: "Point"
    coordinates: [number, number] // [longitude, latitude]
    address: string
    city: string
    state: string
    country: string
    postalCode: string
}
