import List from '../components/List.js';
import { getRootDocument, removeDocument, addDocument } from '../utils/API.js';

export default class ListPage {
  constructor(target, initialState, showDocument) {
    this.$target = target;
    this.state = initialState
    this.showDocument = showDocument
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
    const createdDocument = await addDocument(document);
    const nextState = await getRootDocument();

    this.showDocument(createdDocument.id);
    this.setState(nextState);
  }

  render = () => {
    try {
      this.$div.innerHTML = ``;
      this.state.forEach(document => {
        new List(this.$div, document, 0, this.showDocument, this.onRemove, this.onCreate);
      });
    } catch (error) {
      console.log(error);
    }
  }
}