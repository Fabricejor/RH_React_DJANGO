from rest_framework import serializers
from .models import Entreprise

class JobOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entreprise
        fields = ['id_entreprise','nom_entreprise','domaine', 'localisation','id_offre']