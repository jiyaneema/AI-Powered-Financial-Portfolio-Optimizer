

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict
import os

from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only. Use specific origins in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class OptimizeRequest(BaseModel):
    amount: float
    time_horizon: int
    risk_tolerance: str
    goal: str

class ExplanationRequest(BaseModel):
    question: str

def get_gpt_explanation(goal: str, risk: str, years: int, portfolio_data: Dict[str, int]) -> str:
    prompt = (
        "You are a financial advisor. Given the user's investment goal: '{goal}', risk level: '{risk}', "
        "and a time horizon of {years} years, explain why this portfolio allocation is appropriate: {portfolio_data}. "
        "Make the explanation clear and simple."
    ).format(goal=goal, risk=risk, years=years, portfolio_data=portfolio_data)
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
    model = genai.GenerativeModel("models/gemini-2.5-flash")

    response = model.generate_content(prompt)
    return response.text.strip()

@app.get("/")
def root():
    return {"message": "AI-Powered Financial Portfolio Optimizer Backend"}

@app.post("/optimize")
def optimize_portfolio(request: OptimizeRequest):
    # Dummy rule-based allocation
    allocation = {"Stocks": 70, "Bonds": 10, "ETFs": 20}
    try:
        explanation = get_gpt_explanation(
            goal=request.goal,
            risk=request.risk_tolerance,
            years=request.time_horizon,
            portfolio_data=allocation
        )
    except Exception as e:
        explanation = f"[GPT-4 unavailable - Error: {str(e)}]"
        print(f"Error generating explanation: {e}")
    return {"optimized_allocations": allocation, "explanation": explanation}

@app.get("/alpaca-data")
def get_alpaca_data():
    # Placeholder for Alpaca API integration
    return {"data": "Dummy Alpaca data"}

@app.post("/explanation")
def get_explanation(request: ExplanationRequest):
    # Placeholder for OpenAI GPT-4 integration
    return {"explanation": f"Dummy explanation for: {request.question}"} 


