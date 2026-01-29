import { reactive } from './engine.js';
export class Component {
    state;
    element = null;
    initialTemplate;
    constructor(template) {
        this.initialTemplate = template;
        const updateCallback = () => this.update();
        this.state = reactive({}, updateCallback);
    }
    // Method to be called to render the component
    render(element) {
        this.element = element;
        this.update();
    }
    // Update the DOM based on the current state
    update() {
        if (!this.element)
            return;
        let renderedTemplate = this.initialTemplate;
        const data = this.state;
        // Replace {{ key }} with data[key]
        renderedTemplate = renderedTemplate.replace(/\{\{\s*(.*?)\s*\}\}/g, (match, key) => {
            const value = key.trim().split('.').reduce((acc, part) => acc && acc[part], data);
            return value !== undefined && value !== null ? value : '';
        });
        this.element.innerHTML = renderedTemplate;
        this.bindData();
        this.bindEvents();
    }
    // A simple data binding implementation for attributes
    bindData() {
        if (!this.element)
            return;
        const elementsWithBinding = this.element.querySelectorAll('[data-bind]');
        elementsWithBinding.forEach(el => {
            const key = el.getAttribute('data-bind');
            if (key && this.state.hasOwnProperty(key)) {
                el.innerText = this.state[key];
            }
        });
    }
    // A simple event binding implementation
    bindEvents() {
        if (!this.element)
            return;
        this.element.querySelectorAll('*').forEach(el => {
            Array.from(el.attributes).forEach(attr => {
                if (attr.name.startsWith('(') && attr.name.endsWith(')')) {
                    const eventName = attr.name.slice(1, -1);
                    const methodName = attr.value.replace(/\(\)$/, ''); // remove ()
                    if (eventName && methodName && typeof this[methodName] === 'function') {
                        el.addEventListener(eventName, this[methodName].bind(this));
                    }
                }
            });
        });
    }
    // Method to update the state. The proxy will trigger the update.
    setState(newState) {
        Object.assign(this.state, newState);
    }
}
