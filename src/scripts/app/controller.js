import { ChatView } from '../features/chat/view';
import { MenuView } from '../features/menu/view';
import { Assistant, Message } from '../shared/types';
import * as api from '../shared/api';

import { AssistantModel } from './model';

export class AppController {
    /**
     * Конструктор класса контроллера приложения
     * @param {Assistant[]} [assistants] Список объектов ассистентов
     */
    constructor(assistants = []) {
        this._model = new AssistantModel(assistants);

        this._menuView = new MenuView({
            assistants,
            onClick: this._onAssistantChange.bind(this)
        });
    }

    /**
     * Обновляет представление чата
     * @param {Assistant} assistant Объект ассистента
     */
    _updateChatView(assistant) {
        this._chatView = new ChatView({
            assistant,
            onSend: this._onMessageSend.bind(this)
        });

        this._chatView.render();
    }

    /**
     * Обработчик переключения ассистента в боковом меню
     * @param {String} id Идентификатор ассистента
     */
    async _onAssistantChange(id) {
        const cachedAssistant = this._model.getAssistantById(id);
        const hasMessages = Boolean(cachedAssistant.messages);

        if (!hasMessages) {
            const serverAssistant = await api.getAssistant(id);

            this._model.updateAssistant(serverAssistant);
            this._updateChatView(serverAssistant);

            return;
        }

        this._updateChatView(cachedAssistant);
    }

    /**
     * Обработчик добавления нового сообщения
     * @param {Message} message Объект сообщения
     * @param {String} id Идентификатор ассистента
     */
    _onMessageAdd(message, id) {
        this._model.addMessage(message, id);
        this._chatView.renderNewMessage(message);
    }

    /**
     * Обработчик отправки сообщения в чате
     * @param {String} userText Текст пользовательского сообщения 
     */
    async _onMessageSend(userText) {
        const id = this._menuView.getActiveAssistantId();

        const userMessage = {
            text: userText,
            role: 'user'
        };

        this._onMessageAdd(userMessage, id);

        const assistantText = await api.createMessage(id, userText);

        const assistantMessage = {
            text: assistantText,
            role: 'assistant'
        };

        this._onMessageAdd(assistantMessage, id);
    }

    init() {
        this._menuView.render();
    }
}
