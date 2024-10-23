import { useEffect, useState } from 'react'
import { Outlet, useLocation, Link, NavLink, useNavigate, useNavigation } from 'react-router-dom'
import ConnectPopup from './components/ConnectPopup'
import { Toaster } from 'react-hot-toast'
import {useAuth } from '../contexts/AuthContext'
import MaterialIcon from './helper/MaterialIcon'
import Shimmer from './helper/Shimmer'
import Logo from './../../src/assets/logo.svg'
import EthereumLogo from './../../src/assets/ethereum-logo.svg'
import ArbitrumLogo from './../../src/assets/arbitrum-logo.svg'
import LuksoLogo from './../../src/assets/lukso.svg'
import MenuIcon from './../../src/assets/menu-icon.svg'
import Icon from './helper/MaterialIcon'
import party from 'party-js'
import styles from './UserLayout.module.scss'

party.resolvableShapes['Logo'] = `<img src="${Logo}"/>`

const links = [
  {
    name: `Dashboard`,
    icon: <Icon name={`dashboard`} />,
    target: '',
    path: `dashboard`,
  },
  {
    name: `Owned`,
    icon: <Icon name={`dashboard`} />,
    target: '',
    path: `owned`,
  },
]

const footerLinks = [
  {
    name: `Need help?`,
    icon: null,
    target: '',
    path: `help`,
  },
  {
    name: `Documentation`,
    icon: null,
    target: '',
    path: `documentation`,
  },
  {
    name: 'NFT Tags',
    icon: null,
    target: '',
    path: `nft-tag`,
  },
  {
    name: 'Privacy Policy',
    icon: null,
    target: '',
    path: `privacy-policy`,
  },
]

export default function Root() {
  const [network, setNetwork] = useState()
  const [isLoading, setIsLoading] = useState()
  const [defaultChain, setDefaultChain] = useState(localStorage.getItem(`defaultChain`).toLowerCase())
  const [chain, setChain] = useState([
    {
      name: `Ethereum`,
      logo: EthereumLogo,
    },
    {
      name: `Arbitrum`,
      logo: ArbitrumLogo,
    },
    {
      name: `LUKSO`,
      logo: LuksoLogo,
    },
  ])
  const [connectPopup, setConnectPopup] = useState(false)
  const [balance, setBalance] = useState(0)
  const noHeader = ['/sss']
  const auth = useAuth()
  const navigate = useNavigate()
  const navigation = useNavigation()
  const location = useLocation()

  /**
   * Selected chain
   * @returns
   */
  const SelectedChain = () => {
    const filteredChain = chain.filter((item, i) => item.name.toLowerCase() === defaultChain.toLowerCase())
    return <img alt={`${filteredChain[0].name}`} src={`${filteredChain[0].logo}`} title={`${filteredChain[0].name}`} />
  }

  return (
    <>
      <Toaster />
      {connectPopup && <ConnectPopup connectPopup={connectPopup} setConnectPopup={setConnectPopup} />}

      <header className={`${styles.header}`}>
      <div className={`${styles.header__container} __container d-flex flex-row align-items-center justify-content-between h-100 ms-depth-4`} data-width={`xxxlarge`}>
          {/* Logo */}
          <Link to={`/`}>
            <div className={`${styles['logo']} d-flex align-items-center`}>
              <img alt={import.meta.env.VITE_TITLE} src={Logo} />
              <figcaption>{import.meta.env.VITE_NAME}</figcaption>
              <figure>
                <img src={MenuIcon} className={`${styles['logo__nav']} ms-hiddenLgUp`} />
              </figure>
            </div>
          </Link>

          {/* Nav */}
          <ul className={`${styles['nav']} d-flex flex-row align-items-center justify-content-start`}>
            {links.map((item, i) => {
              return (
                <li key={i}>
                  <NavLink to={item.path} target={item.target}>
                    {item.name}
                  </NavLink>
                </li>
              )
            })}
          </ul>

          {/* Connect */}
          <div className={`d-flex flex-row align-items-center justify-content-end`} style={{ columnGap: `.3rem` }}>
            <div className={`${styles['network']} d-flex align-items-center justify-content-end`} onClick={() => showNetworkList()}>
              {auth.defaultChain && <SelectedChain />}
            </div>

            {!auth.wallet ? (
              <>
                <button
                  className={styles['connect-button']}
                  onClick={(e) => {
                    party.confetti(document.querySelector(`header`), {
                      count: party.variation.range(20, 40),
                      shapes: ['LogoIcon'],
                    })
                    auth.connectWallet()
                  }}
                >
                  Connect Wallet
                </button>
              </>
            ) : (
              <Link to={`#`} className={`${styles['profile']} d-f-c user-select-none`}>
                <div className={`${styles['profile__wallet']} d-f-c`}>
                  <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <circle cx="12" cy="12" fill="#FF89341F" r="12"></circle>
                      <g transform="translate(4, 4) scale(0.3333333333333333)">
                        <path
                          clipRule="evenodd"
                          d="M24 0C26.2091 0 28 1.79086 28 4V10.7222C28 12.0586 29.6157 12.7278 30.5607 11.7829L35.314 7.02948C36.8761 5.46739 39.4088 5.46739 40.9709 7.02948C42.533 8.59158 42.533 11.1242 40.9709 12.6863L36.2179 17.4393C35.2729 18.3843 35.9422 20 37.2785 20H44C46.2091 20 48 21.7909 48 24C48 26.2091 46.2091 28 44 28H37.2783C35.9419 28 35.2727 29.6157 36.2176 30.5607L40.9705 35.3136C42.5326 36.8756 42.5326 39.4083 40.9705 40.9704C39.4084 42.5325 36.8758 42.5325 35.3137 40.9704L30.5607 36.2174C29.6157 35.2724 28 35.9417 28 37.2781V44C28 46.2091 26.2091 48 24 48C21.7909 48 20 46.2091 20 44V37.2785C20 35.9422 18.3843 35.2729 17.4393 36.2179L12.6866 40.9706C11.1245 42.5327 8.59186 42.5327 7.02977 40.9706C5.46767 39.4085 5.46767 36.8759 7.02977 35.3138L11.7829 30.5607C12.7278 29.6157 12.0586 28 10.7222 28H4C1.79086 28 0 26.2091 0 24C0 21.7909 1.79086 20 4 20L10.7219 20C12.0583 20 12.7275 18.3843 11.7826 17.4393L7.02939 12.6861C5.46729 11.124 5.4673 8.59137 7.02939 7.02928C8.59149 5.46718 11.1241 5.46718 12.6862 7.02928L17.4393 11.7824C18.3843 12.7273 20 12.0581 20 10.7217V4C20 1.79086 21.7909 0 24 0ZM24 33C28.9706 33 33 28.9706 33 24C33 19.0294 28.9706 15 24 15C19.0294 15 15 19.0294 15 24C15 28.9706 19.0294 33 24 33Z"
                          fill="#FF8934"
                          fillRule="evenodd"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  <b>{auth.wallet && `${auth.wallet.slice(0, 4)}...${auth.wallet.slice(38)}`}</b>
                </div>
              </Link>
            )}

            <div className={`${styles['network-list']} ms-depth-4 d-none`}>
              <ul>
                {auth.defaultChain &&
                  chain.length > 0 &&
                  chain.map((item, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => {
                          localStorage.setItem(`defaultChain`, item.name)
                          auth.setDefaultChain(item.name)
                          showNetworkList()
                              auth.isWalletConnected().then((addr) => {
                                auth.setWallet(addr)
                              })
                        }}
                      >
                        <figure className={`d-flex flex-row align-items-center justify-content-start`} style={{ columnGap: `.5rem` }}>
                          <img alt={`${item.name}`} src={item.logo} />
                          <figcaption>{item.name}</figcaption>
                          {item.name === auth.defaultChain && <Icon name={`check`} style={{ marginLeft: `auto`, color: `var(--color-primary)` }} />}
                        </figure>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* <nav className={`d-flex flex-column align-items-center justify-content-between`}>
          <div className={`${styles['nav__top']} d-flex flex-column w-100`}>
          <Link to={`/`} className={`${styles['logo']}`}>
              <figure className={`d-flex flex-row align-items-center justify-content-start`}>
                <img alt={import.meta.env.VITE_NAME} src={Logo} />
              </figure>
            </Link>

            <ul className={`d-flex flex-column align-items-start justify-content-center`}>
              {links.map((item, i) => {
                return (
                  <li key={i}>
                    <NavLink to={item.path} target={item.target} className={`d-f-c`}>
                      {item.icon} {item.name}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>

          <ul className={`${styles['nav__bottom']} d-flex flex-column align-items-start justify-content-center w-100`}>
            {footerLinks.map((item, i) => {
              return (
                <li key={i}>
                  <NavLink to={item.path} target={item.target} className={`d-f-c `}>
                    {item.icon} {item.name}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav> */}

      <main className={`${styles.main}`}>
        <Outlet />
      </main>
    </>
  )
}
