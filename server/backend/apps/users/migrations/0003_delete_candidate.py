# Generated by Django 5.1.4 on 2024-12-26 16:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cv_analysis', '0002_alter_cv_user'),
        ('users', '0002_candidat'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Candidate',
        ),
    ]
