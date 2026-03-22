import { createFileRoute } from '@tanstack/react-router'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from '@tanstack/react-router'
import Header from '@/components/Header'
import backgroundImage from '../../images/background-image.png'
import backgroundImageBig from '../../images/background-image-bigscreen.png'
import profilePictureDefault from '../../images/profile-picture-default.png'
import mobileProfilePictureDefault from '../../images/mobile-profile-picture-default.svg'
import geotaggerLogo from '../../images/geotagger-logo.svg'
import logoBig from '../../images/logo-big.png'
import geotaggerPatter from '../../images/geotagger-patern.png'

export const Route = createFileRoute('/auth/signIn')({
  component: RouteComponent,
})

function RouteComponent() {
  const signInValuesSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(20),
  })

  type SignInValues = z.infer<typeof signInValuesSchema>

  const ErrorText = ({ children }: { children?: string }) => (
    <>{children && <p className="text-xs text-red-500 pt-1">{children}</p>}</>
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInValuesSchema),
  })

  return (
    <>
      <div className="xl:hidden w-full">
        <Header />
      </div>

      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="bg-cover bg-center xl:p-0 px-8.75  max-w-360 mx-auto flex justify-center h-screen"
      >
        <div className="flex w-full bg-white max-w-86 sm:max-w-118.75 md:max-w-137.5 lg:max-w-156.25 xl:max-w-155 xl:h-screen xl:rounded-none xl:mx-0 rounded-4xl xl:pt-11.5 xl:pl-17.5 gap-28 flex-col box-shadow max-h-107.25 xl:max-h-screen mt-44.75">
          <Link to="/" className="hidden xl:block">
            <img
              src={geotaggerLogo}
              alt="Geotagger logo"
              className="cursor-pointer w-full max-w-42.75"
            />
          </Link>
          <div className="flex flex-col items-center w-max max-w-full px-7.5 py-5 xl:pl-10.5 mx-auto">
            <div className="flex flex-col gap-2 xl:gap-4 items-center-safe mb-4">
              <h2 className="header-h4 text-[2.188rem] text-dark xl:text-[3.0625rem]">
                Sign in
              </h2>
              <p
                className="body-p text-center xl:max-w-100 xl:mb-4"
                style={{ color: `#322D38` }}
              >
                Welcome back to Geotagger. We are glad that you are back.
              </p>
            </div>
            <form
              onSubmit={handleSubmit(async (data) => {
                try {
                  const response = await fetch(
                    'http://localhost:8787/auth/login',
                    {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data),
                      credentials: 'include',
                    },
                  )

                  if (response.ok) {
                    const message = await response.text()
                    console.log('Success:', message)
                  } else {
                    console.error('Not logged in')
                  }
                } catch (error) {
                  console.error('Network error:', error)
                }
              })}
              className="flex flex-col gap-4 max-w-105 xl:w-full "
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="input-label-form">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="text"
                  className="input-field-form"
                  id="email"
                />
                <ErrorText>{errors.email?.message}</ErrorText>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="input-label-form">
                  Password
                </label>
                <input
                  {...register('password')}
                  type="password"
                  className="input-field-form"
                  id="password"
                />
                <ErrorText>{errors.password?.message}</ErrorText>
              </div>
              <button type="submit" className="sign-in-primary">
                Sign in
              </button>
              <div className="flex justify-between items-center">
                <p className="body-p text-dark">
                  Do you want to create an account?
                </p>
                <Link
                  to="/auth/signUp"
                  className="text-primary cursor-pointer w-15.25"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div
          className="relative w-full h-screen xl:flex justify-center-safe items-center-safe bg-cover bg-center hidden"
          style={{ backgroundImage: `url(${backgroundImageBig})` }}
        >
          <img src={logoBig} alt="big logo" />
          <img
            src={geotaggerPatter}
            alt="geotagger pattern"
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    </>
  )
}
