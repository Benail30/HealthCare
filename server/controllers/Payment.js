// const express = require('express');
// const axios = require('axios');

// app.post('/api/add', async (req, res) => {
//   const url = "https://developers.flouci.com/api/generate_payment";
//   const pay = {
//     "app_token": "3ae91c05-02b2-4f92-9de8-bfcd08847afb",
//     "app_secret": "6a2f00e1-f15d-451c-82ba-149a5c5b4afb",
//     "amount": req.body.amount,
//     "accept_card": "true",
//     "session_timeout_secs": 1200,
//     "success_link": "http://localhost:3000/client/cart/success",
//     "fail_link": "http://localhost:3000/client/cart/fail",
//     "developer_tracking_id": "13360cca-3c0b-451f-b4c0-427d9bdd035d"
//   };
//   try {
//     const result = await axios.post(url, pay);
//     res.send(result.data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.get('/api/verify/:id', async (req, res) => {
//   try {
//     const result = await axios.get(`https://developers.flouci.com/api/verify_payment/${req.params.id}`,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'apppublic': '3ae91c05-02b2-4f92-9de8-bfcd08847afb',
//           'appsecret': '6a2f00e1-f15d-451c-82ba-149a5c5b4afb'
//         }
//       });
//     res.send(result.data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

