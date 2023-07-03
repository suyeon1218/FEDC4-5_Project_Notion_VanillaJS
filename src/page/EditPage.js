import { getDocumentContent, editDocument } from '../utils/API.js';
import Edit from '../components/Edit.js';

export default class EditPage {
  constructor(target, initialState, showDocument) {
    this.$target = target;
    this.state = { documentInfo: initialState, documentData: null }
    // todo: documentInfo 랑 documentData 구분 되게끔 작명해야할 듯
    this.showDocument = showDocument;
    this.$div = null;
    this.timer = null;
    this.initDiv();
    this.fetchDocumentData(initialState.id);
  }

  setCurrDocument = (documentInfo) => {
    this.state.documentInfo = documentInfo;
    this.fetchDocumentData(documentInfo.id);
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
      const editedDocument = await editDocument(this.state.documentInfo.id, document);
    }, 200);
  }

  initDiv = () => {
    const preDiv = document.querySelector('.content-page-container');
    if (preDiv !== null) {
      this.$target.removeNode(preDiv);
    }
    this.$div = document.createElement('div');
    this.$div.className = 'content-page-container';
    this.$target.appendChild(this.$div);
  }

  render = () => {
    this.$div.innerHTML = ``;
    // todo: 이 무지막지한 매개변수를 좀 어떻게 줄여야 하지 않을까
    new Edit(this.$div, this.state.documentData, this.state.documentInfo.documents, this.saveDocument, this.showDocument);
  }
}