module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6,
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: [
        ['@babel/preset-react'],
        ['@babel/preset-env'],
      ],
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-transform-runtime'],
      ],
    },
  },
  plugins: ['react', 'jsx-a11y', 'react-hooks'],
  settings: {
    'import/resolver': {
      webpack: {
        config: './scripts/webpack.common.js',
      },
    },
  },
  rules: {
    'no-unused-expressions': 0,
    'no-shadow': 0,
    'no-param-reassign': 0,
    allowShortCircuit: 0,
    'react-hooks/rules-of-hooks': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/button-has-type': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    indent: ['error', 2],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'linebreak-style': ['off', 'windows'],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: false,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
    'no-underscore-dangle': 'off',
    'jsx-a11y/alt-text': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
  },
};
