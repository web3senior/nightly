import { useState, useEffect, useRef } from 'react'
import { useLoaderData, defer, Form, Await, useRouteError, Link, useNavigate } from 'react-router-dom'
import { useAuth, contracts } from '../contexts/AuthContext'
import { Title } from './helper/DocumentTitle'
import Icon from './helper/MaterialIcon'
import styles from './Pricing.module.scss'

export const loader = async () => {
  return defer({ key: 'val' })
}

export default function Pricing({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [isLoading, setIsLoading] = useState(true)
  const [taotlRecordType, setTotalRecordType] = useState(0)
  const [totalResolve, setTotalResolve] = useState(0)
  const [recordTypeList, setRecordTypeList] = useState(0)
  const auth = useAuth()
  const navigate = useNavigate()
  const tableBodyRef = useRef()

  const getTotalRecordType = async () => await contract.methods._recordTypeCounter().call()
  const getTotalResolve = async () => await contract.methods._resolveCounter().call()
  const getResolveList = async (wallet) => await contract.methods.getResolveList(wallet).call()
  const getRecordTypeNameList = async () => await contract.methods.getRecordTypeNameList().call()

  useEffect(() => {
    getTotalRecordType().then((res) => {
      setTotalRecordType(_.toNumber(res))
      setIsLoading(false)
    })

    getTotalResolve().then((res) => {
      setTotalResolve(_.toNumber(res))
      setIsLoading(false)
    })

    getResolveList(auth.wallet).then((res) => {
      console.log(res)
      setIsLoading(false)
    })

    getRecordTypeNameList(auth.wallet).then((res) => {
      console.log(res)
      setRecordTypeList(res)
      setIsLoading(false)

      if (res.length) {
        res.map((item, i) => {
          tableBodyRef.current.innerHTML += `<tr class="animate__animated animate__fadeInDown text-center" style="--animate-duration: .${i * 2}s;">
              <th scope="row" class="text-left">
                .${item.name}
              </th>
              <td> ${item.manager.slice(0, 4)}...${item.manager.slice(38)}</td>
              <td><span class="badge badge-purpink">${_.fromWei(item.price, `ether`)} ⏣LYX</span></td>
              <td>${_.toNumber(item.percentage)} %</td>
              <td>${100 - _.toNumber(item.percentage)} %</td>
            </tr>`
        })
      }
    })
  }, [])

  return (
    <section className={styles.section}>
      <div className={`${styles['container']} __container ms-motion-slideUpIn`} data-width={`large`}>
        <div className={`grid grid--fit mt-50`} style={{ '--data-width': '100px', gap: '1rem' }}>
          <div className={`card`}>
            <div className={`card__body`}>
              <p>Extensions</p>
              <h2>{taotlRecordType}</h2>
            </div>
          </div>
          <div className={`card`}>
            <div className={`card__body`}>
              <p>Names</p>
              <h2>{totalResolve}</h2>
            </div>
          </div>
          <div className={`card`}>
            <div className={`card__body`}>
              <p>Owners</p>
              <h2>{taotlRecordType}</h2>
            </div>
          </div>
        </div>

        <h3 className={`mt-40`}>Extensions</h3>
        <div className={`card`}>
          <div className={`card__body`}>
            <div className={`${styles['extension']} table-responsive`}>
              <table className={`data-table`}>
                <caption>Extension list</caption>
                <thead>
                  <tr>
                    <th scope="col" className={`text-left`}>
                      Extension
                    </th>
                    <th scope="col">Manager</th>
                    <th scope="col">Price</th>
                    <th scope="col">Manager %</th>
                    <th scope="col">{import.meta.env.VITE_NAME} %</th>
                  </tr>
                </thead>
                <tbody ref={tableBodyRef}></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
