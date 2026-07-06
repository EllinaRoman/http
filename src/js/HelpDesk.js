/**
 *  Основной класс приложения
 * */
import TicketService from './TicketService';
import TicketView from './TicketView';
import TicketForm from './TicketForm';

export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = ticketService;
    this.tickets = [];
  }

  async init() {
    this.tickets = await this.ticketService.list();
    this.render();
  }

  render() {
    this.container.innerHTML = '';

    const newTicket = document.createElement('button');
    newTicket.type = 'button';
    newTicket.textContent = 'Добавить тикет';

    newTicket.addEventListener('click', () => {
      const form = new TicketForm('create', null, async (data) => {
        await this.ticketService.create(data);
        await this.init();
      });

      this.container.append(form.create());
    });

    const ul = document.createElement('ul');

    this.tickets.forEach((ticket) => {
      const view = new TicketView(ticket, this.ticketService, this.init.bind(this));
      ul.append(view.render());
    });

    this.container.append(newTicket, ul);
  }
}
