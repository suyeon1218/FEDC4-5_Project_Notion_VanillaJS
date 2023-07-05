import { getContentAPI, editAPI } from '../utils/API.js';
import DocumentContent from '../components/EditPage/DocumentContent.js';
import ChildList from '../components/EditPage/ChildList.js';

export default class EditPage {
  constructor(target, initialState, selectDocument, reflectTitleChange) {
    this.$target = target;
    this.state = initialState;
    this.selectDocument = selectDocument;
    this.reflectTitleChange = reflectTitleChange;
    this.$div = null;
    this.timer = null;
    this.initDiv();
    this.fetchContent();
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  initDiv = () => {
    const $preDiv = document.querySelector('.content-page-container');

    if ($preDiv !== null) {
      this.$target.removeChild($preDiv);
    }
    this.$div = document.createElement('div');
    this.$div.className = 'content-page-container';
    this.$target.appendChild(this.$div);
  };

  fetchContent = async () => {
    const documentContent = await getContentAPI(this.state.id);
    const nextState = documentContent;

    this.setState(nextState);
  };

  saveTitle = (editedDocument) => {
    clearTimeout(this.timer);
    this.timer = setTimeout(async() => {
      await editAPI(this.state.id, editedDocument);
      this.reflectTitleChange();
    }, 200);
  };

  saveContent = (editedDocument) => {
    clearTimeout(this.timer);
    this.timer = setTimeout(async() => {
      await editAPI(this.state.id, editedDocument);
    }, 200);
  }

  render = () => {
    this.$div.innerHTML = ``;
    new DocumentContent(
      this.$div,
      this.state,
      this.saveTitle,
      this.saveContent
    );
    new ChildList(
      this.$div,
      this.state.documents,
      this.selectDocument
    )
  };
}
