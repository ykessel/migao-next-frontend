import { GAS_AVAILABILITY } from "@/constants/gas-availability.enum"

export interface Amenities {
    garage: boolean
    garden: boolean
    terrace: boolean
    kitchen: boolean
    furnished: boolean
    hasTV: boolean
    hasWifi: boolean
    hasAC: boolean
    hasFridge: boolean
    hasWasher: boolean
    hasMicrowave: boolean
    hasElevator: boolean
    hasBalcony: boolean
    hasPool: boolean
    gasAvailability: GAS_AVAILABILITY
}
