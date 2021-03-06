import {createApp, Component, DebuggerEvent} from 'vue';
import {App} from "@vue/runtime-core";

console.log('Compile success');

export abstract class ComponentAbstract {
  /*
    The component instance that this object is linked to.
   */
  protected component: any;

  /*
    A list/hash of attributes that are exposed to accept data from the parent component. It has an Array-based simple
    syntax and an alternative Object-based syntax that allows advanced configurations such as type checking, custom
    validation and default values.
   */
  static props: Array<string> | Object;

  /*
    A list of function names to use with the vue computed.
   */
  static computed_list: string[];
  static methods_list: string[];

  /*
    Called synchronously immediately after the instance has been initialized, before data observation and
    event/watcher setup.
   */
  constructor(component) {
    this.component = component;
    window['ctrl'] = this;
  }

  /*
    Called synchronously immediately after the instance has been initialized, before data observation and
    event/watcher setup.
   */
  public beforeCreate() {}

  /*
  The function that returns a data object for the component instance. In data, we don't recommend to observe objects
  with their own stateful behavior like browser API objects and prototype properties. A good idea would be to have
  here just a plain object that represents component data.

  Once observed, you can no longer add reactive properties to the root data object. It is therefore recommended to
  declare all root-level reactive properties upfront, before creating the instance.

  After the instance is created, the original data object can be accessed as vm.$data. The component instance also
  proxies all the properties found on the data object, so vm.a will be equivalent to vm.$data.a.

  Properties that start with _ or $ will not be proxied on the component instance because they may conflict with
  Vue's internal properties and API methods. You will have to access them as vm.$data._property.
   */
  public abstract data(): object;

  /*
    Called synchronously after the instance is created. At this stage, the instance has finished processing the
    options which means the following have been set up: data observation, computed properties, methods, watch/event
    callbacks. However, the mounting phase has not been started, and the $el property will not be available yet.
   */
  public created(): void {}

  /*
    Called right before the mounting begins: the render function is about to be called for the first time.
   */
  public beforeMount() {}

  /*
    Called after the instance has been mounted, where element, passed to Vue.createApp({}).mount() is replaced by
    the newly created vm.$el. If the root instance is mounted to an in-document element, vm.$el will also be
    in-document when mounted is called.

    Note that mounted does not guarantee that all child components have also been mounted. If you want to wait
    until the entire view has been rendered, you can use vm.$nextTick inside of
   */
  public mounted() {}

  /*
    Called when data changes, before the DOM is patched. This is a good place to access the existing DOM before an
    update, e.g. to remove manually added event listeners.

    This hook is not called during server-side rendering, because only the initial render is performed server-side.
   */
  public beforeUpdate() {}

  /*
  Called after a data change causes the virtual DOM to be re-rendered and patched.

  The component's DOM will have been updated when this hook is called, so you can perform DOM-dependent operations
  here. However, in most cases you should avoid changing state inside the hook. To react to state changes, it's
  usually better to use a computed property or watcher instead.

  Note that updated does not guarantee that all child components have also been re-rendered. If you want to wait
  until the entire view has been re-rendered, you can use vm.$nextTick inside of updated

  Example:
  updated() {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been re-rendered
    })
  }
   */
  public updated() {}

  /*
    Called when a kept-alive component is activated.
   */
  public activated() {}

  /*
    Called when a kept-alive component is deactivated.
   */
  public deactivated() {}

  /*
    Called right before a component instance is unmounted. At this stage the instance is still fully functional.
   */
  public beforeUnmount() {}

  /*
    Called after a component instance has been unmounted. When this hook is called, all directives of the
    component instance have been unbound, all event listeners have been removed, and all child component
    instance have also been unmounted.
   */
  public unmounted() {}

  /*
    Called when an error from any descendent component is captured. The hook receives three arguments: the error,
    the component instance that triggered the error, and a string containing information on where the error was
    captured. The hook can return false to stop the error from propagating further.

    Error Propagation Rules:

    By default, all errors are still sent to the global config.errorHandler if it is defined, so that these errors
    can still be reported to an analytics service in a single place.

    If multiple errorCaptured hooks exist on a component's inheritance chain or parent chain, all of them will be
    invoked on the same error.

    If the errorCaptured hook itself throws an error, both this error and the original captured error are sent to
    the global config.errorHandler.

    An errorCaptured hook can return false to prevent the error from propagating further. This is essentially
    saying "this error has been handled and should be ignored." It will prevent any additional errorCaptured
    hooks or the global config.errorHandler from being invoked for this error.
   */
  public errorCaptured(err: Error, instance: Component, info: string): boolean|void {}

  /*
    Called when virtual DOM re-render is tracked. The hook receives a debugger event as an argument. This event
    tells you what operation tracked the component and the target object and key of that operation.
   */
  public renderTracked(e: DebuggerEvent): void {};

  /*
    Called when virtual DOM re-render is triggered.Similarly to renderTracked, receives a debugger event as an
    argument. This event tells you what operation triggered the re-rendering and the target object and key of
    that operation.
   */
  public renderTriggered(e: DebuggerEvent): void {};

  /*
    The data object that the component instance is observing. The component instance proxies access to the properties
    on its data object.
   */
  get $data() {
    return this.component.$data;
  }

  get $props() {
    return this.component.$props;
  }

  get $el() {
    return this.component.$el;
  }

  get $options() {
    return this.component.$options;
  }

  get $parent() {
    return this.component.$parent;
  }

  get $root() {
    return this.component.$root;
  }

  get $slots() {
    return this.component.$slots;
  }

  get $refs() {
    return this.component.$refs;
  }

  get $attrs() {
    return this.component.$attrs;
  }

  /*
    Watch a reactive property or a computed function on the component instance for changes. The callback gets
    called with the new value and the old value for the given property. We can only pass top-level data, prop,
    or computed property name as a string. For more complex expressions or nested properties, use a function
    instead.
   */
  get $watch() {
    return this.component.$watch;
  }

  /*
    Trigger an event on the current instance. Any additional arguments will be passed into the listener's callback function.
   */
  get $emit() {
    return this.component.$emit;
  }

  /*
    Force the component instance to re-render. Note it does not affect all child components, only the instance itself
    and child components with inserted slot content.
   */
  get $forceUpdate() {
    return this.component.$forceUpdate;
  }

  /*
    Defer the callback to be executed after the next DOM update cycle. Use it immediately after you've changed some
    data to wait for the DOM update. This is the same as the global nextTick, except that the callback's this context
    is automatically bound to the instance calling this method.
   */
  get $nextTick() {
    return this.component.$nextTick;
  }
}

export class VueApp {
  protected app;
  constructor(app) {
    this.app = app;
  }

  public registerComponent(label: string, Cls: typeof ComponentAbstract, html: string, data?: Component) {
    console.log(Cls.props)

    let computed = {};
    for (const computed_function_name of Cls.computed_list) {
      computed[computed_function_name] = function (...args) {
        return (this as any).ctrl[computed_function_name](...args)
      }
    }

    let methods = {};
    for (const method_function_name of Cls.methods_list) {
      methods[method_function_name] = function (...args) {
        return (this as any).ctrl[method_function_name](...args)
      }
    }


    const base_data: Component = {
      template: html,
      data() {
        return this.ctrl.data();
      },
      created () {
        this.ctrl.created();
      },
      beforeCreate() {
        // @ts-ignore - Idk why this typing doesn't work here
        this.ctrl = new Cls(this);
        this.ctrl.beforeCreate();
      },
      beforeMount() {
        this.ctrl.beforeMount();
      },
      mounted() {
        this.ctrl.mounted();
      },
      beforeUpdate() {
        this.ctrl.beforeUpdate();
      },
      updated() {
        this.ctrl.updated();
      },
      activated() {
        this.ctrl.activated();
      },
      deactivated() {
        this.ctrl.deactivated();
      },
      beforeUnmount() {
        this.ctrl.beforeUnmount();
      },
      unmounted() {
        this.ctrl.unmounted();
      },
      errorCaptured(err, instance, info) {
        this.ctrl.errorCaptured(err, instance, info);
      },
      renderTracked(e) {
        this.ctrl.renderTracked(e);
      },
      renderTriggered(e) {
        this.ctrl.renderTriggered(e);
      },
      computed: computed,
      methods: methods
    }

    this.app.component(label, {...base_data, ...data})
  }

  public mount(selector: string) {
    this.app.mount(selector);
  }
}

const html: string =  `
  <button @click="count++">
    You clicked me {{ count }} times. {{ d.a }}
  </button>
`;

class RandomDataStruct {
  v: any;

  constructor(public child) {
  }

  get a() {
    return this.v;
  }
}

class ButtonCounterComponent extends ComponentAbstract {
  static props = {
    foo: Number,
  }
  static computed_list = ['bar']
  static methods_list = ['bar']

  public inner_bar;

  constructor(component) {
    super(component);

    window['ctrl'] = this;
  }

  bar() {
    console.log('bar');
    console.log(this);
    return this.$data.count + this.inner_bar;
  }


  public data(): object {
    let d = new RandomDataStruct({something: 2});
    d.v = 'asdfasdf';

    return {
      count: 1,
      d: d
    }
  }
}

// Create a Vue application
const app = new VueApp(createApp({}));

app.registerComponent( 'button-counter', ButtonCounterComponent, html)
app.mount('#components-demo');