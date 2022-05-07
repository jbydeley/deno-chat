import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

const messages: string[] = [];

const router = new Router();

router
  .get('/', (context) => {
    context.response.body = 'Chat Server';
  })
  .get('/messages', (context) => {
    context.response.body = messages;
  })
  .post('/messages', async (context) => {
    const message = await context.request.body().value;
    messages.push(message);
    context.response.body = messages;
  });

  const app = new Application()
  app.use(router.routes())
  app.use(router.allowedMethods())

  app.addEventListener(
    'listen',
    (e) => console.log('Listening on http://localhost:8080'),
  );

  await app.listen({ port: 8080 })
  // addEventListener('fetch', app.fetchEventHandler())