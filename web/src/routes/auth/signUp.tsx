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
import logoBig from '../../images/logo-big.png'

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
        .min(6, 'Password must be at least 6 characters')
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
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpValuesSchema),
  })

  return (
    <>
      <div className="xl:hidden">
        <Header />
      </div>

      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="bg-cover bg-center xl:p-0 px-8.75 pt-14 pb-24.75"
      >
        <div className="absolute top-0 right-0 w-full max-w-205 h-screen z-50 flex items-center-safe justify-center">
          {/* <img
          src={backgroundImageBig}
          alt="background image big"
          className="absolute top-0 right-0 w-full max-w-205 h-screen z-30 flex items-center-safe justify-center"
        />
        <img src={logoBig} alt="big logo relative z-40" /> */}
        </div>

        <div
          className="flex bg-white max-w-86 sm:max-w-118.75 md:max-w-137.5 lg:max-w-156.25 xl:h-screen xl:rounded-none xl:mx-0   rounded-4xl px-7.5 py-5 gap-4 flex-col items-center-safe mx-auto"
          style={{
            boxShadow: `0px 0px 8px 0px #00000026`,
          }}
        >
          <div className="flex flex-col gap-2 items-center-safe  xl:mt-25.5">
            <h2 className="header-h4 text-dark xl:header-h3">Sign up</h2>
            <p className="body-p text-center" style={{ color: `#322D38` }}>
              Your name will appear on posts and your public profle.
            </p>
          </div>
          <img
            src={profilePictureDefault}
            alt="default pfp"
            className="cursor-pointer"
          />
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data)
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
            <button type="submit" className="sign-up-primary">
              Sign up
            </button>
            <div className="flex justify-between items-center">
              <p className="text-base font-normal text-dark">
                Already have an account?
              </p>
              <Link to="/auth/signIn" className="text-primary cursor-pointer">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
