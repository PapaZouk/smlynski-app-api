import {Context, Hono} from 'hono';
import {logger} from 'hono/logger';
import {cors} from "hono/cors";
import {jwt} from "hono/jwt";
import type {JwtVariables} from 'hono/jwt';
import {
    addFeedbackController,
    addOfferController,
    addProjectController,
    getFeedbacksController,
    getOfferController,
    getOffersController,
    getProjectController,
    getProjectsController
} from "./src/controllers/index.ts";
import {generateToken} from "./src/auth/generateToken.ts";
import {healthCheckController} from "./src/controllers/healthCheckController.ts";

const app = new Hono();

app.use("*", cors());
app.use(logger());
app.use('/api/auth/*', jwt({ secret: Deno.env.get('JWT_SECRET_KEY') as string, alg: 'HS256' }));

app.get('/api/health', async (c: Context) => await healthCheckController(c));
app.get('/api/auth/feedbacks', async (c: Context) => await getFeedbacksController(c));
app.get('/api/auth/projects', async (c: Context) => await getProjectsController(c));
app.get('/api/auth/project/:id', async (c: Context) => await getProjectController(c));
app.get('/api/auth/offers', async (c: Context) => await getOffersController(c));
app.get('/api/auth/offer/:id', async (c: Context) => await getOfferController(c));

app.post('/api/auth/feedback', async (c: Context) => await addFeedbackController(c));
app.post('/api/auth/offer', async (c: Context) => await addOfferController(c));
app.post('/api/auth/project', async (c: Context) => await addProjectController(c));

app.get('/api/token/:id', async (c: Context) => {
    const id: string = c.req.param('id');

    if (!id) {
        c.status(400);
        return c.json({ message: 'ID is required' });
    }

    const jwt: string = await generateToken(id);
    c.res.headers.set('Authorization', `Bearer ${jwt}`);
    return c.json({ jwt });
});

Deno.serve(app.fetch);