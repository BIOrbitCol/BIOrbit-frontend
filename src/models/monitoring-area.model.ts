export interface RentInfo {
	renter: string
	expiry: string
}

export interface Monitoring {
	detectionDate: string
	forestCoverExtension: string
}

export interface ImageTimeSeries {
	detectionDate: string[]
	forestCoverExtension: string[]
}

export interface Footprint {
	latitude: string
	longitude: string
}

export interface MonitoringArea {
	id: number
	uri?: string
	state: number
	name: string
	description: string
	extension: string
	country: string
	footprint: Footprint[]
	owner: string
	imageTimeSeries?: ImageTimeSeries
	monitoring?: Monitoring[]
	isRent: boolean
	rentCost: string
	rentInfo?: RentInfo[]
}
