import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ru';

type TranslationValue = string | string[];

interface Translations {
  [key: string]: TranslationValue;
}

const translations: Record<Language, Translations> = {
  en: {
    'app.title': 'NanoEdit',
    'hero.title': 'Edit images with',
    'hero.highlight': 'Natural Language',
    'hero.subtitle': 'Upload an image and tell the AI what to change. Powered by Gemini 2.5 Flash.',
    'upload.title': 'Upload an image',
    'upload.subtitle': 'Drag and drop or click to browse',
    'upload.supports': 'Supports PNG, JPG, WEBP',
    'controls.label': 'What would you like to change?',
    'controls.placeholder': 'e.g., Change the background to a futuristic city, remove the text...',
    'controls.generate': 'Generate',
    'controls.generating': 'Generating...',
    'controls.cmdEnter': 'Cmd+Enter to send',
    'controls.tryPrompts': 'Try these prompts:',
    'controls.prompts': [
      "Remove all text from the image",
      "Make it look like a pencil sketch",
      "Change the background to a sunset",
      "Make the colors more vibrant"
    ],
    'controls.removeImage': 'Remove image',
    'result.editAnother': 'Edit Another',
    'result.sideBySide': 'Side by Side',
    'result.toggleView': 'Toggle View',
    'result.slider': 'Slider',
    'result.download': 'Download',
    'result.original': 'Original',
    'result.edited': 'Edited (Gemini 2.5)',
    'result.modelFeedback': 'Model Feedback:',
    'result.viewOriginal': 'Original',
    'result.viewEdited': 'Edited Result',
    'result.holdLabel': 'Hold click/press to see original',
    'error.generic': 'Something went wrong while editing the image.',
    'error.noResult': "The model didn't return an image or text. Try a different prompt.",
    'footer.text': 'Powered by Google Gemini 2.5 Flash Image ("Nano Banana")',
    'tags.retro': '✨ "Add a retro filter"',
    'tags.sketch': '🎭 "Turn into a sketch"',
    'tags.removeText': '🧹 "Remove background text"'
  },
  ru: {
    'app.title': 'NanoEdit',
    'hero.title': 'Редактируй фото на',
    'hero.highlight': 'Естественном языке',
    'hero.subtitle': 'Загрузи изображение и скажи ИИ, что изменить. Работает на Gemini 2.5 Flash.',
    'upload.title': 'Загрузите изображение',
    'upload.subtitle': 'Перетащите или нажмите для выбора',
    'upload.supports': 'Поддерживаются PNG, JPG, WEBP',
    'controls.label': 'Что вы хотите изменить?',
    'controls.placeholder': 'Например: Замени фон на киберпанк город, удали текст...',
    'controls.generate': 'Создать',
    'controls.generating': 'Генерация...',
    'controls.cmdEnter': 'Cmd+Enter для отправки',
    'controls.tryPrompts': 'Попробуйте эти запросы:',
    'controls.prompts': [
      "Удали весь текст с изображения",
      "Сделай стиль карандашного наброска",
      "Замени фон на закат",
      "Сделай цвета более яркими"
    ],
    'controls.removeImage': 'Удалить',
    'result.editAnother': 'Редактировать',
    'result.sideBySide': 'Рядом',
    'result.toggleView': 'Переключить',
    'result.slider': 'Слайдер',
    'result.download': 'Скачать',
    'result.original': 'Оригинал',
    'result.edited': 'Результат (Gemini 2.5)',
    'result.modelFeedback': 'Ответ модели:',
    'result.viewOriginal': 'Оригинал',
    'result.viewEdited': 'Результат',
    'result.holdLabel': 'Удерживайте для просмотра оригинала',
    'error.generic': 'Что-то пошло не так при редактировании.',
    'error.noResult': 'Модель не вернула результат. Попробуйте другой запрос.',
    'footer.text': 'Работает на Google Gemini 2.5 Flash Image ("Nano Banana")',
    'tags.retro': '✨ "Добавь ретро фильтр"',
    'tags.sketch': '🎭 "Преврати в скетч"',
    'tags.removeText': '🧹 "Удали текст с фона"'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};