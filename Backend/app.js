require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const LangflowClient = require("./utils/langflowclient");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());



// app.post('/api/langflow', async (req, res) => {
//   // Extract `post_type` from query parameters
//   const { post_type } = req.query;

//   if (!post_type) {
//     return res.status(400).json({ error: "Missing required query parameter: post_type" });
//   }

//   // Static request body data with dynamic `post_type`
//   const staticRequestBody = {
//     input_value: "message",
//     output_type: "chat",
//     input_type: "chat",
//     tweaks: {
//       "CustomComponent-swIY5": {
//         api_endpoint: "DB_ENDPOINT",
//         collection_name: "social_media",
//         namespace: "default_keyspace",
//         post_type, // Dynamically set from query
//         token: "TOKEN"
//       },
//       "MistralModel-tXOtX": {
//         api_key: "MISTRAL_KEY",
//         input_value: "",
//         max_concurrent_requests: 3,
//         max_retries: 5,
//         max_tokens: null,
//         mistral_api_base: "",
//         model_name: "mistral-large-latest",
//         random_seed: 1,
//         safe_mode: false,
//         stream: true,
//         system_message: "You are a data analysis assistant specializing in social media engagement. Your task is to compare the performance of a selected post type (e.g., carousel, reels, static images) against other post types based on engagement metrics such as average likes, shares, and comments. When provided with the data: 1. Highlight how the selected post type performs relative to others for each metric. 2. Emphasize strengths or weaknesses of the selected post type compared to the others. 3. Provide actionable insights and observations in natural language, focusing on the differences in performance. For example: - If the selected post type (carousel) has 20% higher likes than others, mention this as an advantage. - If reels generate twice as many comments as the selected type, highlight this as a comparison. Always ensure your analysis is clear, concise, and easy to understand, making it actionable for decision-making.",
//         temperature: 0.1,
//         timeout: 60,
//         top_p: 1
//       },
//       "Prompt-jtEp6": {
//         template: `I would like an in-depth analysis of my social media performance, focusing on the selected post type and comparing it to two other post types: static, reels, and carousels. Below are the engagement metrics for each post type:
// {stats}

// Please analyze the performance of the selected post type in detail and compare it with the other post types. Provide the following insights and observations:

// 1. **Comparison Analysis**: Compare the engagement metrics of the selected post type against the other two post types. Highlight how the selected post type performs relative to others and what this comparison suggests about audience preferences.
// 2. **Strengths**: Highlight the unique strengths of the selected post type based on metrics such as likes, shares, comments, and bookmarks, and compare these to the strengths of the other post types.
// 3. **Weaknesses**: Identify the areas where the selected post type underperforms compared to other post types. Suggest specific strategies for improving engagement in these areas.
// 4. **Suggestions for Improvement**: Offer actionable recommendations to enhance the performance of the selected post type, considering its weaknesses and the strengths of other post types.
// 5. **Engagement Patterns**: Identify any trends or patterns in engagement for the selected post type and how they compare to engagement patterns in other post types. Suggest how these patterns can inform future content strategies.

// ### **Output Structure**
// #### Overview of Selected Post Type Performance:
// - Short summary of the engagement levels for the selected post type compared to others.

// #### Detailed Observations and Insights:
// 1. **Engagement Comparison**:
//    - Compare the selected post type against the other post types on likes, shares, comments, and bookmarks.
//    - Identify which metrics the selected post type excels in or lags behind.
// 2. **Strengths and Weaknesses**:
//    - Highlight the strengths of the selected post type and compare them to the strengths of other post types.
//    - Identify the weaknesses of the selected post type and suggest improvements.

// #### Actionable Recommendations:
// - Provide specific strategies to improve the performance of the selected post type, focusing on addressing weaknesses and leveraging audience preferences.

// #### Engagement Patterns:
// - Identify trends in the performance of the selected post type and compare these to patterns observed in the other post types.`,
//         stats: ""
//       },
//       "ChatOutput-6XNv6": {
//         background_color: "",
//         chat_icon: "",
//         data_template: "{text}",
//         input_value: "",
//         sender: "Machine",
//         sender_name: "AI",
//         session_id: "",
//         should_store_message: true,
//         text_color: ""
//       },
//       "ChatInput-KG31I": {
//         files: "",
//         background_color: "",
//         chat_icon: "",
//         post_type, // Dynamically set from query
//         sender: "User",
//         sender_name: "User",
//         session_id: "",
//         should_store_message: true,
//         text_color: ""
//       }
//     }
//   };

//   try {
//     // Set up the streaming response from LangFlow API
//     const response = await axios.post(process.env.LANGFLOW_API_URL, staticRequestBody, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': process.env.AUTH_TOKEN,
//       },
//       responseType: 'stream', 
//     });

//     // Stream data to the client as it's received from LangFlow
//     response.data.on('data', (chunk) => {
//       const chunkStr = chunk.toString();
//       res.write(chunkStr); // Send chunk to client
//     });

//     // When the stream ends, close the response
//     response.data.on('end', () => {
//       res.end();
//     });

//     // Error handling for the stream
//     response.data.on('error', (err) => {
//       console.error('Stream error:', err);
//       res.status(500).json({ error: 'Error while streaming data.' });
//     });
//   } catch (error) {
//     console.error('Error calling LangFlow API:', error.message);

//     // Error handling based on the type of error
//     let errorMessage = 'An error occurred while processing your request.';
//     if (error.response) {
//       errorMessage = `LangFlow API Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`;
//     } else if (error.request) {
//       errorMessage = 'No response received from LangFlow API.';
//     }

//     // Send the error message as response
//     res.status(500).json({ error: errorMessage });
//   }
// });





// Start the server


app.get("/api/test", async (req, res) => {
  // Destructure the request body
  const { inputType = 'chat', outputType = 'chat', stream = false } = req.body;
  const { post_type } = req.query; 

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Validate that 'post_type' is provided
  if (!post_type) {
      return res.status(400).send({ error: "'post_type' is required in the request query." });
  }


  // Set input value
  const inputValue = "message"; 

  // Constants for Langflow client
  const flowIdOrName = 'ee730ee8-7f57-4f79-b398-cdbbe25f7fa7';
  const langflowId = '74a26e5e-c51e-4144-864f-fe703f287ce9';
  const applicationToken = process.env.AUTH_TOKEN;
  const langflowClient = new LangflowClient('https://api.langflow.astra.datastax.com', applicationToken);

  try {
      
      // Tweaks object with the updated 'post_type' value
      const tweaks = {
          "ChatInput-KG31I": {
              "post_type": post_type, // Send post_type as part of the tweaks
          }
      };

      // Call the Langflow client to run the flow
      const response = await langflowClient.runFlow(
          flowIdOrName,
          langflowId,
          inputValue,
          inputType,
          outputType,
          tweaks,
          stream,
          (data) => {
              console.log("Received Stream Data:", data.chunk); // Handle streaming data
              res.write(JSON.stringify(data.chunk) + '\n');    // Send chunked data to the client
          },
          () => {
              console.log("Stream Closed"); // Handle stream close
              res.end(); // Close the response stream
          },
          (error) => {
              console.error("Stream Error:", error); // Handle stream error
              res.status(500).send({ error: "Stream error occurred." });
          }
      );

      // Handle non-streaming output
      if (!stream && response && response.outputs) {
          const flowOutputs = response.outputs[0];
          const firstComponentOutputs = flowOutputs.outputs[0];
          const output = firstComponentOutputs.outputs.message;

          return res.status(200).send(output.message.text); // Return the response text
      }
  } catch (error) {
      console.error("Main Error:", error.message);
      return res.status(500).send({ error: "Main Error: " + error.message });
  }
});





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

