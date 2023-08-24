import { Hono } from 'hono';
import { cors } from 'hono:cors';
import { getJson } from 'serpapi';
import 'dotenv';

const PORT = Deno.env.get('PORT');
const API_KEY = Deno.env.get('API_KEY');

const app = new Hono();

app.use('*', cors());

app.get('/', (c) => c.json({ message: 'SerpAPI bridge - Dave136' }));

app.get('/search', async (c) => {
  const { q } = c.req.query();
  const response = await getJson({
    q,
    engine: 'google_images',
    api_key: API_KEY,
  });

  return c.json(response);
});

Deno.serve({ port: Number(PORT) || 3030 }, app.fetch);
