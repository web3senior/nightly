import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth, contracts, getDefaultChain } from '../contexts/AuthContext'
import { Title } from './helper/DocumentTitle'
import Icon from './helper/MaterialIcon'
import Web3 from 'web3'
import styles from './Dashboard.module.scss'

export default function About({ title }) {
  Title(title)
  const [isLoading, setIsLoading] = useState(false)
  const [mintFee, setMintFee] = useState(0)
  const [updateFee, setUpdateFee] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  const auth = useAuth()

  const getFee = async (name) => {
    const web3 = new Web3(getDefaultChain() === `LUKSO` ? window.lukso : window.ethereum)
    const contract = new web3.eth.Contract(contracts[0].abi, contracts[0].contract_address)
    return await contract.methods.fee(name).call()
  }

  const getTotalSupply = async () => {
    const web3 = new Web3(getDefaultChain() === `LUKSO` ? window.lukso : window.ethereum)
    const contract = new web3.eth.Contract(contracts[0].abi, contracts[0].contract_address)
    return await contract.methods.totalSupply().call()
  }

  useEffect(() => {
    const web3 = new Web3()
    setIsLoading(!isLoading)
    getFee(`mint_fee`).then((res) => {
      setMintFee(web3.utils.fromWei(web3.utils.toNumber(res), `ether`))
      setIsLoading(false)
    })

    getFee(`update_fee`).then((res) => {
      setUpdateFee(web3.utils.fromWei(web3.utils.toNumber(res), `ether`))
      setIsLoading(false)
    })

    getTotalSupply().then((res) => {
      setTotalSupply(web3.utils.toNumber(res))
      setIsLoading(false)
    })
  }, [])

  return (
    <section className={styles.section}>
      <div className={`${styles['container']} __container ms-motion-slideUpIn`} data-width={`xxlarge`}>
        <div className="grid grid--fit" style={{ '--data-width': `200px`, columnGap: `1rem` }}>
          <div className={`card`}>
            <div className={`card__body d-flex align-items-center justify-content-between`}>
              <div>
                <span>Total supply</span>
                <h1>{totalSupply}</h1>
              </div>
              <div className={`${styles['card-icon']}`}>
                <Icon name={`loyalty`} />
              </div>
            </div>
          </div>
          <div className={`card`}>
            <div className={`card__body d-flex align-items-center justify-content-between`}>
              <div>
                <span>Maximum supply per mint</span>
                <h1>{10}</h1>
              </div>
              <div className={`${styles['card-icon']}`}>
                <Icon name={`storefront`} />
              </div>
            </div>
          </div>
        </div>

        <div className={`grid grid--fit mt-50`} style={{ '--data-width': '300px', gap: '1rem' }}>
          <div className={`card`}>
            <div className={`card__body`}>
              <p>Mint Fee</p>
              <h2>{mintFee}</h2>
            </div>
          </div>
          <div className={`card`}>
            <div className={`card__body`}>
              <p>Update Fee</p>
              <h2>{updateFee}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
