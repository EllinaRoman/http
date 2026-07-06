/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
import createRequest from './api/createRequest.js';

export default class TicketService {
  async list() {
    const data = await createRequest({ url: 'http://localhost:7070/?method=allTickets' });
    return data;
  }

  async get(id) {
    const data = await createRequest({ url: `http://localhost:7070/?method=ticketById&id=${id}` });
    return data;
  }

  async create(data) {
    return await createRequest({
      url: 'http://localhost:7070/?method=createTicket',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async update(id, data) {
    return await createRequest({
      url: `http://localhost:7070/?method=updateById&id=${id}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async delete(id) {
    await createRequest({ url: `http://localhost:7070/?method=deleteById&id=${id}` });
    return true;
  }
}
