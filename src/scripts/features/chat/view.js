import { Assistant } from '../../shared/types';
import { createHeaderElement, createMessageElement } from './templates';

export class ChatView {
    /**
     * Конструктор представления чата с ассистентом
     * @param {Assistant} assistant Объект ассистента
     */
    constructor(assistant) {
        this._assistant = assistant;
    }

    _getMessages() {
        const { messages } = this._assistant;

        return messages;
    }

    /**
     * Рендерит шапку чата с информацией об ассистенте
     */
    renderHeader() {
        const parentElement = document.getElementsByClassName('chat')[0];
        const element = createHeaderElement(this._assistant);

        parentElement.replaceChild(element, parentElement.firstElementChild);
    }

    /**
     * Рендерит список сообщений из чата
     */
    renderMessages() {
        const parentElement = document.getElementsByClassName('chat__main-messages')[0];

        const messages = this._getMessages();
        const elements = messages.map((message) => createMessageElement(message));

        parentElement.replaceChildren(...elements);
    }

    /**
     * Рендерит чат с ассистентом
     */
    render() {
        this.renderHeader();
        this.renderMessages();
    }
}
