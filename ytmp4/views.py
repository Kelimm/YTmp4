from django.shortcuts import render, HttpResponse
from pytubefix import YouTube
import os
from django.conf import settings
from django.http import FileResponse

def ytmp4Page(request):
  if request.method == "POST":
    url = request.POST.get("url")
    if url:
      try:
        video = YouTube(url)
        stream = video.streams.get_highest_resolution()
        output_path = os.path.join(settings.BASE_DIR, "downloads")
        if not os.path.exists(output_path):
                    os.makedirs(output_path)
        
        file_path = stream.download(output_path=output_path)
        file_name = os.path.basename(file_path)
        with open(file_path, "rb") as file:
                    file_content = file.read()
        os.remove(file_path)

        response = HttpResponse(file_content, content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{file_name}"'
        return response
      except Exception as e:
                return HttpResponse(f"An error occurred: {e}")
  return render(request, "index.html")

