from apps.cv_analysis.models import CV
from apps.job_offers.models import JobOffer
from apps.similarity.models import Result
from sentence_transformers import SentenceTransformer
import numpy as np
from django.conf import settings
import logging
from django.core.cache import cache


logger = logging.getLogger(__name__)

def load_models():


    # Essayer de récupérer les modèles du cache
    models = cache.get('nlp_models')
    if models is None:
        # Si les modèles ne sont pas dans le cache, les charger
        model1 = SentenceTransformer('all-MPNet-base-v2')
        model2 = SentenceTransformer('paraphrase-MiniLM-L12-v2')
        model3 = SentenceTransformer('all-MiniLM-L12-v2')
        models = (model1, model2, model3)
        # Enregistrer les modèles dans le cache pour une durée spécifiée
        cache.set('nlp_models', models, timeout=60 * 60)  
    
    return models


def compute_cosine_similarity(vector1, vector2):
    norm1 = np.linalg.norm(vector1)
    norm2 = np.linalg.norm(vector2)
    if norm1 == 0 or norm2 == 0:
        return 0.0
    return np.dot(vector1, vector2) / (norm1 * norm2)

def calculate_and_save_similarity(id_cv, id_offre):
    try:
        cv = CV.objects.get(id_cv=id_cv)
        offer = JobOffer.objects.get(id_offre=id_offre)
        
        cv_text = cv.cv_pretraite
        offer_text = offer.description_pretraite
        
        models = load_models()  # Load models here
        model1, model2, model3 = models  # Unpack the models

        cv_vector = np.concatenate([model.encode([cv_text]) for model in (model1, model2, model3)], axis=1)
        offer_vector = np.concatenate([model.encode([offer_text]) for model in (model1, model2, model3)], axis=1)
        
        similarity = compute_cosine_similarity(cv_vector[0], offer_vector[0])
        
        result = Result.objects.create(id_cv=cv, id_offre=offer, cosine_similarity=similarity)
        
        print(f"\nSimilarité calculée et enregistrée avec succès. result id:{result.result_id}")

        return result
    except Exception as e:
        print(f"\nservices.py Erreur lors du calcul de similarité: {e}")
        raise