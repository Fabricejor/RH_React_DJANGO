from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import logging
from .services import get_supabase_client, create_supabase_record, read_supabase_record, update_supabase_record, delete_supabase_record
from apps.users.service import preprocess_text
import uuid

logger = logging.getLogger(__name__)


class JobOfferListCreateView(APIView):
    def get(self, request):
        try:
           data= read_supabase_record(table_name="offre")
           if data:
              return Response(data, status=status.HTTP_200_OK)
           else:
              return Response({'message': 'Offres non trouvé'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
             logger.error(f"Erreur lors de la recuperation des offres:{e}")
             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            response = create_supabase_record(table_name="offre",data = request.data)
            if response:
                return Response(response, status=status.HTTP_201_CREATED)
            else:
              return Response({'message': 'Erreur lors de la creation de l\'offre'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Erreur lors de la creation de l\'offre: {e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class JobOfferRetrieveUpdateDeleteView(APIView):
    def get(self, request, pk):
        try:
            data= read_supabase_record(table_name="offre", filters = {"id_offre": pk})
            if data:
              return Response(data, status=status.HTTP_200_OK)
            else:
               return Response({'message': 'Offre non trouvée'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Erreur lors de la recuperation de l\'offre:{e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
         try:
            response = update_supabase_record(table_name="offre", record_id=pk, data=request.data)
            if response:
              return Response(response, status=status.HTTP_200_OK)
            else :
              return Response({'message': 'Erreur lors de la modification de l\'offre'}, status=status.HTTP_400_BAD_REQUEST)
         except Exception as e:
             logger.error(f"Erreur lors de la modification de l\'offre:{e}")
             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def delete(self, request, pk):
        try:
           response = delete_supabase_record(table_name="offre", record_id=pk)
           if response:
                return Response({'message': 'Offre supprimée'}, status=status.HTTP_204_NO_CONTENT)
           else:
                return Response({'message': 'Erreur lors de la suppression de l\'offre'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Erreur lors de la suppression de l\'offre:{e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class JobOfferCreateViewWithAnalysis(APIView):
    def post(self, request):
        titre = request.data.get('titre')
        offre_societe = request.data.get('offre_societe')
        description = request.data.get('description')
        if not titre or not offre_societe or not description:
             logger.error("Le titre, le nom de la société et le texte de l'offre sont requis")
             return Response({'error': 'titre, offre_societe and description are required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            # 1. Prétraitement du texte de l'offre
            preprocessed_offre_text = preprocess_text(description)
            # 2. Enregistrement de l'offre

            data = {"titre": titre,
                    "offre_societe": offre_societe,
                    "description_pretraite": preprocessed_offre_text,
                    "description": description,
                    "id_offre":str(uuid.uuid4())}
            response = create_supabase_record(table_name="offre", data=data)
            if not response:
                  logger.error("Erreur lors de l'enregistrement de l'offre d'emploi")
                  return Response({'error': 'Erreur lors de l\'enregistrement de l\'offre d\'emploi'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'message': 'Job offer created with preprocessed text successfully', 'offer_id': response[0]["id_offre"]}, status=status.HTTP_201_CREATED)
        except Exception as e:
              logger.error(f"Une erreur s'est produite: {e}")
              return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)