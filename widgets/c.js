import { Widget } from "../core/index.js";

export default class C extends Widget {
  async init(done) {
    this.target.innerHTML = `<p>Widget A initialized</p>`;
    super.init(done);
  }
}