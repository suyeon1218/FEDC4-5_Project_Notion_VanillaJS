import List from '../components/List.js';

export default class DocumentList {
  constructor(target, initialState) {
    this.$target = target;
    this.state = { rootDocument: initialState, openDocument: [] }
    this.$div = null;
    this.initDiv();
    this.render();
  }

  initDiv = () => {
    this.$div = document.createElement('div');
    this.$div.className = 'list-page-container';
    this.$target.appendChild(this.$div);
  }

  render = () => {
    this.state.rootDocument.forEach(docuemnt => new List(this.$div, docuemnt, 0));
  }
}