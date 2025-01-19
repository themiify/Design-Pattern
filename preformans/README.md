
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
**Performance Impact:**
- Faster Initial Load: The video only loads when it’s about to enter the viewport, saving bandwidth.

- Simpler Code: Alpine.js reduces the need for custom JavaScript, making the code easier to maintain

## **Tools for Monitoring Performance**
**Google Lighthouse:**
Use Lighthouse to audit your theme’s performance, accessibility, and SEO. It’s available in Chrome DevTools or as a standalone tool.

**WebPageTest:**
Test your theme’s performance from different locations and devices using [WebPageTest](https://www.webpagetest.org/).


## **Using Alpine.js for Interactivity**

**What is Alpine.js?**

Alpine.js is a lightweight JavaScript framework that allows you to add interactivity to your web pages without the complexity of larger frameworks like React or Vue. It’s perfect for enhancing performance while keeping your code simple and maintainable.

**Why Use Alpine.js?**
- Lightweight: Alpine.js is only ~10KB, making it much smaller than other frameworks.
- Declarative Syntax: It uses HTML attributes to define behavior, making it easy to read and write.
- No Build Step: Alpine.js works directly in the browser, so there’s no need for a build process.

# Alpine-Perfomance

### Improved Performance of Category Component

#### Original Issue
The `Category Component` component was experiencing significant performance bottlenecks due to excessive DOM manipulation and rendering a large dataset without optimization. This caused the component to load in **1.96 seconds**, negatively impacting user experience.

#### Actions Taken
- use alpineJs framework instead of twig
- remove all javascript code and depend on alpineJs

#### Results
- The load time for the component decreased to **0.24 seconds**, achieving a **88% improvement in performance in component** and **33%** for body.

| Metric                | Before Optimization | After Optimization |
|-----------------------|---------------------|--------------------|
| Load Time ( seconds )   | 1.96ms                 | 24ms              |

#### Visuals
- **Before Optimization:** for this section only
  ![Before Optimization Screenshot](https://i.postimg.cc/fR2sMD5D/image.png)
- **After Optimization:**
  ![After Optimization Screenshot](https://i.postimg.cc/gkq91QrJ/image.png)
- **Performance Comparison Chart:** for all body 
  ![Performance Chart](https://i.postimg.cc/FzGPWFFz/image.png)

#### Challenges and Learnings
This optimization process emphasized the importance of **analyzing rendering processes** and using modern tools like **AlpineJs**. It also highlighted areas for further optimization in other components.
** code with javascript :**
``` html copy 
   <section class="categories__swiper__sportify">
	<div class="container-fluid d-flex flex-column flex-lg-row">
		<div class="categories__container_sportify">
			{% if settings.video_link %}
				<video autoplay muted loop playsinline width="100%" height="100%">
					<source src="{{ settings.video_link }}">
				</video>
			{% else %}
				<div class="product__list__sportify d-flex">
					<div class="image">
						<img class="d-none d-lg-flex img-fluid" src="" alt="Background Image" width="100%" height="100%" loading="lazy">
					</div>
					{% for item in settings.categories_slider %}
						<div class="product__item__sportify {{ loop.index == 3 ? 'active' }} tab {{ loop.index == 1 ? 'tab_active' }}" data-tab="{{ item.categories.name }}">
							<img class="d-flex d-lg-none img-fluid" src="{{ item.categories.image }}" alt="" width="100%" height="100%" loading="lazy">
							<div class="product__item__content__sportify {{ settings.text_center ? 'center_text' }}">
								<h3 data-image="{{ item.categories.image }}">
									{{ item.categories.name }}
								</h3>
								<span class="pieces__count__sportify mb-4 d-block">
									{{ item.category_count }}
									{{ locals.pieces }}</span>
								{% if settings.button %}
									<span class="d-flex align-items-center btn as_button">
										<a type="button" href="{{ item.categories.url }}" class="d-flex">
											{{ locals.shop_now }}
										</a>
									</span>
								{% else %}
									<a href="{{ item.categories.url }}" class="d-flex">
										{{ locals.shop_now }}
									</a>
								{% endif %}
							</div>
						</div>
					{% endfor %}
				</div>
			{% endif %}
		</div>
		<div class="product__container_sportify">
			<div class="product__text mb-5">
				<h3>{{ settings.section_title }}</h3>
				<p>{{ settings.sub_title }}</p>
			</div>
			<div class="product__container_swiper">
				<div class="swiper-wrapper">
					{% for item in settings.categories_slider %}
						{% for prod in item.product.products %}
							<div class="swiper-slide {{ loop.index == 1 ? 'tab_active' }} tab_content" id="{{ item.categories.name }}">
								<div class="prod-col">
									{% include 'product-card.twig' with {'product' : prod, 'index': key} %}
								</div>
							</div>
						{% endfor %}
					{% endfor %}
				</div>
				{% if settings.swiper_buttons %}
					<div class="swiper-button-prev {{ settings.swiper_radius_buttons ? 'radius' }}"></div>
					<div class="swiper-button-next {{ settings.swiper_radius_buttons ? 'radius' }}"></div>
				{% endif %}
			</div>
		</div>
	</div>
</section>
   
<script>
	document.addEventListener("DOMContentLoaded", () => {
		const categoryImages = document.querySelectorAll(".product__item__sportify h3");
		const mainImage = document.querySelector(".product__list__sportify .image img");
		const productItems = document.querySelectorAll(".product__list__sportify .product__item__sportify");
		const tabs = document.querySelectorAll(".tab");
		const tabContents = document.querySelectorAll(".tab_content");

		const defaultImage = categoryImages[2]?.dataset.image || "";
		if (mainImage) mainImage.src = defaultImage;

		const updateImageWithFade = (src) => {
			if (mainImage && src && src !== mainImage.src) {
				mainImage.style.opacity = 0;
				setTimeout(() => {
					mainImage.src = src;
					requestAnimationFrame(() => {
						mainImage.style.opacity = 1;
					});
				}, 300);
			}
		};

		productItems.forEach((item) => {
			const itemImage = item.querySelector("h3")?.dataset.image;

			item.addEventListener("mouseenter", () => {
				const itemData = item.dataset.tab;

				const swiperSlides = document.querySelectorAll(".swiper-slide.tab_content");
				const swiperWrapper = document.querySelector(".product__container_swiper .swiper-wrapper");

				swiperSlides.forEach((slide) => {
					if (itemData === slide.id) {
						slide.classList.add("tab_active");
						swiperWrapper.style.transform = "translate3d(0, 0px, 0px)";
					} else {
						slide.classList.remove("tab_active");
					}
				});

				productItems.forEach((e) => e.classList.remove("active"));
				item.classList.add("active");

				if (itemImage) updateImageWithFade(itemImage);
			});
		});

		tabs.forEach((tab) => {
			tab.addEventListener("click", () => {
				tabs.forEach((t) => t.classList.remove("tab_active"));
				tabContents.forEach((content) => content.classList.remove("tab_active"));

				tab.classList.add("tab_active");
				const targetContent = document.getElementById(tab.getAttribute("data-tab"));
				if (targetContent) targetContent.classList.add("tab_active");
			});
		});
	});
</script>
```
** code after using alpine js :**
``` html copy 
   <section class="categories__swiper__sportify" x-data='{
			settings: {
					videoLink: "{{ settings.video_link }}",
					sectionName: "{{ settings.section_title }}",
					subTitle: "{{ settings.sub_title }}",
					"button": "{{ settings.button }}",
					"swiperButtons": "{{ settings.swiper_buttons }}",
					"swiperRadiusButtons": "{{ settings.swiper_radius_buttons }}"
			},
			categories: {{ settings.categories_slider | json_encode | raw }},
			activeImage: "",
			activeTab: "",
			init() {
				if ( this.categories.length > 0 ) {
						this.activeTab = this.categories[2].categories.name;
						this.activeImage = this.categories[2].categories.image;
				}
			},
			resetSwiper() {
				const swiperWrapper = document.querySelector(".categories__swiper__sportify .swiper-wrapper");
				swiperWrapper.style.transform = "translate3d(0px, 0px, 0px)";
			},
			relateProduct: "activeTab",
			relateProductFun(e) {
				if ( e.id == relateProduct ) {
					e.classList.add("tab_active");
				} else {
					e.classList.remove("tab_active");
				}
			},
			updateImage(image) {
				if (this.activeImage !== image) {
					this.activeImage = image;
				}
			},
			activateTab(tabName) {
				this.activeTab = tabName;
			}
		}'>
	<div class="container-fluid d-flex flex-column flex-lg-row">
		<div class="categories__container_sportify">
			<template x-if="settings.videoLink">
				<video autoplay muted loop playsinline width="100%" height="100%">
					<source :src="settings.videoLink">
				</video>
			</template>
			<template x-if="!settings.videoLink">
				<div class="product__list__sportify d-flex">
					<div class="image">
						<img class="d-none d-lg-flex img-fluid" :src="activeImage || (categories[2]?.categories.image || '')" alt="Background Image" width="100%" height="100%" loading="lazy"/>
					</div>
					<template x-for="(item, index) in categories" :key="index">
						<div class="product__item__sportify" :class="{'active': activeTab === item.categories.name}" @mouseenter="updateImage(item.categories.image); activateTab(item.categories.name); resetSwiper();" x-data="{ image: item.categories.image }">
							<img class="d-flex d-lg-none img-fluid" :src="item.categories.image" alt="" width="100%" height="100%" loading="lazy">
							<div class="product__item__content__sportify" x-data="{ catName: item.categories.name, text: '{{ locals.shop_now }}' }">
								<h3 :data-image="image" x-text="catName"></h3>
								<span class="pieces__count__sportify mb-4 d-block" x-text="`${item.category_count} {{ locals.pieces }}`"></span>
								<template x-if="settings.button">
									<span class="d-flex align-items-center btn as_button" x-data="{ link: item.categories.url }">
										<a type="button" :href="link" class="d-flex" x-text="text"></a>
									</span>
								</template>
								<template x-if="!settings.button">
									<a :href="item.categories.url" class="d-flex" x-text="text"></a>
								</template>
							</div>
						</div>
					</template>
				</div>
			</template>
		</div>
		<div class="product__container_sportify">
			<div class="product__text mb-5">
				<h3 x-text="settings.sectionName"></h3>
				<p x-text="settings.subTitle"></p>
			</div>
			<div class="product__container_swiper">
				<div class="swiper-wrapper">
					{% for item in settings.categories_slider %}
						{% for prod in item.product.products %}
							<div class="swiper-slide tab_content" :class="{ 'tab_active': activeTab === $el.id }" id="{{ item.categories.name }}">
								<div class="prod-col">
									{% include 'product-card.twig' with { 'product': prod } %}
								</div>
							</div>
						{% endfor %}
					{% endfor %}
				</div>
				<template x-if="settings.swiper_buttons">
					<div>
						<div class="swiper-button-prev" :class="{'radius': settings.swiper_radius_buttons}"></div>
						<div class="swiper-button-next" :class="{'radius': settings.swiper_radius_buttons}"></div>
					</div>
				</template>
			</div>
		</div>
	</div>
</section>
```

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

**Example 2: Dynamic List with Add/Remove Items**
- Alpine.js

```html copy
    <div x-data="{ items: [], newItem: '' }">
        <input type="text" x-model="newItem" placeholder="Add a new item">
        <button @click="items.push(newItem); newItem = ''">Add</button>
        <ul>
            <template x-for="(item, index) in items" :key="index">
                <li>
                    <span x-text="item"></span>
                    <button @click="items.splice(index, 1)">Remove</button>
                </li>
            </template>
        </ul>
    </div>
 ```
 - Vanilla JavaScript
```html copy 
    <div>
        <input type="text" id="newItem" placeholder="Add a new item">
        <button id="addItem">Add</button>
        <ul id="itemList"></ul>
    </div>

    <script>
        const newItemInput = document.getElementById('newItem');
        const addItemButton = document.getElementById('addItem');
        const itemList = document.getElementById('itemList');

        addItemButton.addEventListener('click', () => {
            const itemText = newItemInput.value.trim();
            if (itemText) {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${itemText}</span>
                    <button onclick="removeItem(this)">Remove</button>
                `;
                itemList.appendChild(li);
                newItemInput.value = '';
            }
        });

        function removeItem(button) {
            const li = button.parentElement;
            itemList.removeChild(li);
        }
    </script>
```
 **Example 3: Accordion Component**
 - Alpine.js
 ```html copy
      <div x-data="{ openAccordion: null }">
        <div class="accordion-item">
            <div @click="openAccordion === 1 ? openAccordion = null : openAccordion = 1" class="accordion-header">
                Accordion Item 1
            </div>
            <div x-show="openAccordion === 1" class="accordion-content">
                Content for Accordion Item 1
            </div>
        </div>
        <div class="accordion-item">
            <div @click="openAccordion === 2 ? openAccordion = null : openAccordion = 2" class="accordion-header">
                Accordion Item 2
            </div>
            <div x-show="openAccordion === 2" class="accordion-content">
                Content for Accordion Item 2
            </div>
        </div>
        <div class="accordion-item">
            <div @click="openAccordion === 3 ? openAccordion = null : openAccordion = 3" class="accordion-header">
                Accordion Item 3
            </div>
            <div x-show="openAccordion === 3" class="accordion-content">
                Content for Accordion Item 3
            </div>
        </div>
    </div>

 ```
 - Vanilla JavaScript
```html copy
    <div>
        <div class="accordion-item">
            <div class="accordion-header" onclick="toggleAccordion(1)">Accordion Item 1</div>
            <div id="accordionContent1" class="accordion-content">Content for Accordion Item 1</div>
        </div>
        <div class="accordion-item">
            <div class="accordion-header" onclick="toggleAccordion(2)">Accordion Item 2</div>
            <div id="accordionContent2" class="accordion-content">Content for Accordion Item 2</div>
        </div>
        <div class="accordion-item">
            <div class="accordion-header" onclick="toggleAccordion(3)">Accordion Item 3</div>
            <div id="accordionContent3" class="accordion-content">Content for Accordion Item 3</div>
        </div>
    </div>

    <script>
        function toggleAccordion(index) {
            const content = document.getElementById(`accordionContent${index}`);
            content.classList.toggle('open');
        }
    </script>

```

 **Example 4: Modal Component**
 - Alpine
 ```html copy 
    <div x-data="{ isOpen: false }">
        <button @click="isOpen = true">Open Modal</button>
        <div x-show="isOpen" @click.away="isOpen = false" class="modal">
            <div class="modal-content">
                <p>This is a modal!</p>
                <button @click="isOpen = false">Close</button>
            </div>
        </div>
    </div>
 ```
 - Vanilla JavaScript
``` html copy
    <div>
        <button id="openModal">Open Modal</button>
        <div id="modal" class="modal">
            <div class="modal-content">
                <p>This is a modal!</p>
                <button id="closeModal">Close</button>
            </div>
        </div>
    </div>

    <script>
        const openModalButton = document.getElementById('openModal');
        const closeModalButton = document.getElementById('closeModal');
        const modal = document.getElementById('modal');

        openModalButton.addEventListener('click', () => {
            modal.classList.add('open');
        });

        closeModalButton.addEventListener('click', () => {
            modal.classList.remove('open');
        });

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('open');
            }
        });
    </script>
    ```


