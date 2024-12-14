
export const processPayment = (amount, paymentDetails) => {
    return new Promise((resolve, reject) => {
        console.log(`Processing ${paymentDetails.method} payment for $${amount}`);

        // Simulate payment processing delay
        setTimeout(() => {
            if (Math.random() < 0.8) { // Simulating a higher chance of success
                resolve(`Payment of $${amount} via ${paymentDetails.method} was successful!`);
            } else {
                reject(`Payment failed. Please try again or use a different payment method.`);
            }
        }, 2000);
    });
};
