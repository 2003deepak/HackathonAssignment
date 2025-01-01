require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Static request body data
const staticRequestBody = {
  input_value: "message",  // Static message to be sent
  output_type: "chat",
  input_type: "chat",
  tweaks: {
    "CustomComponent-swIY5": {},
    "MistralModel-tXOtX": {},
    "Prompt-jtEp6": {},
    "ChatOutput-6XNv6": {}
  }
};

// POST route for proxying the LangFlow API call with streaming
app.post('/api/langflow', async (req, res) => {
  try {
    // Set up the streaming response from LangFlow API
    const response = await axios.post(process.env.LANGFLOW_API_URL, staticRequestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.AUTH_TOKEN,  
      },
      responseType: 'stream',  // Ensure that we request the stream from LangFlow
    });

    // Stream data to the client as it's received from LangFlow
    response.data.on('data', (chunk) => {
      const chunkStr = chunk.toString();
      res.write(chunkStr); // Send chunk to client
    });

    // When the stream ends, close the response
    response.data.on('end', () => {
      res.end();
    });

    // Error handling for the stream
    response.data.on('error', (err) => {
      console.error('Stream error:', err);
      res.status(500).json({ error: 'Error while streaming data.' });
    });

  } catch (error) {
    console.error('Error calling LangFlow API:', error.message);

    // Error handling based on the type of error
    let errorMessage = 'An error occurred while processing your request.';
    if (error.response) {
      errorMessage = `LangFlow API Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`;
    } else if (error.request) {
      errorMessage = 'No response received from LangFlow API.';
    }

    // Send the error message as response
    res.status(500).json({ error: errorMessage });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
