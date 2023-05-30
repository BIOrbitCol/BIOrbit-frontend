import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import style from '../styles/Map.module.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import { DrawControl } from './DrawControl'
import { useAccount } from 'wagmi'

type Props = {
	setCoordinates: React.Dispatch<React.SetStateAction<[number, number][][]>>
	showDrawControl: boolean
}

export default function Map(props: Props): JSX.Element {
	const { setCoordinates, showDrawControl } = props

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
				{showDrawControl && (
					<DrawControl
						setCoordinates={setCoordinates}
						showDrawControl={showDrawControl}
					/>
				)}
			</MapContainer>
		</>
	)
}
