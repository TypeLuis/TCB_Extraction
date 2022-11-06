import styles from '../styles/Home.module.scss'
import classes from '../styles/Home.module.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [response, setResponse] = useState()
  const getInfo = async () => {
    const response = await axios.get(`${process.env.BACKEND_URL}/chapter-list`)
    setResponse(response)
    console.log(response)
  }
  useEffect(() => {

    getInfo()
  }, [])
  return (
    <div className={classes.main}>
      {response?.status === 200 &&

        response.data.chapter_list.map((item, i) => {
          return (
            <a href={item.url}>
              <div>{item.chapter}</div>
              <div>{item.title}</div>
            </a>
          )
        })

      }
    </div>
  )
}
