import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import Heading from './helper/Heading'
import styles from './About.module.scss'

export default function About({ title }) {
  Title(title)

  const [faq, setFaq] = useState([
    {
      q: `What is Masterpix? `,
      a: `Masterpix is an online platform where users can create pixel art, mint it as NFTs, and trade them on our marketplace.`,
    },
    {
      q: `How do I create pixel art on Masterpix?`,
      a: `Our user-friendly artboard provides a simple interface for drawing pixel art. No artistic skills required!`,
    },
    {
      q: `Is there a cost to use Masterpix?`,
      a: `Creating pixel art and exploring the platform is free. There may be fees associated with minting NFTs and marketplace transactions, which will be clearly outlined.`,
    },
    {
      q: `What is an NFT? `,
      a: ` An NFT (Non-Fungible Token) is a unique digital asset verified on a blockchain. It represents ownership of a specific item, such as a piece of digital art.`,
    },
    {
      q: `How do I mint my pixel art as an NFT?

`,
      a: `Our platform offers a straightforward process to mint your pixel art as an NFT. You will have the option to choose different blockchain networks and set your desired price.`,
    },{
      q: `What are the fees associated with minting an NFT? `,
      a: `There are typically two types of fees: gas fees (network transaction fees) and platform fees that is 1 $ARB`,
    },{
      q: `How can I contact Masterpix support?`,
      a: `You can reach our support team through our website's contact page or by emailing us at atenyun[at]gmail[dot]com`,
    },{
      q: `What happens if I encounter a problem with the platform?`,
      a: `Please join the Aratta Labs Telegram group for support.`,
    },
  ])
  useEffect(() => {}, [])

  return (
    <section className={styles.section}>
      <div className={`${styles['page-hero']} ms-motion-slideUpIn`}>
        <div className={`__container`} data-width={`large`}>
          <h2> About Us</h2>
          <p>Shaping the Future of Web3</p>
        </div>
      </div>

      <div className={`__container`} data-width={`large`}>
        <article>
          <p>
            Masterpix is a revolutionary platform that empowers artists and creators to unleash their pixel art potential. Our intuitive artboard provides a space for everyone, from seasoned pixel artists to budding enthusiasts, to craft stunning
            pixel masterpieces. With Masterpix, you can transform your pixel art into unique and valuable NFTs. Join our thriving marketplace and connect with a global community of art collectors and enthusiasts. Discover, trade, and invest in
            exceptional pixel art creations. We believe that pixel art is a powerful form of expression and a valuable asset. Masterpix is committed to supporting artists and fostering a vibrant ecosystem for pixel art enthusiasts worldwide.
          </p>
          <b>Let's pixel the world together.</b>
        </article>
      </div>

      <div className={`${styles['container']} __container ms-motion-slideUpIn`} data-width={`xxlarge`}>
        <div className={`__container`} data-width={`large`}>
          <Heading title={`FAQs`} subTitle={`Frequently Asked Questions`}></Heading>
          {faq.map((item, i) => (
            <details className={`transition`} key={i}>
              <summary>{item.q}</summary>
              <div dangerouslySetInnerHTML={{ __html: item.a }} />
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
