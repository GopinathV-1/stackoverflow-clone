# Generated by Django 2.2.17 on 2021-07-15 08:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stackoverflow', '0029_auto_20210715_1422'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='job',
            name='technologies',
        ),
        migrations.AddField(
            model_name='technologies',
            name='job',
            field=models.ManyToManyField(blank=True, related_name='technologies', to='stackoverflow.Job'),
        ),
    ]