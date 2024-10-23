import { Link } from 'react-router-dom'

const styleTitle = {
  fontFamily: 'Libre Franklin',
  fontSize: 'calc(2.1em + .4vw)',
  fontWeight: 'bold',
  padding: '1rem 0 0 0',
}

const styleSubtitle = {
  fontSize: 'calc(.8rem + .2vw)',
  fontWeight: '400',
  opacity: '.7',
}

const Heading = (props) => (
  <div className={`d-flex flex-column w-100 mb-30`}>
    <h1 style={styleTitle}>{props.title}</h1>
    <small style={styleSubtitle}>{props.subTitle}</small>
  </div>
)

export default Heading
