import { getModelIcon } from '../shared/utils';
import { Assistant, Model, Message } from '../shared/types';

export class AssistantModel {
    /**
     * Функция-конструктор класса AssistantModel
     * @param {Assistant[]} [assistants] Список объектов ассистентов
     */
    constructor(assistants = []) {
        const initialAssistants = assistants.map((assistant) => this._createInitialAssistant(assistant));

        this._assistants = initialAssistants;
    }

    /**
     * Создаёт объект модели по умолчанию, насыщенный пользовательскими настройками
     * @param {Model} model Пользовательские настройки модели
     * @returns {Model} Насыщенный объект модели
     */
    _createInitialModel(model) {
        const initialModel = {
            stream: false,
            temperature: 0.6,
            maxTokens: 2000
        };

        return {
            ...initialModel,
            ...model
        };
    }

    /**
     * Создаёт объект ассистента по умолчанию, насыщенный пользовательскими настройками
     * @param {Assistant} assistant Пользовательские настройки ассистента
     * @returns {Assistant} Насыщенный объект ассистента
     */
    _createInitialAssistant(assistant) {
        const initialAssistant = {
            instruction: ''
        };

        return {
            ...initialAssistant,
            ...assistant,
            model: this._createInitialModel(assistant.model)
        };
    }

    getAssistants() {
        return this._assistants;
    }

    /**
     * Возвращает ассистента из списка ассистентов по его идентификатору
     * @param {*} id Идентификатор ассистента
     * @returns {Assistant | null} Объект ассистента (или `null`, если ассистента с таким id нет в списке)
     */
    getAssistantById(id) {
        return this._assistants.find((assistant) => assistant.id === id) || null;
    }

    /**
     * Обновляет объект ассистента в списке или добавляет, если его ранее там не было
     * @param {Assistant} newAssistant Новый объект ассистента
     */
    updateAssistant(newAssistant) {
        const { id } = newAssistant;
        const oldAssistant = this.getAssistantById(id);

        if (!oldAssistant) {
            this._assistants.push(newAssistant);

            return;
        }

        Object.assign(oldAssistant, newAssistant);
    }

    /**
     * Возвращает данные ассистента для отображения
     * @param {String} assistantId Идентификатор ассистента
     */
    getDisplayedData(id) {
        const assistant = this.getAssistantById(id);

        if (!assistant) {
            throw new Error('NOT_FOUND');
        }

        const { title, description, model } = assistant;

        return {
            id,
            title,
            description,
            icon: getModelIcon(model.id)
        };
    }

    /**
     * Возвращает сообщения из чата с ассистентом
     * @param {String} id Идентификатор ассистента
     * @returns {Message[]} Сообщения
     */
    getMessages(id) {
        const assistant = this.getAssistantById(id);

        if (!assistant) {
            throw new Error('ASSISTANT_NOT_FOUND');
        }

        return assistant.messages;
    }

    /**
     * Добавляет сообщение в чат с ассистентом
     * @param {Message} message Сообщение
     * @param {String} id Идентификатор ассистента
     */
    addMessage(message, id) {
        const assistant = this.getAssistantById(id);

        if (!assistant) {
            throw new Error('ASSISTANT_NOT_FOUND');
        }

        assistant.messages.push(message);
    }
}
