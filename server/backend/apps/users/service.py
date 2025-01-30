import re
import nltk
from nltk.corpus import stopwords
import os
from supabase import create_client, Client
import logging
from django.core.mail import send_mail

table_name = "candidat"
logger = logging.getLogger(__name__)

nltk.download('stopwords', quiet=True) # avoid unwanted download messages

def get_stop_words():
    """Récupère les stopwords français et anglais."""
    return set(stopwords.words('french') + stopwords.words('english'))

stop_words = get_stop_words()

def preprocess_text(text):
    """Prétraitement du texte : minuscules, suppression des caractères spéciaux et des stopwords."""
    text = text.lower()
    text = re.sub(r'\W+', ' ', text)
    tokens = text.split()
    tokens = [word for word in tokens if word not in stop_words]
    return ' '.join(tokens)


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
        response = supabase.table(table_name).update(data).eq("id_candidat", record_id).execute()
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
        response = supabase.table(table_name).delete().eq("id_candidat", record_id).execute()
        if response.error:
            logger.error(f"Erreur lors de la suppression des données dans Supabase dans la table {table_name}: {response.error}")
            return None
        return response.data
     except Exception as e:
         logger.error(f"Erreur lors de la suppression des données dans Supabase dans la table {table_name}: {e}")
         return None
def send_recommendation_email(recipient, subject, message_body):
    try:
        send_mail(
        subject,
        message_body,
       # settings.EMAIL_HOST_USER,  # Utilisez la variable d'environnement pour l'adresse de l'expéditeur
        [recipient],
        fail_silently=False,
    )
    except Exception as e:
            logger.error(f"Erreur lors de l'envoi de mail:{e}")
            return False
    return True