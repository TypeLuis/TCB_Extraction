import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import classes from '../../styles/Chapter.module.scss'
import Link from 'next/link'
import Head from 'next/head'


const Chapter = () => {
    const router = useRouter();
    const number = router.query.Chapters

    const [response, setResponse] = useState()
    const [domain, setDomain] = useState()
    const [page, SetPage] = useState()

    const getInfo = async (check) => {
        SetPage(check)
        const response = await axios.get(`${process.env.BACKEND_URL}/chapter/${check}`)
        setResponse(response)
    }

    useEffect(() => {
        const check = number === undefined ? Number(window.location.pathname.split('/')[1]) : Number(number)
        setDomain(window.location.origin)
        getInfo(check)
    }, [page])

    const lists = () => {
        return (
            <div className={classes.links}>

                <Link onClick={() => { SetPage(page = page - 1) }} href={`${domain}/${page - 1}`} className={classes.previous}>Previous</Link>

                <Link href={`${domain}`}>View List</Link>

                <Link onClick={() => { SetPage(page = page + 1) }} href={`${domain}/${page + 1}`} className={classes.next}>Next</Link>
            </div>
        )
    }

    return (
        <div className={classes.main}>
            <Head>
                <title>One Piece chapter {page}</title>
            </Head>
            {
                response?.status === 200 && response.data.chapter &&
                <>

                    {lists()}

                    <div className={classes.content}>
                        <h1>
                            {response.data.chapter} : {response.data.title}
                        </h1>

                        {response.data.images?.map((item, i) => {
                            return (
                                <img key={i} src={item} />
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