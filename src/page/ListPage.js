import List from '../components/List.js';

export default class ListPage {
  constructor(target, initialState, onClick) {
    this.$target = target;
    this.state = { rootDocument: initialState }
    this.onClick = onClick;
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
    try {
      this.state.rootDocument.forEach(document => new List(this.$div, document, 0, this.onClick));
    } catch (error) {
      console.log(error);
    }
  }
}