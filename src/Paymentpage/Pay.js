import React, { useState } from 'react';
import QRCode from 'qrcode.react';
// import setpriceorder from '../pageorder/Logic';
const generatePayload = require('promptpay-qr');


export default function Pay() {

  const [ phoneNumber, setPhoneNumber ] = useState("0661651693");
  const [ amount, setAmount ] = useState();         
  const [ qrCode ,setqrCode ] = useState("sample");

  function handlePhoneNumber() {
    setPhoneNumber("0661651693");
  }
  function handleAmount() {
    setAmount(parseFloat(10));
  }
  function handleQR() {
    setqrCode(generatePayload(phoneNumber, { amount }));
  }
  return(
    <div>
      <h2>I'm out of money so please donate me!</h2>
      <input type="text" value={phoneNumber} onChange={handlePhoneNumber} />
      <input type="number" value={amount} onChange={handleAmount} />
      <button onClick={handleQR}>Generate Promptpay QR</button>
      <QRCode value={qrCode} />
    </div>
   );
}
// const orderId ='E001'
//   const amount = calprice()
//   const qrCodeData = 'example_qr_code_data'
//   const paymentSubmit = (event) => {
//     event.preventDefault();
//     const paymentInfo = { amount: amount, orderId: orderId };
//     const body = new URLSearchParams({
//       paymentInfo: encodeURIComponent(JSON.stringify(paymentInfo)),
//       qrCodeData: qrCodeData
//     });
//     fetch(`http://localhost:3333/payments/:${orderId}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       body: body
//     })
//     .then(response => {
//       if (response.ok) {
//         alert('Payment successful!');
//       } else {
//         alert('Payment failed. Please try again later.');
//       }
//     })
//     .catch(error => {
//       console.error(error);
//       alert('Payment failed. Please try again later.');
//     });
//   }