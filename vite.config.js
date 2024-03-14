import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import eslint from 'vite-plugin-eslint'
// import babel from 'vite-plugin-babel';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
    //   babel: {
    //   babelrc: true,
    // // Use babel.config.js files
    //     configFile: true,

    
    //   }
    }
    ),
    // eslint(),
    // babel()
  ],
 
})
