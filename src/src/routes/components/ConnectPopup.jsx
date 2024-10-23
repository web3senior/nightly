import { useAuth, contracts } from './../../contexts/AuthContext'
import Logo from './../../../src/assets/logo.svg'
import styles from './ConnectPopup.module.scss'

const ConnectPopup = ({connectPopup, setConnectPopup}) => {
  const auth = useAuth()

  return (
    <div className={`${styles['connect-popup']} d-f-c flex-row`}>
      <button className={`${styles['connect-popup__close']} d-f-c`} onClick={() => setConnectPopup(!connectPopup)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.8841 4.116C20.3723 4.60416 20.3723 5.39561 19.8841 5.88377L5.88413 19.8838C5.39597 20.3719 4.60452 20.3719 4.11636 19.8838C3.6282 19.3956 3.6282 18.6042 4.11636 18.116L18.1163 4.116C18.6045 3.62784 19.3959 3.62784 19.8841 4.116Z"
            fill="#141B34"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.11636 4.116C4.60452 3.62784 5.39597 3.62784 5.88413 4.116L19.8841 18.116C20.3723 18.6042 20.3723 19.3956 19.8841 19.8838C19.3959 20.3719 18.6045 20.3719 18.1163 19.8838L4.11636 5.88377C3.6282 5.39561 3.6282 4.60416 4.11636 4.116Z"
            fill="#141B34"
          />
        </svg>
      </button>

      <ul className={`d-f-c flex-column ms-motion-slideDownIn`}>
        <li>
          <figure className={`d-f-c flex-column`}>
            <img alt={import.meta.env.VITE_NAME} src={Logo} />
            <figcaption>
              <b>{import.meta.env.VITE_NAME}</b>
            </figcaption>
          </figure>
        </li>
        <li>Connect your wallet to view your points</li>
        <li>
          <button
            className={`btn`}
            onClick={() => {
              // party.confetti(document.querySelector(`.connect-btn-party-holder`), {
              //   count: party.variation.range(20, 40),
              //   shapes: ['UniversalProfile'],
              // })
              auth.connectWallet()
            }}
          >
            Connect Wallet
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ConnectPopup
