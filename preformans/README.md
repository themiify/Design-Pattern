<!-- Document comparing web performance techniques -->

<h1>Performance Comparison: Images and Videos on the Web</h1>

<h1>الفرق بين &lt;img&gt; و &lt;picture&gt; وتحسين الأداء</h1>
<section>
    <h2>1. استخدام &lt;img&gt; فقط</h2>
    <p>
        عندما نستخدم عنصر <code>&lt;img&gt;</code> فقط، نقوم بتحميل صورة واحدة بتنسيق معين. هذا النهج بسيط ولكنه قد يكون أقل كفاءة إذا لم يكن التنسيق المستخدم هو الأفضل للمتصفح أو الجهاز.
    </p>
    <pre>
<code>
&lt;img  src="https://cdn.example.com/image.jpg"  alt="وصف الصورة"  width="800"  height="600"  loading="eager"  decoding="async"  fetchpriority="high"/&gt;
</code>
    </pre>
    <p>
        <b>الأداء:</b> يتم تحميل الصورة مباشرة، مما يضمن عرضها سريعًا ولكن لا يقدم تنسيقات بديلة قد تكون أفضل.
    </p>
</section>
<section>
    <h2>2. استخدام &lt;picture&gt;</h2>
    <p>
        باستخدام عنصر <code>&lt;picture&gt;</code>، يمكننا تحديد مصادر متعددة للصورة بتنسيقات مختلفة مثل <code>AVIF</code> و <code>WebP</code>. هذا يسمح للمتصفح باختيار أفضل تنسيق مدعوم.
    </p>
    <pre>
<code>
&lt;picture&gt;
  &lt;source srcset="https://cdn.example.com/image.avif" type="image/avif"&gt;
  &lt;source srcset="https://cdn.example.com/image.webp" type="image/webp"&gt;
  &lt;img  src="https://cdn.example.com/image.jpg"  alt="وصف الصورة"  width="100"  height="600"  loading="eager"  decoding="async"  fetchpriority="high"  /&gt;
&lt;/picture&gt;
</code>
    </pre>
    <p>
        <b>الأداء:</b> يتيح اختيار التنسيقات الحديثة تحسين وقت التحميل وجودة الصورة، مما يجعل التجربة أكثر كفاءة.
    </p>
</section>
<section>
    <h2>3. خصائص تحسين الأداء</h2>
    <ul>
        <li>
            <b>loading="eager":</b> يُستخدم لتحميل الصور المهمة أعلى الشاشة فورًا. مفيد للصور الأساسية ولكنه قد يعطل تحميل موارد أخرى.
        </li>
        <li>
            <b>decoding="async":</b> يسمح بفك تشفير الصور بشكل غير متزامن، مما يقلل من زمن حظر الصفحة.
        </li>
        <li>
            <b>fetchpriority="high":</b> يُعطي أولوية عالية لتحميل الصور المهمة مثل الشعار أو صور الهيدر.
        </li>
    </ul>
    <p>
        <b>متى نستخدمها؟</b>
    </p>
    <ul>
        <li>للصور الأساسية: استخدم <code>loading="eager"</code> و <code>fetchpriority="high"</code>.</li>
        <li>للصور الأقل أهمية: استخدم <code>loading="lazy"</code> لتحسين الأداء الإجمالي للصفحة.</li>
    </ul>
</section>

<h2>2. Best Practices for Videos</h2>

<h3>Standard Approach:</h3>
<pre>
&lt;video controls preload="metadata" poster="thumbnail.jpg" width="100%"&gt;
  &lt;source src="https://example.com/video.mp4" type="video/mp4"&gt;
  Your browser does not support the video tag.
&lt;/video&gt;
</pre>
<p><b>Pros:</b> Simple and widely supported.</p>
<p><b>Cons:</b> Preloads metadata regardless of visibility, impacting performance.</p>

<h3>Optimized Approach:</h3>
<pre>
&lt;video id="video" controls playsinline preload="metadata" poster="thumbnail.jpg" width="100%" loading="lazy" muted&gt;
  &lt;source src="" type="video/mp4"&gt;
  Your browser does not support the video tag.
&lt;/video&gt;
&lt;script&gt;
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
&lt;/script&gt;
</pre>
<p><b>Pros:</b></p>
<ul>
  <li>Delays video loading until it’s visible, saving bandwidth.</li>
  <li>Improves loading time for non-video content.</li>
</ul>
<p><b>Cons:</b> Slightly more complex implementation.</p>

<h2>3. Organizing Resource Loading</h2>

<p>Effective resource loading is key to a smooth and fast web experience. Below are some strategies to improve resource management:</p>

<h3>Defer Non-Essential Scripts</h3>
 <h2>Key Points</h2>
        <ul>
            <li><strong>Loading scripts in the background:</strong> The browser starts loading JavaScript files while reading the HTML code of the page simultaneously. Nothing gets blocked.</li>
            <li><strong>Scripts wait their turn:</strong> JavaScript code won’t run until the browser finishes reading and parsing the entire HTML document (essentially, until the page is fully prepared).</li>
            <li><strong>Execution order is guaranteed:</strong> If there are multiple JavaScript files using <code>defer</code>, they will run in the same order they are listed in the code, keeping things organized.</li>
            <li><strong>Better website performance:</strong> With this property, the page loads faster because JavaScript doesn’t interfere with loading or displaying the essential elements for the user.</li>
        </ul>

<h3>Lazy-Loading Media</h3>
<p>Lazy loading allows images and videos to load only when they are about to enter the viewport. Use the <code>loading="lazy"</code> attribute for images and videos to save bandwidth and reduce the initial page load time.</p>

<h3>Minimizing the Critical Path</h3>
<p>The critical path refers to the sequence of resources required to render the initial view of a webpage. Reducing the size and number of resources, such as by compressing images or combining CSS files, can shorten this path and improve loading speed.</p>

<h2>4. Error Measurement in Performance</h2>

<p>Measuring web performance can be challenging, and errors often arise due to various factors. Key considerations include:</p>

<h3>Real-User Conditions</h3>
<p>Performance metrics should account for real-world conditions, such as users on slow networks or older devices. Overlooking these scenarios can lead to over-optimistic assessments.</p>

<h3>Large Media Files</h3>
<p>Including oversized images or videos can overload the browser and negatively affect page load times. Proper compression and format choices are essential to mitigate this issue.</p>

<h3>Client-Side Rendering Delays</h3>
<p>Delays in rendering caused by heavy JavaScript execution can go unnoticed during testing but significantly impact real-user performance. Tools like Lighthouse or WebPageTest can help identify such issues.</p>

<h2>5. Recommendations for iPhone Compatibility</h2>

<p>Ensuring compatibility with iPhones and Safari browsers requires careful attention to specific attributes and behaviors. Key recommendations include:</p>

<h3>Using the <code>playsinline</code> Attribute</h3>
<p>This attribute allows videos to play inline instead of triggering fullscreen mode, providing a smoother experience.</p>

<h3>Testing with Safari Features</h3>
<p>Safari has unique behaviors that may not appear in other browsers. Thorough testing on Safari, including handling of autoplay policies and media queries, ensures a consistent experience.</p>

<h3>Avoid Autoplaying Unmuted Videos</h3>
<p>Unmuted videos that autoplay can be disruptive and may not comply with Safari’s autoplay policies. Always use the <code>muted</code> attribute for videos that need to autoplay.</p>
