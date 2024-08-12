const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/api/forward', async (req, res) => {
    console.log('Request received:', req.body);
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', req.body);
        console.log('Response from Laravel:', response.data);
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error response from Laravel:', error.response.data);
            res.status(500).json({ message: 'Error forwarding request', error: error.response.data });
        } else {
            console.error('Error forwarding request:', error.message);
            res.status(500).json({ message: 'Error forwarding request', error: error.message });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
