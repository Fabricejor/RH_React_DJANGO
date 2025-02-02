# Generated by Django 5.1.4 on 2024-12-11 23:09

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('profil_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('profil', models.CharField(max_length=255)),
                ('question', models.JSONField(default=list)),
            ],
        ),
    ]
