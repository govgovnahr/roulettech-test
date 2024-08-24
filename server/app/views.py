from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from . models import *
from . serializer import *
from rest_framework.response import Response
import json
from openai import OpenAI
import os
# Create your views here.

ai_client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

class RecipeView(APIView):
    def get(self, request):
        output = [{"name": output.name,
                   "description": output.description}
                   for output in Recipe.objects.all()]
        return Response(output)
    
    def post(self, request):
        serializer = RecipeSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

@csrf_exempt  
def ai_assistant(request):
    #normally this would be with open_ai key but here we'll just have a baked response every time.
    print(request)
    # if request.method == "POST":
    #     data = json.loads(request.body)
    #     inputMessage = data['message']
    #     messages = [
    #         {"role":"user", "content":inputMessage},
    #     ]
    #     chat_completion = ai_client.chat.completions.create(
    #         messages=messages,
    #         model="gpt-3.5-turbo"
    #     )
    #     bot_response = chat_completion.choices[0].message.content
    #     return JsonResponse({"message": bot_response})
    # else:
    #     return JsonResponse({"error":"Invalid Request"}, status = 400)

    return JsonResponse({'message': "Hi! I'm a helpful AI assistant for help with your recipe!"})