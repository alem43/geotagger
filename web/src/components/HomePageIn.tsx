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
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([
    48.864716, 2.349014,
  ])

  const handleMarkerDragEnd = (newLat: number, newLng: number) => {
    setMarkerPosition([newLat, newLng])
    setValue('lat', newLat)
    setValue('lng', newLng)
    fetchAddress(newLat, newLng)
  }

  const [recentUploads, setRecentUploads] = useState<Geotag[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isHidden, setIsHidden] = useState('hidden')

  const toggleHidden = () => {
    if (isHidden === 'flex') {
      setIsHidden('hidden')
    } else if (isHidden === 'hidden') {
      setIsHidden('flex')
    }
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

  return (
    <>
      <Header />
      <div className="max-w-85.5 xl:max-w-325 mx-auto mt-14 mb-12.75 gap-16">
        <div className="flex flex-col">
          <h4 className="header-h4 text-[2.1875rem] text-primary leading-10 mb-4">
            Personal best guesses
          </h4>
          <p className="body-p text-dark mb-8 max-w-[20rem] xl:max-w-none h-119.5">
            Your personal best guesses appear here. Go on and try to beat your
            personal records or set new!
          </p>
        </div>
        <div className="flex flex-col">
          <div>
            <h4 className="header-h4 text-[2.1875rem] text-primary">
              New uploads
            </h4>
            <p className="body-p text-dark max-w-[20rem] xl:max-w-none mb-16">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5.25 mb-12.75">
              {recentUploads.map((upload) => (
                <>
                  <div
                    key={upload.id}
                    className="rounded-2xl overflow-hidden w-full h-full max-w-104.75 max-h-48.25 xl:max-h-59.25"
                  >
                    <img
                      src={upload.imageUrl || placeholderImage}
                      alt={`Upload from ${new Date(upload.createdAt).toLocaleDateString()}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = placeholderImage
                      }}
                      onClick={toggleHidden}
                    />
                  </div>
                  <div
                    className={`${isHidden} absolute top-0 left-0 w-full h-full bg-[#00000066] items-center`}
                  >
                    <div className="flex flex-col bg-white w-full max-w-94.5 h-full max-h-175 p-7.5 pb-6 rounded-[36px] mx-auto gap-7.25">
                      <img
                        src={upload.imageUrl || placeholderImage}
                        alt={`Upload from ${new Date(upload.createdAt).toLocaleDateString()}`}
                        className="w-full h-full max-h-[185.5px] object-cover rounded-2xl"
                        onError={(e) => {
                          e.currentTarget.src = placeholderImage
                        }}
                      />
                      <div className="w-full h-full max-h-[185.5px] mt-4">
                        <Suspense fallback={<div>Loading map...</div>}>
                          <Map
                            position={markerPosition}
                            onMarkerDragEnd={handleMarkerDragEnd}
                          />
                        </Suspense>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-col gap-2.75">
                          <p className="body-p">Error distance</p>
                          <input
                            className="w-full h-full max-h-10 px-4 py-2"
                            type="text" /* value={errorDistance} */
                          />
                        </div>
                        <div className="flex flex-col"></div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
          <button className="sign-in-primary w-full max-w-34.25 mx-auto">
            Load more
          </button>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default HomePageIn
