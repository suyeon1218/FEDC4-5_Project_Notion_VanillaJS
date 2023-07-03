import { getDocumentContent, editDocument } from '../utils/API.js';
import Edit from '../components/Edit.js';

export default class EditPage {
  constructor(target, initialState) {
    this.$target = target;
    this.state = { documentId: initialState, documentData: null }
    this.$div = null;
    this.timer = null;
    this.initDiv();
    this.fetchDocumentData(initialState);
  }

  setCurrDocument = (docuemntId) => {
    this.state.documentId = docuemntId;
    this.fetchDocumentData(docuemntId);
  }

  fetchDocumentData = async(docuemntId) => {
    const data = await getDocumentContent(docuemntId);
    this.state.documentData = data;
    this.render();
  }

  saveDocument = (document) => {
    clearTimeout(this.timer);
    this.timer = setTimeout(async() => {
      console.log('저장!');
      const editedDocument = await editDocument(this.state.documentId, document);
    }, 200);
  }

  initDiv = () => {
    this.$div = document.createElement('div');
    this.$div.className = 'content-page-container';
    this.$target.appendChild(this.$div);
  }

  render = () => {
    this.$div.innerHTML = ``;
    new Edit(this.$div, this.state.documentData, this.saveDocument);
  }
}