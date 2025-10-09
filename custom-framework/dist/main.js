import { Component } from './component.js';
class App extends Component {
    constructor() {
        super(`
      <div>
        <h1>Counter App</h1>
        <p>Count: <span data-bind="count"></span></p>
        <button data-event="click:increment">Increment</button>
      </div>
    `);
        this.setState({ count: 0 });
    }
    increment() {
        this.setState({ count: this.state.count + 1 });
    }
}
const appRoot = document.getElementById('app');
if (appRoot) {
    const app = new App();
    app.render(appRoot);
}
