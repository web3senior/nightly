import { Suspense, useState, useEffect, useRef } from 'react'
import { useLoaderData, defer, Form, Await, useRouteError, Link, useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import Icon from './helper/MaterialIcon'
import Shimmer from './helper/Shimmer'
import { getTournamentList } from '../util/api'
import toast, { Toaster } from 'react-hot-toast'
import Heading from './helper/Heading'
import { useAuth, contracts, getDefaultChain } from '../contexts/AuthContext'
import Logo from './../../src/assets/logo.svg'
import Hero from './../../src/assets/hero.png'
import party from 'party-js'
import styles from './Marketplace.module.scss'
import { PinataSDK } from 'pinata'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { SVG as SVGJS } from '@svgdotjs/svg.js'
import '@svgdotjs/svg.select.js'
import '@svgdotjs/svg.resize.js'
import Web3 from 'web3'
const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_API_KEY,
  pinataGateway: 'example-gateway.mypinata.cloud',
})

party.resolvableShapes['logo'] = `<img src="${Logo}" style='width:24px'/>`

let isMouseDown = false
export const loader = async () => {
  return defer({ key: 'val' })
}

function Marketpalce({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([
    {
      name: `GlowUp`,
      description: `Featuring neon-colored laser eyes that can be used to add a futuristic, cyberpunk vibe to any PFP`,
      image: `QmYWVa5sJw6gMtqwA6FD5D2f6wVjeYq6QhepgqG49feaie`,
      price: 2.75,
      attributes: [
        {
          key: 'Background',
          value: `Transparent`,
        },
      ],
    },
    {
      name: `DepthVision`,
      description: `DepthVision`,
      image: `QmPoSqiN6hbAhhLoa1SWCjMJMSQDdztqeoxV4SnFAwxvtd`,
      price: 1,
      attributes: [
        {
          key: 'Background',
          value: `Transparent`,
        },
      ],
    },
    {
      name: `PinkRay`,
      description: `Featuring neon-colored laser eyes that can be used to add a futuristic, cyberpunk vibe to any PFP`,
      image: `QmSdaVP6ht8SKQPyYdaRfjQSrTceYAaqSEp3amnScfHGUC`,
      price: 2.5,
      attributes: [
        {
          key: 'Background',
          value: `Transparent`,
        },
      ],
    },
    {
      name: `NeonEyes`,
      description: `Featuring neon-colored laser eyes that can be used to add a futuristic, cyberpunk vibe to any PFP`,
      image: `QmZBjxGJF2wjscTPhHL66hpTfgSo5SmwobpYrghQYNzQfY`,
      price: 4,
      attributes: [
        {
          key: 'Background',
          value: `Transparent`,
        },
      ],
    },
    {
      name: `Visionary`,
      description: `Featuring neon-colored laser eyes that can be used to add a futuristic, cyberpunk vibe to any PFP`,
      image: `QmPBryHdQS1jTB1VLaAVYamevA1Chhx6D5GpPMpHTngEiv`,
      price: 2.4,
      attributes: [
        {
          key: 'Background',
          value: `Transparent`,
        },
      ],
    },
    {
      name: `NeonEye`,
      description: `Featuring neon-colored laser eyes that can be used to add a futuristic, cyberpunk vibe to any PFP`,
      image: `QmPuq3sNmtgHDh5mqMpu8J1o3jf7iZWSk2k63KSL4oRsWq`,
      price: 4,
      attributes: [
        {
          key: 'Background',
          value: `Transparent`,
        },
      ],
    },
    {
      name: `NeonLaserLine`,
      description: `Featuring neon-colored laser eyes that can be used to add a futuristic, cyberpunk vibe to any PFP`,
      image: `QmXjzZhXgVrDBup8q1tyHRxfbSfjHcize8tWj4wjwZKBZf`,
      price: 1,
      attributes: [
        {
          key: 'Background',
          value: `Transparent`,
        },
      ],
    },
    {
      name: `CheeksBlushPink `,
      description: `CheeksBlushPink`,
      image: `QmVgFfCgdWs2LxwsozghSNcUM6b9hsqSdF98ALAjvbGPPA`,
      price: 1,
      attributes: [
        {
          key: 'Background',
          value: `Transparent`,
        },
      ],
    },
    {
      name: `PixelGlasses`,
      description: `PixelGlasses`,
      image: `QmUhozsMGzWpVrj3PCn2whRbkRTXGmwEqqnLaibx9hVWe7`,
      price: 2,
      attributes: [
        {
          key: 'Background',
          value: `Transparent`,
        },
      ],
    },
    //     {
    //   name: `BluePixelGlasses`,
    //   description: `Blue Pixel Glasses NFT`,
    //   image: `QmS26JSBn2sExePCHJnwKU4XprTJWBBtk8p1jw5JdK33A7`,
    //   price: 2,
    //   attributes: [
    //     {
    //       key: 'Background',
    //       value: `Transparent`,
    //     },
    //   ],
    // },
  ])
  const [color, setColor] = useState(``)
  const auth = useAuth()
  const SVG = useRef()
  const navigate = useNavigate()
  const txtSearchRef = useRef()
  const recordTypeRef = useRef()
  const [selectedFile, setSelectedFile] = useState()
  const [stage1Token, setStage1Token] = useState([])
  const [layer, setLayer] = useState({ layers: [] })
  let selectedElement, offset

  const handleSearch = async () => {
    if (txtSearchRef.current.value.length < 3) {
      toast.error(`A name must be a minimum of 3 characters long.`)
      return
    }

    const t = toast.loading(`Searching`)

    contract.methods
      .toNodehash(txtSearchRef.current.value, selectedRecordType)
      .call()
      .then(async (res) => {
        console.log(res)
        await contract.methods
          ._freeToRegister(res)
          .call()
          .then((res) => {
            console.log(res)
            setFreeToRegister(!res)
            toast.dismiss(t)
          })
      })
  }

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

  const getMintPrice = async () => {
    const web3 = new Web3(getDefaultChain() === `LUKSO` ? window.lukso : window.ethereum)
    const contract = new web3.eth.Contract(contracts[0].abi, contracts[0].contract_address)
    return await contract.methods.fee(`mint_price`).call()
  }

  const rAsset = async (imageURL) => {
    const assetBuffer = await fetch(imageURL).then(async (response) => {
      return response.arrayBuffer().then((buffer) => new Uint8Array(buffer))
    })

    return assetBuffer
  }

  const changeHandler = (e) => {
    setSelectedFile(event.target.files[0])
  }

  const tokenURI = async () => {
    if (selectedFile) {
      try {
        const t = toast.loading(`Uploading to IPFS`)
        const upload = await pinata.upload.file(selectedFile)
        console.log(upload)
        toast.dismiss(t)
        return upload.IpfsHash
      } catch (error) {
        console.log(error)
      }
    } else {
      document.querySelectorAll(`.${styles['board']} rect`).forEach((item) => {
        let modified = item.getAttribute(`modified`)
        if (!modified) {
          // item.remove()
          item.style.fill = `transparent`
        }
      })

      const htmlStr = document.querySelector(`.${styles['board']} svg`).outerHTML
      const blob = new Blob([htmlStr], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)

      try {
        const t = toast.loading(`Uploading to IPFS`)
        const file = new File([blob], 'test.svg', { type: blob.type })
        const upload = await pinata.upload.file(file)
        console.log(upload)
        toast.dismiss(t)
        return upload.IpfsHash
      } catch (error) {
        console.log(error)
      }
    }
    //  })
    // const svg = `${document.querySelector(`#artboardSVG`).outerHTML}`;
    // console.log(svg)
    // return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)))
  }

  const mint = async (item) => {
    if (!auth.wallet) {
      auth.connectWallet()
      return
    }

    const web3 = new Web3(getDefaultChain() === `LUKSO` ? window.lukso : window.ethereum)
    const t = toast.loading(`Waiting for transaction's confirmation`)
    try {
      let rawMetadata

      if (auth.defaultChain === 'LUKSO') {
        const tConvert = toast.loading(`Generating metadata...please wait`)
        rAsset(`${import.meta.env.VITE_IPFS_GATEWAY}${item.image}`).then((result) => {
          toast.dismiss(tConvert)
          // console.log(result)
          // console.log(`Verifiable URL`, web3.utils.keccak256(result))
          rawMetadata = web3.utils.toHex({
            LSP4Metadata: {
              name: item.name,
              description: `${item.description}`,
              links: [
                { title: 'Website', url: 'https://masterpix.art/' },
                { title: 'Mint', url: 'https://masterpix.art/' },
                { title: '𝕏', url: 'https://x.com/ArattaLabsDev' },
                { title: 'Telegram', url: 'https://t.me/arattalabs' },
              ],
              attributes: item.attributes,
              icon: [{ width: 500, height: 500, url: 'ipfs://QmWpSVntG9Mmk9CHczf9ZACKDTuQMVUedEDcCdwwbqBs9b', verification: { method: 'keccak256(bytes)', data: '0xe303725c7fa6e0c8741376085a3859d858eb4d188afa6402bb39d34f40e5ed3f' } }],
              backgroundImage: [
                {
                  width: 1601,
                  height: 401,
                  url: 'ipfs://QmcTYAQmt7ZPbzR6w3XXzGwgfEu4zU2T4LLukqLBvJg2Eg',
                  verification: {
                    method: 'keccak256(bytes)',
                    data: '0x0fd8498ada7a39b1eb9f6ed54adc8950a84d5d79ad8418eb46fbcaf6a5c9638b',
                  },
                },
              ],
              assets: [],
              images: [[{ width: 500, height: 500, url: `ipfs://${item.image}`, verification: { method: 'keccak256(bytes)', data: web3.utils.keccak256(result) } }]],
            },
          })
          // mint
          const contract = new web3.eth.Contract(contracts[0].abi, contracts[0].contract_address)
          contract.methods
            .mint(rawMetadata, 1)
            .send({
              from: auth.wallet,
              value: web3.utils.toWei(item.price, `ether`),
            })
            .then((res) => {
              console.log(res) //res.events.tokenId

              // Run partyjs
              party.confetti(document.querySelector(`header`), {
                count: party.variation.range(20, 40),
                shapes: ['logo'],
              })

              toast.success(`Transaction has been confirmed! Check out your NFTs`)
              toast.dismiss(t)
            })
            .catch((error) => {
              console.log(error)
              toast.dismiss(t)
            })
        })
      } else if (auth.defaultChain === 'Arbitrum') {
        console.log(`on ARB`)
        const json = { name: item.name, description: item.description, image: `https://ipfs.io/ipfs/${item.image}`, version: '1' }
        rawMetadata = 'data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(json))))

        // mint
        console.log(contracts[1].contract_address)
        const contract = new web3.eth.Contract(contracts[1].abi, contracts[1].contract_address)
        contract.methods
          .mint(rawMetadata, 1)
          .send({
            from: auth.wallet,
            value: web3.utils.toWei(0, `ether`),
          })
          .then((res) => {
            console.log(res) //res.events.tokenId

            // Run partyjs
            party.confetti(document.querySelector(`header`), {
              count: party.variation.range(20, 40),
              shapes: ['logo'],
            })

            toast.success(`Transaction has been confirmed! Check out your NFTs`)
            toast.dismiss(t)
          })
          .catch((error) => {
            console.log(error)
            toast.dismiss(t)
          })
      }
    } catch (error) {
      console.log(error)
      toast.dismiss(t)
    }
  }

  const fetchData = async (dataURL) => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow',
    }
    const response = await fetch(`${dataURL}`, requestOptions)
    if (!response.ok) throw new Response('Failed to get data', { status: 500 })
    return response.json()
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

  useEffect(() => {
    // getMintPrice().then((res) => console.log(res))
    // Restore prev draw
    // const innerSVG = document.querySelector(`.${styles['board']} svg`).innerHTML
    // if (localStorage.getItem(`draw`)) {
    //   setArtboard({x:})
    // }
  }, [])

  return (
    <section className={`${styles.section} ms-motion-slideDownIn`}>
      <div className={`__container`} data-width={`large`}>
        <div className={`grid grid--fill mt-10`} style={{ '--data-width': '300px', gap: `1rem`, alignItems: `flex-start` }}>
          {data &&
            data.length > 0 &&
            data.map((item, i) => (
              <div key={i} className={`card`}>
                <div className={`card__body`}>
                  <figure className={`d-f-c flex-column`}>
                    <img alt={item.name} src={`${import.meta.env.VITE_IPFS_GATEWAY}${item.image}`} />
                  </figure>

                  <h3>{item.name}</h3>

                  <p>
                    <span style={{ color: `#869AAE` }}>{item.price > 0 ? `${item.price} $LYX` : `Free`}</span>
                  </p>

                  <div>
                    {item.attributes?.length > 0 && (
                      <ul className={`mt-10 d-flex flex-column`} style={{ gap: `.25rem` }}>
                        {item.attributes.map((item, i) => (
                          <li key={i} className={`border border--light pl-10`}>
                            <b>{item.key}: </b>
                            {item.value}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <button className={`${styles['mint']} mt-20`} onClick={() => mint(item)}>
                    Mint
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default Marketpalce
