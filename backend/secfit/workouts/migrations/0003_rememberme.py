# Generated by Django 3.1 on 2021-02-04 10:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workouts', '0002_auto_20200910_0222'),
    ]

    operations = [
        migrations.CreateModel(
            name='RememberMe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('remember_me', models.CharField(max_length=500)),
            ],
        ),
    ]
