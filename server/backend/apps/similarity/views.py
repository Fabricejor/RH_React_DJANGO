from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .service import calculate_and_save_similarity, read_supabase_record
import logging
from django.db.models import Q
from .service import  get_supabase_client,create_supabase_record, read_supabase_record, update_supabase_record, delete_supabase_record
import logging

logger = logging.getLogger(__name__)



class ResultListCreateView(APIView):
    def get(self, request):
        try:
            data= read_supabase_record(table_name="similarity_result")
            if data:
                 return Response(data, status=status.HTTP_200_OK)
            else:
                 return Response({'message': 'Résultats non trouvé'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Erreur lors de la recuperation des résultats:{e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def post(self, request):
        try:
            response = create_supabase_record(table_name="similarity_result",data=request.data)
            if response:
                 return Response(response, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'Erreur lors de la creation du résultat'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Erreur lors de la creation du résultat: {e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ResultRetrieveUpdateDeleteView(APIView):
    def get(self, request, pk):
       try:
            data= read_supabase_record(table_name="similarity_result", filters = {"result_id": pk})
            if data:
                return Response(data, status=status.HTTP_200_OK)
            else:
                 return Response({'message': 'Resultat non trouvé'}, status=status.HTTP_404_NOT_FOUND)
       except Exception as e:
          logger.error(f"Erreur lors de la recuperation du resultat:{e}")
          return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
       try:
            response = update_supabase_record(table_name="similarity_result", record_id=pk, data=request.data)
            if response:
                 return Response(response, status=status.HTTP_200_OK)
            else:
                  return Response({'message': 'Erreur lors de la modification du resultat'}, status=status.HTTP_400_BAD_REQUEST)
       except Exception as e:
           logger.error(f"Erreur lors de la modification du resultat:{e}")
           return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        try:
            response = delete_supabase_record(table_name="similarity_result", record_id=pk)
            if response:
                return Response({'message': 'Resultat supprimé'}, status=status.HTTP_204_NO_CONTENT)
            else:
                 return Response({'message': 'Erreur lors de la suppression du résultat'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
           logger.error(f"Erreur lors de la suppression du resultat:{e}")
           return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class CalculateSimilarityView(APIView):
     def post(self, request):
        id_cv = request.data.get('id_cv')
        id_offre = request.data.get('id_offre')
        if not id_cv or not id_offre:
            logger.error("id_cv and id_offre are required")
            return Response({'error': 'id_cv and id_offre are required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            result = calculate_and_save_similarity(id_cv, id_offre)
            if result:
               return Response(result, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Erreur lors du calcul de similarité'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"\n view.py Erreur lors du calcul de la similarité: {e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class FilterResultsView(APIView):
    def get(self, request):
        try:
            queryset = read_supabase_record(table_name="similarity_result")
            if not queryset:
                 return Response({'message': 'Pas de resultats'}, status=status.HTTP_404_NOT_FOUND)

            skills = request.query_params.get('skills')
            similarity_threshold = request.query_params.get('similarity_threshold')
            num_results = request.query_params.get('num_results')
            filtered_results = queryset

            if skills:
               skills_list = [skill.strip() for skill in skills.split(",")]
               filtered_results = [result for result in filtered_results if any(skill in result["cv"]["competences"] for skill in skills_list)]
            if similarity_threshold:
               try:
                    threshold = float(similarity_threshold)
                    filtered_results = [result for result in filtered_results if result["cosine_similarity"] >= threshold]

               except ValueError:
                    logger.error("Erreur lors de la conversion du seuil de similarité")
            if num_results:
                try:
                    limit = int(num_results)
                    filtered_results = filtered_results[:limit]
                except ValueError:
                    logger.error("Erreur lors de la conversion du nombre de résultats")
                    pass
            return Response({'results': filtered_results}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Erreur lors de la recuperation des resultats:{e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

class GetResultByOffer(APIView):
    def get(self, request, id_offre):
          try:
              data= read_supabase_record(table_name="similarity_result", filters={"id_offre": id_offre})
              if data:
                    return Response(data, status=status.HTTP_200_OK)
              else :
                  return Response({'message': 'Resultats non trouvé'}, status=status.HTTP_404_NOT_FOUND)
          except Exception as e:
              logger.error(f"Erreur lors de la recuperation des résultats par l'id de l'offre d'emploi:{e}")
              return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)