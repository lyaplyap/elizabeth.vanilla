import { ACTIVE_ASSISTANT_CLASSNAME } from '../../shared/constants';
import { Assistant } from '../../shared/types';

import { createAssistantElement } from './templates';

export class MenuView {
    /**
     * Конструктор представления бокового меню
     * @param {Object} props
     * @param {Assistant[]} props.assistants 
     * @param {(id: string) => Promise<void>} props.onClick
     */
    constructor(props) {
        const { assistants, onClick } = props;

        this._assistants = assistants;
        this._onClick = onClick;
    };

    /**
     * Возвращает элемент активного ассистента
     * @returns {Element | null}
     */
    _getActiveAssistant() {
        const assistant = document.getElementsByClassName(ACTIVE_ASSISTANT_CLASSNAME)[0];

        return assistant || null;
    }

    /**
     * Возвращает идентификатор активного ассистента
     * @returns {String}
     */
    getActiveAssistantId() {
        const assistant = this._getActiveAssistant();

        if (!assistant) {
            return null;
        }

        const id = assistant.getAttribute('assistant-id');

        return id;
    }

    /**
     * Переключает ассистента из бокового меню
     * @param {String} id Идентификатор ассистента 
     */
    _onToggle(id) {
        const selectedAssistant = this._getActiveAssistant();
        const currentAssistant = document.querySelector(`[assistant-id="${id}"]`);
    
        selectedAssistant?.classList.remove(ACTIVE_ASSISTANT_CLASSNAME);
        currentAssistant?.classList.toggle(ACTIVE_ASSISTANT_CLASSNAME);
    }

    /**
     * Обработчик нажатия на элемент бокового меню
     */
    async click({ currentTarget }) {
        const id = currentTarget.getAttribute('assistant-id');
        const activeId = this.getActiveAssistantId();

        if (id === activeId) {
            return;
        }

        await this._onClick(id);
        this._onToggle(id);
    }

    /**
     * Рендерит список ассистентов в боковом меню
     */
    render() {
        const parentElement = document.getElementsByClassName('assistant-list__list')[0];
        const handleClick = this.click.bind(this);

        for (const assistant of this._assistants) {
            const element = createAssistantElement(assistant);
            
            element.addEventListener('click', handleClick);
            parentElement.appendChild(element);
        }
    }
}
