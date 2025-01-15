from rest_framework import serializers
from .models import Result
from apps.cv_analysis.models import CV
from apps.users.models import Candidat

class ResultSerializer(serializers.ModelSerializer):
    nom_prenom = serializers.SerializerMethodField()
    mail = serializers.SerializerMethodField()  # Nouveau champ pour le mail
    domaine_etude = serializers.SerializerMethodField()  # Nouveau champ pour le domaine d'étude

    class Meta:
        model = Result
        fields = ['result_id', 'id_cv', 'id_offre', 'cosine_similarity', 'nom_prenom', 'mail', 'domaine_etude'] # Ajout des nouveaux champs

    def get_nom_prenom(self, obj):
        try:
            cv = obj.id_cv
            candidat = cv.candidat
            return candidat.nom_prenom
        except AttributeError:
            return None

    def get_mail(self, obj):  # Méthode pour récupérer le mail
        try:
            cv = obj.id_cv
            candidat = cv.candidat
            return candidat.mail
        except AttributeError:
            return None

    def get_domaine_etude(self, obj):  # Méthode pour récupérer le domaine d'étude
        try:
            cv = obj.id_cv
            return cv.domaine_etude
        except AttributeError:
            return None