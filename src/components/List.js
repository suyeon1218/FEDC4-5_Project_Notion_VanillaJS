export default class List {
  constructor(target, initialState, depth, onClick) {
    this.$target = target;
    this.state = { documentInfo: initialState, isOpen: false }
    this.depth = depth;
    this.onClick = onClick;
    this.$ul = null;
    this.initUl();
    this.render();
  }

  initUl = () => {
    this.$ul = document.createElement('ul');
    this.$ul.className = `depth-0${this.depth} document-ul`;
    this.$target.appendChild(this.$ul);
  }

  render = () => {
    this.$ul.innerHTML = `
      <li data-id=${this.state.documentInfo.id}>
        <button class='open-toggle-button'>${this.state.isOpen === true ? '▼' : '▶︎'}</button>
        <span>${this.state.documentInfo.title}</span>
        <button class='add-toggle-button'>﹢</button>
      </li>
    `

    this.addUlEvent();
  }

  addUlEvent = () => {
    this.$ul.addEventListener('click', event => {
      const $li = event.target.closest('li');
      const { id } = $li.dataset;

      this.onClick(id);
    })
  }
}