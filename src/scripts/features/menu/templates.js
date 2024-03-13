import { getModelIcon } from '../../shared/utils';
import { Assistant } from '../../shared/types';

/**
 * Создаёт компонент ассистента из бокового меню
 * @param {Assistant} assistant Объект ассистента
 */
export const createAssistantElement = ({ id, title, description, model }) => {
    const element = document.createElement('li');

    element.setAttribute('assistant-id', id);
    element.classList.add('assistant-list__list-item');

    element.innerHTML = `
        <button>
            <span class="icon icon__size_s">
                <img src="${getModelIcon(model.id)}" />
            </span>
            <div class="assistant-list__list-item-content">
                <span class="assistant-list__list-item-title">${title}</span>
                ${Boolean(description) ? `<span class="assistant-list__list-item-description">${description}</span>` : ''}
            </div>
        </button>
    `;

    return element;
};

