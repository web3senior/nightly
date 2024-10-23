import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth, contracts, getDefaultChain } from '../contexts/AuthContext'
import { getCategory, getProject } from '../util/api'
import { Title } from './helper/DocumentTitle'
import Icon from './helper/MaterialIcon'
import Logo from './../../src/assets/logo.svg'
import Web3 from 'web3'
import toast from 'react-hot-toast'
import styles from './Project.module.scss'

export default function Owned({ title }) {
  Title(title)
  const [data, setData] = useState({ project: [] })
  const [backupData, setBackupData] = useState({ project: [] })
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
    getProject().then((res) => {
      console.log(res)
      setData({ project: res })
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
        <Link to={`/search`} className={`d-flex align-items-center`}>
          <Icon name={`arrow_back_ios`} />
          <h2>{title}</h2>
        </Link>

        {category && category.length > 0 && (
          <div className={`${styles['category']} d-flex flex-row align-items-start justify-content-start`}>
            <ul>
              {category.map((item, i) => {
                return (
                  <li key={i} className={`d-f-c`} onClick={() => handleFilter(item)}>
                    <div dangerouslySetInnerHTML={{ __html: item.icon }} />
                    <b>{item.name}</b>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {data && data.project && data.project.length > 0 && (
          <div className={`${styles['datalist']}`}>
            {data.project.map((item, i) => {
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
    </section>
  )
}
