from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse

class CalculateView(APIView):
    def post(self, request):
        operation = request.data.get('operation')
        num1 = float(request.data.get('num1',0))
        num2 = float(request.data.get('num2',0))
        
        try:
            if operation == 'add':
                result = num1 + num2
            elif operation == 'subtract':
                result = num1 - num2
            elif operation == 'multiply':
                result = num1 * num2
            elif operation == 'divide':
                if num2 == 0:
                    return Response({"error":"Cannot divide by zero!"},status=status.HTTP_400_BAD_REQUEST)
                result = num1 / num2
            else:
                 return Response({"error":'Invalid Operation'},status=status.HTTP_400_BAD_REQUEST)
            return Response({"result":result})
        except ValueError:
            return Response({"error":'Invalid numbers'},status=status.HTTP_400_BAD_REQUEST)
        