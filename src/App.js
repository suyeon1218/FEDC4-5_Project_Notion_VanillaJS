import ListPage from './page/ListPage.js';
import EditPage from './page/EditPage.js';
import { init, routeChange } from './utils/Route.js';

export default class App {
  constructor(target, initialState) {
    this.$target = target;
    this.state = { rootDocument: initialState, currDocument: initialState[0].id };
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
      this.listPage = new ListPage(this.$target, this.state.rootDocument, this.showDocument);
      if (pathname.startsWith(`/${this.state.currDocument}`) === true) {
        this.editPage = new EditPage(this.$target, this.state.currDocument);
      } 
    } catch (error) {
      console.log(error.message);
    }
  }

  addRouteEvent = () => {
    window.addEventListener('popstate', this.route());
    // Todo: 아마 currDocument 를 localStorage 에 저장해놓고 init 과 동시에 불러오는 식으로 해야 F5 에러 방지할 수 있을 듯
  }

  setCurrDocument = (id) => {
    this.state.currDocument = id;
    routeChange(`/${id}`);
  }

  showDocument = (id) => {
    console.log(id);
    this.setCurrDocument(Number(id));
  }
}