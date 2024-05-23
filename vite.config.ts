
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return defineConfig({
		define: {

			
		},
		plugins: [react(), basicSsl({})],
		build: {
			lib: {
				formats: ['es'],
				fileName: process.env.npm_config_component,
				entry: `./src/components/${process.env.npm_config_component}/index.tsx`,

			},

		}
	})
}