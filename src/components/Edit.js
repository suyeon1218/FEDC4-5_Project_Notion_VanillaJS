export default class Edit {
  constructor(target, initialState) {
    this.$target = target;
    this.state = initialState;
    this.$div = null;
    this.initDiv();
    this.render();
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  initDiv = () => {
    this.$div = document.createElement('div');
    this.$div.className = 'edit-container';
    this.$target.appendChild(this.$div);
  }
  
  render = () => {
    try {
      this.$div.innerHTML = `
        <textarea class='title-area'>${this.state.title}</textarea>
        <textarea class='content-area'>${this.state.content === null ? '' : this.state.content}</textarea>
      `

    } catch (error) {
      console.log(error.message);
    }
  }
}