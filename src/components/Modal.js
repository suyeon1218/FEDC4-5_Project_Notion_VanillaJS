import { editDocument } from '../utils/API.js';

export default class Modal {
  constructor(target, initialState) {
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
  };

  saveDocument = (document) => {
    clearTimeout(this.timer);
    this.timer = setTimeout(async () => {
      const editedDocument = await editDocument(this.state.id, document);
    }, 200);
  };

  render = () => {
    this.$div.innerHTML = `
      <div class='modal'>
      <input class='title-area' value='${this.state.title}'>
      <div class='edit-button-container'>
        <button data-command='formatBlock' class='edit-button'>h1</button>
        <button data-command='formatBlock' class='edit-button'>h2</button>
        <button data-command='formatBlock' class='edit-button'>h3</button>
        <button data-command='formatBlock' class='edit-button'>p</button>
        <button data-command='bold' class='edit-button'>B</button>
        <button data-command='italic' class='edit-button'>I</button>
        <button data-command='underline' class='edit-button'>U</button>
        <button data-command='strikeThrough' class='edit-button'>S</button>
      </div>
      <div contenteditable class='edit-container'><span>${this.state.content}</span></div>
      </div>
    `;
    this.addWritingEvent();
    this.addClickEvent();
    this.addButtonEvent();
  };

  addWritingEvent = () => {
    const $input = this.$div.querySelector('input');
    const $textarea = this.$div.querySelector('textarea');

    this.$div.addEventListener('keyup', (event) => {
      const document = {
        title: $input.value,
        content: $textarea.value,
      };
      this.saveDocument(document);
    });
  };

  addClickEvent = () => {
    this.$div.addEventListener('click', (event) => {
      if (event.target.className === 'modal-container') {
        this.$target.removeChild(this.$div);
      }
    });
  };

  addButtonEvent = () => {
    const editButtons = document.querySelectorAll('.edit-button');

    editButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const { command } = event.target.dataset;

        if (command === 'formatBlock') {
          console.log(event.target.innerText);
          this.setStyle(command, `<${event.target.innerText}>`);
        } else {
          this.setStyle(command);
        }
      });
    });
  };

  setStyle = (command, args = null) => {
    const $input = this.$div.querySelector('input');
    const $div = this.$div.querySelector('.edit-container');

    const result = document.execCommand(command, false, args);
    console.log(result);
    this.focusEdit();

    console.log($div.innerHTML);
    const currDocument = {
      title: $input.value,
      content: $div.innerHTML,
    };
    this.saveDocument(currDocument);
  };

  focusEdit = () => {
    const $div = this.$div.querySelector('.edit-container');

    $div.focus({preventScroll: true});
  };
}
