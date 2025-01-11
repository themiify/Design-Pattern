# Front-End Development Guidelines

## Table of Contents
1. [Overview](#overview)
2. [Naming Conventions](#naming-conventions)
   - [Class Names](#class-names)
   - [Function Names](#function-names)
   - [ID Names](#id-names)
3. [Workflow](#workflow)
   - [Using Tailwind CSS](#using-tailwind-css)
   - [Converting Tailwind to Sass](#converting-tailwind-to-sass)
   - [Image Compression](#image-compression)
   - [File References](#file-references)
   - [Template Variables](#template-variables)
4. [PostCSS and PurgeCSS Integration](#postcss-and-purgecss-integration)
   - [What is PostCSS?](#what-is-postcss)
   - [What is PurgeCSS?](#what-is-purgecss)
   - [Why Use PostCSS and PurgeCSS?](#why-use-postcss-and-purgecss)
   - [How to Use PostCSS and PurgeCSS](#how-to-use-postcss-and-purgecss)
5. [Examples](#examples)
   - [HTML Example](#html-example)
   - [JavaScript Example](#javascript-example)
   - [Sass Example](#sass-example)
6. [Best Practices](#best-practices)
   - [For Developers](#for-developers)
   - [For Team Leads](#for-team-leads)
7. [Tools and Resources](#tools-and-resources)

---

## Overview

This guide establishes a standardized approach to front-end development, covering design patterns, naming conventions, workflows, and tools such as PostCSS, PurgeCSS, and Tailwind CSS. Adhering to these guidelines ensures consistency, maintainability, and optimization across the codebase.

---

## Naming Conventions

### Class Names
**Structure:** `[namespace]__[component]-[element]`

- **Namespace:** Prefix indicating author or purpose (e.g., `spr__`).
- **Component:** Name of the primary component.
- **Element:** Specific part within the component.
- **Examples:**
```text copy
spr__header
spr__header-logo
spr__header-nav 
```

### Function Names
**Structure:** `[namespace]_[component][Action]()`
- **Namespace:** Prefix indicating author or purpose.
- **Component:** Name of the primary component.
- **Action:** Describes the behavior or action..
- **Examples:**
```text copy
Sprt_HeaderToggle()
Sprt_HeaderScroll()

```
### ID Names
**Structure:** `[namespace]__[component]-[element]-id`
- **Namespace:** As defined earlier.
- **Component:** Main component's name.
- **Element:** Specific element within the component.
- **-id:** Indicates it is an ID.
- **Examples:**
``` text copy
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


## **PostCSS and PurgeCSS Integration**
**What is PostCSS?**

PostCSS is a tool for transforming CSS with JavaScript plugins. It allows you to:

   - Add vendor prefixes (e.g., -webkit-, -moz-) for cross-browser compatibility.
   - Minify CSS for production.
   - Use future CSS features today.
   - Remove unused CSS (with PurgeCSS).
**What is PurgeCSS?**

PurgeCSS is a tool that removes unused CSS from your stylesheets. It analyzes your HTML, JavaScript, and other files to determine which CSS classes are actually being used.

**Why Use PostCSS and PurgeCSS?**
- PostCSS ensures your styles work across all browsers and improves development efficiency.
- PurgeCSS reduces the size of your CSS files, improving page load times. It’s especially useful when using utility-first frameworks like Tailwind CSS.

**How to Use PostCSS and PurgeCSS**

**Step 1: Install Required Packages**
- Install the necessary packages for PostCSS, PurgeCSS, and Tailwind CSS:
```bash copy
npm install postcss autoprefixer @fullhuman/postcss-purgecss tailwindcss --save-dev
```
**Step 2: Configure PostCSS**

- Create a postcss.config.js file in the root of your project:
```javascript copy
// postcss.config.js
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
    plugins: [
        require('autoprefixer'), // Auto-prefixer for cross-browser compatibility
        purgecss({
            content: [
                './templates/**/*.twig', // Scan Twig templates
                './assets/js/**/*.js',   // Scan JavaScript files
            ],
            defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: ['dynamic-class', 'another-class'], // Whitelist dynamic classes
        }),
    ],
};
```
**Step 3: Update Webpack Configuration**
- Update your webpack.config.js file to include PostCSS and PurgeCSS:
```javascript copy
// webpack.config.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './assets/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader', // Add PostCSS loader
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
};
```
**Step 4: Configure Tailwind CSS (Optional)**
- If you’re using Tailwind CSS, configure it in your tailwind.config.js file:
```javascript copy
// tailwind.config.js
module.exports = {
    purge: {
        content: [
            './templates/**/*.twig', // Scan Twig templates
            './assets/js/**/*.js',   // Scan JavaScript files
        ],
        options: {
            defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        },
    },
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [],
};
```
**Step 5: Build and Test**
Build the project:
```bash copy
salla theme p --with-editor 
```
- Test the application to ensure no styles are missing.
- Check the size of the generated CSS file (dist/styles.css) to verify PurgeCSS is working.

## **Examples**
**HTML Example**
```html copy
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
- Run HTML
**JavaScript Example**
```javascript copy
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
**Sass Example**
```scss copy
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

## **Best Practices**

**For Developers**
**Write Modular CSS:**
   - Use reusable utility classes (e.g., Tailwind) or component-specific styles.
   - Avoid writing global styles unless absolutely necessary.
**Whitelist Dynamic Classes:**
   - If a class is added dynamically via JavaScript (e.g., classList.add), whitelist it in the safelist option of PurgeCSS.
**Test Thoroughly:**
   - After enabling PurgeCSS, test your application to ensure no styles are missing.
   - Pay special attention to dynamically generated content (e.g., modals, dropdowns).
## **For Team Leads**

**Document the Workflow:**
   - Clearly explain how PostCSS and PurgeCSS are integrated into the build process.
   - Provide examples and configuration files for reference.
**Set Up a Starter Template:**
   - Create a boilerplate project with PostCSS, PurgeCSS, and Tailwind pre-configured.
   - This will help new team members get started quickly.
**Monitor Build Output:**
   - Regularly check the size of the generated CSS files to ensure PurgeCSS is working as expected.

## **Tools and Resources**

   - PostCSS Documentation: https://postcss.org/

   - PurgeCSS Documentation: https://purgecss.com/

   - Tailwind CSS Documentation: https://tailwindcss.com/

   - Webpack Documentation: https://webpack.js.org/
