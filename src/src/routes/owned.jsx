import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth, contracts, getDefaultChain } from '../contexts/AuthContext'
import { Title } from './helper/DocumentTitle'
import Icon from './helper/MaterialIcon'
import Web3 from 'web3'
import styles from './Dashboard.module.scss'

export default function Owned({ title }) {
  Title(title)
  const [stage1Token, setStage1Token] = useState([])
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
    getTokenIds(auth.wallet).then(async (res) => {
      let dataKeys = []
      res.every(() => dataKeys.push(`0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e`))
      const web3 = new Web3()

      res.map((item, i) => {
        getDataForTokenId(item).then((data) => {
          data = web3.utils.hexToUtf8(data)
          data = data.slice(data.search(`data:application/json;`), data.length)

          // Read the data url
          fetchData(data).then((dataContent) => {
            dataContent.tokenId = res[i]
            setStage1Token((token) => token.concat(dataContent))
          })
        })
      })
    })
  }, [])

  return (
    <section className={styles.section}>
      <div className={`${styles['container']} __container ms-motion-slideUpIn`} data-width={`large`}>
        {stage1Token && stage1Token.length > 0 ? (
          <>
            <div className={`card mt-20 `}>
              <div className={`card__body`}>
                <b>
                  Your total Masterpix is
                  <span className={`badge badge-pill badge-primary ml-10`}>{stage1Token.length}</span>
                </b>
              </div>
            </div>
            <div className={`${styles['token']} grid grid--fill mt-20`} style={{ '--data-width': '200px', gap: `1rem` }}>
              {stage1Token.map((item, i) => {
                console.log(item)
                return (
                  <div key={i} className={`card animate__animated animate__fadeInUp`} style={{ animationDelay: `${i / 10}s`, '--animate-duration': `400ms` }}>
                    <div className={`${styles['token__item']} noSelect item${i} card__body`}>
                      {item.LSP4Metadata.images.length > 0 && (
                        <figure title={`${item.tokenId}`}>
                          <img src={`${import.meta.env.VITE_IPFS_GATEWAY}${item.LSP4Metadata.images[0][0].url.replace('ipfs://', '').replace('://', '')}`} />
                        </figure>
                      )}
                      <p className={`text-center`} title={item.tokenId}>
                        {item.name}
                      </p>
                      {item.approved === true && (
                        <>
                          <div className={`${styles['token__select']} text-center`} onClick={(e) => addToCart(e, item.tokenId, i)}>
                            Select
                          </div>
                        </>
                      )}
                      {item.approved === false && (
                        <>
                          <div className={`${styles['token__approve']} text-center`} onClick={(e) => handleApprove(e, item.tokenId)}>
                            Approve
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <div className={`card`}>
            <div className={`card__body d-f-c flex-column`}>
              You don't have any Masterpix tokens.
              <Link to={`/`}> Mint now!</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
