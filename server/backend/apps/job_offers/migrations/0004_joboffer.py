# Generated by Django 5.1.4 on 2024-12-27 11:29

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job_offers', '0003_delete_joboffer'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobOffer',
            fields=[
                ('id_offre', models.UUIDField(db_column='id_offre', default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('titre', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('description_pretraite', models.TextField()),
                ('type_contrat', models.CharField(max_length=255)),
                ('revenu', models.IntegerField()),
                ('link_interview', models.TextField()),
                ('google_form', models.TextField()),
                ('kano', models.CharField(max_length=255)),
                ('offre_vector', models.TextField()),
                ('entreprise', models.CharField(max_length=255)),
            ],
        ),
    ]
