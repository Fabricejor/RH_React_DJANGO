from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import logging
import os
from supabase import create_client, Client

logger = logging.getLogger(__name__)


def get_supabase_client():
    """Initialise le client Supabase."""
    url = os.getenv("https://zbpiflnlvdwyvcwzfzug.supabase.co")
    key = os.getenv("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicGlmbG5sdmR3eXZjd3pmenVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxODA5NDYsImV4cCI6MjA1Mzc1Njk0Nn0.UXEUqtBQNVVf7ByvYqz-2sP4BuI-Wj07NaYAa9Dw5pk")
    supabase = create_client(url, key)
    return supabase


def create_supabase_record(table_name, data):
     try:
          supabase = get_supabase_client()
          response = supabase.table(table_name).insert(data).execute()
          if response.error:
               logger.error(f"Erreur lors de l'insertion des données dans Supabase dans la table {table_name}: {response.error}")
               return None
          return response.data
     except Exception as e:
          logger.error(f"Erreur lors de l'insertion des données dans Supabase dans la table {table_name}: {e}")
          return None

def read_supabase_record(table_name, filters=None, columns="*"):
     try:
          supabase = get_supabase_client()
          query = supabase.table(table_name).select(columns)
          if filters:
               for key, value in filters.items():
                   query = query.eq(key, value)
          response = query.execute()
          if response.error:
              logger.error(f"Erreur lors de la lecture de données dans Supabase dans la table {table_name}: {response.error}")
              return None
          return response.data
     except Exception as e:
         logger.error(f"Erreur lors de la lecture de données dans Supabase dans la table {table_name}: {e}")
         return None

def update_supabase_record(table_name, record_id, data):
    try:
        supabase = get_supabase_client()
        response = supabase.table(table_name).update(data).eq("id", record_id).execute()
        if response.error:
            logger.error(f"Erreur lors de la mise à jour des données dans Supabase dans la table {table_name}: {response.error}")
            return None
        return response.data
    except Exception as e:
          logger.error(f"Erreur lors de la mise à jour des données dans Supabase dans la table {table_name}: {e}")
          return None
def delete_supabase_record(table_name, record_id):
     try:
        supabase = get_supabase_client()
        response = supabase.table(table_name).delete().eq("id", record_id).execute()
        if response.error:
            logger.error(f"Erreur lors de la suppression des données dans Supabase dans la table {table_name}: {response.error}")
            return None
        return response.data
     except Exception as e:
         logger.error(f"Erreur lors de la suppression des données dans Supabase dans la table {table_name}: {e}")
         return None


class CVListCreateView(APIView):
    def get(self, request):
        try:
           data= read_supabase_record(table_name="cv_analysis")
           if data:
              return Response(data, status=status.HTTP_200_OK)
           else:
              return Response({'message': 'CVs non trouvé'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
             logger.error(f"Erreur lors de la recuperation des cvs:{e}")
             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
       try:
            response = create_supabase_record(table_name="cv_analysis", data=request.data)
            if response:
                return Response(response, status=status.HTTP_201_CREATED)
            else:
              return Response({'message': 'Erreur lors de la creation du cv'}, status=status.HTTP_400_BAD_REQUEST)
       except Exception as e:
           logger.error(f"Erreur lors de la creation du cv:{e}")
           return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CVRetrieveUpdateDeleteView(APIView):
    def get(self, request, pk):
         try:
            data= read_supabase_record(table_name="cv_analysis", filters = {"id": pk})
            if data:
              return Response(data, status=status.HTTP_200_OK)
            else:
              return Response({'message': 'CV non trouvé'}, status=status.HTTP_404_NOT_FOUND)
         except Exception as e:
            logger.error(f"Erreur lors de la recuperation du cv:{e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
       try:
           response = update_supabase_record(table_name="cv_analysis", record_id=pk, data=request.data)
           if response:
              return Response(response, status=status.HTTP_200_OK)
           else:
              return Response({'message': 'Erreur lors de la modification du cv'}, status=status.HTTP_400_BAD_REQUEST)
       except Exception as e:
           logger.error(f"Erreur lors de la modification du cv:{e}")
           return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        try:
           response = delete_supabase_record(table_name="cv_analysis", record_id=pk)
           if response:
               return Response({'message': 'CV supprimé'}, status=status.HTTP_204_NO_CONTENT)
           else:
              return Response({'message': 'Erreur lors de la suppression du cv'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
           logger.error(f"Erreur lors de la suppression du cv:{e}")
           return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)