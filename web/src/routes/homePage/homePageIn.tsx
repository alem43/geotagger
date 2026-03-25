import Header from '@/components/Header'
import HomePageIn from '@/components/HomePageIn'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/homePage/homePageIn')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <HomePageIn />
    </>
  )
}
