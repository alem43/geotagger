import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const Map = () => {
  const [isClient, setIsClient] = useState(false)
  const [position, setPosition] = useState([48.864716, 2.349014])
  const markerRef = useRef(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleDragEnd = () => {
    const marker = markerRef.current
    if (marker != null) {
      const newPos = marker.getLatLng()
      setPosition([newPos.lat, newPos.lng])
      console.log('New position:', newPos)
    }
  }

  if (!isClient) return null

  return (
    <MapContainer
      center={[48.864716, 2.349014]}
      zoom={1}
      className="w-full h-[15.9688rem] rounded-[19px]"
    >
      <TileLayer
        url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
        maxZoom={18}
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'> OpenStreetMap </a> contributors"
      />
      <Marker
        position={position}
        draggable={true}
        ref={markerRef}
        eventHandlers={{
          dragend: handleDragEnd,
        }}
      />
    </MapContainer>
  )
}

export default Map
