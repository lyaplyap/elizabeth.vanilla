import { ChatView } from '../features/chat/view';
import { MenuView } from '../features/menu/view';
import { Assistant } from '../shared/types';

import { AssistantModel } from './model';

export class AppController {
    /**
     * Конструктор класса контроллера приложения
     * @param {Assistant[]} [assistants] Список объектов ассистентов
     */
    constructor(assistants = []) {
        this._model = new AssistantModel(assistants);
        this._menuView = new MenuView({ assistants, onClick: this.onAssistantChange.bind(this) });
    }

    /**
     * Обновляет представление чата
     * @param {Assistant} assistant Объект ассистента
     */
    _updateChatView(assistant) {
        this._chatView = new ChatView(assistant);
        this._chatView.render();
    }
    
    /**
     * Обработчик переключения ассистента в боковом меню
     * @param {String} id Идентификатор ассистента
     */
    onAssistantChange(id) {
        const assistant = this._model.getAssistantById(id);

        this._updateChatView(assistant);
    }

    onMessageAdd() {}

    init() {
        this._menuView.render();
    }
}
