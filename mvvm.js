/**
 * Copyright 2020 bats64mgutsi. All rights reserved.
 * Use of this source code is governed by a BSD 3-Clause license that can be
 * found in the LICENSE file.
 */

var React = require('react');

/**
 * A view model is an object that notifies the view its attached to when its state changes.
 * 
 * Views register callbacks to the view model and will be be notified when notifyListeners is called.
 * Generally, only one view should use a viewmodel.
 */
export class BaseViewModel {
  constructor() {
    this._listeners = [];
    this._busy = false;

    this.setBusy = this.setBusy.bind(this);
    this.isBusy = this.isBusy.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.clearSubscriptions = this.clearSubscriptions.bind(this);
    this.notifyListeners = this.notifyListeners.bind(this);
  }

  /**
   * Set the view model as busy.
   * 
   * @param {boolean} isBusy is the status
   */
  setBusy(isBusy) {
    this._busy = isBusy;
  }

  /**
   * Is the view model busy.
   */
  isBusy() {
    return this._busy;
  }

  /**
   * Add the given function as callback when notifyListeners is called.
   * 
   * @param {function(BaseViewModel)} [callback] Is the function to be add as callback.
   */
  subscribe(callback) {
    this._listeners.push(callback);
  }

  /**
   * Removes all the registered callbacks.
   */
  clearSubscriptions() {
    this._listeners.length = 0;
  }

  /**
   * Calls all the registered callback functions.
   * 
   * @param {BaseViewModel} thiz is the viewmodel to pass to listeners.
   */
  notifyListeners(thiz) {
    for (var iii = 0; iii < this._listeners.length; iii++)
      this._listeners[iii](thiz);
  }
}


/**
 * A react component that subscribes to the given view model.
 */
export class ViewModelConsumer extends React.Component {

  /**
   * @param {BaseViewModel} viewModel is the view model to subscribe to.
   */
  constructor(props, viewModel) {
    super(props);
    this.state = viewModel;

    this.state.subscribe((model) => {
      this.setState(model);
    });
  }

  componentDidMount() {
    this.onModelReady();
  }

  componentWillUnmount() {
    this.state.clearSubscriptions();
  }

  render() {
    return this.onRender(this.props, this.state);
  }

  /**
   * Called to notify the component that it can now initialise the view model.
   * 
   * @param {BaseViewModel} viewModel is the viewmodel to be intialised.
   */
  onModelReady(viewModel) { }

  /**
   * Called when the component is rendered on the DOM.
   * 
   * This method should return an element to render.
   * 
   * @param {BaseViewModel} viewModel is the viewModel for this component.
   */
  onRender(props, viewModel) {
    return <h1 style={{ color: 'red' }}>This Component does not implement <code>onRender(props, viewModel)</code></h1>;
  }
}