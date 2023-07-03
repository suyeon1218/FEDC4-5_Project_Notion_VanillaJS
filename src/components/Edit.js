export default class Edit {
  constructor(target, initialState, children, saveDocument, showDocument) {
    this.$target = target;
    this.state = {
      documentData: initialState,
      children: children
    } // todo: state 정리 좀 필요할듯
    console.log(this.state.children);
    this.saveDocument = saveDocument;
    this.showDocument = showDocument;
    this.$div = null;
    this.initDiv();
    this.render();
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  initDiv = () => {
    this.$div = document.createElement('div');
    this.$div.className = 'edit-container';
    this.$target.appendChild(this.$div);
  };

  // todo: 이 많은 버튼들 좀 정리 해라
  render = () => {
    this.$div.innerHTML = `
      <input class='title-area' value='${this.state.documentData.title}'>
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
      <div contenteditable class='edit-container'><span>${this.state.documentData.content}</span></div>
      <div class='children-container'>${this.state.children.map((element, index) => {
        return `<li data-index=${index}>${element.title}</li>`
      }).join('')}</div>
    `; // todo: children 분리도 좀 해라

    this.addWritingEvent();
    this.addButtonEvent();
    this.addChildrenEvent();
  };

  addWritingEvent = () => {
    const $input = this.$div.querySelector('input');
    const $div = this.$div.querySelector('.edit-container');

    this.$div.addEventListener('keyup', (event) => {
      const document = {
        title: $input.value,
        content: $div.innerHTML,
      };
      console.log($div.innerHTML);
      this.saveDocument(document);
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

    $div.focus({ preventScroll: true });
  };

  addChildrenEvent = () => {
    const $children = this.$div.querySelector('.children-container');

    $children.addEventListener('click', (event) => {
      const $li = event.target.closest('li');
      const {index} = $li.dataset;

      this.showDocument(this.state.children[index]);
    })
  }
}
