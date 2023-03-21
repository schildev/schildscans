from django.db import models
from django.contrib import admin
from django.db.models.signals import post_save, post_delete
import zipfile
import os
from pathlib import Path
from django.utils import timezone
import shutil
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
from django.conf import settings
from django.contrib.sites.models import Site
# Create your models here.
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/images')
choices = [
('En',"English"),
('raw', "RAW")
]
class Chapters(models.Model):
	chapter_title = models.CharField(max_length=250)
	chapter_images = models.FileField(upload_to="images/")
	chapter_manga = models.ForeignKey("Manga", related_name="scan_du_manga", on_delete=models.CASCADE, blank=True, null=True)
	chapter_number = models.FloatField(blank=True, null=True)
	lang = models.CharField(choices=choices, default="En", max_length=20)
	def media_url(self):
		url_raw = self.chapter_images
		url_clean = ("".join(str(url_raw))).split("/")
		return "https://" + Site.objects.get(id=settings.SITE_ID).domain + settings.MEDIA_URL + f"images/manga/{self.chapter_manga.titre}/" + url_clean[len(url_clean) - 1]

	@property
	def getImages(self):
		count = 0
		for path in os.listdir(str(self.chapter_images)):
			if os.path.isfile(os.path.join(str(self.chapter_images), path)):
				count += 1
		return count

	def __str__(self):
		return "[" + str(self.chapter_manga.titre) + "] " + self.chapter_title

class Manga(models.Model):
	titre = models.CharField(max_length=250, unique=True)
	description = models.TextField(max_length=5000)
	chapters = models.ManyToManyField(Chapters, related_name="Les_chaps_manga", blank=True)
	manga_image = models.ImageField(upload_to="images/manga_image", blank=True)
	date = models.DateTimeField(auto_now_add=True)
	last_chap_date = models.DateTimeField(null=True)
	def __str__(self):
		return self.titre
	@property
	def getAPIinfo(self):
		return {"titre":self.titre, "description":self.description, "manga_image":self.manga_image.url}
	@property
	def getChapters(self):
		return [chap.chapter_number for chap in self.chapters.all()]
	@property
	def getFirstAndLast(self):
		chaps = self.chapters.all().order_by("chapter_number")
		return [chaps[0].chapter_number, chaps[-1].chapter_number]

def unzip(sender, **kwargs):
	instance = kwargs.get('instance')
	file = instance.chapter_images
	with zipfile.ZipFile(file.path, 'r') as zip_ref:
		num = len(file.path)

		zip_ref.extractall(MEDIA_ROOT + f"/manga/{instance.chapter_manga.titre}/")
	os.remove(file.path)
	Chapters.objects.filter(chapter_title=instance.chapter_title).update(chapter_images=MEDIA_ROOT + f"/manga/{instance.chapter_manga.titre}/" +(file.name[6:(len(file.name)- 4 )]))

def remove_folder(sender, **kwargs):
	instance = kwargs.get('instance')
	file = instance.chapter_images
	shutil.rmtree(file.path)

def instancier_scan_to_manga(sender, **kwargs):
	instance = kwargs.get('instance')
	liste = []
	manga = Manga.objects.get(titre=instance.chapter_manga.titre)
	if instance not in manga.chapters.all():
		manga.chapters.add(instance)
		manga2 = Manga.objects.filter(titre=manga.titre).update(last_chap_date=timezone.now())

post_save.connect(unzip, Chapters)
post_delete.connect(remove_folder, Chapters)

post_save.connect(instancier_scan_to_manga, Chapters)