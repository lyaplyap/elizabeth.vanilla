import { AppController } from './app/controller';
import { ASSISTANTS } from './shared/constants';

const app = new AppController(ASSISTANTS);

document.addEventListener('DOMContentLoaded', app.init());
