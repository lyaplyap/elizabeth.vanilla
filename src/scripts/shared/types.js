/**
 * @typedef {Object} Model - LLM
 * @property {Number} id - Идентификатор LLM (например, "yandexgpt")
 * @property {Boolean} [stream=false] - Флаг потоковой передачи ответа LLM
 * @property {Number} [temperature=0.6] - Коэффициент рандомности ответа LLM
 * @property {Number} [maxTokens=2000] - Максимальное количество токенов в ответе LLM
 */

/**
 * @typedef {Object} Message - Сообщение
 * @property {"user"|"assistant"|"system"} role - Роль отправителя сообщения
 * @property {String} text - Текст сообщения
 */

/**
 * @typedef {Object} Assistant - Ассистент
 * @property {String} id Идентификатор ассистента
 * @property {String} title Название ассистента
 * @property {String} [description] Описание ассистента (необязательное)
 * @property {String} [instruction] Промпт-инструкция ассистента
 * @property {Model} model Объект LLM, используемой ассистентом
 * @property {Message[]} messages Сообщения из чата с ассистентом
 */

export const Types = {};
