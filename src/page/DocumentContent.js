import { getDocumentContent } from '../utils/API.js';
import Edit from '../components/Edit.js';

export default class Documentcontent {
  constructor(target, initialState) {
    this.$target = target;
    this.state = { currDocument: initialState, documentData: null }
    this.$div = null;
    this.initDiv();
    this.fetchDocumentData(initialState);
  }
  
  initDiv = () => {
    this.$div = document.createElement('div');
    this.$div.className = 'content-page-container';
    this.$target.appendChild(this.$div);
  }

  setcurrDocument = (docuemntId) => {
    this.state.currDocument = docuemntId;
    this.fetchDocumentData(docuemntId);
  }

  fetchDocumentData = async(docuemntId) => {
    const data = await getDocumentContent(docuemntId);
    this.state.documentData = data;
    this.render();
  }

  render = () => {
    new Edit(this.$div, this.state.documentData);
  }
}