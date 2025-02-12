from django.db import models
from apps.cv_analysis.models import CV
from apps.job_offers.models import JobOffer
import uuid


class Result(models.Model):
    result_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    id_cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name='results',db_column="id_cv")
    id_offre = models.ForeignKey(JobOffer, on_delete=models.CASCADE, related_name='results',db_column="id_offre")
    cosine_similarity = models.FloatField()
    
    def __str__(self):
        return f"Similarity between {self.cv} and {self.offer} : {self.cosine_similarity}"