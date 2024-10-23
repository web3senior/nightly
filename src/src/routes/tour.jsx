import { useState, Suspense, useEffect } from 'react'
import { defer, Await, useNavigate, useLoaderData } from 'react-router-dom'
import { getTour } from '../util/api'
import { Title } from './helper/DocumentTitle'
import Shimmer from './helper/Shimmer'
import Icon from './helper/MaterialIcon'
import styles from './Tour.module.scss'

export const loader = async () => {
  return defer({
    tour: await getTour(),
    isTourSeen: localStorage.getItem('tour'),
  })
}

function Tour({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [activeTour, setActiveTour] = useState(0)
  const navigate = useNavigate()

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
      }
      else if (direction === `prev` && activeTour - 1 >= 0) {
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
    if (JSON.parse(loaderData.isTourSeen)) navigate('/connect')
  }, [])

  return (
    <section className={`${styles.section}  ms-motion-slideDownIn`}>
      <div className={`${styles.slider} ${styles.prev}`} onClick={() => handleSlider(`prev`)} />
      <div className={`${styles.slider} ${styles.next}`} onClick={() => handleSlider(`next`)} />
      <Suspense fallback={<TourShimmer />}>
        <Await
          resolve={loaderData.tour}
          errorElement={<div>Could not load data 😬</div>}
          children={(data) => (
            <>
              {data
                .filter((item, i) => i == activeTour)
                .map((item, i) => (
                  <ul className={`d-flex flex-column align-items-center justify-content-between animate__animated animate__fadeIn`} key={i}>
                    <li className={`w-100 d-f-c flex-column`}>
                      <div className={`${styles.pagination}`}>
                        {data.map((item, i) => (
                          <button key={i} className={`${activeTour == i ? styles.active : ''}`} onClick={() => handleSlider(i)}></button>
                        ))}
                      </div>

                      <h4>{item.title}</h4>
                    </li>

                    <li className={`w-100 d-f-c flex-column`}>
                      <figure>
                        <img alt={`Tour-${item.title}`} src={`${import.meta.env.VITE_UPLOAD_URL}${item.icon}`} />
                      </figure>
                    </li>

                    <li className={`w-100 d-f-c flex-column`}>
                      <p>{item.description}</p>

                      <button className={``} onClick={() => handleSlider()}>
                        {item.next}
                      </button>
                    </li>
                  </ul>
                ))}
            </>
          )}
        />
      </Suspense>
    </section>
  )
}

const TourShimmer = () => {
  return (
    <Shimmer>
      <ul className={styles.shimmer}>
        <li></li>
        <li></li>
      </ul>
    </Shimmer>
  )
}

export default Tour
