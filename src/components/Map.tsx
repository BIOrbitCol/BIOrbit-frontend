import style from '../styles/Map.module.css'
import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from 'react-leaflet'
import { Footprint, MonitoringArea } from '@/models/monitoring-area.model'
import { DrawControl } from './DrawControl'

import L, { LatLngBounds, Layer } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-measure'
import 'leaflet-measure/dist/leaflet-measure.js'
import 'leaflet-measure/dist/leaflet-measure.css'
import { Alert, AlertIcon, Box, Center, VStack } from '@chakra-ui/react'
import LayerOptions from './LayerOptions'
import { Feature, GeoJsonProperties, Geometry } from 'geojson'
import { useAccount } from 'wagmi'

type Props = {
	handleSelect: React.Dispatch<React.SetStateAction<number | null>>
	polygonRef: React.MutableRefObject<L.FeatureGroup | null>
	projects: MonitoringArea[]
	projectsNotOwned: MonitoringArea[]
	selectedId: number | null
	setSelectedId: React.Dispatch<React.SetStateAction<number | null>>
	setCoordinates: React.Dispatch<React.SetStateAction<number[][]>>
	showDrawControl: boolean
}

export default function Map(props: Props) {
	const {
		handleSelect,
		polygonRef,
		projects,
		projectsNotOwned,
		selectedId,
		setCoordinates,
		setSelectedId,
		showDrawControl
	} = props

	const mapRef = useRef<L.Map | null>(null)

	const [geoJsonData, setGeoJsonData] = useState<
		GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[]
	>([])

	const [geoJsonDataNotOwned, setGeoJsonDataNotOwned] = useState<
		GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[]
	>([])

	const [layerName, setLayerName] = useState<string>('NDVI')

	const { address } = useAccount()

	// Define layer name options
	let layerNames = [
		{ label: 'Transparent', name: 'Transparent' },
		{ label: 'RGB', name: 'RGB' },
		{ label: 'NDVI', name: 'NDVI' }
	]

	const centerMap = (geoLayer: L.GeoJSON<any, Geometry>) => {
		if (mapRef.current) {
			const bounds = geoLayer.getBounds()
			mapRef.current.fitBounds(bounds, {
				paddingTopLeft: [600, 0],
				maxZoom: 8
			})
		}
	}

	const onEachFeature = (feature: any, layer: L.Layer): void => {
		if (feature.geometry.type === 'Polygon') {
			layer.on('click', (): void => {
				const geoJsonLayer = layer as L.GeoJSON
				const geoJsonObject = geoJsonLayer.toGeoJSON()

				if (geoJsonObject.type === 'Feature') {
					setSelectedId(geoJsonObject.properties.id)
					if (geoJsonObject.properties.owner === address) {
						geoJsonLayer.bindPopup(
							`coordinates: <p>${JSON.stringify(geoJsonObject)}<p>`
						)
					} else {
						geoJsonLayer.bindPopup(`<p>Locked 🔒️<p>`)
					}
				}
			})
		}
	}

	useEffect(() => {
		let newGeoJsonData: GeoJSON.Feature<
			GeoJSON.Geometry,
			GeoJSON.GeoJsonProperties
		>[] = []

		let newGeoJsonDataNotOwned: GeoJSON.Feature<
			GeoJSON.Geometry,
			GeoJSON.GeoJsonProperties
		>[] = []

		for (let project of projects) {
			const geoJSON: GeoJSON.Feature<
				GeoJSON.Geometry,
				GeoJSON.GeoJsonProperties
			> = {
				type: 'Feature',
				geometry: {
					type: 'Polygon',
					coordinates: [
						project.footprint.map((footprint: Footprint) => [
							parseFloat(footprint.longitude),
							parseFloat(footprint.latitude)
						])
					]
				},
				properties: {
					id: project.id,
					owner: project.owner
				}
			}

			newGeoJsonData.push(geoJSON)
		}

		for (let projectNotOwned of projectsNotOwned) {
			const geoJSON: GeoJSON.Feature<
				GeoJSON.Geometry,
				GeoJSON.GeoJsonProperties
			> = {
				type: 'Feature',
				geometry: {
					type: 'Polygon',
					coordinates: [
						projectNotOwned.footprint.map((footprint: Footprint) => [
							parseFloat(footprint.longitude),
							parseFloat(footprint.latitude)
						])
					]
				},
				properties: {
					id: projectNotOwned.id,
					owner: projectNotOwned.owner
				}
			}

			newGeoJsonDataNotOwned.push(geoJSON)
		}

		setGeoJsonData(newGeoJsonData)
		setGeoJsonDataNotOwned(newGeoJsonDataNotOwned)
	}, [projects])

	useEffect(() => {
		if (selectedId) {
			geoJsonData.forEach(
				(data: Feature<Geometry, GeoJsonProperties>): void => {
					if (data.properties && data.properties.id === selectedId) {
						const geoLayer = L.geoJSON(data)
						if (geoLayer) {
							centerMap(geoLayer)
						}
					}
				}
			)
			geoJsonDataNotOwned.forEach(
				(data: Feature<Geometry, GeoJsonProperties>): void => {
					if (data.properties && data.properties.id === selectedId) {
						const geoLayer = L.geoJSON(data)
						if (geoLayer) {
							centerMap(geoLayer)
						}
					}
				}
			)
		}
	}, [selectedId])

	return (
		<MapContainer
			ref={mapRef}
			className={style.map}
			center={[4.72366, -74.06286]}
			zoom={6}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; "<a href="http:/google.com/maps">Google</a>"'
				url='https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga'
			/>
			<DrawControl
				polygonRef={polygonRef}
				setCoordinates={setCoordinates}
				showDrawControl={showDrawControl}
			/>
			{geoJsonData.map((data, index) => (
				<GeoJSON
					key={index}
					onEachFeature={onEachFeature}
					data={data}
					style={{
						fillOpacity: 0.01,
						weight: 2,
						color: 'yellow'
					}}
				/>
			))}
			{geoJsonDataNotOwned.map((data, index) => (
				<GeoJSON
					key={index}
					onEachFeature={onEachFeature}
					data={data}
					style={{
						fillOpacity: 0.01,
						weight: 2,
						color: 'red'
					}}
				/>
			))}
			<LayerOptions
				options={layerNames}
				setOption={setLayerName}
				activeOption={layerName}
				themeColor={'blue.500'}
			/>
		</MapContainer>
	)
}
