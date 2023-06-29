export default class Edit {
  constructor(target, initialState, saveDocument) {
    this.$target = target;
    this.state = initialState;
    this.saveDocument = saveDocument;
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
    console.log(this.state.title);
    this.$div.innerHTML = `
      <input class='title-area' value='${this.state.title}'>
      <textarea class='content-area'>${this.state.content === null ? '' : this.state.content}</textarea>
    `
    this.addWritingEvent();
  }

  addWritingEvent = () => {
    const $input = this.$div.querySelector('input');
    const $textarea = this.$div.querySelector('textarea');
    
    this.$div.addEventListener('keyup', (event) => {
      const document = {
        title: $input.value,
        content: $textarea.value
      }
      this.saveDocument(document);
    })
  }
}