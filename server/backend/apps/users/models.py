from django.db import models
import uuid

class Candidat(models.Model):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nom_prenom = models.CharField(max_length=255)
    mail = models.EmailField(unique=True)
    numero_tlfn = models.CharField(max_length=20, blank=True, null=True)
    profil = models.CharField(max_length=255, blank=True, null=True)
    code = models.CharField(max_length=255, blank=True, null=True)
    # created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = 'candidat'  # Indiquez ici le nom exact de la table dans la base de données


    def __str__(self):
        return self.nom_prenom
