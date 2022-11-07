import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import classes from '../../styles/Chapter.module.scss'
import Link from 'next/link'


const Chapter = () => {
    const router = useRouter();
    const number = router.query.Chapters

    const [response, setResponse] = useState()
    const [page, SetPage] = useState()

    const getInfo = async () => {
        const check = number === undefined ? window.location.pathname.split('/')[1] : number
        SetPage(check)
        const response = await axios.get(`${process.env.BACKEND_URL}/chapter/${check}`)
        setResponse(response)
        console.log(response)
    }

    useEffect(() => {
        console.log(window.location)
        getInfo()
    }, [])

    const domain = window.location.origin
    return (
        <div className={classes.main}>
            <div className={classes.links}>

                <Link href={`${domain}/${page - 1}`} className={classes.previous}>Previous</Link>

                <Link href={`${domain}`}>View List</Link>

                <Link href={`${domain}/${page + 1}`} className={classes.next}>Next</Link>
            </div>
            {
                response?.status === 200 && response.data.chapter &&
                <div className={classes.content}>
                    <div>{response.data.chapter} : {response.data.title}</div>

                    {response.data.images?.map((item, i) => {
                        return (
                            <img src={item} />
                        )
                    })}

                </div>
            }
        </div>
    )
}

export default Chapter