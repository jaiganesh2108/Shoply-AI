from django.shortcuts import render

# Create your views here.
import requests

from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(["POST"])
def chat(request):

    user_message = request.data.get("message")

    if not user_message:
        return Response(
            {"error": "Message is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    headers = {
        "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    data = {
        "model": "openrouter/free",
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are Shoply AI, a helpful AI shopping assistant. "
                    "Help users with products, shopping and general questions. "
                    "Be concise and friendly."
                ),
            },
            {
                "role": "user",
                "content": user_message,
            },
        ],
    }

    try:

        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=data,
            timeout=60,
        )

        response.raise_for_status()

        result = response.json()

        ai_message = result["choices"][0]["message"]["content"]

        return Response({
            "reply": ai_message
        })

    except requests.exceptions.RequestException as e:

        return Response(
            {
                "error": "AI service request failed",
                "details": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )