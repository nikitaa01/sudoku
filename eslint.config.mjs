import { FlatCompat } from "@eslint/eslintrc"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})
const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript",],
    plugins: [
      "eslint-plugin-react-compiler"
    ],
    rules: {
      "react-hooks/exhaustive-deps": "off",
      'react-compiler/react-compiler': 'error',
      'semi': [
        'error',
        'never'
      ]
    },
  }),
]

export default eslintConfig