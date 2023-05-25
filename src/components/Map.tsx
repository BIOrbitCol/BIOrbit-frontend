import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import * as L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import style from '../styles/Map.module.css'
import { useEffect } from 'react'
import DrawControl from './DrawControl'

export default function Map() {
	return (
		<>
			<MapContainer
				className={style.map}
				center={[4.72366, -74.06286]}
				zoom={6}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="http://maps.stamen.com/#watercolor/12/37.7706/-122.3782">Stamen</a> Terrain Map'
					url='https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg'
				/>
				<DrawControl />
				{/* <Marker position={[51.505, -0.09]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker> */}
			</MapContainer>
		</>
	)
}
