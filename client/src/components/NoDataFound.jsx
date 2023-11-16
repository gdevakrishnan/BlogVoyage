import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

function NoDataFound() {
    const nav = useNavigate();
    
    return (
        <Fragment>
            <section className="page noDataFound_page">
                <h1 className='title'>No Data Found</h1>
                <button className='btn' onClick={() => nav('/')}>Home</button>
            </section>
        </Fragment>
    );
}

export default NoDataFound;