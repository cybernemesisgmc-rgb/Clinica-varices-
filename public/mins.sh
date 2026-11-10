ffmpeg -y -ss 00:00:04 -i videos/00.mp4 -frames:v 1 -q:v 2 videos/thumbnails/00.jpg

ffmpeg -y -ss 00:00:04 -i videos/01.mp4 -frames:v 1 -q:v 2 videos/thumbnails/01.jpg

ffmpeg -y -ss 00:00:00 -i videos/02.mp4 -frames:v 1 -q:v 2 videos/thumbnails/02.jpg

ffmpeg -y -ss 00:00:34 -i videos/03.mp4 -frames:v 1 -q:v 2 videos/thumbnails/03.jpg
