# Generated by Django 2.2.17 on 2021-07-12 05:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stackoverflow', '0020_auto_20210712_0426'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='team',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='stackoverflow.Team'),
        ),
    ]
