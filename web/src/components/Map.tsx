import { useEffect, useState, useRef } from 'react'

type MapProps = {
  position: [number, number]
  onMarkerDragEnd: (lat: number, lng: number) => void
}

const Map = ({ position, onMarkerDragEnd }: MapProps) => {
  const [isClient, setIsClient] = useState(false)
  const [LeafletComponents, setLeafletComponents] = useState<any>(null)
  const markerRef = useRef<any>(null)

  useEffect(() => {
    setIsClient(true)

    const loadLeaflet = async () => {
      const L = await import('leaflet')
      const { MapContainer, TileLayer, Marker } = await import('react-leaflet')
      await import('leaflet/dist/leaflet.css')

      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      })

      setLeafletComponents({ MapContainer, TileLayer, Marker })
    }

    loadLeaflet()
  }, [])

  const handleDragEnd = () => {
    const marker = markerRef.current
    if (marker) {
      const { lat, lng } = marker.getLatLng()
      onMarkerDragEnd(lat, lng)
    }
  }

  if (!isClient || !LeafletComponents) return null

  const { MapContainer, TileLayer, Marker } = LeafletComponents

  return (
    <MapContainer
      center={position}
      zoom={1}
      className="w-full h-[15.9688rem] rounded-[19px]"
    >
      <TileLayer url="https://tile.openstreetmap.de/{z}/{x}/{y}.png" />
      <Marker
        position={position}
        draggable
        ref={markerRef}
        eventHandlers={{ dragend: handleDragEnd }}
      />
    </MapContainer>
  )
}

export default Map
