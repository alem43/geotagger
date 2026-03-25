import { createFileRoute } from '@tanstack/react-router'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from '@tanstack/react-router'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import backgroundImage from '../../images/background-image.png'
import backgroundImageBig from '../../images/background-image-bigscreen.png'
import profilePictureDefault from '../../images/profile-picture-default.png'
import mobileProfilePictureDefault from '../../images/mobile-profile-picture-default.svg'
import geotaggerLogo from '../../images/geotagger-logo.svg'
import logoBig from '../../images/logo-big.png'
import geotaggerPatter from '../../images/geotagger-patern.png'

export const Route = createFileRoute('/auth/signUp')({
  component: RouteComponent,
})

function RouteComponent() {
  const signUpValuesSchema = z
    .object({
      email: z.string().email(),
      firstName: z
        .string()
        .min(3, 'First name must be at least 3 characters')
        .max(255),
      lastName: z
        .string()
        .min(3, 'Last name must be at least 3 characters')
        .max(255),
      password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(20),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    })

  type SignUpValues = z.infer<typeof signUpValuesSchema>

  const ErrorText = ({ children }: { children?: string }) => (
    <>{children && <p className="text-xs text-red-500 pt-1">{children}</p>}</>
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpValuesSchema),
  })

  const { setIsSignedIn } = useAuth()

  return (
    <>
      <div className="xl:hidden w-full">
        <Header />
      </div>

      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="bg-cover bg-center xl:p-0 px-8.75 pt-14 pb-24.75 max-w-360 mx-auto flex justify-center"
      >
        <div className="flex w-full bg-white max-w-86 sm:max-w-118.75 md:max-w-137.5 lg:max-w-156.25 xl:max-w-155 xl:h-screen xl:rounded-none xl:mx-0 rounded-4xl xl:pt-11.5 xl:pl-17.5 gap-28 flex-col box-shadow ">
          <Link to="/" className="hidden xl:block">
            <img
              src={geotaggerLogo}
              alt="Geotagger logo"
              className="cursor-pointer w-full max-w-42.75"
            />
          </Link>
          <div className="flex flex-col items-center w-max max-w-full px-7.5 py-5 xl:pl-10.5 mx-auto">
            <div className="flex flex-col gap-2 xl:gap-4 items-center-safe  ">
              <h2 className="header-h4 text-[2.188rem] text-dark xl:text-[3.0625rem]">
                Sign up
              </h2>
              <p
                className="body-p text-center xl:max-w-101.25"
                style={{ color: `#322D38` }}
              >
                Your name will appear on posts and your public profle.
              </p>
            </div>
            <picture>
              <source
                media="(min-width: 1280px)"
                srcSet={mobileProfilePictureDefault}
              />
              <img
                src={profilePictureDefault}
                alt="hero"
                className="w-full h-full object-cover cursor-pointer"
              />
            </picture>
            <form
              onSubmit={handleSubmit(async (data) => {
                try {
                  const response = await fetch(
                    'http://localhost:8787/auth/register',
                    {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data),
                    },
                  )

                  if (response.ok) {
                    const message = await response.text()
                    console.log('Success:', message)
                    const [user] = useState<User>({
                      isSignedIn: true,
                    })
                    setIsSignedIn(true)
                    navigate({ to: '/' })
                  } else {
                    console.error('Not registered')
                  }
                } catch (error) {
                  console.error('Network error:', error)
                }
              })}
              className="flex flex-col gap-4 max-w-105"
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
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="first-name" className="input-label-form">
                    First name
                  </label>
                  <input
                    {...register('firstName')}
                    type="text"
                    className="input-field-form"
                    id="first-name"
                  />
                  <ErrorText>{errors.firstName?.message}</ErrorText>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="last-name" className="input-label-form">
                    Last name
                  </label>
                  <input
                    {...register('lastName')}
                    type="text"
                    className="input-field-form"
                    id="last-name"
                  />
                  <ErrorText>{errors.lastName?.message}</ErrorText>
                </div>
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
              <div className="flex flex-col gap-2">
                <label htmlFor="password-confirm" className="input-label-form">
                  Confirm password
                </label>
                <input
                  {...register('confirmPassword')}
                  type="password"
                  className="input-field-form"
                  id="password-confirm"
                />
                <ErrorText>{errors.confirmPassword?.message}</ErrorText>
              </div>
              <button
                type="submit"
                className="sign-up-primary"
                disabled={isSubmitting}
              >
                Sign up
              </button>
              <div className="flex justify-between items-center">
                <p className="body-p text-dark">Already have an account?</p>
                <Link to="/auth/signIn" className="text-primary cursor-pointer">
                  Sign in
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
