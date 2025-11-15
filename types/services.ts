import { GAS_AVAILABILITY } from "@/constants/gas-availability.enum";
import { UTILITY_INCLUSION } from "@/constants/utility-inclusion.enum";
import { INTERNET_TYPE } from "@/constants/internet-type.enum";
import { CLEANING_FREQUENCY } from "@/constants/cleaning-frequency.enum";

export interface PropertyServicesType {
    // Utilities
    electricity: UTILITY_INCLUSION;
    electricityCircuitNumber?: number;
    water: UTILITY_INCLUSION;
    gas: UTILITY_INCLUSION;
    gasAvailability: GAS_AVAILABILITY;
    trashCollection: boolean;
    
    // Internet & Communication
    internetType: INTERNET_TYPE;
    internetSpeed?: number;
    cableTV: boolean;
    streamingServices: boolean;
    landlinePhone: boolean;
    
    // Cleaning & Maintenance
    cleaningService: CLEANING_FREQUENCY;
    linenService: boolean;
    laundryService: boolean;
    maintenanceService: boolean;
    gardenMaintenance: boolean;
    poolMaintenance: boolean;
    
    // Security & Safety
    securityService: boolean;
    alarmMonitoring: boolean;
    
    // Transportation & Parking
    airportTransfer: boolean;
    
    // Concierge & Guest Services
    conciergeService: boolean;
    guestSupport24h: boolean;
    welcomePackage: boolean;
    tourGuideService: boolean;
    
    // Food & Beverage
    breakfastService: boolean;
    groceryService: boolean;
    chefService: boolean;
    
    // Additional Services
    petCareService: boolean;
    babysittingService: boolean;
    fitnessTrainer: boolean;
    spaServices: boolean;
    
    // Additional fields
    additionalServicesNotes?: string;
    monthlyServiceFee?: number;
    setupFee?: number;
    serviceDeposit?: number;
}
  