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
    const [chapters, setChapters] = useState()

    const getInfo = async (chapterNum, translator) => {
        SetPage(chapterNum)

        const chapterList = await axios.get(`${process.env.BACKEND_URL}/${translator}-chapter-list`)
        const list = chapterList.data.chapter_list

        const chapter = typeof list[0].chapter === "string" ? list.filter(x => x.chapter.includes(chapterNum))[0] : list.filter(x => x.chapter === (chapterNum))[0]
        console.log(chapter)

        const images = await axios.get(`${process.env.BACKEND_URL}/${translator}-chapter/${chapterNum}?url=${chapter.url}`)

        console.log(images)

        const obj = {
            'title': chapter.title,
            'chapter': chapter.chapter,
            'images': images.data.images,
            'status': images.status
        }

        setResponse(obj)
        setChapters(list)
        // console.log(scans)
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
                <div onClick={() => { window.location.replace(`${domain}/${window.location.pathname.split('/')[1]}/${page - 1}`) }} className={classes.previous}>Chapter {page - 1}</div>

                <div onClick={() => { window.location.replace(`${domain}`) }}>Chapter List</div>

                <div onClick={() => { window.location.replace(`${domain}/${window.location.pathname.split('/')[1]}/${page + 1}`) }} className={classes.previous}>Chapter {page + 1}</div>
            </div>
        )
    }

    return (
        <div className={classes.main}>
            <Head>
                <title>One Piece chapter {page}</title>
                {/* Images from OPSCANS are forbidden if it isn't refered to their domain. Reference: https://stackoverflow.com/questions/49433452/forbidden-403-on-image-urls */}
                <meta name="referrer" content="no-referrer" />
            </Head>
            {
                response?.status === 200 && response.chapter &&
                <>

                    <div className={classes.selectionTranslation}>

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

                    <div className={classes.selectionChapter}>

                        <select onChange={(e) => { window.location.replace(`${domain}/${window.location.pathname.split('/')[1]}/${e.target.value}`) }}>
                            {chapters.map((item, i) => {
                                const chapter = String(item.chapter)
                                const title = item.title
                                return (
                                    // Adding key to a react fragment
                                    <React.Fragment key={i}>
                                        {
                                            chapter === window.location.pathname.split('/')[2] ?
                                                <option value={chapter} selected>{chapter} : {title}</option>
                                                :
                                                <option value={chapter}>{chapter} : {title}</option>
                                        }
                                    </React.Fragment>
                                )
                            })}
                        </select>
                    </div>

                    {lists()}

                    <div className={classes.content}>
                        <h1>
                            Chapter {response.chapter} : {response.title}
                        </h1>

                        {response.images?.map((item, i) => {
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