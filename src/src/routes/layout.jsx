import { useEffect, useState } from 'react'
import { Outlet, useLocation, Link, NavLink, useNavigate, useNavigation, ScrollRestoration } from 'react-router-dom'
import ConnectPopup from './components/ConnectPopup'
import { Toaster } from 'react-hot-toast'
import { useAuth, chain, getDefaultChain } from './../contexts/AuthContext'
import MaterialIcon from './helper/MaterialIcon'
import Icon from './helper/MaterialIcon'
import Logo from './../../src/assets/logo.svg'
import LogoIcon from './../../src/assets/logo.svg'
import Loading from './components/Loading'
import XIcon from './../../src/assets/icon-x.svg'
import CGIcon from './../../src/assets/icon-cg.svg'
import GitHubIcon from './../../src/assets/icon-github.svg'
import MenuIcon from './../../src/assets/menu-icon.svg'
import styles from './Layout.module.scss'
const links = [
  {
    name: 'Home',
    icon: null,
    target: '',
    path: ``,
  },
  {
    name: 'Marketplace',
    icon: null,
    target: '',
    path: `marketplace`,
  },
  // {
  //   name: 'Pricing',
  //   icon: null,
  //   target: '',
  //   path: `pricing`,
  // },
  {
    name: 'Ecosystems',
    icon: null,
    target: '',
    path: `ecosystem`,
  },
  // {
  //   name: 'Tips',
  //   icon: null,
  //   target: '',
  //   path: `tip`,
  // },
  {
    name: 'About',
    icon: null,
    target: '',
    path: `about`,
  },
]

export default function Root() {
  const [network, setNetwork] = useState()
  const [isLoading, setIsLoading] = useState()
  const auth = useAuth()

  const showNetworkList = () => document.querySelector(`.${styles['network-list']}`).classList.toggle(`d-none`)

  /**
   * Selected chain
   * @returns
   */
  const SelectedChain = () => {
    const filteredChain = chain.filter((item, i) => item.name === getDefaultChain())
    return <img alt={`${filteredChain[0].name}`} src={`${filteredChain[0].logo}`} title={`${filteredChain[0].name}`} />
  }

  const handleOpenNav = () => {
    document.querySelector('#modal').classList.toggle('open')
    document.querySelector('#modal').classList.toggle('blur')
    document.querySelector('.cover').classList.toggle('showCover')
  }

  useEffect(() => {}, [])

  return (
    <>
      <Toaster />
      <ScrollRestoration />

      <header className={`${styles.header}`}>
        <div className={`${styles.header__container} __container d-flex flex-row align-items-center justify-content-between h-100 ms-depth-4`} data-width={`xxxlarge`}>
          
          <span className={`${styles.name}`}>{import.meta.env.VITE_NAME} 🦉</span>
          
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
                  Connect
                </button>
              </>
            ) : (
              <Link to={`user/dashboard`} className={`${styles['profile']} d-f-c user-select-none`}>
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
                          <figcaption style={{color:'black'}}>{item.name}</figcaption>
                          {item.name === auth.defaultChain && <Icon name={`check`} style={{ marginLeft: `auto` }} />}
                        </figure>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
        </div>
      </header>

      <main className={`${styles.main}`}>
        <Outlet />
      </main>

      <footer>
        <ul className={`d-flex align-items-center justify-content-around`}>
          <li>
            <NavLink to={`/`} className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? `${styles.active}` : '')}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M240-200h133.85v-237.69h212.3V-200H720v-360L480-740.77 240-560v360Zm-60 60v-450l300-225.77L780-590v450H526.15v-237.69h-92.3V-140H180Zm300-330.38Z"/></svg>
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={`project`} className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? `${styles.active}` : '')}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M160-240v-480 510-30Zm12.31 60Q142-180 121-201q-21-21-21-51.31v-455.38Q100-738 121-759q21-21 51.31-21h219.61l80 80h315.77Q818-700 839-679q21 21 21 51.31v190.38h-60v-190.38q0-5.39-3.46-8.85t-8.85-3.46H447.38l-80-80H172.31q-5.39 0-8.85 3.46t-3.46 8.85v455.38q0 5.39 3.46 8.85t8.85 3.46h209.23v60H172.31ZM599-80.23 469.23-210 599-339.77 640.77-297l-87 87 87 87L599-80.23Zm171.23 0L728.46-123l87-87-87-87 41.77-42.77L900-210 770.23-80.23Z"/></svg>
              <span>Project</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={`event`} className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? `${styles.active}` : '')}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M212.31-100Q182-100 161-121q-21-21-21-51.31v-535.38Q140-738 161-759q21-21 51.31-21h55.38v-84.61h61.54V-780h303.08v-84.61h60V-780h55.38Q778-780 799-759q21 21 21 51.31v535.38Q820-142 799-121q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-375.38H200v375.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM200-607.69h560v-100q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v100Zm0 0V-720v112.31Zm280 210.77q-14.69 0-25.04-10.35-10.34-10.34-10.34-25.04 0-14.69 10.34-25.04 10.35-10.34 25.04-10.34t25.04 10.34q10.34 10.35 10.34 25.04 0 14.7-10.34 25.04-10.35 10.35-25.04 10.35Zm-160 0q-14.69 0-25.04-10.35-10.34-10.34-10.34-25.04 0-14.69 10.34-25.04 10.35-10.34 25.04-10.34t25.04 10.34q10.34 10.35 10.34 25.04 0 14.7-10.34 25.04-10.35 10.35-25.04 10.35Zm320 0q-14.69 0-25.04-10.35-10.34-10.34-10.34-25.04 0-14.69 10.34-25.04 10.35-10.34 25.04-10.34t25.04 10.34q10.34 10.35 10.34 25.04 0 14.7-10.34 25.04-10.35 10.35-25.04 10.35ZM480-240q-14.69 0-25.04-10.35-10.34-10.34-10.34-25.03 0-14.7 10.34-25.04 10.35-10.35 25.04-10.35t25.04 10.35q10.34 10.34 10.34 25.04 0 14.69-10.34 25.03Q494.69-240 480-240Zm-160 0q-14.69 0-25.04-10.35-10.34-10.34-10.34-25.03 0-14.7 10.34-25.04 10.35-10.35 25.04-10.35t25.04 10.35q10.34 10.34 10.34 25.04 0 14.69-10.34 25.03Q334.69-240 320-240Zm320 0q-14.69 0-25.04-10.35-10.34-10.34-10.34-25.03 0-14.7 10.34-25.04 10.35-10.35 25.04-10.35t25.04 10.35q10.34 10.34 10.34 25.04 0 14.69-10.34 25.03Q654.69-240 640-240Z"/></svg>
              <span>Event</span>
            </NavLink>
          </li>
        </ul>
      </footer>
    </>
  )
}
