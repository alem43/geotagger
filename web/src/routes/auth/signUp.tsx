import { createFileRoute } from '@tanstack/react-router'
import backgroundImage from '../../images/background-image.png'
import profilePictureDefault from '../../images/profile-picture-default.png'

export const Route = createFileRoute('/auth/signUp')({
  component: RouteComponent,
})

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
      </div>
    </div>
  )
}
