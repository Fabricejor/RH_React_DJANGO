from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import logging
from .services import get_supabase_client,create_supabase_record, read_supabase_record, update_supabase_record, delete_supabase_record

logger = logging.getLogger(__name__)

class EntrepriseListCreateView(APIView):
    def get(self, request):
        try:
           data= read_supabase_record(table_name="entreprise")
           if data:
              return Response(data, status=status.HTTP_200_OK)
           else:
              return Response({'message': 'Pas d\'entreprises'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Erreur lors de la recuperation des entreprises: {e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def post(self, request):
        try:
            response = create_supabase_record(table_name="entreprise",data = request.data)
            if response:
                 return Response(response, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'Erreur lors de la creation de l\'entreprise'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Erreur lors de la creation de l'entreprise: {e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EntrepriseRetrieveUpdateDeleteView(APIView):
    def get(self, request, pk):
        try:
           data= read_supabase_record(table_name="entreprise", filters = {"id_entreprise": pk})
           if data:
                return Response(data, status=status.HTTP_200_OK)
           else:
               return Response({'message': 'Entreprise non trouvé'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Erreur lors de la recuperation de l\'entreprise:{e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        try:
            response = update_supabase_record(table_name="entreprise", record_id=pk, data=request.data)
            if response:
                return Response(response, status=status.HTTP_200_OK)
            else:
               return Response({'message': 'Erreur lors de la modification de l\'entreprise'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
           logger.error(f"Erreur lors de la modification de l\'entreprise:{e}")
           return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        try:
             response = delete_supabase_record(table_name="entreprise", record_id=pk)
             if response:
                 return Response({'message': 'Entreprise supprimée'}, status=status.HTTP_204_NO_CONTENT)
             else:
                  return Response({'message': 'Erreur lors de la suppression de l\'entreprise'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
           logger.error(f"Erreur lors de la suppression de l\'entreprise:{e}")
           return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)