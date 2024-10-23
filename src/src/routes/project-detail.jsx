import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth, contracts, getDefaultChain } from '../contexts/AuthContext'
import { getCategory, getProject } from '../util/api'
import { Title } from './helper/DocumentTitle'
import Icon from './helper/MaterialIcon'
import Logo from './../../src/assets/logo.svg'
import GitHubIcon from './../../src/assets/icon-github.svg'
import Web3 from 'web3'
import toast from 'react-hot-toast'
import styles from './ProjectDetail.module.scss'

export default function Owned({ title }) {
  Title(title)
  const [data, setData] = useState({ project: [] })
  const [backupData, setBackupData] = useState({ project: [] })
  const [category, setCategory] = useState([])
  const [taotlRecordType, setTotalRecordType] = useState(0)
  const [totalResolve, setTotalResolve] = useState(0)
  const auth = useAuth()
  const params = useParams()

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

  const handleLike = () => {}

  const handleSave = () => {}

  useEffect(() => {
    getProject(params.id).then((res) => {
      console.log(res)
      setData({ project: res })
      setBackupData({ project: res })
    })
  }, [])

  return (
    <section className={styles.section}>
      <div className={`${styles['container']} __container ms-motion-slideUpIn`} data-width={`medium`}>
        {data && data.project && data.project.length > 0 && (
          <>
            <Link to={`/search`} className={`${styles.pageTitle} w-100 d-flex align-items-center`}>
              <Icon name={`arrow_back_ios`} />
              <h2>{data.project[0].title}</h2>
            </Link>

            <div className={`${styles['list']} d-flex flex-column align-items-center justify-content-between`}>
              <div className={`card w-100 mt-10`}>
                <div className={`card__body d-flex flex-column align-items-start justify-content-between`} style={{ columnGap: `1rem` }}>
                  <p>{data.project[0].description}</p>

                  <ul className={`${styles.action} d-flex`}>
                    <li>
                      <button className={`d-f-c rounded`} onClick={() => handleLike()}>
                        <Icon name={`favorite`} />
                        Like
                      </button>
                    </li>
                    <li>
                      <button className={`d-f-c rounded`} onClick={() => handleSave()}>
                        <Icon name={`bookmark`} />
                        Save
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {data.project[0].repo && (
              <>
                <div className={`card ${styles['repo']} mt-10`}>
                  <div className={`card__body animate fade`}>
                    <div className={`d-flex flex-row align-items-center justify-content-start`}>
                      <img src={GitHubIcon} />
                      <a href={`${data.project[0].repo}`} target={`_blank`}>
                        <span className={`badge badge-dark badge-pill ml-10`}>{data.project[0].repo}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  )
}
