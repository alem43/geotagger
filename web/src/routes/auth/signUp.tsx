import { createFileRoute } from '@tanstack/react-router'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import backgroundImage from '../../images/background-image.png'
import profilePictureDefault from '../../images/profile-picture-default.png'

export const Route = createFileRoute('/auth/signUp')({
  component: RouteComponent,
})

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

/* const { register } = useForm<SignUpValues>({
  resolver: zodResolver(signUpValuesSchema),
}) */

function RouteComponent() {
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center w-full h-screen flex justify-center items-center"
    >
      <div
        className="flex bg-white w-full h-full max-w-86 max-h-161.25 rounded-4xl px-7.5 py-5 gap-4 flex-col items-center-safe"
        style={{
          boxShadow: `0px 0px 8px 0px #00000026`,
        }}
      >
        <div className="flex flex-col gap-2 items-center-safe">
          <h2 className="header-h4 text-dark">Sign up</h2>
          <p className="body-p text-center" style={{ color: `#322D38` }}>
            Your name will appear on posts and your public profle.
          </p>
        </div>
        <img src={profilePictureDefault} alt="default pfp" />
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="input-label-form">
              Email
            </label>
            <input type="text" className="input-field-form" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="input-label-form">
              Password
            </label>
            <input type="password" className="input-field-form" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password confirm" className="input-label-form">
              Confirm password
            </label>
            <input type="password" className="input-field-form" />
          </div>
        </div>
      </div>
    </div>
  )
}
