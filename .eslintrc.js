module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "prettier",
        "plugin:prettier/recommended"
    ],
    "rules": {
        "linebreak-style": ['error', 'windows'],
        "import/no-extraneous-dependencies": "off",
        "react/prefer-stateless-function" : "warn",
        "react/jsx-one-expression-per-line": "off",
        "no-undef":"warn",
        "no-console":"warn"
    },
    "plugins": [ "react", "prettier" ],
    "parser": "babel-eslint",
    "parserOptions" : {
        "ecmaFeatures" : {
            "jsx" : true,
            "modules" : true
        }
    }
};