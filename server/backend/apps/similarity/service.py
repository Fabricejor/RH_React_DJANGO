import logging
import os
from supabase import create_client, Client
from sentence_transformers import SentenceTransformer
import numpy as np
from django.core.cache import cache

logger = logging.getLogger(__name__)

def get_supabase_client():
    """Initialise le client Supabase."""
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    supabase = create_client(url, key)
    return supabase


def load_models():
    """Charge les modèles de sentence embedding."""
    # Essayer de récupérer les modèles du cache
    models = cache.get('nlp_models')
    if models is None:
        # Si les modèles ne sont pas dans le cache, les charger
        model1 = SentenceTransformer('all-MPNet-base-v2')
        model2 = SentenceTransformer('paraphrase-MiniLM-L12-v2')
        model3 = SentenceTransformer('all-MiniLM-L12-v2')
        models = (model1, model2, model3)
        # Enregistrer les modèles dans le cache pour une durée spécifiée
        cache.set('nlp_models', models, timeout=60 * 60)  # 1 heure
    return models

def compute_cosine_similarity(vector1, vector2):
    """Calcule la similarité cosinus entre deux vecteurs."""
    norm1 = np.linalg.norm(vector1)
    norm2 = np.linalg.norm(vector2)
    if norm1 == 0 or norm2 == 0:
        return 0.0
    return np.dot(vector1, vector2) / (norm1 * norm2)


def calculate_and_save_similarity(id_cv, id_offre):
    """Calcule et enregistre la similarité entre un CV et une offre."""
    try:
        supabase = get_supabase_client()

        response_cv = supabase.table("cv_analysis").select("*").eq("id_cv", id_cv).execute()
        response_offer = supabase.table("offre").select("*").eq("id_offre", id_offre).execute()

        if response_cv.error or response_offer.error:
            logger.error(f"Erreur lors de la récupération des données depuis Supabase : cv {response_cv.error}, offre: {response_offer.error}")
            return None
        
        cv = response_cv.data[0] if response_cv.data else None
        offer = response_offer.data[0] if response_offer.data else None

        if not cv or not offer:
            logger.error("CV ou Offre non trouvée")
            return None

        cv_text = cv['cv_pretraite']
        offer_text = offer['description_pretraite']

        models = load_models()
        model1, model2, model3 = models

        cv_vector = np.concatenate([model.encode([cv_text]) for model in (model1, model2, model3)], axis=1)
        offer_vector = np.concatenate([model.encode([offer_text]) for model in (model1, model2, model3)], axis=1)

        similarity = compute_cosine_similarity(cv_vector[0], offer_vector[0])
        
        result = create_supabase_record(table_name="similarity_result", data={"id_cv": id_cv, "id_offre": id_offre, "cosine_similarity": similarity})
        if result:
           logger.info(f"Similarité calculée et enregistrée avec succès.")
           return result
        else:
           logger.error(f"Erreur lors de l'enregistrement du résultat.")
           return None
    except Exception as e:
        logger.error(f"Erreur lors du calcul de similarité: {e}")
        return None



def create_supabase_record(table_name, data):
     try:
          supabase = get_supabase_client()
          response = supabase.table(table_name).insert(data).execute()
          if response.error:
               logger.error(f"Erreur lors de l'insertion des données dans Supabase dans la table {table_name}: {response.error}")
               return None
          return response.data
     except Exception as e:
          logger.error(f"Erreur lors de l'insertion des données dans Supabase dans la table {table_name}: {e}")
          return None

def read_supabase_record(table_name, filters=None, columns="*"):
     try:
          supabase = get_supabase_client()
          query = supabase.table(table_name).select(columns)
          if filters:
               for key, value in filters.items():
                   query = query.eq(key, value)
          response = query.execute()
          if response.error:
              logger.error(f"Erreur lors de la lecture de données dans Supabase dans la table {table_name}: {response.error}")
              return None
          return response.data
     except Exception as e:
         logger.error(f"Erreur lors de la lecture de données dans Supabase dans la table {table_name}: {e}")
         return None

def update_supabase_record(table_name, record_id, data):
    try:
        supabase = get_supabase_client()
        response = supabase.table(table_name).update(data).eq("result_id", record_id).execute()
        if response.error:
            logger.error(f"Erreur lors de la mise à jour des données dans Supabase dans la table {table_name}: {response.error}")
            return None
        return response.data
    except Exception as e:
          logger.error(f"Erreur lors de la mise à jour des données dans Supabase dans la table {table_name}: {e}")
          return None
def delete_supabase_record(table_name, record_id):
     try:
        supabase = get_supabase_client()
        response = supabase.table(table_name).delete().eq("result_id", record_id).execute()
        if response.error:
            logger.error(f"Erreur lors de la suppression des données dans Supabase dans la table {table_name}: {response.error}")
            return None
        return response.data
     except Exception as e:
         logger.error(f"Erreur lors de la suppression des données dans Supabase dans la table {table_name}: {e}")
         return None