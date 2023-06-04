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
	uri: string
	name: string
	description: string
	state: number
	extension: string
	country: string
	footprint: Footprint[]
	owner: string
	imageTimeSeries: ImageTimeSeries
	monitoring: Monitoring[]
}
