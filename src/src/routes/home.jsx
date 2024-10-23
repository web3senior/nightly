import { Suspense, useState, useEffect, useRef, createElement } from 'react'
import { useLoaderData, defer, Form, Await, useRouteError, Link, useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import Icon from './helper/MaterialIcon'
import Shimmer from './helper/Shimmer'
import { getCategory, getProject, getUser } from './../util/api'
import toast, { Toaster } from 'react-hot-toast'
import Heading from './helper/Heading'
import { useAuth, contracts, getDefaultChain } from './../contexts/AuthContext'
import Logo from './../../src/assets/logo.svg'
import Sticker1 from './../../src/assets/sticker1.png'
import styles from './Home.module.scss'
import Web3 from 'web3'
import Loading from './components/Loading'

let isMouseDown = false
export const loader = async () => {
  return defer({ isTourSeen: localStorage.getItem('tour') })
}

function Home({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({ project: [] })
  const [user, setUser] = useState({ data: [] })
  const [category, setCategory] = useState([])
  const [color, setColor] = useState(``)
  const [tapCounter, setTapCounter] = useState(0)
  const [description, setDescription] = useState(``)
  const [count, setCount] = useState(1)
  const [selectedFile, setSelectedFile] = useState()
  const [stage1Token, setStage1Token] = useState([])
  const [layer, setLayer] = useState({ layers: [] })
  const auth = useAuth()
  const SVG = useRef()
  const navigate = useNavigate()
  const txtSearchRef = useRef()
  const SVGpreview = useRef()
  let selectedElement, offset
  const [isPageLoading, setIsPageLoading] = useState(true)

  const fetchIPFS = async (CID) => {
    try {
      const response = await fetch(`https://api.universalprofile.cloud/ipfs/${CID}`)
      if (!response.ok) throw new Response('Failed to get data', { status: 500 })
      const json = await response.json()
      // console.log(json)
      return json
    } catch (error) {
      console.error(error)
    }

    return false
  }

  const getDataForTokenId = async (tokenId) => {
    const web3 = new Web3(getDefaultChain() === `LUKSO` ? window.lukso : window.ethereum)
    const contract = new web3.eth.Contract(contracts[0].abi, contracts[0].contract_address)
    return await contract.methods.getDataForTokenId(`${tokenId}`, '0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e').call()
  }

  const getTokenIds = async (addr) => {
    const web3 = new Web3(getDefaultChain() === `LUKSO` ? window.lukso : window.ethereum)
    const contract = new web3.eth.Contract(contracts[0].abi, contracts[0].contract_address)
    return await contract.methods.tokenIdsOf(addr).call()
  }

  const handleTap = (e) => {
    setTapCounter((oldVal) => oldVal + 1)
    const parent = document.querySelector(`#tap`)
    const drop = document.createElement('span')
    console.log(parent.getBoundingClientRect())
    drop.classList.add(`${styles.drop}`)
    console.log(e.clientX, e.clientY)
    drop.style.left = `${e.clientX - parent.getBoundingClientRect()['left']}px`
    drop.style.top = `${e.clientY - parent.getBoundingClientRect()['top']}px`
    parent.appendChild(drop)
    if ('vibrate' in navigator) navigator.vibrate(200)

    setTimeout(() => {
      drop.remove()
    }, 2500)
  }

  useEffect(() => {
    if (!JSON.parse(loaderData.isTourSeen)) navigate('/tour')

    getProject().then((res) => {
      console.log(res)
      setData({ project: res })
      setBackupData({ project: res })
    })

    getUser().then((res) => {
      console.log(res)
      setUser({ data: res })
    })

    getCategory().then((res) => {
      console.log(res)
      setCategory(res)
    })

    // Generate unique ID for the current device
    localStorage.setItem(`UUID`, crypto.randomUUID())
    setTimeout(() => {
      setIsPageLoading(false)
    }, 1000)
  }, [])

  return (
    <section className={`${styles.section} ms-motion-slideDownIn`}>
      <div className={`${styles.section__container} __container d-flex flex-column align-items-center justify-content-center`} data-width={`medium`}>
        <h2 className={`${styles.slogan}`}> Discover, connect, and build</h2>
        <h2 className={`${styles.hero}`}>Your Web3 project</h2>

        <button onClick={() => navigate(`search`)}>Start your search</button>

        <div className={`d-flex align-items-center justify-content-between w-100`}>
          <h2>Featured experts</h2>
          <Link to={``}>View all</Link>
        </div>

        {data && user.data && user.data.length > 0 && (
          <div className={`${styles['user']} d-flex flex-column align-items-center justify-content-between w-100 mt-10`}>
            <ul>
              {user.data
                .filter((item, i) => i < 5)
                .map((item, i) => {
                  return (
                    <li>
                      <div key={i} className={`card w-100`}>
                        <div className={`card__body d-flex flex-column align-items-center justify-content-between`} style={{ columnGap: `1rem` }}>
                          <figure className={`d-f-c`}>
                            <img alt={`Tour-${item.title}`} src={`${import.meta.env.VITE_UPLOAD_URL}${item.pfp}`} />
                          </figure>

                          <div className={`d-flex flex-row align-items-center justify-content-between w-100`}>
                            <div className={`d-flex flex-column align-items-start`}>
                              <small>Name</small>
                              <b className={`d-flex flex-row align-items-center`}>
                                {item.fullname} &nbsp;
                                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M12.4725 6.00377C12.4611 5.59125 12.3358 5.18959 12.1102 4.84413C11.8852 4.4993 11.5686 4.22344 11.1962 4.04847C11.3379 3.66086 11.3678 3.24132 11.2852 2.8371C11.2019 2.43225 11.0074 2.05932 10.7245 1.75984C10.4258 1.47567 10.0552 1.28091 9.65223 1.19662C9.24988 1.1136 8.83228 1.14362 8.44645 1.28602C8.27293 0.911176 7.99897 0.59253 7.6551 0.366476C7.31123 0.140423 6.91142 0.013986 6.50017 0.00376892C6.08955 0.0146246 5.69102 0.139784 5.34778 0.366476C5.00454 0.593169 4.73186 0.911815 4.5596 1.28602C4.17314 1.14362 3.75427 1.11233 3.35064 1.19662C2.94702 1.27963 2.57518 1.47503 2.27644 1.75984C1.99358 2.05996 1.80035 2.43353 1.71836 2.83774C1.63573 3.24196 1.66751 3.6615 1.80989 4.04847C1.43678 4.22344 1.11896 4.49866 0.892681 4.84349C0.666398 5.18832 0.539909 5.59061 0.527832 6.00377C0.540545 6.41692 0.666398 6.81858 0.892681 7.16405C1.11896 7.50888 1.43678 7.78474 1.80989 7.95907C1.66751 8.34604 1.63573 8.76558 1.71836 9.1698C1.80099 9.57465 1.99358 9.94757 2.2758 10.2477C2.57455 10.5306 2.94575 10.7247 3.3481 10.8084C3.75045 10.8927 4.16806 10.862 4.55388 10.7215C4.72804 11.0957 5.002 11.4137 5.34587 11.6404C5.68911 11.8665 6.08955 11.9923 6.50017 12.0038C6.91142 11.9936 7.31123 11.8678 7.6551 11.6417C7.99897 11.4156 8.27293 11.0964 8.44645 10.7222C8.83037 10.8748 9.25116 10.9112 9.65605 10.8269C10.0603 10.7426 10.4315 10.5414 10.7239 10.2477C11.0163 9.95396 11.2171 9.58104 11.301 9.17427C11.3849 8.7675 11.3487 8.34477 11.1962 7.95907C11.5686 7.7841 11.8852 7.50888 12.1108 7.16341C12.3358 6.81858 12.4611 6.41628 12.4725 6.00377ZM5.6497 8.46226L3.47014 6.27325L4.29201 5.44183L5.60902 6.76494L8.40577 3.70364L9.26196 4.4993L5.6497 8.46226Z"
                                    fill="#189EFF"
                                  />
                                  <path d="M5.6497 8.46226L3.47014 6.27325L4.29201 5.44183L5.60902 6.76494L8.40577 3.70364L9.26196 4.4993L5.6497 8.46226Z" fill="white" />
                                </svg>
                              </b>
                            </div>
                            <div className={`d-flex flex-column align-items-end`}>
                              <small>Projects</small>
                              <b>{10}</b>
                            </div>
                          </div>

                          <button onClick={() => toast(`Coming soon`)}>Follow</button>
                        </div>
                      </div>
                    </li>
                  )
                })}
            </ul>
          </div>
        )}

        <div className={`d-flex align-items-center justify-content-between w-100 mt-30`}>
          <h2>Top projects </h2>
          <Link to={`project`}>View all</Link>
        </div>

        {data && data.project && data.project.length > 0 && (
          <div className={`${styles['list']} d-flex flex-column align-items-center justify-content-between w-100`}>
            {data.project
              .filter((item, i) => i < 5)
              .map((item, i) => {
                return (
                  <div key={i} className={`card w-100 mt-10`}>
                    <div className={`card__body d-flex flex-row align-items-center justify-content-between`} style={{ columnGap: `1rem` }}>
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

export default Home
