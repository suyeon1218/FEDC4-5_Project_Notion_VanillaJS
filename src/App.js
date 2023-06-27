import DocumentList from './page/DocumentList.js';
import Documentcontent from './page/DocumentContent.js';

export default class App {
  constructor(target, initialState) {
    this.state = { rootDocument: initialState, currDocument: initialState[0].id };
    this.documentList = new DocumentList(target, this.state.rootDocument);
    this.documentContent = new Documentcontent(target, this.state.currDocument);
  }

  setCurrDocument = (id) => {
    this.state.currDocument = id;
    this.documentContent.setCurrDocument(id);
  }

  onClick = (id) => {
    this.setCurrDocument(Number(id));
  }
}