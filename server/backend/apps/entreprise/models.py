from django.db import models
from apps.job_offers.models import JobOffer
import uuid

class Entreprise(models.Model):
    id_entreprise = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, db_column='id_entreprise')
    nom_entreprise = models.CharField(max_length=255)
    domaine = models.CharField(max_length=255)
    localisation = models.CharField(max_length=255)
    id_offre = models.ForeignKey(JobOffer, on_delete=models.CASCADE, related_name='entreprise', db_column="id_offre")
    class Meta:
        db_table ='entreprise'
        
    def __str__(self):
        return self.nom_entreprise