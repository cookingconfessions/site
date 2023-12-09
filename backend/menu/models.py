from django.db import models
from django.utils.text import slugify

from cloudinary import uploader
from cloudinary.models import CloudinaryField
from common.models import BaseModel
from common.utils.generators import generate_code


class MenuHelper:
    @staticmethod
    def generate_unique_product_code():
        code = generate_code()

        while MenuItem.objects.filter(code=code).exists():
            code = generate_code()

        return code


class MenuItemCategory(BaseModel):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    image = CloudinaryField("image")

    def save(self, *args, **kwargs):
        try:
            existing_object = MenuItemCategory.objects.get(pk=self.pk)
            if existing_object.image and existing_object.image != self.image:
                uploader.destroy(existing_object.image.public_id, invalidate=True)
        except MenuItemCategory.DoesNotExist:
            pass

        super(MenuItemCategory, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.image:
            uploader.destroy(self.image.public_id, invalidate=True)

        super().delete(*args, **kwargs)

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"


class MenuItemTag(BaseModel):
    name = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.name


class MenuItemAllergen(BaseModel):
    name = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.name


class MenuItem(BaseModel):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    code = models.CharField(
        max_length=5, unique=True, default=MenuHelper.generate_unique_product_code
    )
    slug = models.SlugField(unique=True)
    price = models.FloatField()
    is_available = models.BooleanField()
    category = models.ForeignKey(MenuItemCategory, on_delete=models.SET_NULL, null=True)
    image = CloudinaryField("image")
    tags = models.ManyToManyField(MenuItemTag, blank=True)
    sales_count = models.IntegerField(default=0)
    allergens = models.ManyToManyField(MenuItemAllergen, blank=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)

        try:
            existing_object = MenuItem.objects.get(pk=self.pk)
            if existing_object.image and existing_object.image != self.image:
                uploader.destroy(existing_object.image.public_id, invalidate=True)
        except MenuItem.DoesNotExist:
            pass

        super(MenuItem, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.image:
            uploader.destroy(self.image.public_id, invalidate=True)

        super().delete(*args, **kwargs)

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "Menu Item"
        verbose_name_plural = "Menu Items"


class MenuItemReview(BaseModel):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    message = models.TextField()
    is_visible = models.BooleanField(default=True)
    parent = models.ForeignKey("self", on_delete=models.CASCADE, null=True, blank=True)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE, related_name="reviews")

    def __str__(self):
        return f"Review by {self.name} on {self.menu_item}"

    class Meta:
        verbose_name = "Review"
        verbose_name_plural = "Reviews"
