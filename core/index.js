const attributeHtml = "widget";

class Widget {
  constructor(target) {
    this.target = target;
    this.initialized = false;
  }

  async init(done) {
    try {
      this.initialized = true;
      console.log(
        `Widget initialized at ${this.target.getAttribute(attributeHtml)}`
      );
      done();
    } catch (error) {
      console.error(
        `Initialization failed at ${this.target.getAttribute(attributeHtml)}:`,
        error
      );
      done(error);
    }
  }

  destroy() {
    this.initialized = false;
    console.log(
      `Widget destroyed at ${this.target.getAttribute(attributeHtml)}`
    );
  }
}

class WidgetsPortal {
  constructor(resolver) {
    this.resolver = resolver || this.defaultResolver;
    this.widgets = new Map();
  }

  async init(target, callback) {
    try {
      await this._initializeWidgets(target);
      callback(null);
    } catch (error) {
      callback(error);
    }
  }

  async defaultResolver(widgetPath) {
    return (await import(`../${widgetPath}.js`)).default;
  }

  destroy(target) {
    this._destroyWidgets(target);
  }

  async _initializeWidgets(target) {
    const elements = [target, ...target.querySelectorAll(`[${attributeHtml}]`)];

    for (const element of elements) {
      const widgetPath = element.getAttribute(attributeHtml);
      if (!!widgetPath && !this.widgets.has(widgetPath)) {
        const WidgetClass = await this.resolver(widgetPath);
        const htmlInit = element.cloneNode(true);
        const widgetInstance = new WidgetClass(element);
        await widgetInstance.init((error) => {
          if (error) {
            throw Error(error.message);
          }
          this.widgets.set(widgetPath, {
            htmlInit: htmlInit,
            instance: widgetInstance,
          });
        });
      } else {
        throw Error("Error...not possible to initialize");
      }
    }
  }

  _destroyWidgets(target) {
    const elements = [
      target,
      ...target.querySelectorAll(`[${attributeHtml}]`),
    ].reverse();
    for (const element of elements) {
      const widgetPath = element.getAttribute(attributeHtml);
      if (this.widgets.has(widgetPath)) {
        const widget = this.widgets.get(widgetPath);
        widget.instance.target.replaceWith(widget.htmlInit);
        widget.instance.destroy();
        this.widgets.delete(widgetPath);
      }
    }
  }
}

export { WidgetsPortal, Widget };
