module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:svelte/recommended'
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte']
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  rules: {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "object-curly-spacing": ["error", "never"],
    "space-before-function-paren": ["error", "never"],
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "never"
    }],
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 240
      },
      "multiline": {
        "max": 1
      }
    }]
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      rules: {
        // Disable all accessibility rules
        'svelte/a11y-click-events-have-key-events': 'off',
        'svelte/a11y-no-onchange': 'off',
        'svelte/a11y-invalid-attribute': 'off',
        'svelte/a11y-label-has-associated-control': 'off',
        'svelte/a11y-img-redundant-alt': 'off',
        'svelte/a11y-missing-attribute': 'off',
        'svelte/a11y-unknown-aria-attribute': 'off',
        'svelte/a11y-unknown-role': 'off',
        'svelte/a11y-no-noninteractive-element-interactions': 'off',
        'svelte/a11y-click-events-have-key-events': 'off',
        'svelte/a11y-no-noninteractive-tabindex': 'off',
        'svelte/a11y-noninteractive-element-to-interactive-role': 'off',
        'svelte/a11y-autofocus': 'off',
        'svelte/a11y-misplaced-role': 'off',
        'svelte/a11y-redundant-roles': 'off',
        'svelte/a11y-role-has-required-aria-props': 'off',
        'svelte/a11y-aria-unsupported-elements': 'off',
        'svelte/a11y-hidden': 'off',
        'svelte/a11y-iframe-missing-title': 'off',
        'svelte/a11y-media-has-caption': 'off',
        'svelte/a11y-distracting-elements': 'off'
      }
    }
  ]
};
