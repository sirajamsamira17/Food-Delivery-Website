# Generated by Django 4.0.5 on 2022-06-18 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_order_product_image_shippingaddress_review_orderitem'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='countINStock',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
