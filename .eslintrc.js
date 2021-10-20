module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest": true
  },
  "rules": {
    "react/prop-types": "off"
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  "parser": "@typescript-eslint/parser",
  "root": true,
  "plugins": ["react", "@typescript-eslint"],
  "parserOptions": {
    "ecmaVersion": 11,
    "ecmaFeatures": {
      "jsx": true
    },
    "project": "./tsconfig.json"
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  }
};
