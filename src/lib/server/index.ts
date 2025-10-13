import createClient from 'openapi-fetch';
import type { paths } from './schema';
import { FASTAPI_BASEURL } from '$env/static/private';
import { dev } from '$app/environment';

const client = createClient<paths>({ baseUrl: dev ? "http://localhost:8000" : FASTAPI_BASEURL });

export default client;
