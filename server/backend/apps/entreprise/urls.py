from django.urls import path
from .views import EntrepriseListCreateView, EntrepriseRetrieveUpdateDeleteView

urlpatterns = [
    path('', EntrepriseListCreateView.as_view(), name='entreprise-list-create'),
    path('<uuid:pk>/', EntrepriseRetrieveUpdateDeleteView.as_view(), name='entreprise-retrieve-update-delete'),
]