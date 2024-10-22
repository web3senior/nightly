import Logo from './../../../src/assets/logo.svg'
import ArattaLabs from './../../../src/assets/logo-arattalabs.svg'
import styles from './Loading.module.scss'

const Loading = () => (
  <div className={`${styles['loading']} d-f-c flex-column`}>
    <figure>
      <img alt={import.meta.env.VITE_TITLE} src={Logo} />
    </figure>

    <figure>
      <img alt={import.meta.env.AUTHOR} src={ArattaLabs} />
    </figure>
  </div>
)

export default Loading
