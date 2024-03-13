import icons from '../../assets/models/*.svg';

import { MODELS_MAP } from './constants';

/**
 * Возвращает путь до иконки LLM, используемой ассистентом
 * @param {String} modelId Идентификатор LLM
 * @returns {String} Путь до иконки
 */
export const getModelIcon = (modelId) => {
     const modelName = MODELS_MAP[modelId];
    const src = icons[modelName];

    return src;
};
