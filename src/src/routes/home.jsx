import { Suspense, useState, useEffect, useRef, createElement } from 'react'
import { useLoaderData, defer, Form, Await, useRouteError, Link, useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import Icon from './helper/MaterialIcon'
import Shimmer from './helper/Shimmer'
import { getTournamentList } from './../util/api'
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
  const [showArtboard, setShowArtboard] = useState(false)
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

    // Generate unique ID for the current device
    localStorage.setItem(`UUID`, crypto.randomUUID())
    setTimeout(() => {
      setIsPageLoading(false)
    }, 1000)
  }, [])

  return (
    <section className={`${styles.section} ms-motion-slideDownIn`}>
      <div className={`${styles.section__container} __container d-flex flex-column align-items-center justify-content-center`} data-width={`xxxlarge`}>
        <h2> Discover, connect, and build</h2>
        <h1>Your Web3 project</h1>

        <button onClick={()=>navigate(`search`)}>Start your search</button>

        <div className={`d-flex align-items-center justify-content-between w-100`}>
          <h2>Featured experts</h2>
          <Link to={``}>View all</Link>
        </div>

        <div className={`d-flex align-items-center justify-content-between w-100`}>
          <h2>Top projects </h2>
          <Link to={``}>View all</Link>
        </div>
      </div>
    </section>
  )
}

export default Home
