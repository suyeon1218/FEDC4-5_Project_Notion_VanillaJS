import ListPage from './page/ListPage.js';
import EditPage from './page/EditPage.js';
import { init, routeChange } from './utils/Route.js';

export default class App {
  constructor(target, rootDocument) {
    this.$target = target;
    this.state = { rootDocument: rootDocument, currDocument: '' };
    this.listPage = null;
    this.editPage = null;
    init(this.route);
    this.route();
    this.addRouteEvent();
  }

  route = () => {
    try {
      const { pathname } = location;
      this.$target.innerHTML = ``;
      this.listPage = new ListPage(
        this.$target,
        this.state.rootDocument,
        this.showDocument
      );
      if (this.state.currDocument.length > 0 && pathname.startsWith('/') === true) {
        // todo: edit 페이지 검사 구문을 좀 더 넣어야겠다
        console.log(this.state.currDocument);
        this.editPage = new EditPage(this.$target, this.state.currDocument);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  addRouteEvent = () => {
    window.addEventListener('popstate', this.route());
  };

  setCurrDocument = (id) => {
    this.state.currDocument = id;
    console.log(this.state.currDocument.length);
    routeChange(`/${id}`);
  };

  showDocument = (id) => {
    this.setCurrDocument(id);
  };
}
