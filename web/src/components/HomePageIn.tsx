import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { lazy, Suspense } from 'react'
import placeholderImage from '../images/placeholder-image.png'

const Map = lazy(() => import('@/components/Map'))

interface Geotag {
  id: string
  imageUrl: string
  lat: number
  lng: number
  createdAt: string
}

const HomePageIn = () => {
  const [recentUploads, setRecentUploads] = useState<Geotag[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [activeUploadId, setActiveUploadId] = useState<string | null>(null)

  const [markerPosition, setMarkerPosition] = useState<[number, number]>([
    48.864716, 2.349014,
  ])

  const [locationAddress, setLocationAddress] = useState('')
  const [errorDistance, setErrorDistance] = useState('')

  const handleMarkerDragEnd = (newLat: number, newLng: number) => {
    setMarkerPosition([newLat, newLng])
  }

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      )
      const data = await response.json()
      setLocationAddress(data.display_name || 'Address not found')
    } catch (err) {
      console.error('Error fetching address:', err)
      setLocationAddress('Error fetching address')
    }
  }

  const openModal = (uploadId: string, lat: number, lng: number) => {
    setActiveUploadId(uploadId)
    setMarkerPosition([lat, lng])
  }

  const closeModal = () => {
    setActiveUploadId(null)
    setErrorDistance('')
    setLocationAddress('')
  }

  const handleGuess = async () => {
    const activeUpload = recentUploads.find((u) => u.id === activeUploadId)
    if (!activeUpload) return

    const distanceKm = calculateDistance(
      markerPosition[0],
      markerPosition[1],
      activeUpload.lat,
      activeUpload.lng,
    )

    const distanceMeters = distanceKm * 1000
    setErrorDistance(`${Math.round(distanceMeters)} m`)

    await fetchAddress(activeUpload.lat, activeUpload.lng)
  }

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  useEffect(() => {
    const fetchRecentUploads = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:8787/geotags/recent', {
          credentials: 'include',
        })

        if (response.ok) {
          const data = await response.json()
          setRecentUploads(data)
        } else {
          setError('Failed to load recent uploads')
        }
      } catch (err) {
        console.error('Error fetching uploads:', err)
        setError('Error loading uploads')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecentUploads()
  }, [])

  function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }, [])

    return width
  }

  const width = useWindowWidth()

  return (
    <>
      <Header />
      <div className="max-w-85.5 sm:max-w-155 lg:max-w-250 xl:max-w-325 mx-auto mt-14 mb-12.75 gap-16 sm:text-center">
        <div className="flex flex-col">
          <h4 className="header-h4 text-[2.1875rem] text-primary leading-10 mb-4">
            Personal best guesses
          </h4>
          <p className="body-p text-dark mb-8 max-w-[20rem] sm:max-w-none h-119.5 mx-auto">
            Your personal best guesses appear here. Go on and try to beat your
            personal records or set new!
          </p>
        </div>
        <div className="flex flex-col">
          <div>
            <h4 className="header-h4 text-[2.1875rem] text-primary">
              New uploads
            </h4>
            <p className="body-p text-dark max-w-[20rem] sm:max-w-none mb-16 mx-auto">
              New uploads from users. Try to guess all the locations by pressing
              on a picture.
            </p>
          </div>
          {isLoading ? (
            <p className="body-p text-dark">Loading recent uploads...</p>
          ) : error ? (
            <p className="body-p text-red-500">{error}</p>
          ) : recentUploads.length === 0 ? (
            <p className="body-p text-dark">
              No uploads yet. Start adding places!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5.25 mb-12.75 w-full">
              {recentUploads.map((upload) => (
                <div
                  key={upload.id}
                  className="rounded-2xl overflow-hidden w-full h-full max-w-104.75 max-h-48.25 xl:max-h-59.25 cursor-pointer mx-auto"
                  onClick={() => openModal(upload.id, upload.lat, upload.lng)}
                >
                  <img
                    src={upload.imageUrl || placeholderImage}
                    alt={`Upload from ${new Date(upload.createdAt).toLocaleDateString()}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = placeholderImage
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          <button className="sign-in-primary w-full max-w-34.25 mx-auto">
            Load more
          </button>
        </div>
      </div>
      {activeUploadId && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-[#00000099] flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="flex flex-col xl:flex-row bg-white w-full max-w-94.5 sm:max-w-140 xl:max-w-325.25 xl:max-h-99 p-7.5 xl:p-6 pb-6 rounded-[36px] mx-auto gap-7.25 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={
                recentUploads.find((u) => u.id === activeUploadId)?.imageUrl ||
                placeholderImage
              }
              alt="Upload"
              className="w-full h-full max-h-[185.5px] sm:max-h-75 xl:max-h-87 xl:max-w-153 object-cover rounded-2xl"
              onError={(e) => {
                e.currentTarget.src = placeholderImage
              }}
            />
            <div className="flex flex-col w-full gap-7.25 xl:gap-0">
              <div className="w-full h-full max-h-[11.5938rem] overflow-hidden rounded-[19px]">
                <Suspense fallback={<div>Loading map...</div>}>
                  <Map
                    position={markerPosition}
                    onMarkerDragEnd={handleMarkerDragEnd}
                  />
                </Suspense>
              </div>
              <div className="flex flex-col h-full gap-4 justify-between xl:relative">
                <div className="flex flex-col xl:flex-row xl:mt-4">
                  <div className="flex flex-col gap-2.75 body-p text-black text-[1rem]">
                    <p>Error distance</p>
                    <input
                      className="w-full h-full max-h-10 px-4 py-2 rounded"
                      type="text"
                      value={errorDistance}
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col gap-2.75 body-p text-black text-[1rem]">
                    <p>{width < 1280 ? `Location` : `Guessed location`}</p>
                    <input
                      className="w-full h-full max-h-10 px-4 py-2 rounded"
                      type="text"
                      value={errorDistance ? locationAddress : ''}
                      readOnly
                    />
                  </div>
                </div>
                <button
                  onClick={handleGuess}
                  className="button-guess w-full xl:max-w-34.25 xl:absolute right-0 bottom-0"
                >
                  Guess
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

export default HomePageIn
