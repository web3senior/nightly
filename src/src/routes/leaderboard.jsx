import { useState, useEffect } from 'react'
import { useLoaderData, defer, Form, Await, useRouteError, Link, useNavigate } from 'react-router-dom'
import { useAuth, contracts, getDefaultChain } from '../contexts/AuthContext'
import { getPoint } from './../util/api'
import { Title } from './helper/DocumentTitle'
import Icon from './helper/MaterialIcon'
import Logo from './../../src/assets/logo.svg'
import Web3 from 'web3'
import styles from './Leaderboard.module.scss'
import Loading from './components/Loading'
export default function Owned({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [data, setData] = useState({ point: [] })
  const [taotlRecordType, setTotalRecordType] = useState(0)
  const [totalResolve, setTotalResolve] = useState(0)
  const auth = useAuth()

  const fetchData = async (dataURL) => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow',
    }
    const response = await fetch(`${dataURL}`, requestOptions)
    if (!response.ok) throw new Response('Failed to get data', { status: 500 })
    return response.json()
  }

  const getMintPrice = async () => {
    const web3 = new Web3(getDefaultChain() === `LUKSO` ? window.lukso : window.ethereum)
    const contract = new web3.eth.Contract(contracts[0].abi, contracts[0].contract_address)
    return await contract.methods.fee(`mint_price`).call()
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
  const getDataBatchForTokenIds = async (tokenIds, dataKeys) => {
    const web3 = new Web3(getDefaultChain() === `LUKSO` ? window.lukso : window.ethereum)
    const contract = new web3.eth.Contract(contracts[0].abi, contracts[0].contract_address)
    return await contract.methods.getDataBatchForTokenIds(tokenIds, dataKeys).call()
  }
  const getTotalResolve = async () => await contract.methods._resolveCounter().call()
  const getResolveList = async (wallet) => await contract.methods.getDomainList(wallet).call()
  const getTotalSupply = async () => await contract.methods.totalSupply().call()
  const getCouncilMintExpiration = async () => await contract.methods.councilMintExpiration().call()
  const getMaxSupply = async () => await contract.methods.MAX_SUPPLY().call()

  useEffect(() => {
    setIsLoading(true)
    getPoint().then(async (res) => {
      setData({ point: res })
      setIsLoading(false)
    })
  }, [])

  // if (isLoading) return <Loading />

  return (
    <section className={styles.section}>
      <div className={`${styles['container']} __container ms-motion-slideUpIn`} data-width={`medium`}>
        <div className={`${styles['pageTitle']}`}>Kodama Leaderboard</div>

        {auth.wallet && data && data.point && data.point.length > 0 && (
          <div className={`${styles['leader']} d-flex flex-column align-items-center justify-content-between`}>
            {data.point.map((item, i) => {
              if (item.wallet_address.toLowerCase() !== auth.wallet.toLowerCase()) return
              return (
                <div key={i} className={`card w-100`}>
                  <div className={`card__body d-flex flex-row align-items-center justify-content-between`}>
                    <div className={`${styles.pfp} d-flex flex-row align-items-center justify-content-between`}>
                      <figure className={`d-flex`}>
                        <img className={`rounded`} src={`${import.meta.env.VITE_IPFS_GATEWAY}${item.profile.LSP3Profile?.profileImage[0].url.replace(`ipfs://`, ``)}`} />
                      </figure>
                      <div className={`d-flex flex-column`}>
                        <span>{item.profile.LSP3Profile?.name}</span>
                        <small className={`text-uppercase`}>
                          {' '}
                          {item.point} {import.meta.env.VITE_NAME}
                        </small>
                      </div>
                    </div>
                    
                    <b>#{i + 1}</b>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <h3 className={`mt-50`}>{data && data.point.length && <>{data.point.length}</>} holders</h3>
        {data && data.point && data.point.length > 0 && (
          <div className={`${styles['leader']} d-flex flex-column align-items-center justify-content-between`}>
            {data.point.map((item, i) => {
              console.log(item)
              return (
                <div key={i} className={`card w-100`}>
                  <div className={`card__body d-flex flex-row align-items-center justify-content-between`}>
                    <div className={`${styles.pfp} d-flex flex-row align-items-center justify-content-between`}>
                      <figure className={`d-flex`}>
                        <img className={`rounded`} src={`${import.meta.env.VITE_IPFS_GATEWAY}${item.profile.LSP3Profile?.profileImage[0].url.replace(`ipfs://`, ``)}`} />
                      </figure>
                      <div className={`d-flex flex-column`}>
                        <span>{item.profile.LSP3Profile?.name}</span>
                        <small className={`text-uppercase`}>
                          {' '}
                          {item.point} {import.meta.env.VITE_NAME}
                        </small>
                      </div>
                    </div>

                    <b>{i === 0 ? `🥇` : i === 1 ? `🥈` : i === 2 ? `🥉` : `#${i + 1}`}</b>
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
