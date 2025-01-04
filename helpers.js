
export default class AppHelpers {

        /**
         * Toggles classes on elements matching the selector based on a condition.
         * @param {string} selector - CSS selector for target elements.
         * @param {array<string>} classes1 - Classes to add if the condition is true.
         * @param {array<string>} classes2 - Classes to add if the condition is false.
         * @param {function} callback - A function returning a boolean to evaluate the condition.
         * شرح الفكرة
الدالة دي اسمها toggleClassIf، وهي فكرتها إنها تشتغل على شوية عناصر في الصفحة (بتحددها عن طريق CSS selector) وتشوف كل عنصر فيهم. بناءً على شرط معين (بيتحدد في callback)، هي:

تضيف مجموعة من الكلاسات (classes1) لو الشرط اتحقق (طلع true).
أو تضيف مجموعة تانية (classes2) لو الشرط ما اتحققش (طلع false).
يعني الكود ده بيساعدك إنك تتحكم في الـ classes (الكلاسات) بتاعة العناصر بناءً على حاجة معينة (زي ما يكون عندك زرار لو متفاعل تضيف له active، ولو مش متفاعل تضيف له inactive).

الطريقة اللي بتشتغل بيها
selector: هو اللي بيحدد العناصر اللي هتشتغل عليها (زي .btn أو #id).
classes1 و classes2: هما القوائم بتاعة الكلاسات اللي هيتضافوا للعناصر.
classes1: لما الشرط يطلع true.
classes2: لما الشرط يطلع false.
callback: دي فانكشن (وظيفة) بتقول الشرط اللي هيتم بناءً عليه الاختيار بين classes1 و classes2.
         * @example
         * const helpers = new AppHelpers();

        const helpers = new AppHelpers(); // بتستخدم الكلاس اللي فيه الدالة
helpers.toggleClassIf(
    '.btn',                     // شغال على كل الزراير اللي الكلاس بتاعها .btn
    ['active'],                 // الكلاسات اللي هتضاف لو الشرط true
    ['inactive'],               // الكلاسات اللي هتضاف لو الشرط false
    (el) => el.hasAttribute('data-active') // الشرط: لو العنصر عنده data-active
); 
        */
        toggleClassIf(selector, classes1, classes2, callback) {
                document.querySelectorAll(selector).forEach(element => this.toggleElementClassIf(element, classes1, classes2, callback));
                return this;
        }
        // =======================================================
        /**
         * Toggles classes on a single element based on a condition.
         * @param {HTMLElement} element - Target DOM element.
         * @param {array<string>} classes1 - Classes to add if the condition is true.
         * @param {array<string>} classes2 - Classes to add if the condition is false.
         * @param {function} callback - A function returning a boolean to evaluate the condition.
         * الطريقة اللي بتشتغل بيها
element: ده العنصر (HTMLElement) اللي هنتعامل معاه.
classes1 و classes2: شوية كلاسات (ممكن تبقى كـ Array أو String):
classes1: هيتضافوا لو الشرط طلع true.
classes2: هيتضافوا لو الشرط طلع false.
callback: دي فانكشن بتاخد العنصر كـ parameter وترجع true أو false.
خطوات التشغيل
بيتأكد إن الكلاسات classes1 و classes2 مكتوبة في صورة Array (لو مش Array بيحوّلها باستخدام split).
بيشوف الشرط اللي في callback:
لو الشرط طلع true، بيضيف classes1 ويشيل classes2.
لو الشرط طلع false، بيضيف classes2 ويشيل classes1.
بيرجع this (عشان تسهّل استخدام الدالة في تسلسل أوامر "method chaining").
         * @example
         * const element = document.querySelector('.btn');
const element = document.querySelector('.btn'); // بتجيب العنصر اللي هتشتغل عليه

helpers.toggleElementClassIf(
    element,                      // العنصر المستهدف
    ['active'],                   // الكلاسات اللي هتضاف لو الشرط true
    ['inactive'],                 // الكلاسات اللي هتضاف لو الشرط false
    (el) => el.hasAttribute('data-active') // الشرط: لو عنده data-active
);
         */
        toggleElementClassIf(element, classes1, classes2, callback) {
                classes1 = Array.isArray(classes1) ? classes1 : classes1.split(' ');
                classes2 = Array.isArray(classes2) ? classes2 : classes2.split(' ');
                let isClasses1 = callback(element);
                element?.classList.remove(...(isClasses1 ? classes2 : classes1));
                element?.classList.add(...(isClasses1 ? classes1 : classes2));
                return this;
        }
        // =======================================================
        /**
         * Retrieves an element or elements based on a selector.
         * @param {string|HTMLElement} selector - CSS selector or DOM element.
         * @return {null|HTMLElement|NodeList} - The selected element(s).
         * الطريقة اللي بتشتغل بيها
selector:
لو اللي اتبعت لها كائن (object) زي عنصر HTML جاهز، بترجعه زي ما هو.
لو selector بيساوي .total-price أو .before-price، بتجيب كل العناصر اللي بتطابقه باستخدام querySelectorAll (يعني بتجيب مجموعة عناصر).
لو غير كده، بتجيب أول عنصر يطابق الـ selector باستخدام querySelector (يعني بتجيب عنصر واحد بس).
         * @example
         * const helpers = new AppHelpers();
         * const element = helpers.element('.header');
         */
        element(selector) {
                if (typeof selector == 'object') {
                        return selector;
                }
                if (selector === '.total-price' || selector === '.before-price') {
                        return document.querySelectorAll(selector);
                }
                return document.querySelector(selector);
        }

        // =======================================================

        /**
         * Watches a specific element by storing it in the instance.
         * @param {string} name - Key to store the element.
         * @param {string} selector - CSS selector for the element.
         * @return {AppHelpers} - Current instance for chaining.
         * @example
app.watchElement('buttons', '.btn');
console.log(app.buttons); // NodeList يحتوي على كل العناصر اللي عندها الكلاس .btn
         */
        watchElement(name, selector) {
                this[name] = this.element(selector);
                return this;
        }
        // =======================================================

        /**
         * Watches multiple elements and stores them in the instance.
         * @param {Object.<string, string>} elements - Object of key-selector pairs.
         * @example
helpers.watchElements({
    header: '.header',        // تخزين العنصر اللي عنده الكلاس .header باسم 'header'
    footer: '.footer',        // تخزين العنصر اللي عنده الكلاس .footer باسم 'footer'
    buttons: '.btn',          // تخزين كل العناصر اللي عندها الكلاس .btn باسم 'buttons'
});
console.log(helpers.header);   // العنصر المخزن باسم header
console.log(helpers.footer);   // العنصر المخزن باسم footer
console.log(helpers.buttons);  // العناصر المخزنة باسم buttons
         */
        watchElements(elements) {
                Object.entries(elements).forEach(element => this.watchElement(element[0], element[1]));
                return this;
        }
        // =======================================================

        /**
         * Adds an event listener to an element or elements.
         * @param {string} action - Event type (e.g., 'click').
         * @param {string|HTMLElement} element - Target element(s).
         * @param {function} callback - Event handler.
         * @param {object|undefined} options - Event listener options.
         * @example
// تخزين العنصر باستخدام element
const button = helpers.element('#my-btn');

// إضافة حدث click للعنصر
helpers.on('click', button, () => {
    console.log('Button clicked!');
});
// استخدام on مباشرة لإضافة حدث click لمجموعة أزرار
helpers.on('click', '.btn', (event) => {
    console.log('Button clicked:', event.target.textContent);
});

*/
        on(action, element, callback, options = {}) {
                if (typeof element == 'object') {
                        this.element(element).addEventListener(action, callback, options);
                        return this;
                }
                document.querySelectorAll(element).forEach(el => el.addEventListener(action, callback, options));
                return this;
        }
        // =======================================================

        /**
         * Adds a click event listener to an element or elements.
         * @param {string|HTMLElement} element - Target element(s).
         * @param {function} callback - Event handler.
         * @return {AppHelpers}
         * @example
         * helpers.onClick('.btn', (event) => console.log('Button clicked!'));
         */
        onClick(element, callback) {
                return this.on('click', element, callback);
        }
        // =======================================================

        /**
         * Adds a keyup event listener to an element or elements.
         * @param {string|HTMLElement} element - Target element(s).
         * @param {function} callback - Event handler.
         * @return {AppHelpers}
         * @example
         * helpers.onKeyUp('.input', (event) => console.log('Key pressed!'));
         */
        onKeyUp(element, callback) {
                return this.on('keyup', element, callback);
        }
        // =======================================================

        /**
         * Executes a callback for all elements matching a selector.
         * @param {string|HTMLElement} element - Target element(s).
         * @param {function} callback - Function to execute on each element.
         * @example
         * helpers.all('.card', (el) => el.classList.add('highlight'));
         */
        all(element, callback) {
                document.querySelectorAll(element).forEach(callback);
                return this;
        }
        // =======================================================

        /**
         * Hides an element by setting its display style to 'none'.
         * @param {string|HTMLElement} element - Target element.
         * @return {AppHelpers}
         * @example
         * helpers.hideElement('.modal');
         * او ممكن نعدل عليها ونعمل 
         *                 this.element(element).remove();
         */
        hideElement(element) {
                this.element(element).style.display = 'none';
                return this;
        }
        // =======================================================

        /**
         * Shows an element by setting its display style to the specified value.
         * @param {string|HTMLElement} element - Target element.
         * @param {string} display - Display value (default is 'block').
         * @return {AppHelpers}
         * @example
         * helpers.showElement('.modal');
         */
        showElement(element, display = 'block') {
                this.element(element).style.display = display;
                return this;
        }
        // =======================================================

        /**
         * Removes one or more classes from an element.
         * @param {string|HTMLElement} element - Target element.
         * @param {string} className - Classes to remove.
         * @return {AppHelpers}
         * @example
         * helpers.removeClass('.btn', 'active', 'disabled');
         */
        removeClass(element, className) {
                this.element(element).classList.remove(...Array.from(arguments).slice(1));
                return this;
        }
        // =======================================================

        /**
         * Adds one or more classes to an element.
         * @param {string|HTMLElement} element - Target element.
         * @param {string} className - Classes to add.
         * @return {AppHelpers}
         * @example
         * helpers.addClass('.btn', 'active', 'primary');
         */
        addClass(element, className) {
                this.element(element).classList.add(...Array.from(arguments).slice(1));
                return this;
        }
        // =======================================================

                /**
         * Adds one or more classes to an element.
         * @param {string|HTMLElement} elements - Target elements.
         * @param {string} datasetKey - datasetKey to add.
         * @param {function} callback - Function to execute on each element.
         * @return {AppHelpers}
         * @example
         * helpers.addClass('.btn', 'active', 'primary');
         */

        GetProductsSportify = (elements, datasetKey, callback) => {
                if (!elements || elements.length === 0) return;
                elements.forEach((item) => {
                        const id = item.getAttribute(`data-${datasetKey}`);
                        if (id) {
                                salla.product
                                        .getDetails(id, ["images", "options", "rating", "sold_quantity", "category", "notify_availability"])
                                        .then((response) => {
                                                const productData = response.data;
                                                if (typeof callback === "function") {
                                                        callback(item, productData);
                                                }
                                        })
                                        .catch((error) => {
                                                console.error("Error fetching product details:", error);
                                        });
                        }
                });
        }
}
