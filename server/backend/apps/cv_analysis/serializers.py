from rest_framework import serializers
from .models import CV
from apps.users.models import Candidat

class CVSerializer(serializers.ModelSerializer):
    nom_prenom = serializers.SerializerMethodField()
    mail = serializers.SerializerMethodField()
    numero_tlfn = serializers.SerializerMethodField()
    class Meta:
        model = CV
        fields = [
            "candidat",
            "nom_prenom",
            "mail",
            "numero_tlfn",
            "id_cv",
            "date_insertion",
            "cv_text",
            "cv_pretraite",
            "cv_vector",
            "competences",
            "experience",
            "resume_cv",
            "commitment",
            "disponibilite",
            "exp_salaire",
            "domaine_etude"]

    def get_nom_prenom(self, obj):
            try:
                candidat = obj.candidat  # Assurez-vous que 'candidat' est la clé étrangère dans votre modèle CV
                return candidat.nom_prenom
            except Candidat.DoesNotExist:
                return None  # Gérer le cas où le candidat n'existe pas
            except AttributeError:
                return None #Gérer le cas ou obj.candidat est null
    
    def get_mail(self, obj):
            try:
                candidat = obj.candidat  # Assurez-vous que 'candidat' est la clé étrangère dans votre modèle CV
                return candidat.mail
            except Candidat.DoesNotExist:
                return None  # Gérer le cas où le candidat n'existe pas
            except AttributeError:
                return None #Gérer le cas ou obj.candidat est null
       
    def get_numero_tlfn(self, obj):
            try:
                candidat = obj.candidat  # Assurez-vous que 'candidat' est la clé étrangère dans votre modèle CV
                return candidat.numero_tlfn
            except Candidat.DoesNotExist:
                return None  # Gérer le cas où le candidat n'existe pas
            except AttributeError:
                return None #Gérer le cas ou obj.candidat est null             