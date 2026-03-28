import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const Map = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <MapContainer
      center={[48.864716, 2.349014]}
      zoom={1}
      className="w-full h-[15.9688rem] rounded-[19px]"
    >
      <TileLayer
        url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
        maxZoom="18"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'> OpenStreetMap </a> contributors"
      />
    </MapContainer>
  )
}

export default Map
