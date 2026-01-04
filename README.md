# Startup Valuation with Machine Learning

**Author:** Rudra Mantri

A machine learning-powered application that predicts startup valuations using XGBoost regression. This project leverages AWS SageMaker for model training and deployment, providing both a REST API and a web interface for startup valuation predictions.

## Overview

Startup valuation is a crucial and often complex process, as it involves predicting the future potential and success of a company that is still in its early stages of growth. Traditional methods of valuation such as the discounted cash flow method and the Berkus approach can be time-consuming and subjective. This project aims to find the important features that lead to startup success and provide an API for forecasting a company's valuation with supervised machine learning methods.

## Project Structure

```
├───client/          # React frontend application
│   ├───public/      # Static assets
│   └───src/         # React source code
│       ├───components/  # React components
│       └───images/       # Image assets
├───data/            # CSV datasets for training and testing
├───model/           # Jupyter notebook for model training
├───pictures/        # Images used in documentation
└───scripts/         # Python utility scripts
    ├── data_cleaner.py      # Data preprocessing script
    └── lambda_function.py   # AWS Lambda handler for API
```

## Tech Stack

### Frontend
- **React** - User interface framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests

### Backend & ML
- **Python** - Core programming language
- **Pandas** - Data manipulation and analysis
- **XGBoost** - Gradient boosting machine learning model
- **Scikit-Learn** - Machine learning utilities
- **Jupyter Notebook** - Model development environment

### Cloud Infrastructure
- **AWS SageMaker** - Model training and deployment
- **AWS Lambda** - Serverless compute for API
- **AWS API Gateway** - REST API management
- **AWS S3** - Model and data storage
- **AWS CloudWatch** - Logging and monitoring

## Methodology

<img src="./pictures/Machine Learning Pipeline.png" alt="Machine Learning Pipeline" width="1000" height="400" border="10" />

### Ingestion

Initial data sourced through kaggle https://www.kaggle.com/datasets/justinas/startup-investments from Crunchbase 2013 Snapshot © 2013

Much of the data however, was unusable because the target variable (i.e. the valuation of the startup) was not provided hence my eventual dataset consisted of just below 1000 data points. However, I believe this is adequate to train a reliable model.

### Cleaning / Preprocessing

Using Pandas, the tables from the datasets were merged to give the input for modeling, with columns that I find useful to the model. The features used are as shown below:

| Category | Features |
| --- | --- |
| General | created_at, funding_rounds, funding_total_usd, number_of_members, number_of_founders |
| Funding | funding rounds, amount raised (each round), currency = usd, number of vc invested, total funds from vc |
| Financial history | number of funding rounds, total amount, mean amount, max amount |
| Result | post_money_valuation |

### Modeling

Modelling the startup valuation is a complex problem where the variables utilized have to be carefully handpicked. As such, I took reference to a written research paper: Valuation of Startups: A Machine Learning Perspective. It discussed how they used 3 different types of models to predict the valuation of the startups, including multilayer perceptrons, Domain Adaptation Neural Networks and CatBoost. It eventually concluded that CatBoost gave the best results, hence I decided to go with a similar gradient boosting method, XGBoost.

From there, I also decided to utilize data that revolves around a funding round of the said startup, with a disclosed funding amount provided. 

I divided the data into training and test sets, with a test_size of 0.2 so that I could conduct validation tests on the test sets subsequently.

Eventually, I achieved an eventual root mean square error (rmse) of approximately 0.13, which I consider to be satisfactory.

The model was then deployed into the AWS S3 bucket for me to retrieve to use on the API.

### Deployment

Deployment of my application was made possible with the use of AWS Lambda and API Gateway. By utilizing AWS Lambda, I was able to create a serverless environment for the endpoint generated using AWS Sagemaker.

Furthermore, I utilized AWS API Gateway to establish a REST API. When a POST request is received, the API Gateway triggers the corresponding Lambda function, which houses the logic for making predictions using my model. The API Gateway then returns the output from the Lambda function to the client, providing a smooth and efficient process.

Next, to make the Machine Learning model scalable, I leverage the auto scaling feature in AWS so that multiple investors can access the endpoint with low latency. I have decided to perform a theoretical calculation and derived an assumption that there are around 125,000 active investors worldwide every minute which equates to 2,000 requests per seconds. Hence, the target value is 2,000 as shown below.

During my development on AWS Cloud environment, I also utilized the AWS CloudWatch logs to debug for errors and fixed my errors eventually along the way.
 
 <img src="./pictures/Autoscaling.png" alt="autoscaling" width="640" height="320" border="10" />

## Usage

<img src="./pictures/Startup-Valuation-Interface.png" alt="Startup Valuation Prediction Interface" width="800" height="600" />

### API Endpoint

The API is located at: [https://qw16rmz5wa.execute-api.ap-southeast-1.amazonaws.com/api/startupvaluationprediction](https://qw16rmz5wa.execute-api.ap-southeast-1.amazonaws.com/api/startupvaluationprediction)

### Testing with Postman

To try out the endpoint, you can import the Postman collection located at: [Postman Collection](https://github.com/RudraMantri123/Startup_ML/blob/main/StartupValuationPrediction.postman_collection.json).

The collection includes a sample request body and makes a POST request to the endpoint.

## Key Features

- **Machine Learning Model**: XGBoost regression model with RMSE of ~0.13
- **RESTful API**: Serverless API built with AWS Lambda and API Gateway
- **Web Interface**: Interactive React-based frontend for easy predictions
- **Scalable Architecture**: Auto-scaling configured for high throughput (2000 requests/second)
- **Feature Engineering**: Comprehensive feature selection including funding rounds, team size, and financial history

## Results

The model achieved a root mean square error (RMSE) of approximately 0.13 on the test set, which demonstrates satisfactory predictive performance for startup valuation estimation.

## References

Garkavenko, M., Mirisaee, H., Gaussier, É., Guerraz, A., & Lagnier, C. (2021). Valuation of Startups: A Machine Learning Perspective. ECIR.

## License

This project is open source and available for educational purposes.
