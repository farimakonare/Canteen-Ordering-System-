import React, { useState } from 'react';
import { processPayment } from './PaymentUtils';

const PaymentButton = ({ totalAmount }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handlePayment = () => {
        setLoading(true);
        processPayment(totalAmount, { method: 'Credit Card' })
            .then(response => {
                setMessage(response);
                return verifyPaymentStatus('12345');
            })
            .then(verificationMessage => {
                setMessage(verificationMessage);
            })
            .catch(error => {
                setMessage(error);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div>
            {loading ? <p>Processing...</p> : <button onClick={handlePayment}>Pay Now</button>}
            <p>{message}</p>
        </div>
    );
};

export default PaymentButton;
