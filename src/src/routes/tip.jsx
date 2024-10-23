import { Title } from './helper/DocumentTitle'
import styles from './Tip.module.scss'

export default function Tips({ title }) {
  Title(title)

  return (
    <section className={styles.section}>
      <div className={`${styles['page-hero']} ms-motion-slideUpIn`}>
        <div className={`__container`} data-width={`large`}>
          <h2>Dropid Tips</h2>
          <p>our Guide to the Perfect Web3 Username</p>
        </div>
      </div>
      <div className={`${styles['container']} __container ms-motion-slideUpIn`} data-width={`large`}>
        <article className={`text-justify`}>
          <p>Owning a Web3 username on Dropid is like owning a piece of digital real estate. It&#39;s your unique identity in the decentralized world. Here are some tips to help you choose and acquire the perfect Web3 username.</p>

          <h3>Choose a Memorable Username</h3>

          <ul>
            <li>
              <strong>Keep it simple:</strong> Shorter usernames are easier to remember.
            </li>
            <li>
              <strong>Reflect your identity:</strong> Consider your personal brand or interests.
            </li>
            <li>
              <strong>Avoid numbers and special characters:</strong> While possible, they can be harder to recall.
            </li>
            <li>
              <strong>Check availability:</strong> Use Dropid&#39;s search function to see if your desired username is available.
            </li>
          </ul>

          <h3>Understand the Value Proposition</h3>

          <ul>
            <li>
              <strong>Research:</strong> Learn about the benefits of owning a Web3 username.
            </li>
            <li>
              <strong>Consider future use cases:</strong> Think about how you might use your username beyond Telegram.
            </li>
            <li>
              <strong>Evaluate pricing:</strong> Compare prices of different usernames to determine your budget.
            </li>
          </ul>

          <h3>Secure Your Wallet</h3>

          <ul>
            <li>
              <strong>Choose a reliable wallet:</strong> Use a reputable wallet provider.
            </li>
            <li>
              <strong>Enable two-factor authentication:</strong> Protect your wallet with an extra layer of security.
            </li>
            <li>
              <strong>Backup your seed phrase:</strong> Keep your seed phrase safe and offline.
            </li>
          </ul>

          <h3>Participate in Auctions</h3>

          <ul>
            <li>
              <strong>Set a budget:</strong> Determine how much you&#39;re willing to spend.
            </li>
            <li>
              <strong>Be patient:</strong> Popular usernames might have high starting bids.
            </li>
            <li>
              <strong>Consider bidding strategically:</strong> Wait for the auction to progress before placing your bid.
            </li>
          </ul>

          <h3>Utilize Dropid&#39;s Features</h3>

          <ul>
            <li>
              <strong>Explore filters:</strong> Use Dropid&#39;s search filters to find usernames based on length, availability, and price.
            </li>
            <li>
              <strong>Leverage suggestions:</strong> Dropid can suggest similar usernames if your preferred choice is unavailable.
            </li>
            <li>
              <strong>Read user reviews:</strong> Check reviews to get insights into the platform and user experiences.
            </li>
          </ul>
        </article>
      </div>
    </section>
  )
}
