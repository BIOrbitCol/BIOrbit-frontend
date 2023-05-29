export interface MonitoringArea {
	id: number
	name: string
	description: string
	state: string
	extension: number
	registry: string
	country: string
	coordinates: {
		latitude: string
		longitude: string
	}
	owner: string
	url: string
}
