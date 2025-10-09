// A simple reactive engine using Proxies
export function reactive(target, updateCallback) {
    return new Proxy(target, {
        set(obj, prop, value) {
            const result = Reflect.set(obj, prop, value);
            updateCallback(); // Trigger a re-render on state change
            return result;
        }
    });
}
