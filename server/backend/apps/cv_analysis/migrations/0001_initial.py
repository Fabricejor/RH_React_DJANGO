# Generated by Django 5.1.4 on 2024-12-11 23:09

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CV',
            fields=[
                ('cv_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date_insertion', models.DateTimeField(auto_now_add=True)),
                ('cv_text', models.TextField()),
                ('competences', models.JSONField(default=list)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cvs', to='users.candidate')),
            ],
        ),
    ]