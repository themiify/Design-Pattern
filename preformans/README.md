اصلى عليك عاوزو اعمل فايل تانى عن البريفورمانس فى سله 
عاوزك تقارن بين 
<picture>
  <source srcset="https://cdn.example.com/image.avif" type="image/avif">
  <source srcset="https://cdn.example.com/image.webp" type="image/webp">
  <img 
    src="https://cdn.example.com/image.jpg" 
    alt="وصف الصورة" 
    width="800" 
    height="600" 
    loading="eager" 
    decoding="async" 
    fetchpriority="high" 
    style="display: block; max-width: 100%; height: auto;" />
</picture>
و
  <img 
    src="https://cdn.example.com/image.jpg" 
    alt="وصف الصورة" 
    width="800" 
    height="600" 
    loading="eager" 
    decoding="async" 
    fetchpriority="high" 
    style="display: block; max-width: 100%; height: auto;" />بس
واتكلم عن دول
    loading="eager" 
    decoding="async" 
واتكلم عن تاجات السكريبت وموضوع التحميل وتنظيم وقت التحميل والخطاء المحتمله فى القياس البريفورمانس 
واكتب افضل طريقه لعرض الفيدييو فى الويب وتجنب جميع المشاكل فى البريفورمانس والايفون 
وقارن بين الطريقه العاديه فى عرض الفيديو والطريقه دى 
<video id="video" controls playsinline preload="metadata" poster="thumbnail.jpg" width="100%" loading="lazy" muted>
  <source src="https://example.com/video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('video');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.src = 'https://example.com/video.mp4';
            observer.disconnect();
          }
        });
      });
      observer.observe(video);
    } else {
      video.src = 'https://example.com/video.mp4';
    }
  });
</script>