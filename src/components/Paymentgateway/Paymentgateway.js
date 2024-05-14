// PaymentGateway.js

import React, { useState, useEffect } from 'react';
import { loadScript } from './utils'; // Import loadScript function from utils

const PaymentGateway = ({ history }) => {
  const [paymentLoading, setPaymentLoading] = useState(true);

  // Razorpay integration function
  const loadRazorpay = async () => {
    const scriptSrc = 'https://checkout.razorpay.com/v1/checkout.js';

    // Load Razorpay script dynamically
    await loadScript(scriptSrc);

    setPaymentLoading(false);
  };

  // Initialize Razorpay
  const handlePayment = async () => {
    // Check if Razorpay is loaded
    if (!window.Razorpay) {
      await loadRazorpay();
    }

    // Check if Razorpay is still loading
    if (paymentLoading) {
      alert('Razorpay is still loading. Please wait a moment.');
      return;
    }

    // Create a Razorpay instance with your API key
    const razorpay = new window.Razorpay({
      key: 'YOUR_RAZORPAY_API_KEY',
      amount: 50000, // Amount in paise (e.g., 50000 paise = Rs. 500)
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Purchase Description',
      image: 'https://your-company-logo.png',
      order_id: 'YOUR_ORDER_ID', // You should generate the order ID on your server
      handler: function (response) {
        // Handle successful payment
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        history.push('/Success'); // Redirect to success page after successful payment
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '+919876543210',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#F37254',
      },
    });

    // Open Razorpay payment modal
    razorpay.open();
  };

  // Load Razorpay when component mounts
  useEffect(() => {
    loadRazorpay();
  }, []);

  return (
    <div>
      <h1>Razorpay Payment Gateway</h1>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentGateway;
