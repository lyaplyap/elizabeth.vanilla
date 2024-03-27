import { Assistant, Model } from './types';

const API_URL = 'http://localhost:5001/api';

const api = async (path = '', options) => {
    const url = `${API_URL}/${path}`;

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
};

/**
 * Запрашивает с сервера список ассистентов
 * @returns {Promise<Assistant[]>}
 */
export const getAssistants = () => api('chats');

/**
 * Запрашивает с сервера ассистента по его идентификатору
 * @param {String} id Идентификатор ассистента
 * @returns {Promise<Assistant | null>}
 */
export const getAssistant = (id) => api(`chats/${id}`);

/**
 * Создаёт нового ассистента
 * @param {Object} data 
 * @param {String} data.title Название ассистента
 * @param {String} data.description Описание ассистента
 * @param {String} data.instruction Инструкция ассистента
 * @param {Model} data.model Параметры LLM, используемой ассистентом
 * @returns {Promise<Assistant>} Ассистент
 */
export const createAssistant = async (data) => {
    const assistant = await api('chats', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return assistant;
};

/**
 * Удаляет ассистента
 * @param {String} id Идентификатор ассистента 
 */
export const deleteAssistant = (id) => api(`chats/${id}`, { method: 'DELETE' });

/**
 * Отправляет сообщение в чат с ассистентом
 * @param {String} id Идентификатор ассистента
 * @param {String} userText Текст сообщения пользователя
 * @returns {Promise<String>} Текст сообщения ассистента
 */
export const createMessage = async (id, userText) => {
    const { text } = await api(`chats/${id}/messages`, {
        method: 'POST',
        body: JSON.stringify({ text: userText }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return text;
};

/**
 * Очищает чат с ассистентом
 * @param {String} id Идентификатор ассистента 
 */
export const clearChat = (id) => api(`chats/${id}/messages`, { method: 'DELETE' });
