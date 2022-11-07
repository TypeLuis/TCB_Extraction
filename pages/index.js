import styles from '../styles/Home.module.scss'
import classes from '../styles/Home.module.scss'
import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [response, setResponse] = useState()
  const getInfo = async () => {
    const response = await axios.get(`${process.env.BACKEND_URL}/chapter-list`)
    setResponse(response)
  }

  useEffect(() => {
    getInfo()
  }, [])
  return (
    <div className={classes.main}>
      <h1>One Piece Chapters</h1>
      {response?.data.chapter_list &&

        response.data.chapter_list.map((item, i) => {
          const chapterNum = item.chapter.split(' ')[3]
          return (
            <Link href={`/${chapterNum}`}>
              <div>{item.chapter}</div>
              <div>{item.title}</div>
            </Link>
          )
        })

      }
    </div>
  )
}
