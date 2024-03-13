import { marked } from 'marked';

import icons from '../../../assets/*.svg';

import { getModelIcon } from '../../shared/utils';
import { Assistant, Message } from '../../shared/types';

/**
 * Создаёт компонент сообщения из чата
 * @param {Message} message Сообщение
 */
export const createMessageElement = ({ role, text }) => {
    const element = document.createElement('li');

    element.classList.add('chat__main-message');

    element.innerHTML = `
        <span class="icon icon__size_l chat__main-role">
            <img src="${icons[role]}" />
        </span>
        <span class="text text__weight_light chat__main-text">
            ${marked.parse(text)}
        </span>
    `;

    return element;
};

/**
 * Создаёт компонент шапки чата с ассистентом
 * @param {Assistant} assistant Объект ассистента
 */
export const createHeaderElement = ({ title, description, model }) => {
    const element = document.createElement('header');

    element.classList.add('chat__header');

    element.innerHTML = `
        <div class="chat__header-left">
            <img src="${getModelIcon(model.id)}" />
            <span class="chat__header-title">${title}</span>
            ${Boolean(description) ? `<span class="chat__header-description">${description}</span>` : ''}
        </div>
        <div class="chat__header-right">
            <button class="button button__size_m button__view_clear button__width_auto button__align_center">
                <span class="icon icon__size_s">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_1_317" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                            <rect width="16" height="16" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_1_317)">
                            <path d="M6.71538 13.4987C5.62478 13.2192 4.73291 12.6329 4.03975 11.7397C3.34658 10.8466 3 9.82222 3 8.66666C3 8.11196 3.0906 7.57521 3.2718 7.05641C3.453 6.53761 3.70941 6.05556 4.04103 5.61026C4.13333 5.48463 4.25876 5.41732 4.4173 5.40835C4.57584 5.39937 4.7158 5.45556 4.83717 5.57693C4.92948 5.66924 4.97734 5.77907 4.98075 5.90641C4.98417 6.03376 4.94528 6.15597 4.86408 6.27306C4.59401 6.61067 4.39358 6.98525 4.2628 7.39678C4.13203 7.80833 4.06665 8.23162 4.06665 8.66666C4.06665 9.55043 4.32392 10.3383 4.83845 11.0301C5.35298 11.722 6.02521 12.1906 6.85512 12.4359C6.97648 12.4786 7.08097 12.5573 7.16858 12.6718C7.25618 12.7863 7.29998 12.9043 7.29998 13.0256C7.29998 13.1923 7.24251 13.3235 7.12755 13.4192C7.01259 13.5149 6.87521 13.5414 6.71538 13.4987ZM9.28458 13.5115C9.12476 13.5542 8.98737 13.5288 8.87242 13.4352C8.75746 13.3416 8.69998 13.2115 8.69998 13.0449C8.69998 12.9192 8.74378 12.7991 8.83138 12.6846C8.91899 12.5701 9.02348 12.4893 9.14485 12.4423C9.97049 12.1799 10.6416 11.7049 11.1583 11.0173C11.675 10.3297 11.9333 9.54615 11.9333 8.66666C11.9333 7.56666 11.5555 6.63611 10.8 5.875C10.0444 5.11389 9.12221 4.73333 8.03332 4.73333H7.83073L8.31282 5.2154C8.42051 5.32309 8.47435 5.44574 8.47435 5.58335C8.47435 5.72095 8.42051 5.84359 8.31282 5.95128C8.19402 6.07008 8.06581 6.12948 7.9282 6.12948C7.7906 6.12948 7.66796 6.07008 7.56027 5.95128L6.24745 4.65513C6.17395 4.58163 6.1216 4.50749 6.0904 4.4327C6.0592 4.35791 6.0436 4.28035 6.0436 4.20001C6.0436 4.11967 6.0592 4.0421 6.0904 3.96731C6.1216 3.89254 6.17395 3.81839 6.24745 3.74488L7.56027 2.43206C7.66796 2.32438 7.7906 2.27053 7.9282 2.27053C8.06581 2.27053 8.19402 2.32438 8.31282 2.43206C8.42051 2.55086 8.47435 2.67907 8.47435 2.81668C8.47435 2.95428 8.42051 3.07693 8.31282 3.18461L7.83073 3.66668H8.03332C9.42818 3.66668 10.6047 4.1513 11.5628 5.12053C12.5209 6.08975 13 7.2718 13 8.66666C13 9.82222 12.6523 10.8444 11.957 11.7333C11.2617 12.6222 10.3709 13.2149 9.28458 13.5115Z" fill="currentColor"/>
                        </g>
                    </svg>                                    
                </span>
                <span class="button__text">Clear chat</span>
            </button>
        </div>
    `;

    return element;
};