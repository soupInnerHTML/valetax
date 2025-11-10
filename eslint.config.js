// eslint.config.js
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';

export default [
    // Базовые правила JavaScript
    {
        ...js.configs.recommended,
        files: ['**/*.{js,jsx,ts,tsx}'],
    },
    {
        ...prettierConfig,
        files: ['**/*.{js,jsx,ts,tsx}'],
    },

    // Глобальные переменные
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2024,
                ...globals.node,
            },
        },
    },

    // TypeScript конфигурация
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            '@typescript-eslint': typescriptEslint,
        },
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json',
            },
        },
        rules: {
            // Используем правила напрямую из плагина
            ...typescriptEslint.configs.recommended.rules,

            // 📝 TypeScript правила
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@/prefer-const': 'error',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    fixStyle: 'inline-type-imports',
                },
            ],
        },
    },

    // React конфигурация
    {
        files: ['**/*.{jsx,tsx}'],
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,

            // ⚛️ React правила
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/jsx-uses-react': 'off',
            'react/jsx-uses-vars': 'error',
            'react/jsx-key': 'error',
            'react/jsx-no-duplicate-props': 'error',
            'react/jsx-no-undef': 'error',
            'react/jsx-no-useless-fragment': 'error',
            'react/jsx-pascal-case': 'error',

            // 🎣 React Hooks
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // 🔄 React Refresh
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },

    // Import правила
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            import: importPlugin,
        },
        rules: {
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                    ],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            'import/no-duplicates': 'error',
        },
    },

    // Accessibility
    {
        files: ['**/*.{jsx,tsx}'],
        plugins: {
            'jsx-a11y': jsxA11y,
        },
        rules: {
            ...jsxA11y.configs.recommended.rules,
        },
    },

    // Общие правила для всех файлов
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        rules: {
            // 📏 Длина строки
            'max-len': [
                'error',
                {
                    code: 100,
                    tabWidth: 2,
                    ignoreUrls: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                    ignoreRegExpLiterals: true,
                },
            ],
            'no-console': 'warn',
            'no-debugger': 'error',

            // 🎯 Стиль кода
            'prefer-const': 'error',
            'no-var': 'error',
            'object-shorthand': 'error',
        },
    },

    // Переопределения для JSX файлов
    {
        files: ['**/*.tsx'],
        rules: {
            'max-len': [
                'error',
                {
                    code: 90,
                    tabWidth: 2,
                    ignoreUrls: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                },
            ],
        },
    },

    // Игнорируемые файлы
    {
        ignores: [
            'dist/**',
            'build/**',
            'node_modules/**',
            '*.min.js',
            'coverage/**',
            '*.config.js',
        ],
    },
];