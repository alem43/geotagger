import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Link } from '@tanstack/react-router'
import worldMapBackground from '../../images/background-world-map.png'
import worldImage1 from '../../images/world-image-1.png'
import worldImage2 from '../../images/world-image-2.png'
import worldImage3 from '../../images/world-image-3.png'
import worldImage1Desktop from '../../images/world-image-1-desktop.png'
import worldImage2Desktop from '../../images/world-image-2-desktop.png'
import worldImage3Desktop from '../../images/world-image-3-desktop.png'
import padlockVector from '../../images/padlockVector.svg'
import tryBackgroundImage1 from '../../images/try-background-image-1.png'
import tryBackgroundImage2 from '../../images/try-background-image-2.png'
import tryBackgroundImage3 from '../../images/try-background-image-3.png'
import HomePageIn from '@/components/HomePageIn'

export const Route = createFileRoute('/homePage/homePageOut')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <HomePageOut />
    </>
  )
}
