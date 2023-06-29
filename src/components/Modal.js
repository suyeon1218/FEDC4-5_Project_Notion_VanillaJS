import { editDocument } from '../utils/API.js';

export default class Modal {
  constructor (target, initialState) {
    this.$target = target;
    this.state = initialState;
    this.$div = null;
    this.initModal();
    this.render();
  }

  initModal = () => {
    this.$div = document.createElement('div');
    this.$div.className = 'modal-container';
    this.$target.appendChild(this.$div);
  }

  saveDocument = (document) => {
    clearTimeout(this.timer);
    this.timer = setTimeout(async() => {
      const editedDocument = await editDocument(this.state.id, document);
    }, 200);
  }

  render = () => {
    this.$div.innerHTML = `
      <div class='modal'>
        <input autofocus placeholder='${this.state.title}'>
        <textarea></textarea>
      </div>
    `
    this.addWritingEvent();
    this.addClickEvent();
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

  addClickEvent = () => {
    this.$div.addEventListener('click', (event) => {
      if (event.target.className === 'modal-container') {
        this.$target.removeChild(this.$div);
      }
    })
  }
}