export const languages = [
    { name: 'Bahasa Indonesia', code: 'id' },
    { name: 'Deutsch', code: 'de' },
    { name: 'English', code: 'en' },
    { name: 'Español', code: 'es' },
    { name: 'Français', code: 'fr' },
    { name: 'Italiano', code: 'it' },
    { name: 'Português', code: 'pt' },
    { name: 'Русский', code: 'ru' },
    { name: '한국어', code: 'ko' },
    { name: '日本語', code: 'ja' },
    { name: '简体中文', code: 'zh-Hans' },
    { name: '繁體中文', code: 'zh-Hant' },
    { name: 'Polski', code: 'pl' },
    { name: 'Magyar', code: 'hu' },
    { name: 'ภาษาไทย', code: 'th' },
    { name: 'Dansk', code: 'da' },
    { name: 'Ελληνικά', code: 'el' },
    { name: 'Українська', code: 'uk' },
    { name: 'Melayu', code: 'ms' },
    { name: 'Tiếng Việt', code: 'vi' },
    { name: 'Svenska', code: 'sv' },
    { name: 'Türkçe', code: 'tr' },
    { name: 'Čeština', code: 'cs' },
    { name: 'Română', code: 'ro' },
    { name: 'Latviešu', code: 'lv' },
    { name: 'Suomi', code: 'fi' },
    { name: 'Български', code: 'bg' },
    { name: 'Srpski', code: 'sr' },
    { name: 'Slovenščina', code: 'sl' },
    { name: 'Lietuvių', code: 'lt' }
] as const;

export type LanguageCode = typeof languages[number]['code'];

export const translations: Record<string, any> = {
    en: {
        common: {
            chooseLanguage: 'Choose Your Language',
            onlineTools: 'Online Tools',
            bgRemover: 'Background Remover',
            new: 'New',
            howItWorks: 'How it Works',
            resources: 'Resources',
            legal: 'Legal & Support',
            madeWith: 'Made with',
            forCreators: 'for creators',
            operational: 'System Status: Operational',
            original: 'Original',
            newBackground: 'New Background',
            heroTitle: 'Remove background from images for free.',
            heroSubtitle: 'Professional-grade background removal using state-of-the-art AI technology. 100% automatic and high-precision outputs.',
            uploadButton: 'Upload Image',
            noRegistration: 'No registration required. 100% free.',
            dropImage: 'Drop any image here',
            tools: 'Tools',
            pricing: 'Pricing',
            api: 'API',
            reset: 'Reset',
            download: 'Download',
            processingError: 'Failed to process one or more images.',
            processing: 'Processing...',
            selectImage: 'Select another image',
            cutout: 'Cutout',
            background: 'Background',
            effects: 'Effects',
            adjust: 'Adjust',
            resize: 'Resize',
            brightness: 'Brightness',
            contrast: 'Contrast',
            shadow: 'Shadow',
            reflection: 'Reflection',
            blur: 'Blur',
            padding: 'Padding',
            madeWith: 'Made with',
            forCreators: 'for creators'
        }
    },
};

// Fill others with English as fallback for now to avoid types errors
languages.forEach(lang => {
    if (lang.code !== 'en') {
        (translations as any)[lang.code] = translations.en;
    }
});
