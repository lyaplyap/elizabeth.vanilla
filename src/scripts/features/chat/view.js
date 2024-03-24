import { Assistant, Message } from '../../shared/types';
import {
    createHeaderElement,
    createMainElement,
    createMessageElement,
    createFooterElement
} from './templates';

export class ChatView {
    /**
     * Конструктор представления чата с ассистентом
     * @param {Assistant} assistant Объект ассистента
     */
    /**
     * Конструктор представления чата с ассистентом
     * @param {Object} props
     * @param {Assistant} props.assistant 
     * @param {(text: string) => void} props.onSend
     */
    constructor(props) {
        const { assistant, onSend } = props;

        this._assistant = assistant;
        this._onSend = onSend;
    }

    _getMessages() {
        const { messages } = this._assistant;

        return messages;
    }

    /**
     * Рендерит шапку чата с информацией об ассистенте
     */
    renderHeader() {
        const previousHeader = document.getElementsByClassName('chat__header')[0];
        const chat = previousHeader.parentElement;
        
        const nextHeader = createHeaderElement(this._assistant);

        chat?.replaceChild(nextHeader, previousHeader);
    }

    /**
     * Рендерит основной контент чата
     */
    renderMain() {
        const previousMain = document.getElementsByClassName('chat__main')[0];
        const chat = previousMain.parentElement;
        
        const messages = this._getMessages();
        const nextMain = createMainElement(messages);

        chat?.replaceChild(nextMain, previousMain);
    }

    /**
     * Рендерит новое сообщение в чате
     * @param {Message} message 
     */
    renderNewMessage(message) {
        const list = document.getElementsByClassName('chat__main-messages')[0];
        const element = createMessageElement(message);

        list.appendChild(element);
    }

    /**
     * Очищает содержимое поля для ввода текста (инпута)
     * @param {HTMLInputElement} input Элемент поля для ввода текста (инпут)
     */
    _clearInput(input) {
        input.value = '';
    }

    /**
     * Обработчик отправки сообщения в чат
     */
    send(event) {
        const input = document.querySelector('.chat__footer-input > input');

        if (event.type === 'keydown' && event.code !== 'Enter') {
            return;
        }

        const text = input?.value;
        const message = { role: 'user', text };

        if (!text) {
            return;
        }

        this._onSend(text);
        this.renderNewMessage(message);

        this._clearInput(input);
    }

    /**
     * Рендерит футер (подвал) чата с ассистентом
     */
    renderFooter() {
        const previousFooter = document.getElementsByClassName('chat__footer')[0];
        const chat = previousFooter.parentElement;

        const nextFooter = createFooterElement();
        const handleSend = this.send.bind(this);

        const input = nextFooter.querySelector('.chat__footer-input');
        const button = nextFooter.querySelector('.chat__footer-button');

        input?.addEventListener('keydown', handleSend);
        button?.addEventListener('click', handleSend);

        chat?.replaceChild(nextFooter, previousFooter);
    }

    /**
     * Рендерит чат с ассистентом
     */
    render() {
        this.renderHeader();
        this.renderMain();
        this.renderFooter();
    }
}
