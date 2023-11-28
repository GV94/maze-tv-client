import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task';

export default defineConfig({
    env: {
        codeCoverage: {
            exclude: 'cypress/**/*.*',
        },
    },
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
        setupNodeEvents(on, config) {
            codeCoverageTask(on, config);

            return config;
        },
    },

    e2e: {
        setupNodeEvents(on, config) {
            codeCoverageTask(on, config);
            return config;
        },
    },
});
