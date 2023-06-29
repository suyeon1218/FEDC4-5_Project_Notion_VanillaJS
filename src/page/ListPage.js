import List from '../components/List.js';
import { getRootDocument, removeDocument, addDocument } from '../utils/API.js';

export default class ListPage {
  constructor(target, initialState, onClick) {
    this.$target = target;
    this.state = initialState
    this.onClick = onClick;
    this.$div = null;
    this.initDiv();
    this.render();
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  }
  
  initDiv = () => {
    this.$div = document.createElement('div');
    this.$div.className = 'list-page-container';
    this.$target.appendChild(this.$div);
  }

  onRemove = async(id) => {
    await removeDocument(id);
    const nextState = await getRootDocument();

    this.setState(nextState);
  }

  onCreate = async(id) => {
    const document = {
      title: '제목 없음',
      parent: Number(id),
    }
    await addDocument(document);
    const nextState = await getRootDocument();

    this.setState(nextState);
  }

  render = () => {
    try {
      this.$div.innerHTML = ``;
      this.state.forEach(document => {
        new List(this.$div, document, 0, this.onClick, this.onRemove, this.onCreate);
      });
    } catch (error) {
      console.log(error);
    }
  }
}