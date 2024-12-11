# steyemployed-frontend

This service is designed to facilitate job searching within our application. It allows users to search for jobs using various filters, such as location, job type, and keywords. The service integrates with external job listing APIs to provide up-to-date and relevant job opportunities.

## Responsibilities
**Job Search:** Users can search for jobs by entering keywords, location, job type, and other parameters.
**Filtering and Sorting: ** Provides options to filter jobs based on relevance, contract period, and more.
**Integration: ** Fetches job data from external APIs and formats it for use in the application.

## FastAPI

This service is built using FastAPI, a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.

Key features of FastAPI used in this service:

Asynchronous Request Handling: FastAPI handles requests asynchronously, ensuring high performance even with many concurrent requests.
Automatic Validation: Input validation is automatically handled using Pydantic models, ensuring data integrity.
OpenAPI Documentation: FastAPI generates automatic interactive API documentation using Swagger UI, making it easy to interact with the API endpoints and test them.

## Deployment

The service is deployed in a cloud-based environment on AWS ECS. This service is part of the Stay Employed App, ensuring seamless integration with other components of the application.
