
# Performance Comparison: Images and Videos on the Web

This document explains the best practices for optimizing the performance of images and videos on the web. By following these guidelines, we can ensure faster page loads, better user experiences, and improved compatibility across devices and browsers.

---

## Table of Contents
1. [Image Optimization](#image-optimization)
   - [Using `<img>`](#using-img)
   - [Using `<picture>`](#using-picture)
   - [Performance Attributes](#performance-attributes)
2. [Video Optimization](#video-optimization)
   - [Standard Approach](#standard-approach)
   - [Optimized Approach](#optimized-approach)
3. [Resource Loading Strategies](#resource-loading-strategies)
   - [Defer Non-Essential Scripts](#defer-non-essential-scripts)
   - [Lazy-Loading Media](#lazy-loading-media)
   - [Minimizing the Critical Path](#minimizing-the-critical-path)
4. [Error Measurement in Performance](#error-measurement-in-performance)
   - [Real-User Conditions](#real-user-conditions)
   - [Large Media Files](#large-media-files)
   - [Client-Side Rendering Delays](#client-side-rendering-delays)
5. [iPhone and Safari Compatibility](#iphone-and-safari-compatibility)
   - [Using `playsinline`](#using-playsinline)
   - [Testing with Safari](#testing-with-safari)
   - [Avoid Autoplaying Unmuted Videos](#avoid-autoplaying-unmuted-videos)
6. [Salla-Specific Tips](#salla-specific-tips)
   - [Optimizing for Salla’s Theme Structure](#optimizing-for-sallas-theme-structure)
   - [Using Salla’s Built-In Tools](#using-sallas-built-in-tools)
   - [Testing on Salla’s Platform](#testing-on-sallas-platform)
7. [Advanced Performance Strategies](#advanced-performance-strategies)
   - [Critical Rendering Path Optimization](#critical-rendering-path-optimization)
   - [Caching Strategies](#caching-strategies)
   - [Content Delivery Networks (CDNs)](#content-delivery-networks-cdns)
   - [Preloading Key Resources](#preloading-key-resources)
8. [Using Alpine.js for Interactivity](#using-alpinejs-for-interactivity)
   - [What is Alpine.js?](#what-is-alpinejs)
   - [Why Use Alpine.js?](#why-use-alpinejs)
   - [Example: Lazy-Loading Videos with Alpine.js](#example-lazy-loading-videos-with-alpinejs)
9. [Tools for Monitoring Performance](#tools-for-monitoring-performance)
   - [Google Lighthouse](#google-lighthouse)
   - [WebPageTest](#webpagetest)
   - [Salla Analytics](#salla-analytics)


---

## Image Optimization

### Using `<img>`
The `<img>` tag is the simplest way to display images on a webpage. However, it only allows for a single image source, which may not be optimal for all devices or browsers.

#### Example:
```html
<img
  src="https://cdn.example.com/image.jpg"
  alt="وصف الصورة"
  width="800"
  height="600"
  loading="eager"
  decoding="async"
  fetchpriority="high"
/>
```
**Performance:**

- **Pros:** Simple and fast to implement.
- **Cons:** Does not support multiple formats, which may lead to suboptimal performance on some devices.

## Using <picture>
The <picture> tag allows us to provide multiple image sources in different formats (e.g., AVIF, WebP, JPEG). This ensures the browser can choose the best format for the user's device.

**Example:**
```html copy
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
  />
</picture>
```
**Performance:**
- **Pros:** Supports modern formats like AVIF and WebP, which are smaller in size and faster to load.
- **Cons:** Slightly more complex to implement.

## Performance Attributes
Here are some key attributes to optimize image performance:

**loading="eager":**

Use for critical images (e.g., above the fold) to load them immediately.

**Example:** `<img loading="eager" ... />` 


**decoding="async":**

Allows the browser to decode images asynchronously, reducing page blocking.

**Example:** `<img decoding="async" ... />`

**fetchpriority="high":**

Gives high priority to important images like logos or hero images.

**Example:** `<img fetchpriority="high" ... />`

**loading="lazy":**

Use for non-critical images (e.g., below the fold) to delay loading until they are needed.

**Example:** `<img loading="lazy" ... />`

## **Video Optimization**
Standard Approach

The standard <video> tag is simple but may not be optimized for performance.

**Example:**
``` html copy
<video controls preload="metadata" poster="thumbnail.jpg" width="100%">
  <source src="https://example.com/video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```
**Performance:**

**Pros:** Easy to implement and widely supported.

**Cons:** Preloads metadata even if the video is not visible, which can impact performance.

**Optimized Approach**

To improve performance, we can lazy-load videos using JavaScript. This ensures videos only load when they are about to enter the viewport.

**Example:**
``` html copy
<video
  id="video"
  controls
  playsinline
  preload="metadata"
  poster="thumbnail.jpg"
  width="100%"
  loading="lazy"
  muted
>
  <source src="" type="video/mp4">
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
```
**Performance:**

**Pros:** Delays video loading until it’s visible, saving bandwidth and improving page load times.

**Cons:** Requires additional JavaScript for implementation.

## **Resource Loading Strategies**

Defer Non-Essential Scripts
Use the defer attribute for non-critical scripts to ensure they load after the page content.

**Example:**
``` html copy
<script src="script.js" defer></script>
```
**Key Points:**

    1- Scripts load in the background without blocking the page.

    2- Execution order is maintained.

**Lazy-Loading Media**

Lazy-loading delays the loading of images and videos until they are about to enter the viewport.

**Example:**
```html copy
<img src="image.jpg" alt="Description" loading="lazy">
<video src="video.mp4" loading="lazy"></video>
```
**Benefits:**

    Reduces initial page load time.

    Saves bandwidth for users.

**Minimizing the Critical Path**

The critical path refers to the resources needed to render the initial view of a webpage. To optimize it:

    1-Compress Images: Use modern formats like WebP or AVIF.

    2-Combine CSS/JS Files: Reduce the number of requests.

    3-Inline Critical CSS: Load essential styles directly in the HTML.

**Error Measurement in Performance**
1- Real-User Conditions
    Test performance on slow networks and older devices to ensure a smooth experience for all users.

2- Large Media Files
    Avoid oversized images or videos. Use compression tools to reduce file sizes.

3- Client-Side Rendering Delays
    Heavy JavaScript can delay rendering. Use tools like Lighthouse or WebPageTest to identify and fix issues.

## **iPhone and Safari Compatibility**

**Using playsinline**
    The playsinline attribute ensures videos play inline instead of going fullscreen on iPhones.

**Example:**
``` html copy
<video controls playsinline>
  <source src="video.mp4" type="video/mp4">
</video>
```
**Testing with Safari**

    1- Safari has unique behaviors (e.g., autoplay policies). Test thoroughly to ensure compatibility.
    2- Avoid Autoplaying Unmuted Videos
    3- Safari blocks autoplay for unmuted videos. Always use the muted attribute for autoplay.

**Example:**
```html copy
<video autoplay muted>
  <source src="video.mp4" type="video/mp4">
</video>
````
## **Salla-Specific Tips**
**Optimizing for Salla’s Theme Structure**
- Use Salla’s Built-In Components: Leverage Salla’s pre-built components (e.g., product cards, sliders) to ensure compatibility and performance.

- Follow Salla’s File Structure: Organize your theme files according to Salla’s conventions for easier maintenance and updates.

**Using Salla’s Built-In Tools**
- Salla CLI: Use the Salla CLI for theme development, testing, and deployment. Install it with:
```bash copy
npm install -g @salla.sa/cli
```

**Salla DevTools:** Use the Salla browser extension to debug and inspect your theme.

## Testing on Salla’s Platform
**Test on Multiple Devices:** Ensure your theme works well on desktops, tablets, and mobile devices.

**Check for Compatibility:** Test your theme on different browsers (Chrome, Safari, Firefox) to ensure consistent behavior.

**Monitor Performance:** Use tools like Google Lighthouse to measure and improve your theme’s performance.

## Advanced Performance Strategies
**Critical Rendering Path Optimization**
- Inline Critical CSS: Load essential styles directly in the <head> of your HTML to avoid render-blocking.

- Avoid Render-Blocking Scripts: Use async or defer for non-critical scripts.

**Caching Strategies**
- Browser Caching: Set appropriate cache headers for static assets (e.g., images, CSS, JS) to reduce load times for returning visitors.

- Service Workers: Implement service workers for offline caching and faster load times.

**Content Delivery Networks (CDNs)**
- Use a CDN to serve static assets (e.g., images, videos, CSS, JS) from servers closer to the user, reducing latency.

**Preloading Key Resources**
- Use <link rel="preload"> to prioritize critical resources like fonts, CSS, or JavaScript.

``` html copy
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

## **Using Alpine.js for Interactivity**

**What is Alpine.js?**

Alpine.js is a lightweight JavaScript framework that allows you to add interactivity to your web pages without the complexity of larger frameworks like React or Vue. It’s perfect for enhancing performance while keeping your code simple and maintainable.

**Why Use Alpine.js?**
- Lightweight: Alpine.js is only ~10KB, making it much smaller than other frameworks.
- Declarative Syntax: It uses HTML attributes to define behavior, making it easy to read and write.
- No Build Step: Alpine.js works directly in the browser, so there’s no need for a build process.
**Example: Lazy-Loading Videos with Alpine.js**

Here’s how you can replace vannela  JavaScript with Alpine.js to lazy-load videos:

HTML:
``` html copy
<div x-data="{ isVisible: false }" x-intersect="isVisible = true">
  <video
    x-bind:src="isVisible ? 'https://example.com/video.mp4' : ''"
    controls
    playsinline
    preload="metadata"
    poster="thumbnail.jpg"
    width="100%"
    loading="lazy"
    muted
  >
    Your browser does not support the video tag.
  </video>
</div>
```
**Explanation:**

    x-data: Initializes Alpine.js and defines a reactive property isVisible.

    x-intersect: Triggers when the element enters the viewport, setting isVisible to true.

    x-bind:src: Binds the src attribute to the video URL only when isVisible is true.

**Performance Impact:**
- Faster Initial Load: The video only loads when it’s about to enter the viewport, saving bandwidth.

- Simpler Code: Alpine.js reduces the need for custom JavaScript, making the code easier to maintain

## **Tools for Monitoring Performance**
**Google Lighthouse:**
Use Lighthouse to audit your theme’s performance, accessibility, and SEO. It’s available in Chrome DevTools or as a standalone tool.

**WebPageTest:**
Test your theme’s performance from different locations and devices using [WebPageTest](https://www.webpagetest.org/).

