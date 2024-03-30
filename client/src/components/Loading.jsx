import React, { Fragment } from 'react'

function Loading() {
  window.speechSynthesis.cancel();

  return (
    <Fragment>
        <section className="page loading_page">
            <div className="loader"></div>
        </section>
    </Fragment>
  )
}

export default Loading