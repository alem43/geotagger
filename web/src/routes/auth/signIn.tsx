import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/signIn')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/signIn"!</div>
}
