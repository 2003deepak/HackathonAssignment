# Social Media Analyzer  

The **Social Media Analyzer** is a smart and interactive platform designed to provide actionable insights into social media performance. Whether you're a business, influencer, or data enthusiast, this tool helps you analyze specific post types (like Reels, Stories, or Images) and delivers aggregated insights, such as average views and engagement rates.  

By leveraging the power of **Astra DB** for data management and **Langflow** for data abstraction, our project simplifies social media analytics like never before.  

---

## 🎥 Working Video  

Click the thumbnail below to watch the working video of the project:  

<br>
<p align="center">
  <a href="https://www.youtube.com/watch?v=jFdH57cszEA&ab_channel=DeepakKumar">
    <img src="https://img.youtube.com/vi/jFdH57cszEA/0.jpg" alt="Working Video">
  </a>
</p>
<br>


## 🎯 About the Project  

### 🌟 Key Features:  

1. **Interactive Post Selection**  
   Users can specify the post type they want to analyze (e.g., Reels).  

2. **Dynamic Data Fetching**  
   Relevant data is fetched from **Astra DB**, ensuring accurate and up-to-date results.  

3. **Data Averaging & Insights**  
   The platform calculates averages for metrics like engagement rates, views, and more, offering clear insights into post performance.  

4. **Intuitive Workflow**  
   Powered by **Langflow**, the backend efficiently abstracts and processes raw data into actionable insights.  

---

### Why Astra DB?  
Astra DB provides:  
- **Effortless Scalability**: Handles large volumes of data seamlessly.  
- **High Availability**: Ensures uninterrupted performance.  
- **Easy Integration**: Simplifies the database setup and query process.  

### Why Langflow?  
Langflow empowers our project to:  
- Abstract complex data processes into simple, actionable workflows.  
- Deliver insights quickly without manual intervention.  
- Create a streamlined and efficient analytics pipeline.  

---

## 🛠️ How It Works  

1. **User Input**  
   - Users select the type of post they wish to analyze, such as "Reels."  

2. **Data Retrieval**  
   - The backend queries **Astra DB** to fetch relevant data for the selected post type.  

3. **Data Processing**  
   - The raw data is abstracted using **Langflow**, generating insights like average engagement rates, likes, and views.  

4. **Result Delivery**  
   - The processed data is displayed in an easy-to-understand format.  

---

## 🚀 How to Set Up the Project  

### Prerequisites  
Ensure you have the following installed:  
- **Node.js** (v14 or above)  
- **npm**  

### Steps  

1. **Clone the Repository**  
   ```bash
   git clone <repository-url>
   cd <repository-directory>


2. **Navigate to the Backend Directory**
    ```bash
    cd Backend


3. **Install Backend Dependencies**
    ```bash
    npm i

4. **Navigate to the Frontend Directory**
    ```bash
    cd Frontend

5. **Install Frontend Dependencies**
   
    ```bash
    npm i

7. **Set Up the Environment Variables**
Navigate back to the Backend directory:
Create a .env file in the Backend directory and add the following values:

    ```bash 
    LANGFLOW_API_URL=<your-langflow-api-url>
    AUTH_TOKEN=<your-auth-token>
    ASTRA_DB_TOKEN=<your-astra-db-token>
    ASTRA_DB_URL=<your-astra-db-url>


8. **Start the Backend Server**
Once the environment variables are set, start the backend server with the following command:

  ```bash
    npm start

```

<br>
The project will be running at <b>localhost:5173</b>

<br>
<br>





## 🌐 Built With  

### **Astra DB**  
A highly scalable and serverless database solution.

### **Langflow**  
A tool that simplifies data abstraction and workflow management.

### **Node.js & React**  
For a seamless backend and frontend experience.




