import { checkRoutValidation } from './utils/Validation.js';
import { init, routeChange } from './utils/Route.js';
import { getRootAPI } from './utils/API.js';
import ListPage from './page/ListPage.js';
import EditPage from './page/EditPage.js';

export default class App {
  constructor(target, rootDocument) {
    this.$target = target;
    this.state = { rootDocument: rootDocument, currDocument: null };
    this.$listPage = new ListPage(
      this.$target,
      this.state.rootDocument,
      this.selectDocument
    );
    this.$editPage = null;
    init(this.route);
    this.route();
  }

  route = () => {
    const { pathname } = location;

    if (checkRoutValidation(pathname, this.state.currDocument) === true) {
      this.$editPage = new EditPage(
        this.$target,
        this.state.currDocument,
        this.selectDocument,
        this.reflectTitleChange
      );
    } else {
      const $editPage = document.querySelector('.content-page-container');
      this.$target.removeChild($editPage);
    }
    this.addRouteEvent();
  };

  addRouteEvent = () => {
    window.addEventListener('popstate', this.route);
  };

  setState = (nextState) => {
    this.state = nextState;

    const nextRoute = this.state.currDocument === null
    ? ''
    : `/${this.state.currDocument.id}`

    routeChange(nextRoute);
  };

  selectDocument = (selectedDocument) => {
    const nextState = {
      ...this.state,
      currDocument: selectedDocument
    }
    this.setState(nextState);
  };

  reflectTitleChange = async() => {
    const rootDocument = await getRootAPI();
    this.$listPage.setState(rootDocument);
  }
}
