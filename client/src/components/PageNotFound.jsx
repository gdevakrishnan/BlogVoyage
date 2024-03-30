import React, { Fragment } from 'react'

function PageNotFound() {
  window.speechSynthesis.cancel();

  return (
    <Fragment>
        <div className="page pageNotFound">
            <div className="main">
                <h1 className='pnfTitle'>404</h1>
                <p className="pnfDesc">Page Not Found</p>
            </div>
        </div>
    </Fragment>
  )
}

export default PageNotFound