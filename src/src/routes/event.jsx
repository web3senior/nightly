import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth, contracts, getDefaultChain } from '../contexts/AuthContext'
import { getEvent } from '../util/api'
import { Title } from './helper/DocumentTitle'
import Icon from './helper/MaterialIcon'
import Logo from './../../src/assets/logo.svg'
import Web3 from 'web3'
import styles from './Event.module.scss'
import toast from 'react-hot-toast'

export default function Owned({ title }) {
  Title(title)
  const [data, setData] = useState({ event: [] })
  const [taotlRecordType, setTotalRecordType] = useState(0)
  const [totalResolve, setTotalResolve] = useState(0)
  const auth = useAuth()

  const handleCopy = async () => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}?representative=${localStorage.getItem(`UUID`)}`).then(
      function () {
        toast.success(`The invite link has been successfully copied.`)
      },
      function (err) {
        toast.success(`${err}`)
      }
    )
  }

  useEffect(() => {
    getEvent().then((res) => {
      console.log(res)
      setData({ event: res })
    })
  }, [])

  return (
    <section className={styles.section}>
      <div className={`${styles['container']} __container ms-motion-slideUpIn`} data-width={`medium`}>
        <Link to={`/search`} className={`d-flex align-items-center`}>
          <Icon name={`arrow_back_ios`} />
          <h2>{title}</h2>
        </Link>

        {data && data.event && data.event.length > 0 && (
          <div className={`${styles['list']} d-flex flex-column align-items-center justify-content-between`}>
            {data.event.map((item, i) => {
              console.log(item)
              return (
                <div key={i} className={`card w-100 mt-10`}>
                  <div className={`card__body d-flex flex-row align-items-start justify-content-start`} style={{ columnGap: `1rem` }}>
                    <figure className={`d-flex`}>
                      <img alt={`Tour-${item.title}`} src={`${import.meta.env.VITE_UPLOAD_URL}${item.logo}`} />
                    </figure>

                    <div className={`${styles.logo} d-flex flex-column align-items-start justify-content-start`}>
                      <b>{item.title}</b>
                      <small className={``} style={{ color: `var(--black-100)` }}>
                        {item.lead}
                      </small>
                      <ul className={`mt-10`}>
                        <li>
                          <span>
                            📅 {item.start} - {item.end}
                          </span>
                        </li>
                        <li>
                          <span>📌 {item.type}</span>
                        </li>
                        <li>
                          <span>🏆 {item.prize}</span>
                        </li>
                      </ul>

                      <a href={item.event_link} className={`mt-30 d-flex`} target={`_blank`}>
                        View full info
                          <Icon name={`open_in_new`} />
                        </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
