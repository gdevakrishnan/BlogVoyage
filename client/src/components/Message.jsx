import React, { Fragment, useContext } from 'react'
import userContext from '../context/userContext'

function Message() {
    const { msg, setMsg } = useContext(userContext);
    const closeMessage = (e) => {
        e.preventDefault();
        setMsg(null)
    }

    return (
        (msg) ? (
            <Fragment>
                <div className="msg_container">
                    <p className="msg">{msg}</p>
                    <div className="btn">
                        <button className="closeBtn" onClick={(e) => closeMessage(e)}>Close</button>
                    </div>
                </div>
            </Fragment>
        ) : null
    )
}

export default Message