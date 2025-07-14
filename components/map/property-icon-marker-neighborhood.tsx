import L from "leaflet";

// Custom property marker icon for the neighborhood map (larger, with glow)
const PropertyIconMarkerNeighborhood = () => {
    return L.divIcon({
        className: 'custom-property-marker-neighborhood',
        html: `
            <div style="
                background-color: #0d9488;
                color: white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 3px solid white;
                box-shadow: 0 0 12px 4px rgba(13,148,136,0.4), 0 2px 8px rgba(0,0,0,0.18);
            ">
                <svg width="26" height="26" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="#fff" stroke="#fff"/>
                  <polyline points="9 22 9 12 15 12 15 22" fill="none" stroke="#0d9488"/>
                </svg>
            </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });
};

export default PropertyIconMarkerNeighborhood; 