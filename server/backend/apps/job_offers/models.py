from django.db import models
from django.contrib.postgres.fields import ArrayField
import uuid

class JobOffer(models.Model):
    id_offre = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, db_column='id_offre')
    titre = models.CharField(max_length=255)
    description = models.TextField()
    description_pretraite = models.TextField()
    type_contrat=models.CharField(max_length=255)
    revenu = models.IntegerField()
    link_interview = models.TextField()
    google_form = models.TextField()
    kano=models.CharField(max_length=255)
    cv_vector = ArrayField(models.FloatField(), size=1536, null=True)
    class Meta:
        db_table ='offre'
    def _str_(self):
            return f"{self.titre} - {self.entreprise.nom_entreprise}"