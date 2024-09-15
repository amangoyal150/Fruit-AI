from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
# import requests

app = FastAPI()

# CORS settings for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL where your React app is running
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy Data (initial state)
faqs = [
    {"id": 1, "question": "What is an apple?", "answer": "A sweet red fruit."},
    {"id": 2, "question": "What is a banana?", "answer": "A long yellow fruit."}
]

class FAQ(BaseModel):
    id: Optional[int] = None  # Include `id` in the response model
    question: str
    answer: str

class FAQUpdate(BaseModel):
    question: Optional[str] = None  # Allow None for partial update
    answer: Optional[str] = None

# Get all FAQs
@app.get("/faqs", response_model=List[FAQ])
def get_faqs():
    return faqs

# Get a specific FAQ by ID
@app.get("/faqs/{faq_id}", response_model=FAQ)
def get_faq(faq_id: int):
    faq = next((faq for faq in faqs if faq["id"] == faq_id), None)
    if faq is None:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return faq

# Create a new FAQ
@app.post("/faqs", response_model=FAQ)
def create_faq(faq: FAQ):
    new_faq = {"id": len(faqs) + 1, "question": faq.question, "answer": faq.answer}
    faqs.append(new_faq)
    return new_faq

# Update an existing FAQ
@app.put("/faqs/{faq_id}", response_model=FAQ)
async def update_faq(faq_id: int, faq_update: FAQUpdate):
    faq = next((faq for faq in faqs if faq["id"] == faq_id), None)
    if faq is None:
        raise HTTPException(status_code=404, detail="FAQ not found")
    
    if faq_update.question:
        faq["question"] = faq_update.question
    if faq_update.answer:
        faq["answer"] = faq_update.answer
    return faq

# Delete an FAQ
@app.delete("/faqs/{faq_id}")
def delete_faq(faq_id: int):
    global faqs
    faqs = [faq for faq in faqs if faq["id"] != faq_id]
    return {"message": "FAQ deleted successfully"}

