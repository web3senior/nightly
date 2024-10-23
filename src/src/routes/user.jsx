import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth, contracts, getDefaultChain } from '../contexts/AuthContext'
import { getCategory, getProject, getUser } from '../util/api'
import { Title } from './helper/DocumentTitle'
import Icon from './helper/MaterialIcon'
import Logo from './../../src/assets/logo.svg'
import Web3 from 'web3'
import toast from 'react-hot-toast'
import styles from './User.module.scss'

export default function User({ title }) {
  Title(title)
  const [data, setData] = useState({ user: [] })
  const [backupData, setBackupData] = useState({ user: [] })
  const [category, setCategory] = useState([])
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

  const handleFilter = (categoryItem) => {
    const newData = backupData.project.filter((item) => categoryItem.id === item.category_id)
    setData({ project: newData })
  }

  useEffect(() => {
    getUser().then((res) => {
      console.log(res)
      setData({ user: res })
      setBackupData({ user: res })
    })
  }, [])

  return (
    <section className={styles.section}>
      <div className={`${styles['container']} __container ms-motion-slideUpIn`} data-width={`medium`}>
        <Link to={`/search`} className={`d-flex align-items-center`}>
          <Icon name={`arrow_back_ios`} />
          <h2>{title}</h2>
        </Link>

        {data && data.user && data.user.length > 0 && (
          <div className={`${styles['list']} d-flex flex-column align-items-center justify-content-between`}>
            {data.user.map((item, i) => {
              return (
                <div key={i} className={`card w-100 mt-10`}>
                  <div className={`card__body d-flex flex-row align-items-center justify-content-between`} style={{ columnGap: `1rem` }}>
                    <div className={`d-flex flex-column`}>
                      <figure className={`d-flex`}>
                        <img className={`rounded`} alt={`User-${item.fullname}`} src={`${import.meta.env.VITE_UPLOAD_URL}${item.pfp}`} />
                      </figure>
                      <b>{item.fullname}</b>
                      <small className={``} style={{ color: `var(--black-100)` }}>
                        {item.bio}
                      </small>
                    </div>

                    <Link to={`/user/${item.id}`}>View</Link>
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
