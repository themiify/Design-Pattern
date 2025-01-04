
# Design Pattern Guidelines for Front-End Development

This document outlines the design pattern that the team should follow to maintain consistency, readability, and scalability in our codebase. It also highlights some useful practices and tools for optimization.

---

## **Naming Conventions**

### **Class Names:**
- **Structure:**
  ```text
  [namespace]__[component]-[element]
  ```
  - **Namespace**: Prefix indicating the author or purpose. Examples:
     - `spr__` (author: spr)
  - **Component**: Name of the main component.
  - **Element**: Specific part within the component.

- **Examples:**
  ```text
  spr__header
  spr__header-logo
  spr__header-nav
  ```

### **Function Names:**
- **Structure:**
  ```text
  [namespace]_[component][Action]()
  ```
  - **Namespace**: Prefix indicating the author or purpose.
  - **Component**: Name of the component.
  - **Action**: Describes the behavior or action.

- **Examples:**
  ```text
  Sprt_HeaderToggle()
  Sprt_HeaderScroll()
  ```

### **ID Names:**
- **Structure:**
  ```text
  [namespace]__[component]-[element]-id
  ```
  - **Namespace**: As defined earlier.
  - **Component**: Main component's name.
  - **Element**: Specific element within the component.
  - **`-id`**: Indicates it is an ID.

- **Examples:**
  ```text
  sprt__header-id
  sprt__header-logo-id
  ```
---

## **Workflow**

1. **Using Tailwind CSS:**
   - Add utility classes directly in the HTML.
   - Stick to the naming conventions provided.

2. **Converting Tailwind to Sass for Performance:**
   - Once development finishes, transfer Tailwind styles into `.scss` files.
   - Retain existing naming practices when converting.

3. **Image Compression:**
   - Compress all images beforehand using these tools:
     - [Image Resizer](https://imageresizer.com/image-compressor)
     - [Compress PNG](https://compresspng.com/)

4. **File References:**
   - **`src/assets/js/app-helpers.js`:** Contains reusable logic and utility functions.
   - **`src/assets/js/base-page.js`:** Handles global page interactions and initialization.

5. **Template Variables:**
   - Use `{% set c = component %}` to simplify component management in templates.

---

## **Example Implementation**

### **HTML Example:**
```html
<header class="spr__header">
    <div id="sprt__header-logo-id" class="spr__header-logo">
        <img src="logo.png" alt="Logo" class="w-16 h-16">
    </div>
    <nav id="sprt__header-nav-id" class="spr__header-nav">
        <ul class="flex space-x-4">
            <li class="text-lg font-semibold">Home</li>
            <li class="text-lg font-semibold">About</li>
            <li class="text-lg font-semibold">Contact</li>
        </ul>
    </nav>
</header>
```

### **JavaScript Example:**
```javascript
// Toggle Header Visibility
function Sprt_HeaderToggle() {
    const header = document.getElementById('sprt__header-id');
    header.classList.toggle('hidden');
}

// Add Scroll Effect to Header
function Sprt_HeaderScroll() {
    window.addEventListener('scroll', () => {
        const header = document.getElementsByClassName('spr__header');
        if (window.scrollY > 50) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }
    });
}
```

### **Sass Example:**
```scss
.sprt__header {
    @apply bg-white fixed top-0 w-full;

    &-logo {
        @apply flex items-center;
    }

    &-nav {
        @apply flex justify-end;
    }
}
```
