const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let sessions = {};
let nonceStore = {};

app.get('/api/nonce', (req, res) => {
  const nonce = Math.floor(Math.random() * 1000000).toString();
  nonceStore[nonce] = true;
  res.json({ nonce });
});

// app.post('/api/auth', (req, res) => {
//   const { signature, address } = req.body;
//   const message = `Sign this message to authenticate with nonce: ${nonce}`;

//   const signerAddress = ethers.utils.verifyMessage(message, signature);
//   if (signerAddress.toLowerCase() === address.toLowerCase()) {
//     sessions[address] = { session: 'active' };
//     res.json({ success: true });
//   } else {
//     res.status(401).json({ error: 'Invalid signature' });
//   }
// });


app.post('/api/auth', (req, res) => {
    const { signature, address, nonce } = req.body;
    const message = `Sign this message to authenticate with nonce: ${nonce}`;

    try {
      const signerAddress = ethers.utils.verifyMessage(message, signature);
      if (signerAddress.toLowerCase() === address.toLowerCase() && nonceStore[nonce]) {
        sessions[address] = { session: 'active' };
        delete nonceStore[nonce]; 
        res.json({ success: true });
      } else {
        res.status(401).json({ error: 'Invalid signature or nonce' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Verification failed' });
    }
  });

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
