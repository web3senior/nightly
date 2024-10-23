import { Title } from './helper/DocumentTitle'
import styles from './Ecosystem.module.scss'

export default function Ecosystem({ title }) {
  Title(title)

  return (
    <section className={styles.section}>
      <div className={`${styles['alert']} ms-motion-slideUpIn`}>
      <div className={`__container`} data-width={`large`}>
        <h2>Alpha version</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu metus fringilla, faucibus enim at, pharetra tellus. Sed tempor mi vel lacus ullamcorper, non volutpat nibh scelerisque. Nulla at ante tempor, cursus risus non, semper tellus. Duis id sagittis ex. </p>
        </div>
        </div>
      <div className={`${styles['container']} __container ms-motion-slideUpIn`} data-width={`large`}>
        <div className={`text-justify`}>
          <b>What's royalty program?</b>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu metus fringilla, faucibus enim at, pharetra tellus. Sed tempor mi vel lacus ullamcorper, non volutpat nibh scelerisque. Nulla at ante tempor, cursus risus non, semper
            tellus. Duis id sagittis ex. Ut ac mi sit amet augue suscipit congue a id ante. Vivamus a pretium justo. Ut metus metus, posuere id diam eu, tristique consectetur est. Donec ultrices in orci eget vulputate. Duis lobortis quam non libero
            auctor condimentum vitae nec nibh. Suspendisse mollis tellus quis orci volutpat facilisis. Aenean sit amet leo imperdiet lectus condimentum porta. Suspendisse in augue fringilla, blandit quam sed, sagittis ante. Vestibulum condimentum
            lectus sit amet sapien ullamcorper, sit amet tincidunt lacus semper. Aenean fringilla enim sit amet vestibulum fermentum. Morbi non tincidunt velit, at tincidunt nunc.
          </p>

          <p>
            Praesent at lacus a tortor interdum pharetra. Etiam ipsum erat, tempor vitae felis vitae, dictum pellentesque ipsum. Integer sed consectetur felis. Sed vel dolor laoreet, efficitur eros eget, posuere ex. Vivamus dictum venenatis
            ullamcorper. Etiam laoreet, lorem non imperdiet mattis, tellus enim euismod augue, eu facilisis purus massa vitae eros. Donec id nulla consectetur, cursus est sed, pulvinar tellus. Sed nec ligula commodo, iaculis nibh at, iaculis turpis.
            Ut quis neque quis nunc tempor pretium quis vitae odio.
          </p>

          <p>
            Praesent sit amet finibus nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Maecenas eleifend erat ac mauris porttitor, non feugiat lorem dictum. Duis
            rutrum ipsum ut lacus maximus imperdiet. Pellentesque tempor purus eu turpis tincidunt suscipit. In at arcu nec orci sagittis tincidunt vel egestas orci. Nulla dictum aliquam ultricies. Suspendisse et velit turpis. Nunc semper justo
            libero, in facilisis lorem maximus a. Nam in erat vitae enim varius eleifend nec sed lectus.
          </p>

          <p>
            Duis iaculis, tortor volutpat vehicula varius, orci purus pretium enim, in consequat eros quam a nisi. Sed vitae interdum magna. Proin accumsan ut quam ac ullamcorper. Donec at auctor dui. Ut venenatis mauris eu pellentesque pulvinar. In
            hac habitasse platea dictumst. Etiam ac elit nisl.
          </p>

          <p>
            Integer iaculis ligula ut tortor suscipit porttitor. Curabitur dignissim interdum augue vel pharetra. Vivamus metus elit, tempus vel augue ornare, efficitur ultrices sem. Quisque sollicitudin turpis imperdiet turpis convallis mattis. Duis
            varius ullamcorper placerat. Nulla facilisi. Etiam fermentum aliquam massa, vel rhoncus libero vestibulum eget. Cras commodo justo nec urna vestibulum vulputate. Quisque sapien nisi, auctor in mattis sed, suscipit quis massa. Sed dictum
            diam quis magna blandit, nec scelerisque libero commodo. Curabitur sagittis metus mauris, eget imperdiet massa dapibus sed. Nulla diam velit, bibendum nec nisl ut, bibendum eleifend purus. Donec lorem mauris, convallis sodales odio in,
            hendrerit viverra tellus. Suspendisse a quam rhoncus, pretium nulla quis, bibendum turpis. Aenean in massa sed turpis pellentesque vehicula. Praesent non congue lorem.
          </p>
        </div>
      </div>
    </section>
  )
}
