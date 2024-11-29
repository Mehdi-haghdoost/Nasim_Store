import React from 'react';
import styles from './TicketsMessage.module.css';
import SentTicket from './sentTicket';
import RecievedTicket from './recievedTicket';
import ReplayFormTicket from './ReplayFormTicket';
const TicketsMessage = () => {
    return (
        <div className={styles.ticket_message}>
            <SentTicket />
            <RecievedTicket />

            <ReplayFormTicket />
        </div>
    )
}

export default TicketsMessage