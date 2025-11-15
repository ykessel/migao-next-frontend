import L from "leaflet";

// Custom property marker icon - Pin shape with house icon
const PropertyIconMarker = () => {
  const markerColor = "#0d9488"; // Business brand color

  return L.divIcon({
    className: "custom-property-marker",
    html: `
            <svg width="32" height="40" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
<!--Pin shape (teardrop)-->
  <path d="M256,0C159.969,0,82.109,77.859,82.109,173.906c0,100.719,80.016,163.688,123.297,238.719 C246.813,484.406,246.781,512,256,512s9.188-27.594,50.594-99.375c43.297-75.031,123.297-138,123.297-238.719 C429.891,77.859,352.031,0,256,0z" fill="${markerColor}" stroke="white" stroke-width="2"/>
<!--White circle background-->
  <circle cx="256" cy="180" r="140" fill="white" stroke="${markerColor}" stroke-width="3"/>
<!--House icon - centrado en el círculo-->
  <g transform="translate(160, 80)">
    <svg width="200px" height="200px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"/>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
      <g id="SVGRepo_iconCarrier">
        <path d="M19 9.77806V16.2C19 17.8801 19 18.7202 18.673 19.3619C18.3854 19.9264 17.9265 20.3854 17.362 20.673C16.7202 21 15.8802 21 14.2 21H9.8C8.11984 21 7.27976 21 6.63803 20.673C6.07354 20.3854 5.6146 19.9264 5.32698 19.3619C5 18.7202 5 17.8801 5 16.2V9.7774M21 12L15.5668 5.96393C14.3311 4.59116 13.7133 3.90478 12.9856 3.65138C12.3466 3.42882 11.651 3.42887 11.0119 3.65153C10.2843 3.90503 9.66661 4.59151 8.43114 5.96446L3 12M14 12C14 13.1045 13.1046 14 12 14C10.8954 14 10 13.1045 10 12C10 10.8954 10.8954 9.99996 12 9.99996C13.1046 9.99996 14 10.8954 14 12Z" stroke="${markerColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>
  </g>
</svg>
        `,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  });
};

export default PropertyIconMarker;
