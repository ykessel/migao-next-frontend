import {GAS_AVAILABILITY} from "@/constants/gas-availability.enum";

export interface IPropertyServices {
    electricity: 'INCLUDED' | 'NOT_INCLUDED';
    water: 'INCLUDED' | 'NOT_INCLUDED';
    gas: 'INCLUDED' | 'NOT_INCLUDED';
    trashCollection: boolean;
    internetType: 'FIBER' | 'DSL' | 'SATELLITE' | 'NONE';
    gasAvailability?: GAS_AVAILABILITY
    cableTV: boolean;
    streamingServices: boolean;
    landlinePhone: boolean;
    cleaningService: 'INCLUDED' | 'NOT_INCLUDED';
    linenService: boolean;
    laundryService: boolean;
    maintenanceService: boolean;
    gardenMaintenance: boolean;
    poolMaintenance: boolean;
    securityService: boolean;
    alarmMonitoring: boolean;
    parkingIncluded: boolean;
    garageAccess: boolean;
    airportTransfer: boolean;
    conciergeService: boolean;
    guestSupport24h: boolean;
    welcomePackage: boolean;
    tourGuideService: boolean;
    breakfastService: boolean;
    groceryService: boolean;
    chefService: boolean;
    petCareService: boolean;
    babysittingService: boolean;
    fitnessTrainer: boolean;
    spaServices: boolean;
  }
  