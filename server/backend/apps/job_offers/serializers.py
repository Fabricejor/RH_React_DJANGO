from rest_framework import serializers
from .models import JobOffer

class JobOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOffer
        fields = ['id_offre','titre','description', 'type_contrat', 'revenu', 'link_interview', 'google_form', 'kano', 'offre_vector', 'entreprise']