import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useAuth } from '@/contexts/AuthContext'
import { createFileRoute } from '@tanstack/react-router'
import mobileProfilePictureDefault from '../../images/mobile-profile-picture-default.svg'

export const Route = createFileRoute('/profile/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isSignedIn, setIsSignedIn, user, setUser } = useAuth()

  return (
    <>
      <Header />
      <div className="flex flex-col gap-10.5 mx-auto w-full max-w-85.5 mt-8">
        <div className="flex flex-col w-full h-full max-h-174 p-6 pt-4 box-shadow rounded-2xl gap-7.25">
          <div className="flex flex-col pt-20 gap-6">
            <div className="flex flex-col items-center-safe">
              <img
                src={mobileProfilePictureDefault}
                alt="profile picture"
                className="w-full h-full max-w-20 max-h-20"
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
                  value={user?.firstName}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="body-p text-dark">Surname</p>
                <input
                  type="text"
                  className="w-full h-full max-h-8.5 box-shadow text-dark text-[0.75rem] px-4 py-2 rounded-2xl"
                  value={user?.lastName}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="body-p text-dark">Email</p>
              <input
                type="text"
                className="w-full h-full max-h-8.5 box-shadow text-dark text-[0.75rem] px-4 py-2 rounded-2xl"
                value={user?.email}
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
        <div className="flex flex-col w-full h-full max-h-174 p-6 pt-4 box-shadow rounded-2xl gap-7.25">
          <p className="body-p text-dark">Upload image:</p>
        </div>
      </div>
      <Footer />
    </>
  )
}
