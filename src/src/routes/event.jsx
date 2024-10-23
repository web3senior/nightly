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
      <div className={`${styles['container']} __container ms-motion-slideUpIn`} data-width={`large`}>
        <Link to={`/search`} className={`${styles.pageTitle} d-flex align-items-center`}>
          <Icon name={`arrow_back_ios`} />
          <span>{title}</span>
        </Link>

        {data && data.event && data.event.length > 0 && (
          <div className={`${styles['datalist']} grid grid--fit`} style={{ '--data-width': `400px`, gap: `1rem` }}>
            {data.event.map((item, i) => {
              console.log(item)
              return (
                <div key={i} className={`${styles['datalist__item']} card w-100 mt-10`}>
                  <div className={`card__body d-flex flex-row align-items-start justify-content-start`} style={{ columnGap: `2rem` }}>
                    <figure className={`ms-depth-4`}>
                      <img alt={`Tour-${item.title}`} src={`${import.meta.env.VITE_UPLOAD_URL}${item.logo}`} />
                    </figure>

                    <div className={`d-flex flex-column align-items-start justify-content-start flex-1`}>
                      <h3>{item.title}</h3>

                      <p className={`text-balance`} style={{ color: `var(--black-200)` }}>
                        {item.lead}
                      </p>

                      <ul className={`mt-20`}>
                        <li>
                          <b>
                            📅 {item.start} - {item.end}
                          </b>
                        </li>
                        <li>
                          <b className={`text-capitalize`}>📌 {item.type}</b>
                        </li>
                        <li>
                          <b>🏆 {item.prize}</b>
                        </li>
                      </ul>

                      <a href={item.event_link} className={`mt-30 d-flex align-items-center`} target={`_blank`}>
                        View
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
