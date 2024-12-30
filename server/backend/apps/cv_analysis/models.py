from django.db import models
from apps.users.models import Candidat
import uuid

class CV(models.Model):
    id_cv = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, db_column='id_cv')
    date_insertion = models.DateField()
    cv_text = models.TextField()
    cv_pretraite = models.TextField()
    cv_vector = models.TextField()
    competences = models.JSONField()
    experience = models.JSONField()
    resume_cv = models.TextField()
    commitment=models.CharField(max_length=255)
    disponibilite=models.CharField(max_length=255)
    exp_salaire = models.IntegerField()
    domaine_etude = models.CharField(max_length=255)
    candidat = models.ForeignKey(Candidat, on_delete=models.CASCADE, related_name='cvs', db_column='id_candidat',null=True)
    
    def _str_(self):
        return f"CV for {self.candidat.nom_prenom} - {self.date_insertion}"