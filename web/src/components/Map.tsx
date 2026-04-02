import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

type MapProps = {
  position: [number, number]
  onMarkerDragEnd: (lat: number, lng: number) => void
}

const Map = ({ position, onMarkerDragEnd }: MapProps) => {
  const [isClient, setIsClient] = useState(false)
  const markerRef = useRef<any>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleDragEnd = () => {
    const marker = markerRef.current
    if (marker) {
      const { lat, lng } = marker.getLatLng()
      onMarkerDragEnd(lat, lng)
    }
  }

  if (!isClient) return null

  return (
    <MapContainer
      center={position}
      zoom={1}
      className="w-full h-[15.9688rem] rounded-[19px]"
    >
      <TileLayer
        url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={position}
        draggable
        ref={markerRef}
        eventHandlers={{
          dragend: handleDragEnd,
        }}
      />
    </MapContainer>
  )
}

export default Map
