import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import classes from '../../styles/Chapter.module.scss'
import Link from 'next/link'


const Chapter = () => {
    const router = useRouter();
    const number = router.query.Chapters

    const [response, setResponse] = useState()
    const [domain, setDomain] = useState()
    const [page, SetPage] = useState()

    const getInfo = async () => {
        const check = number === undefined ? window.location.pathname.split('/')[1] : number
        SetPage(check)
        const response = await axios.get(`${process.env.BACKEND_URL}/chapter/${check}`)
        setResponse(response)
    }

    useEffect(() => {
        setDomain(window.location.origin)
        getInfo()
    }, [window.location.pathname])

    const lists = () => {
        return (
            <div className={classes.links}>

                <Link href={`${domain}/${Number(page) - 1}`} className={classes.previous}>Previous</Link>

                <Link href={`${domain}`}>View List</Link>

                <Link href={`${domain}/${Number(page) + 1}`} className={classes.next}>Next</Link>
            </div>
        )
    }

    return (
        <div className={classes.main}>
            {
                response?.status === 200 && response.data.chapter &&
                <>

                    {lists()}

                    <div className={classes.content}>
                        <h1>{response.data.chapter} : {response.data.title}</h1>

                        {response.data.images?.map((item, i) => {
                            return (
                                <img src={item} />
                            )
                        })}

                    </div>

                    {lists()}
                </>
            }
        </div>
    )
}

export default Chapter