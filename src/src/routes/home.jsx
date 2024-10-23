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
          <div className={`${styles['user']} d-flex flex-column align-items-center justify-content-between w-100`}>
     <ul>
     {user.data
              .filter((item, i) => i < 5)
              .map((item, i) => {
                return (
             <li className={`ms-depth-16`}>
                   <div key={i} className={`card w-100 mt-10`}>
                    <div className={`card__body d-flex flex-column align-items-center justify-content-between`} style={{ columnGap: `1rem` }}>
                      <figure className={`d-flex`}>
                        <img alt={`Tour-${item.title}`} src={`${import.meta.env.VITE_UPLOAD_URL}${item.pfp}`} />
                      </figure>

                      <div className={`d-flex flex-row align-items-center justify-content-between w-100`}>
                        <div className={`d-flex flex-column align-items-start`}>
                          <small>Name</small>
                          <b className={`d-flex flex-row align-items-center`}>
                            {item.fullname} &nbsp;
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M16.9148 8.625C16.8995 8.07498 16.7325 7.53943 16.4317 7.07881C16.1317 6.61904 15.7096 6.25122 15.213 6.01793C15.402 5.50112 15.4418 4.94173 15.3316 4.40278C15.2206 3.86297 14.9613 3.36574 14.5841 2.96642C14.1858 2.58754 13.6917 2.32785 13.1544 2.21546C12.6179 2.10478 12.0611 2.1448 11.5467 2.33466C11.3153 1.83488 10.95 1.41001 10.4915 1.10861C10.0331 0.807205 9.49997 0.638623 8.95164 0.625C8.40416 0.639474 7.87277 0.806354 7.41512 1.10861C6.95747 1.41087 6.59389 1.83573 6.36422 2.33466C5.84894 2.1448 5.29044 2.10308 4.75228 2.21546C4.21411 2.32615 3.71832 2.58669 3.32 2.96642C2.94286 3.36659 2.68522 3.86468 2.57589 4.40363C2.46572 4.94258 2.50809 5.50197 2.69793 6.01793C2.20045 6.25122 1.7767 6.61819 1.47499 7.07796C1.17328 7.53773 1.00463 8.07413 0.988525 8.625C1.00548 9.17587 1.17328 9.71142 1.47499 10.172C1.7767 10.6318 2.20045 10.9996 2.69793 11.2321C2.50809 11.748 2.46572 12.3074 2.57589 12.8464C2.68607 13.3862 2.94286 13.8834 3.31915 14.2836C3.71748 14.6608 4.21242 14.9196 4.74889 15.0311C5.28535 15.1435 5.84216 15.1026 6.35659 14.9153C6.58881 15.4143 6.95408 15.8383 7.41258 16.1405C7.87023 16.4419 8.40416 16.6097 8.95164 16.625C9.49997 16.6114 10.0331 16.4436 10.4915 16.1422C10.95 15.8408 11.3153 15.4151 11.5467 14.9162C12.0586 15.1197 12.6196 15.1682 13.1595 15.0558C13.6985 14.9434 14.1934 14.6752 14.5833 14.2836C14.9731 13.8919 15.2409 13.3947 15.3528 12.8523C15.4647 12.31 15.4164 11.7463 15.213 11.2321C15.7096 10.9988 16.1317 10.6318 16.4325 10.1712C16.7325 9.71142 16.8995 9.17502 16.9148 8.625ZM7.81768 11.903L4.91161 8.9843L6.00742 7.87574L7.76344 9.6399L11.4924 5.55816L12.634 6.61904L7.81768 11.903Z"
                                fill="#189EFF"
                              />
                              <path d="M7.81768 11.903L4.91161 8.9843L6.00742 7.87574L7.76344 9.6399L11.4924 5.55816L12.634 6.61904L7.81768 11.903Z" fill="white" />
                            </svg>
                          </b>
                        </div>
                        <div className={`d-flex flex-column align-items-end`}>
                          <small>Projects</small>
                          <b>{10}</b>
                        </div>
                      </div>

                      <button>Follow</button>
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
                      <div className={`d-flex flex-column`}>
                        <b>{item.title}</b>
                        <small className={``} style={{ color: `var(--black-100)` }}>
                          {item.lead}
                        </small>
                      </div>

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
