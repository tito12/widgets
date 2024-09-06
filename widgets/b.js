import { Widget } from '../core/index.js';

export default class B extends Widget {
  async init(done) {
    this.target.innerHTML = `<p>Widget B initialized</p>`;
    super.init(done);
  }
}