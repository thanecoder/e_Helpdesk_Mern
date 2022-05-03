import React from 'react'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {

    const { user } = useSelector(state => state.auth);

    const welcomeMessage = user && user?.name ? `Hi ${user.name}, Welcome to e-Helpdesk` : 'Hey there, Welcome to e-Helpdesk';

    return (
        <>
            <section className="heading">
                <h1>{welcomeMessage}</h1>
                <p>Please choose an option below</p>
            </section>

            <Link to='/new-ticket' className="btn btn-reverse btn-block">
                <FaQuestionCircle /> Create New Ticket
            </Link>
            <Link to='/tickets' className="btn btn-block">
                <FaTicketAlt /> View My Tickets
            </Link>
        </>
    )
}

export default Home