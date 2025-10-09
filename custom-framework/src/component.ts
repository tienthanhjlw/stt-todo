import { reactive } from './engine.js';

export abstract class Component {
  protected state: any;
  private element: HTMLElement | null = null;
  private readonly initialTemplate: string;

  constructor(template: string) {
    this.initialTemplate = template;
    const updateCallback = () => this.update();
    this.state = reactive({}, updateCallback);
  }

  // Method to be called to render the component
  public render(element: HTMLElement) {
    this.element = element;
    this.update();
  }

  // Update the DOM based on the current state
  protected update() {
    if (!this.element) return;

    let renderedTemplate = this.initialTemplate;
    const data = this.state;

    // Replace {{ key }} with data[key]
    renderedTemplate = renderedTemplate.replace(/\{\{\s*(.*?)\s*\}\}/g, (match, key) => {
      const value = key.trim().split('.').reduce((acc: any, part: string) => acc && acc[part], data);
      return value !== undefined && value !== null ? value : '';
    });

    this.element.innerHTML = renderedTemplate;
    this.bindData();
    this.bindEvents();
  }

  // A simple data binding implementation for attributes
  private bindData() {
    if (!this.element) return;
    const elementsWithBinding = this.element.querySelectorAll('[data-bind]');
    elementsWithBinding.forEach(el => {
      const key = el.getAttribute('data-bind');
      if (key && this.state.hasOwnProperty(key)) {
        (el as HTMLElement).innerText = this.state[key];
      }
    });
  }

  // A simple event binding implementation
  private bindEvents() {
    if (!this.element) return;
    const elementsWithEvents = this.element.querySelectorAll('[data-event]');
    elementsWithEvents.forEach(el => {
      const eventAttr = el.getAttribute('data-event');
      if (eventAttr) {
        const [eventName, methodName] = eventAttr.split(':');
        if (eventName && methodName && typeof (this as any)[methodName] === 'function') {
          el.addEventListener(eventName, (this as any)[methodName].bind(this));
        }
      }
    });
  }

  // Method to update the state. The proxy will trigger the update.
  protected setState(newState: any) {
    Object.assign(this.state, newState);
  }
}