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

type Props = {
	handleSelect: React.Dispatch<React.SetStateAction<number | null>>
	polygonRef: React.MutableRefObject<L.FeatureGroup | null>
	projects: MonitoringArea[]
	selectedId: number | null
	setSelectedId: React.Dispatch<React.SetStateAction<number | null>>
	setCoordinates: React.Dispatch<React.SetStateAction<[number, number][][]>>
	showDrawControl: boolean
}

export default function Map(props: Props) {
	const {
		handleSelect,
		polygonRef,
		projects,
		selectedId,
		setCoordinates,
		setSelectedId,
		showDrawControl
	} = props

	const [geoJsonData, setGeoJsonData] = useState<
		GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[]
	>([])

	const [layerName, setLayerName] = useState<string>('NDVI')

	const mapRef = useRef<L.Map | null>(null)

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
					geoJsonLayer.bindPopup(
						`coordinates: <p>${JSON.stringify(geoJsonObject)}<p>`
					)
				}
			})
		}
	}

	useEffect(() => {
		let newGeoJsonData = []

		for (let project of projects) {
			const geoJSON: GeoJSON.Feature<
				GeoJSON.Geometry,
				GeoJSON.GeoJsonProperties
			> = {
				type: 'Feature',
				geometry: {
					type: 'Polygon',
					coordinates: project.footprint.map((footprints: Footprint[]) =>
						footprints.map((footprint: Footprint) => [
							parseFloat(footprint.longitude),
							parseFloat(footprint.latitude)
						])
					)
				},
				properties: {
					id: project.id
				}
			}

			newGeoJsonData.push(geoJSON)
		}

		setGeoJsonData(newGeoJsonData) // Update state with new GeoJSON data
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
			<LayerOptions
				options={layerNames}
				setOption={setLayerName}
				activeOption={layerName}
				themeColor={'green.500'}
			/>
		</MapContainer>
	)
}
