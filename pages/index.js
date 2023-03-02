import Head from 'next/head'
import classes from '../styles/Home.module.scss'
import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [response, setResponse] = useState()
  const getInfo = async () => {
    const response = await axios.get(`${process.env.BACKEND_URL}/chapter-list`)
    console.log('response', response)
    setResponse(response)
  }

  useEffect(() => {
    getInfo()
    console.log(response)
  }, [])
  return (
    <div className={classes.main}>
      <Head>
        <title>One Piece Chapters</title>
      </Head>
      <h1>One Piece Chapters</h1>
      {response?.data.chapter_list &&

        response.data.chapter_list.map((item, i) => {
          const chapterNum = item.chapter.split(' ')[3]
          return (
            <Link key={i} href={`/${chapterNum}`}>
              <div>{item.chapter}</div>
              <div>{item.title}</div>
            </Link>
          )
        })

      }
    </div>
  )
}
