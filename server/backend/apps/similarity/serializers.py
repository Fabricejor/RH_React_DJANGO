from rest_framework import serializers
from .models import Result
from apps.cv_analysis.models import CV
from apps.users.models import Candidat

class ResultSerializer(serializers.ModelSerializer):
    nom_prenom = serializers.SerializerMethodField()

    class Meta:
        model = Result
        fields = ['result_id', 'id_cv', 'id_offre', 'cosine_similarity', 'nom_prenom']

    def get_nom_prenom(self, obj):
        try:
            # Accéder au CV lié, puis au Candidat associé
            cv = obj.id_cv  # Assurez-vous que 'id_cv' est bien défini comme relation dans votre modèle Result
            candidat = cv.candidat  # Assurez-vous que 'candidat' est bien défini comme relation dans votre modèle CV
            return candidat.nom_prenom
        except AttributeError:
            return None  # Gérer le cas où l'une des relations est null
