/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor(mode, ticket = null, onSubmit) {
    this.mode = mode;
    this.ticket = ticket;
    this.onSubmit = onSubmit;
  }

  create() {
    document.body.classList.add('modal-open');
    const form = document.createElement('form');
    const title = document.createElement('h1');
    title.textContent = this.mode === 'edit' ? 'Изменить тикет' : 'Добавить тикет';

    const firstLabel = document.createElement('label');
    firstLabel.setAttribute('for', 'first-input');
    firstLabel.textContent = 'Краткое описание';

    const secondLabel = document.createElement('label');
    secondLabel.setAttribute('for', 'second-input');
    secondLabel.textContent = 'Подробное описание';

    const firstInput = document.createElement('input');
    firstInput.setAttribute('id', 'first-input');
    const secondInput = document.createElement('textarea');
    secondInput.setAttribute('id', 'second-input');

    if (this.mode === 'edit' && this.ticket) {
      firstInput.value = this.ticket.name;
      secondInput.value = this.ticket.description;
    }

    const buttons = document.createElement('div');
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Отмена';
    cancelBtn.type = 'button';

    cancelBtn.addEventListener('click', () => {
      this.close(form);
    });

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Ок';
    saveBtn.type = 'submit';
    buttons.append(cancelBtn, saveBtn);

    form.append(title, firstLabel, firstInput, secondLabel, secondInput, buttons);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!firstInput.value.trim()) return;

      const data = {
        name: firstInput.value,
        description: secondInput.value,
      };

      this.onSubmit(data);
      this.close(form);
    });

    return form;
  }

  close(form) {
  form.remove();
  document.body.classList.remove('modal-open');
}
}
