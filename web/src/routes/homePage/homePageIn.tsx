import Header from '@/components/Header'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/homePage/homePageIn')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div>
        <Header />
      </div>
      <h4 className="header-h4 text-[2.1875rem] text-primary">
        Personal best guesses
      </h4>
      <p className="body-p text-dark">
        Your personal best guesses appear here. Go on and try to beat your
        personal records or set new!
      </p>
    </>
  )
}
