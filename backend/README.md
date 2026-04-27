# Backend: AI-Powered Financial Portfolio Optimizer

This is the FastAPI backend for the AI-Powered Financial Portfolio Optimizer. It provides API endpoints for:

- Portfolio optimization using scikit-learn
- Fetching financial data from the Alpaca API
- Generating explanations using OpenAI GPT-4

For now, the backend uses in-memory or dummy data for development and testing.

--- 

## Usage

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
2. Run the FastAPI server:
   ```
   uvicorn main:app --reload
   ```

The API will be available at http://localhost:8000 