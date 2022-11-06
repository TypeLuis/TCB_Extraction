import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import classes from '../../styles/Chapter.module.scss'


const Chapter = () => {
    const router = useRouter();
    const number = router.query.Chapters

    const [response, setResponse] = useState()

    const getInfo = async () => {
        const check = number === undefined ? window.location.pathname.split('/')[1] : number
        const response = await axios.get(`${process.env.BACKEND_URL}/chapter/${check}`)
        setResponse(response)
        console.log(response)
    }

    useEffect(() => {
        getInfo()
    }, [])
    return (
        <div className={classes.main}>
            {
                response?.status === 200 &&
                <div className={classes.content}>
                    <div>{response.data.chapter} : {response.data.title}</div>

                    {response.data.images.map((item, i) => {
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