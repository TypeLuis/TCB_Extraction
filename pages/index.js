import Head from 'next/head'
import classes from '../styles/Home.module.scss'
import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [response, setResponse] = useState()
  const [translator, setTranslator] = useState("TCB")
  const [loading, setLoading] = useState(true)

  const getInfo = async () => {
    // const response = await axios.get(`${process.env.BACKEND_URL}/chapter-list`)
    setLoading(true)
    const response = await axios.get(`${process.env.BACKEND_URL}/${translator}-chapter-list`)

    setResponse(response)
    setLoading(false)
  }

  useEffect(() => {
    getInfo()
    // console.log(response)
  }, [translator])
  return (
    <div className={classes.main}>
      <Head>
        <title>One Piece Chapters</title>
      </Head>

      <select onChange={(e) => { setTranslator(e.target.value) }}>
        <option value="TCB">TCB</option>
        <option value="OPSCAN">OPSCAN</option>
        <option value="OPSCAN_Backup">OPSCAN_Backup</option>
      </select>

      {
        loading ?

          <h1>Loading...</h1>

          :

          <>

            <h1>One Piece Chapters {translator}</h1>
            {response?.data.chapter_list &&

              response.data.chapter_list.map((item, i) => {
                const chapterNum = item.chapter
                return (
                  <Link key={i} href={`/${translator}/${chapterNum}`}>
                    <div>{item.chapter}</div>
                    <div>{item.title}</div>
                  </Link>
                )
              })

            }

          </>
      }

    </div>
  )
}
