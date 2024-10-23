import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ABIobject from './../abi/masterpix.json'
import ABIobjectLUKSO from './../abi/masterpixLUKSO.json'
import ArbitrumLogo from './../../src/assets/arbitrum-logo.svg'
import LuksoLogo from './../../src/assets/lukso.svg'
// import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json'
import toast from 'react-hot-toast'
import Loading from './../routes/components/Loading'
import Web3 from 'web3'

export const ABI = [ABIobjectLUKSO, ABIobject]

export const contracts = [
  {
    abi: ABI[0],
    contract_address: import.meta.env.VITE_MASTERPIX_CONTRACT_MAINNET_LUKSO,
  },
  {
    abi: ABI[1],
    contract_address: import.meta.env.VITE_MASTERPIX_CONTRACT_MAINNET_ARBITRUM,
  },
]

export const chain = [
  // {
  //   name: `Ethereum`,
  //   logo: EthereumLogo,
  // },
  {
    name: `Arbitrum`,
    logo: ArbitrumLogo,
  },
]

export const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export const isAuth = async () => await localStorage.getItem('accessToken')

export const chainID = async () => await web3.eth.getChainId()

export const getIPFS = async (CID) => {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }
  const response = await fetch(`https://api.universalprofile.cloud/ipfs/${CID}`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

/**
 * Fetch Universal Profile
 * @param {address} addr
 * @returns
 */

export const fetchProfile = async (addr) => {
  const web3 = new Web3(getDefaultChain() === `LUKSO` ? window.lukso : window.ethereum)
  const contract = new web3.eth.Contract(LSP0ERC725Account.abi, addr)
  try {
    return contract.methods
      .getData('0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5')
      .call()
      .then(async (data) => {
        data = data.substring(6, data.length)
        // console.log(data)
        //  data ="0x" + data.substring(6)
        //  console.log(data)
        // slice the bytes to get its pieces
        const hashFunction = '0x' + data.slice(0, 8)
        // console.log(hashFunction)
        const hash = '0x' + data.slice(76)
        const url = '0x' + data.slice(76)

        // console.log(hashFunction, ' | ', hash, ' | ', url)

        // check if it uses keccak256
        //  if (hashFunction === '0x6f357c6a') {
        // download the json file
        const json = await getIPFS(web3.utils.hexToUtf8(url).replace('ipfs://', '').replace('://', ''))
        return json
        // compare hashes
        // if (web3.utils.keccak256(JSON.stringify(json)) === hash.replace(hashFunction, '')) {
        //   return json
        // } else false
        // }
      })
  } catch (error) {
    console.log(error)
    return []
  }
}

/**
 * Connect wallet
 */
export const isWalletConnected = async () => {
  const web3 = new Web3(getDefaultChain() === `LUKSO` ? window.lukso : window.ethereum)

  try {
    let accounts = await web3.eth.getAccounts()
    return accounts[0]
  } catch (error) {
    toast.error(error.message)
  }
}

export const isUPinstalled = () => PROVIDER && PROVIDER.isUniversalProfileExtension

export function getDefaultChain() {
  return localStorage.getItem(`defaultChain`) || chain[0].name
}

export function AuthProvider({ children }) {
  const [wallet, setWallet] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [defaultChain, setDefaultChain] = useState(localStorage.getItem(`defaultChain`) || chain[0])
  const navigate = useNavigate()
  const location = useLocation()

  function logout() {
    localStorage.removeItem('accessToken')
    navigate('/connect')
    setUser(null)
  }

  const connectWallet = async () => {
    let loadingToast = toast.loading('Waiting')

    const web3 = new Web3(defaultChain === `LUKSO` ? window.lukso : window.ethereum)

    try {
      let accounts = await web3.eth.getAccounts()
      if (accounts.length === 0) await web3.eth.requestAccounts()
      accounts = await web3.eth.getAccounts()
      //console.log(accounts)
      setWallet(accounts[0])
     // fetchProfile(accounts[0]).then((res) => setProfile(res))
      toast.dismiss(loadingToast)
      toast.success(`Wallet successfuly connected`)
      navigate(`/`)
      return accounts[0]
    } catch (error) {
      toast.error(`The provider could not be found.`)
      toast.dismiss(loadingToast)
    }
  }

  useEffect(() => {
    if (localStorage.getItem(`defaultChain`) === null) localStorage.setItem(`defaultChain`, getDefaultChain())
    setLoading(true)
    isWalletConnected().then((addr) => {
      if (addr !== undefined) {
        console.log(addr)
        setWallet(addr)
        localStorage.setItem(`wallet_addr`, addr)
        setLoading(false)
       // fetchProfile(addr).then((res) => setProfile(res))
      }
      setLoading(false)
    })
  }, [])

  const value = {
    wallet,
    setWallet,
    profile,
    isUPinstalled,
    fetchProfile,
    setProfile,
    isWalletConnected,
    defaultChain,
    setDefaultChain,
    connectWallet,
    logout,
  }

  if (loading) return <Loading />

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
