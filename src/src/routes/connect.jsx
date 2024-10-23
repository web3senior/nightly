import { useState, Suspense, useEffect } from 'react'
import { defer, Await, useNavigate, useLoaderData, Link, Navigate } from 'react-router-dom'
import { getTour } from '../util/api'
import { Title } from './helper/DocumentTitle'
import Shimmer from './helper/Shimmer'
import { useAuth, contracts, getDefaultChain } from './../contexts/AuthContext'
import Icon from './helper/MaterialIcon'
import Logo from './../assets/logo-wrapper.svg'
import styles from './Connect.module.scss'

export const loader = async () => {
  return defer({
    tour: await getTour(),
    isTourSeen: localStorage.getItem('tour'),
  })
}

function Connect({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [activeTour, setActiveTour] = useState(0)
  const navigate = useNavigate()
  const auth = useAuth()

  const chkSliderEnd = (tourIndex) => {
    if (tourIndex === loaderData.tour.length) {
      localStorage.setItem('tour', true)
      navigate('/connect')
      return false
    }
  }

  const handleSlider = (direction) => {
    if (direction !== undefined) {
      if (direction === `next`) {
        chkSliderEnd(activeTour + 1)
        setActiveTour((activeTour) => activeTour + 1)
      } else if (direction === `prev` && activeTour - 1 >= 0) {
        chkSliderEnd(activeTour - 1)
        setActiveTour((activeTour) => activeTour - 1)
      }
    } else {
      chkSliderEnd(activeTour + 1)
      setActiveTour((activeTour) => activeTour + 1)
    }

    console.error(direction, activeTour, loaderData.tour.length)
  }

  useEffect(() => {
    //  if (JSON.parse(loaderData.isTourSeen)) navigate('/')
  }, [])

  if (auth.wallet) return <Navigate to={`/`} replace={true} />
  
    return (
    <section className={`${styles.section} ms-motion-slideDownIn d-flex flex-column align-items-center justify-content-between`}>
      <h2>Welcome back!</h2>

      <figure>
        <img alt={`${import.meta.env.VITE_NAME}`} src={Logo} />
      </figure>

      <div className={`d-flex flex-column`}>
        <button className={``} onClick={() => auth.connectWallet()}>
          Connect wallet
        </button>
        <button className={``} onClick={() => navigate(`/`)}>
          Explorer as a guest
        </button>
        <p>Use your web3 wallet to sign in on Nightly.app</p>
        <p>
          By signing in you accept our <Link to={`/terms`}>Terms</Link> of use and <Link to={`privacy-policy`}>Privacy Policy</Link>.
        </p>
      </div>
    </section>
  )
}

export default Connect
