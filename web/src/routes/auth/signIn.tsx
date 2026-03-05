import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/Header'

export const Route = createFileRoute('/auth/signIn')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="xl:hidden">
        <Header />
      </div>
      Hello "/auth/signIn"!
    </>
  )
}
