# Deployment Setup for BITES&BRIEF

This folder contains the necessary files to set up the deployment of the BITES&BRIEF application using Docker and Kubernetes (K8S). It includes the `Dockerfile`, service configurations, and Kubernetes deployment files along with the source code.

For the complete project setup and detailed instructions, please refer to the main repository here: https://github.com/RgiriH/GoT_preactical_implimentation_review_analysing_AI_agentic_system/tree/master.

# Zomato Review Analyzer Deployment

This project is a full-stack application that automates the extraction and analysis of customer reviews from platforms like Zomato. The application is structured into two components:
- **Frontend**: Built with React, located in `clint/clint`.
- **Backend**: Built with Node.js, located in `server`.

Follow the steps below to clone and deploy the application using Docker.

## Prerequisites

Ensure you have the following installed:
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Git**: [Install Git](https://git-scm.com/)

---


## 1. Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/RgiriH/zomato-review-analyzer-deployment.git
cd zomato-review-analyzer-deployment
```

### 2. Build and Run the Frontend Container

Navigate to the `clint/clint` directory:

```bash
cd clint/clint
docker build -t frontend:v1 .
docker run -d -p 3000:3000 --name frontend frontend:v1
```
The frontend will now be running and accessible at http://localhost:3000.

### 3. Build and Run the Backend Container

Navigate to the `server` directory:

```bash
cd ../../server
docker build -t backend:v1 .
docker run -d -p 8000:8000 --name backend backend:v1
```
The backend will now be running and accessible at http://localhost:8000 although you can not make a request directly from
the browser due to CORS.

use the command
```bash
docker ps 
```
to make sure both the containers are up and running.

## Testing in your local machine

- now open 
```bash
HTTP://localhost:3000 
```
on your machine were the frontend will be running

- Paste any Zomato URL of a restaurant review page, for example:
  ```bash
  https://www.zomato.com/bangalore/namaste-hsr-bangalore/reviews
  ```
  in the input and select the number of reviews you need to analyze.
  
- now click genarate summary and waite some seconds to few minutes to get the summary
