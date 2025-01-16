from rest_framework import serializers
from .models import Candidat

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidat
        fields = ['user_id', 'nom_prenom', 'mail', 'numero_tlfn', 'profil', 'code']