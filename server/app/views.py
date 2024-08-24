from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from . models import *
from . serializer import *
from rest_framework.response import Response
import json
# Create your views here.



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
    return JsonResponse({'message': "Hi! I'm a helpful AI assistant for help with your recipe!"})