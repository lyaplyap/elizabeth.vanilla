import { AppController } from './app/controller';
import { getAssistants } from './shared/api';

const start = async () => {
    const assistants = await getAssistants();

    const app = new AppController(assistants);

    app.init();
};

document.addEventListener('DOMContentLoaded', start);
