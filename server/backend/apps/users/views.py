from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.ai_integration.services import autocomplete_cv_info, analyze_text_style, detect_ai_generated_text
import os
from .service import get_supabase_client, create_supabase_record, read_supabase_record, update_supabase_record, delete_supabase_record, preprocess_text, send_recommendation_email
import logging
from apps.pdf_processing.service import extract_text_from_pdf
import uuid
from apps.cv_analysis.services import create_supabase_record as create_supabase_record_cv

logger = logging.getLogger(__name__)


class CandidateListCreateView(APIView):
    def get(self, request):
        try:
           data= read_supabase_record(table_name="candidat")
           if data:
              return Response(data, status=status.HTTP_200_OK)
           else:
                return Response({'message': 'Pas de candidats'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
             logger.error(f"Erreur lors de la recuperation des candidats:{e}")
             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
                response = create_supabase_record("candidat", data=request.data)
                if response:
                    return Response(response, status=status.HTTP_201_CREATED)
                else:
                     return Response({'message': 'Erreur lors de la creation du candidat'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
                logger.error(f"Erreur lors de la creation du candidat:{e}")
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CandidateRetrieveUpdateDeleteView(APIView):
    def get(self, request, pk):
        try:
           data= read_supabase_record(table_name="candidat", filters = {"id_candidat": pk})
           if data:
              return Response(data, status=status.HTTP_200_OK)
           else:
              return Response({'message': 'Candidat non trouvé'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
             logger.error(f"Erreur lors de la recuperation du candidat:{e}")
             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def put(self, request, pk):
         try:
              response = update_supabase_record(table_name="candidat", record_id=pk, data=request.data)
              if response:
                  return Response(response, status=status.HTTP_200_OK)
              else:
                   return Response({'message': 'Erreur lors de la modification du candidat'}, status=status.HTTP_400_BAD_REQUEST)
         except Exception as e:
              logger.error(f"Erreur lors de la modification du candidat:{e}")
              return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def delete(self, request, pk):
        try:
            response = delete_supabase_record(table_name="candidat", record_id=pk)
            if response:
                return Response({'message': 'Candidat supprimé'}, status=status.HTTP_204_NO_CONTENT)
            else:
                 return Response({'message': 'Erreur lors de la suppression du candidat'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
             logger.error(f"Erreur lors de la suppression du candidat:{e}")
             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CheckCandidateConnexion(APIView):
    def post(self, request):
        mail = request.data.get('mail')
        code = request.data.get('code')
        if not mail or not code:
            return Response({'error': 'mail and code are required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            response = read_supabase_record(table_name="candidat", filters={"mail": mail, "code":code})
            if response:
                return Response(response[0], status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            logger.error(f"Erreur lors de la connexion du candidat:{e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GenerateCodeView(APIView):
    def post(self, request):
        mail = request.data.get('mail')
        profil = request.data.get('profil')
        if not mail or not profil:
            return Response({'error': 'mail and profil are required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            import random
            import string
            code = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
            data = {"code": code, "profil": profil}
            response = update_supabase_record(table_name="candidat", record_id=mail, data=data)
            if response:
                 # Envoi de mail asynchrone
                 email_subject = f"Recommandation pour un profil de {profil}"
                 email_message = f"Voici votre code d'entretien : {code}\n\nRendez-vous sur ce lien pour un entretien"
                 send_recommendation_email(mail, email_subject, email_message)
                 return Response({'message': 'Code généré et envoyé par e-mail', 'code': code}, status=status.HTTP_200_OK)
            else:
               return Response({'message': 'Erreur lors de la generation du code'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Erreur lors de la generation du code:{e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateCandidateEvaluationView(APIView):
     def post(self, request):
        candidate_id = request.data.get('candidate_id')
        rating = request.data.get('rating')
        message = request.data.get('message')
        if not candidate_id or not rating or not message :
             return Response({'error': 'Candidate id, rating and message are required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
           data = {"rating": rating, "recommendation_message": message}
           response = update_supabase_record(table_name="candidat", record_id=candidate_id, data=data)
           if response:
                # Envoi de mail asynchrone
                 # Envoi de mail (pas implémenté, à faire avec Celery)
                 email_subject = f"Recommandation pour le candidat {response[0]['nom_prenom']} "
                 email_message = f"Vous avez été recommandé avec une note de {rating} étoiles.\n\n{message}"
                 send_recommendation_email(response[0]["mail"], email_subject, email_message)
                 return Response(response, status=status.HTTP_200_OK)
           else :
               return Response({'message': 'Erreur lors de la modification de evaluation du candidat'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
           logger.error(f"Erreur lors de la modification de evaluation du candidat:{e}")
           return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AutoCompleteCVView(APIView):
    def post(self, request):
        pdf_file = request.FILES.get('pdf_file')
        if not pdf_file:
            logger.error("Fichier pdf manquant")
            return Response({'error': 'PDF file is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
             # Enregistrez le fichier temporairement sur le disque
             import tempfile
             with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
                 for chunk in pdf_file.chunks():
                     tmp_file.write(chunk)
                 tmp_file_path = tmp_file.name

             result = autocomplete_cv_info(tmp_file_path)
             os.unlink(tmp_file_path) # Supprime le fichier temporaire
             if result:
                return Response({'result': result}, status=status.HTTP_200_OK)
             else:
               logger.error("L'autocompletion a echoué")
               return Response({'message': 'Autocompletion failed'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
             logger.error(f"Erreur lors de l'autocompletion: {e}")
             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RegisterCandidateWithAnalysisView(APIView):
    def post(self, request):
        pdf_file = request.FILES.get('pdf_file')
        nom_prenom = request.data.get('nom_prenom')
        mail = request.data.get('mail')
        numero_tlfn= request.data.get('numero_tlfn')
        if not pdf_file or not nom_prenom or not mail:
                logger.error("Fichier PDF, nom_prenom, mail sont requis")
                return Response({'error': 'pdf_file, nom_prenom and mail are required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            # 1. Extraction du texte du PDF
            cv_text = extract_text_from_pdf(pdf_file)
            if not cv_text :
                logger.error("Impossible d'extraire le texte du pdf")
                return Response({'error': 'Impossible d\'extraire le texte du pdf'}, status=status.HTTP_400_BAD_REQUEST)

            # 2. Analyse du style du texte
            style_analysis = analyze_text_style(cv_text)
            if not style_analysis :
                    logger.error("Erreur lors de l'analyse du style du texte")
                    return Response({'error': 'Erreur lors de l\'analyse du style du texte'}, status=status.HTTP_400_BAD_REQUEST)

            # 3. Détection IA
            ai_detection = detect_ai_generated_text(cv_text)
            if not ai_detection:
                logger.error("Erreur lors de la détection IA")
                return Response({'error': 'Erreur lors de la détection IA'}, status=status.HTTP_400_BAD_REQUEST)

                #4. Prétraitement du texte
            preprocessed_cv_text = preprocess_text(cv_text)
            # 5. Enregistrement du candidat

            data = {
                     "nom_prenom": nom_prenom,
                    "mail": mail,
                     "numero_tlfn": numero_tlfn,
                     "id_candidat": str(uuid.uuid4())
                }
            response = create_supabase_record(table_name="candidat", data=data)
            if not response:
                logger.error("Erreur lors de l'enregistrement du candidat")
                return Response({'error': 'Erreur lors de l\'enregistrement du candidat'}, status=status.HTTP_400_BAD_REQUEST)

            # 6. Enregistrement du CV

            data_cv = {
                    "id_cv": str(uuid.uuid4()),
                  "cv_text": cv_text,
                  "cv_pretraite": preprocessed_cv_text,
                  "id_candidat":response[0]["id_candidat"],
                "date_insertion": "2024-08-08"

              }
            response_cv = create_supabase_record_cv(table_name="cv_analysis", data=data_cv)
            if not response_cv :
                logger.error("Erreur lors de l'enregistrement du cv")
                return Response({'error': 'Erreur lors de l\'enregistrement du cv'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({
                            'message': 'Candidat and CV registered successfully',
                            'style_analysis': style_analysis,
                            'ai_detection': ai_detection,
                            'candidate_id':response[0]["id_candidat"],
                             'id_cv': response_cv[0]["id_cv"],
                            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.error(f"Une erreur s'est produite: {e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)