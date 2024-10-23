import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth, contracts, getDefaultChain } from '../contexts/AuthContext'
import { getCategory, getProject, getUser, getUserProject } from '../util/api'
import { Title } from './helper/DocumentTitle'
import Icon from './helper/MaterialIcon'
import Logo from './../../src/assets/logo.svg'
import Web3 from 'web3'
import toast from 'react-hot-toast'
import styles from './UserDetail.module.scss'

export default function Owned({ title }) {
  Title(title)
  const [data, setData] = useState({ project: [] })
  const [user, setUser] = useState({ user: [] })
  const [project, setProject] = useState({ project: [] })
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
    getUser(params.id).then((res) => {
      console.log(res)
      setUser({ user: res })
      setBackupData({ user: res })
    })

    getUserProject(params.id).then((res) => {
      console.log(res)
      setProject({ project: res })
      setBackupData({ project: res })
    })

    
    getCategory().then((res) => {
      console.log(res)
      setCategory(res)
    })
  }, [])

  return (
    <section className={styles.section}>
      <div className={`${styles['container']} __container ms-motion-slideUpIn`} data-width={`medium`}>
        {user && user.user && user.user.length > 0 && (
          <>
            <div className={`${styles['list']} d-flex flex-column align-items-center justify-content-between`}>
              <div className={`card w-100 mt-10`}>
                <div className={`card__body d-flex flex-column align-items-center justify-content-between`} style={{ columnGap: `1rem` }}>
                  <figure className={`d-flex`}>
                    <img className={`rounded`} alt={`User-${user.user[0].fullname}`} src={`${import.meta.env.VITE_UPLOAD_URL}${user.user[0].pfp}`} />
                  </figure>

                  <b>{user.user[0].fullname}</b>

                  <small className={``} style={{ color: `var(--black-100)` }}>
                    {user.user[0].bio}
                  </small>

                  <ul className={`${styles.action} d-flex`}>
                  <li><b>2</b>&nbsp;projects</li>
                  <li><b>2</b>&nbsp;followers</li>
                  <li><b>2</b>&nbsp;following</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        <div className={`mt-20`}>
        <b>Projects</b>

        {project && project.project && project.project.length > 0 && (
          <div className={`${styles['datalist']}`}>
            {project.project.map((item, i) => {
              return (
                <div key={i} className={`card mt-10`}>
                  <div className={`card__body d-flex flex-row align-items-center justify-content-between`}>
                    <ul className={`d-flex flex-column`}>
                      <li>
                        <b>{item.title}</b>
                      </li>
                      <li className={``} style={{ color: `var(--black-100)` }}>
                        {item.lead}
                      </li>
                      {category && category.length > 0 && (
                        <li>
                          <span className={`badge badge-pill badge-warning`}>{category.filter((filteredItem, i) => filteredItem.id === item.category_id)[0].name}</span>
                        </li>
                      )}
                    </ul>

                    <Link to={`/project/${item.id}`}>View</Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        </div>
      </div>
    </section>
  )
}
