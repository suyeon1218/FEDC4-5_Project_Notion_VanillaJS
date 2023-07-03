import ListPage from './page/ListPage.js';
import EditPage from './page/EditPage.js';
import { init, routeChange } from './utils/Route.js';

export default class App {
  constructor(target, rootDocument) {
    this.$target = target;
    this.state = { rootDocument: rootDocument, currDocument: null };
    this.listPage = new ListPage(
      this.$target,
      this.state.rootDocument,
      this.showDocument
    );
    this.editPage = null;
    init(this.route);
    this.route();
    this.addRouteEvent();
  }

  route = () => {
    try {
      const { pathname } = location;
      if (this.state.currDocument !== null && pathname.startsWith('/') === true) {
        // todo: edit 페이지 검사 구문을 좀 더 넣어야겠다
        this.editPage = new EditPage(this.$target, this.state.currDocument, this.showDocument);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  addRouteEvent = () => {
    window.addEventListener('popstate', this.route());
  };

  setCurrDocument = (documentInfo) => { // todo: setState 로 일관성 있게 바꾸는 게 좋을듯
    this.state.currDocument = documentInfo;
    routeChange(`/${documentInfo.id}`);
  };

  showDocument = (documentInfo) => {
    console.log(documentInfo);
    this.setCurrDocument(documentInfo);
  };
}
