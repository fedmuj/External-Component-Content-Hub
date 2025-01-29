
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path'

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return defineConfig({
		define: {
			'process.<wbr>env': {NODE_ENV:"production"},
			'process.env.NODE_ENV':"\"production\""
			
		},
		plugins: [react(), basicSsl({})],
		build: {
			lib: {
				formats: ['es'],
				fileName: process.env.npm_config_component,
				entry: {
					BriefSimilarImages: resolve(__dirname, 'src/components/BriefSimilarImages/index.tsx'),
					AITranslation: resolve(__dirname, 'src/components/AITranslation/index.tsx')
				  },

			},

		}
	})
}