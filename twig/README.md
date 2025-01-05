  # Managing Variables in Twig Templates
  
  This document demonstrates how to use Twig to manage variables efficiently and dynamically within a project. Using `theme.settings.set` and `theme.settings.get`, you can define and access variables with ease.
  
  ## Setting Variables with `theme.settings.set`
  
  ### Example: Defining Colors and Texts
  ```twig
  {{ theme.settings.set('main_text', c.main_text) }}
  {{ theme.settings.set('sub_text', c.sub_text) }}
  {{ theme.settings.set('header_color', '#000') }}
  ```
  
  ### Notes:
  1. Variables must be defined using `theme.settings.set` before accessing them with `theme.settings.get`.
  2. Always include a default value when retrieving variables to avoid errors if the variable is undefined.
  
  ### Example Usage in HTML
  ```html
  <section class="dynamic-section">
    <h1 style="background-color: {{ theme.settings.get('header_color', '#f85fff') }};">
      {{ theme.settings.get('main_text') }}
    </h1>
    <button style="background-color: {{ theme.settings.get('header_color', '#ffffff') }};">
      {{ theme.settings.get('sub_text', 'Default Text') }}
    </button>
  </section>
  ```
  
  ## Working with Different Data Types
  
  ### 1. Strings
  ```twig
  {{ theme.settings.set('welcome_message', 'Welcome!') }}
  <section>
    <p>{{ theme.settings.get('welcome_message', 'Hello!') }}</p>
  </section>
  ```
  
  ### 2. Integers/Floats
  ```twig
  {{ theme.settings.set('max_items', 10) }}
  <section>
    <p>Maximum items allowed: {{ theme.settings.get('max_items', 5) }}</p>
  </section>
  ```
  
  ### 3. Booleans
  ```twig
  {{ theme.settings.set('show_banner', true) }}
  <section>
    {% if theme.settings.get('show_banner', false) %}
      <div class="banner">Banner is visible</div>
    {% else %}
      <div class="banner">Banner is hidden</div>
    {% endif %}
  </section>
  ```
  
  ### 4. Colors
  ```twig
  {{ theme.settings.set('button_color', '#ffcc00') }}
  <section>
    <button style="background-color: {{ theme.settings.get('button_color', '#333') }};">
      Click Here
    </button>
  </section>
  ```
  
  ### 5. Arrays
  ```twig
  {{ theme.settings.set('menu_items', ['Home', 'Services', 'Contact Us']) }}
  <section>
    <ul>
      {% for item in theme.settings.get('menu_items', ['Home']) %}
        <li>{{ item }}</li>
      {% endfor %}
    </ul>
  </section>
  ```
  
  ## Best Practices
  1. Always define variables clearly at the top of your code.
  2. Use default values when accessing variables to prevent errors.
  3. Centralize variable definitions for easier future updates and code reuse.
  
  ## Clean Code with Short Variable Names
  ```twig
  {% set c = component %}
  ```
  Using a short variable name like `c` reduces redundancy and improves readability. This approach also:
  - Minimizes the text parsed during runtime, offering a slight performance boost.
  - Simplifies expansion when adding derived or additional variables in the future.
