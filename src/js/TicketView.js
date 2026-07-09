import TicketForm from './TicketForm';

/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */

export default class TicketView {
  constructor(ticket, service, refresh) {
    this.ticket = ticket;
    this.service = service;
    this.refresh = refresh;
  }

  render() {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = this.ticket.status;

    checkbox.addEventListener('change', async () => {
      try {
        await this.service.update(this.ticket.id, { status: checkbox.checked });
        this.refresh();
      } catch (error) {
        alert(error.message);
      }
    });

    const title = document.createElement('span');
    title.textContent = this.ticket.name;
    const description = document.createElement('p');
    description.textContent = this.ticket.description;
    description.classList.add('hidden');

    const date = document.createElement('span');
    date.textContent = new Date(this.ticket.created).toLocaleString();
    const buttons = document.createElement('div');
    const changeBtn = document.createElement('button');
    changeBtn.textContent = '✎';

    changeBtn.addEventListener('click', () => {
      const form = new TicketForm('edit', this.ticket, async (data) => {
        try {
          await this.service.update(this.ticket.id, data);
          this.refresh();
        } catch (error) {
          alert(error.message);
        }
      });

      document.querySelector('#root').append(form.create());
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'x';

    deleteBtn.addEventListener('click', () => {
      document.body.classList.add('modal-open');
      const form = document.createElement('form');
      const title = document.createElement('h1');
      title.textContent = 'Удалить тикет';

      const confirm = document.createElement('p');
      confirm.textContent = 'Вы уверены, что хотите удалить тикет? Это действие необратимо.';

      const buttons = document.createElement('div');
      const cancel = document.createElement('button');
      cancel.type = 'button';
      cancel.textContent = 'Отмена';
      const save = document.createElement('button');
      save.type = 'button';
      save.textContent = 'Ок';

      cancel.addEventListener('click', () => {
        form.remove();
        document.body.classList.remove('modal-open');
      });

      save.addEventListener('click', async () => {
        form.remove();
        document.body.classList.remove('modal-open');
        try {
          await this.service.delete(this.ticket.id);
          this.refresh();
        } catch (error) {
          alert(error.message);
        }
      });

      buttons.append(cancel, save);
      form.append(title, confirm, buttons);
      document.body.append(form);
    });

    buttons.append(changeBtn, deleteBtn);
    li.append(checkbox, title, date, buttons, description);
    title.addEventListener('click', () => {
      description.classList.toggle('hidden');
    });

    return li;
  }
}
