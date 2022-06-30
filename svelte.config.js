// cspell:disable

import adapter from '@sveltejs/adapter-auto';

// import adapter from '@sveltejs/adapter-node';

import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

	kit: {
		adapter: adapter(),
		// adapter: adapter({
		// default options = adapter-node
		// out: 'build',
		// precompress: false,
		// envPrefix: ''
		// }),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		}
	}
};

export default config;

// ////////////////////END/////////////////////////////////////

// @source https://github.com/sveltejs/kit/tree/master/packages/adapter-node

/* 
PORT and HOST
By default, the server will accept connections on 0.0.0.0 using port 3000. These can be customised with the PORT and HOST environment variables:

HOST=127.0.0.1 PORT=4000 node build
*/

/**
 * @out - The directory to build the server to. It defaults to build — i.e. node build would start the server locally after it has been created.
 * @precompress - Enables precompressing using gzip and brotli for assets and prerendered pages. It defaults to false.
 * @envPrefix - If you need to change the name of the environment variables used to configure the deployment (for example, to deconflict with environment variables you don't control), you can specify a prefix:
 * @deploying - You will need the output directory (build by default), the project's package.json, and the production dependencies in node_modules to run the application. Production dependencies can be generated with npm ci --prod, you can also skip this step if your app doesn't have any dependencies. You can then start your app with
 *	- @command `node build`
 */

/*
envPrefix: 'MY_CUSTOM_';
	*/

/* 
	MY_CUSTOM_HOST=127.0.0.1 \
MY_CUSTOM_PORT=4000 \
MY_CUSTOM_ORIGIN=https://my.site \
node build
 */

// CUSTOM SERVER => https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
/* 
// my-server.js
import { handler } from './build/handler.js';
import express from 'express';

const app = express();

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
  res.end('ok');
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(3000, () => {
  console.log('listening on port 3000');
});

*/
