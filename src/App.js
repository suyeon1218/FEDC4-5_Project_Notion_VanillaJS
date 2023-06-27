import DocumentList from './page/DocumentList.js';

export default class App {
  constructor(target, initialState) {
    console.log(initialState);
    this.state = { rootDocument: initialState };
    this.documentList = new DocumentList(target, initialState);
  }
}