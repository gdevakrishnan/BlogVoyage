import React, { Fragment, useContext, useState } from 'react'
import userContext from '../context/userContext'
import PageNotFound from './PageNotFound';
import { useNavigate } from 'react-router-dom';
import Blogs from './Blogs';

function Blog() {
    const { aBlogDetails, setABlogDetails } = useContext(userContext);
    const nav = useNavigate();
    const BASE_URL = "http://localhost:5000/public/thumbnails/";
    const [playing, setPlaying] = useState(true);
    const msg = new SpeechSynthesisUtterance()

    const backBtn = (e) => {
        e.preventDefault();
        nav('/blogs');
        window.speechSynthesis.cancel()
        setABlogDetails(null);
        
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    const handlePlayPause = () => {
        setPlaying(!(playing));
        if (playing) {
            window.speechSynthesis.cancel()
        } else {
            msg.text = aBlogDetails.blog;
            window.speechSynthesis.speak(msg)
        }
    }

    return (
        <Fragment>
            {
                (aBlogDetails) ? (
                    <Fragment>
                        <section className='page Ablog_page'>
                            <div className="main">
                                <div className="btn">
                                    <button className="backBtn" onClick={(e) => backBtn(e)}>Back</button>
                                </div>
                                <div className="content">
                                    <h1 className='blogTitle'>{aBlogDetails.blogTitle}</h1>
                                    <p className='blogAuthor'>Author: {aBlogDetails.uname}</p>

                                    <button onClick={() => handlePlayPause()} className='speecBtn'>
                                        {(playing) ? (<h3>Stop <i className='fa fa-volume-off'></i></h3>) : (<h3>Play <i className='fa fa-volume-up'></i></h3>)}
                                    </button>

                                    <div className="img_container">
                                        <img src={`${BASE_URL}${aBlogDetails.thumbnail}`} alt={aBlogDetails.blogTitle} />
                                    </div>
                                    <p className='blog'>
                                        {aBlogDetails.blog}
                                    </p>
                                </div>
                            </div>
                        </section>
                        <h1 style={{ textAlign: "center" }}>Recommendations</h1>
                        <Blogs />
                    </Fragment>
                ) : (
                    <PageNotFound />
                )
            }
        </Fragment>
    )
}

export default Blog