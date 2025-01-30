import os
from supabase import create_client, Client
import logging

logger = logging.getLogger(__name__)

def get_supabase_client():
    """Initialise le client Supabase."""
    url = "https://zbpiflnlvdwyvcwzfzug.supabase.co"
    key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicGlmbG5sdmR3eXZjd3pmenVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxODA5NDYsImV4cCI6MjA1Mzc1Njk0Nn0.UXEUqtBQNVVf7ByvYqz-2sP4BuI-Wj07NaYAa9Dw5pk"
    supabase = create_client(url, key)
    return supabase

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
        response = supabase.table(table_name).update(data).eq("id_entreprise", record_id).execute()
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
        response = supabase.table(table_name).delete().eq("id_entreprise", record_id).execute()
        if response.error:
            logger.error(f"Erreur lors de la suppression des données dans Supabase dans la table {table_name}: {response.error}")
            return None
        return response.data
     except Exception as e:
         logger.error(f"Erreur lors de la suppression des données dans Supabase dans la table {table_name}: {e}")
         return None