import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import classes from '../../../styles/Chapter.module.scss'
import Head from 'next/head'
import translation from '../../../data/translation'



const Chapter = () => {
    const router = useRouter();
    const number = router.query.Chapters
    const scans = router.query.Translator

    const [response, setResponse] = useState()
    const [domain, setDomain] = useState()
    const [page, SetPage] = useState()

    const getInfo = async (chapter, translator) => {
        SetPage(chapter)
        const response = await axios.get(`${process.env.BACKEND_URL}/${translator}-chapter/${chapter}`)
        setResponse(response)
        console.log(scans)
    }

    useEffect(() => {
        const chapter = number === undefined ? Number(window.location.pathname.split('/')[2]) : Number(number)

        const translator = scans === undefined ? window.location.pathname.split('/')[1] : scans

        setDomain(window.location.origin)
        getInfo(chapter, translator)
    }, [page])

    const lists = () => {
        return (
            <div className={classes.links}>
                <div onClick={() => { window.location.replace(`${domain}/TCB/${page - 1}`) }} className={classes.previous}>Chapter {page - 1}</div>

                <div onClick={() => { window.location.replace(`${domain}`) }}>Chapter List</div>

                <div onClick={() => { window.location.replace(`${domain}/TCB/${page + 1}`) }} className={classes.previous}>Chapter {page + 1}</div>
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

                    <div className={classes.selection}>

                        <select onChange={(e) => { window.location.replace(`${domain}/${e.target.value}/${page}`) }}>
                            {translation.map((item, i) => {
                                return (
                                    // Adding key to a react fragment
                                    <React.Fragment key={i}>
                                        {
                                            item === window.location.pathname.split('/')[1] ?
                                                <option value={item} selected>{item}</option>
                                                :
                                                <option value={item}>{item}</option>
                                        }
                                    </React.Fragment>
                                )
                            })}
                        </select>
                    </div>

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
        </div >
    )
}

export default Chapter