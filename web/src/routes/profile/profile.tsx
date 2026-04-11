import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createFileRoute } from '@tanstack/react-router'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import mobileProfilePictureDefault from '../../images/mobile-profile-picture-default.svg'
import placeholderImage from '../../images/placeholder-image.png'
import { lazy, Suspense } from 'react'

const Map = lazy(() => import('@/components/Map'))

export const Route = createFileRoute('/profile/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isSignedIn, setIsSignedIn, user, setUser } = useAuth()

  const geotagValuesSchema = z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  })

  type GeotagValues = z.infer<typeof geotagValuesSchema>

  const [markerPosition, setMarkerPosition] = useState<[number, number]>([
    48.864716, 2.349014,
  ])

  const [address, setAddress] = useState<string>('Loading address...')
  const [isLoadingAddress, setIsLoadingAddress] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<GeotagValues>({
    resolver: zodResolver(geotagValuesSchema),
    defaultValues: {
      lat: markerPosition[0],
      lng: markerPosition[1],
    },
  })

  const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_KEY

  const fetchAddress = async (lat: number, lng: number) => {
    setIsLoadingAddress(true)
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${GEOAPIFY_KEY}
`,
      )

      if (!response.ok) {
        throw new Error('Failed to fetch address')
      }

      const result = await response.json()

      if (result.features && result.features.length > 0) {
        setAddress(result.features[0].properties.formatted)
      } else {
        setAddress('No address found')
      }
    } catch (error) {
      console.error('Geocoding error:', error)
      setAddress('Error fetching address')
    } finally {
      setIsLoadingAddress(false)
    }
  }

  useEffect(() => {
    fetchAddress(markerPosition[0], markerPosition[1])
  }, [markerPosition])

  useEffect(() => {
    if (user) {
      setValue('firstName', user.firstName)
      setValue('lastName', user.lastName)
      setValue('email', user.email)
    }
  }, [user])

  const handleMarkerDragEnd = (newLat: number, newLng: number) => {
    setMarkerPosition([newLat, newLng])
    setValue('lat', newLat)
    setValue('lng', newLng)
    fetchAddress(newLat, newLng)
  }

  const onSubmit = async (data: GeotagValues) => {
    try {
      const response = await fetch('http://localhost:8787/geotags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          lat: data.lat,
          lng: data.lng,
        }),
      })

      if (response.ok) {
        const geotag = await response.json()
        setImageUrl(geotag.imageUrl)
        console.log('Geotag created:', geotag)
        alert('Geotag created successfully!')
      } else {
        console.error('Failed to create geotag')
        alert('Failed to create geotag')
      }
    } catch (error) {
      console.error('Network error:', error)
      alert('Network error')
    }
  }

  return (
    <>
      <Header />
      <div className="flex flex-col xl:flex-row gap-10.5 mx-auto mb-17.25 w-full max-w-85.5 xl:max-w-325 mt-8 xl:mt-10">
        <div className="flex flex-col w-full h-full max-h-174 xl:max-h-189.75 xl:max-w-105 p-6 pt-4 box-shadow rounded-2xl gap-7.25">
          <div className="flex flex-col pt-20 pb-16.25 gap-6">
            <div className="flex flex-col items-center-safe">
              <img
                src={
                  user?.profilePictureUrl
                    ? `http://localhost:8787/uploads/profiles/${user.profilePictureUrl}`
                    : mobileProfilePictureDefault
                }
                alt="profile picture"
                className="w-20 h-20 rounded-[50%] mb-6 object-cover"
              />
              <p className="header-h4 text-[2.1875rem] text-dark">
                {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
              </p>
            </div>
            <div className="flex flex-col w-full h-full max-h-37 gap-4">
              <div className="flex flex-col gap-2">
                <p className="body-p text-dark">Name</p>
                <input
                  type="text"
                  className="w-full h-full max-h-8.5 box-shadow text-dark text-[0.75rem] px-4 py-2 rounded-2xl"
                  {...register('firstName')}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="body-p text-dark">Surname</p>
                <input
                  type="text"
                  className="w-full h-full max-h-8.5 box-shadow text-dark text-[0.75rem] px-4 py-2 rounded-2xl"
                  {...register('lastName')}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="body-p text-dark">Email</p>
              <input
                type="text"
                className="w-full h-full max-h-8.5 box-shadow text-dark text-[0.75rem] px-4 py-2 rounded-2xl"
                {...register('email')}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="body-p text-dark">Password</p>
              <input
                type="password"
                className="w-full h-full max-h-8.5 box-shadow text-dark text-[0.75rem] px-4 py-2 rounded-2xl"
              />
            </div>
          </div>
          <button className="sign-up-primary">Save profile</button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full h-full min-h-174 xl:max-h-189.75 xl:max-w-105 p-6 pt-4 box-shadow rounded-2xl gap-3.25"
        >
          <div className="flex flex-col gap-2">
            <p className="body-p text-dark">Upload image:</p>
          </div>
          <img
            src={imageUrl || placeholderImage}
            alt="placeholder image"
            className="xl:max-h-[215.5px] object-cover rounded-2xl"
            onError={(e) => {
              e.currentTarget.src = placeholderImage
            }}
          />
          <input type="hidden" {...register('lat', { valueAsNumber: true })} />
          <input type="hidden" {...register('lng', { valueAsNumber: true })} />
          <Suspense fallback={<div>Loading map...</div>}>
            <Map
              position={markerPosition}
              onMarkerDragEnd={handleMarkerDragEnd}
            />
          </Suspense>
          <div className="flex flex-col gap-4">
            <p className="body-p text-dark text-[1rem]">Location</p>
            <div className="px-4 py-2">
              <p className="body-p text-dark text-[1rem] min-h-12">
                {isLoadingAddress ? 'Loading address...' : address}
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="sign-up-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add place'}
          </button>
        </form>
      </div>
      <Footer />
    </>
  )
}
