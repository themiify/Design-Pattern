  # 1-Managing Variables in Twig Templates
  
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

# 2-Template Inheritance
Twig's template inheritance allows you to create a base template (layout) and extend it in child templates. This promotes code reuse and maintainability

**Example:**
```twig copy 
{# base.twig #}
    <!DOCTYPE html>
    <html>
    <head>
        <title>{% block title %}Default Title{% endblock %}</title>
    </head>
    <body>
        <header>{% block header %}Header Content{% endblock %}</header>
        <main>{% block content %}{% endblock %}</main>
        <footer>{% block footer %}Footer Content{% endblock %}</footer>
    </body>
    </html>
```
``` twig copy 
{# home.twig #}
    {% extends 'base.twig' %}

    {% block title %}Home Page{% endblock %}

    {% block content %}
        <h1>Welcome to the Home Page!</h1>
    {% endblock %}
```

# 3-Modularization with Includes and Macros
**Includes**

Use {% include %} to modularize your templates and reuse components like headers, footers, or buttons.

**Example:**
``` twig copy
{# header.twig #}
    <header>
        <h1>My Website</h1>
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
        </nav>
    </header>
```
```twig copy 
{# home.twig #}
    {% extends 'base.twig' %}

    {% block content %}
        {% include 'header.twig' %}
        <p>Welcome to the home page!</p>
{% endblock %}
```
**Macros**

Twig macros are reusable functions for templates. Use them for repetitive UI components like form inputs or buttons.

**Example:**
```twig copy
{# macros.twig #}
    {% macro input(name, value, type = 'text') %}
        <input type="{{ type }}" name="{{ name }}" value="{{ value }}">
    {% endmacro %}
```
```twig copy
{# form.twig #}
    {% import 'macros.twig' as macros %}

    <form>
        {{ macros.input('username', '', 'text') }}
        {{ macros.input('password', '', 'password') }}
    </form>
```
# 4-Control Structures and Filters
Twig supports control structures like if, for, and set to handle logic in templates. Use filters to manipulate data directly in templates.

**Example:**
```twig copy
    {% set users = ['Alice', 'Bob', 'Charlie'] %}

    <ul>
        {% for user in users %}
            <li>{{ user }}</li>
        {% endfor %}
    </ul>

    {% if users|length > 0 %}
        <p>There are {{ users|length }} users.</p>
    {% else %}
        <p>No users found.</p>
    {% endif %}
```
# 5-Debugging and Profiling
Twig provides tools for debugging and profiling templates. Use {{ dump() }} to inspect variables during development.

**Example:**
```twig copy
{{ dump(variable) }}
```
# 6-Organizing Templates
Organize your templates into logical directories for better maintainability.

**Example Structure:**
``` copy
templates/
├── layouts/
│   ├── base.twig
│   ├── header.twig
│   └── footer.twig
├── components/
│   ├── button.twig
│   └── card.twig
├── pages/
│   ├── home.twig
│   └── about.twig
```
# 7-Continuous Learning
Encourage the team to explore Twig's official documentation and experiment with advanced features.

**Resources:**
- [Twig Documentation](https://twig.symfony.com/doc/)
- [Twig Extensions](https://github.com/twigphp/Twig-extensions)
- [Twig Best Practices](https://symfony.com/doc/current/best_practices.html#templates)
