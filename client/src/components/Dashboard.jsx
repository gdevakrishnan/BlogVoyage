import React, { Fragment } from 'react'

function Dashboard() {
  window.speechSynthesis.cancel();

  return (
    <Fragment>
      <section className="page dashboard">
        <h1 className="dashboard_title">Blog Voyage</h1>
        <p className="dashboard_desc">
          Write your World!
        </p>
      </section>
    </Fragment>
  )
}

export default Dashboard