from django.db import models
from apps.users.models import Candidat
import uuid

class CV(models.Model):
    id_cv = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, db_column='id_cv')
    date_insertion = models.DateField()
    cv_text = models.TextField(default="null")
    cv_pretraite = models.TextField(default="null")
    cv_vector = models.TextField(default=0)
    competences = models.JSONField(default=dict)
    experience = models.JSONField()
    resume_cv = models.TextField()
    commitment=models.CharField(max_length=255 ,blank=True, null=True)
    disponibilite=models.CharField(max_length=255 ,blank=True, null=True)
    exp_salaire = models.IntegerField(default=0)
    domaine_etude = models.CharField(max_length=255,blank=True, null=True)
    candidat = models.ForeignKey(Candidat, on_delete=models.CASCADE, related_name='cvs', db_column='id_candidat',null=True)
    interview = models.BooleanField(default=False)
    
    class Meta:
        db_table ='cv_analysis'
        
    def _str_(self):
        return f"CV for {self.candidat.nom_prenom} - {self.date_insertion}"