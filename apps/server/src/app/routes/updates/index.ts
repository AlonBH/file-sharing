import { Request, Response, Router } from 'express'

interface Client {
  id: string,
  response: Response
}

let clients = [];

const updatesRouter = Router();

const updateClient = (clientId: string, message: string) => {
  clients.findIndex(client => client.id === clientId);
  const update = {
    message
  }
  clients[0].response.write(`data: ${JSON.stringify(update)}\n\n`);
}

updatesRouter.get('/:id', function eventsHandler(request: Request, response: Response) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);

  const clientId = request.params.id;

  const newClient = {
    id: clientId,
    response
  };

  clients.push(newClient);

  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
});

export {
  updatesRouter,
  updateClient
};
