import { Locale } from 'antd/es/locale'
import enUS from 'antd/es/locale/en_US'
import ptBR from 'antd/es/locale/pt_BR'
import zhCN from 'antd/es/locale/zh_CN'
import enUSMessages from '../locales/en-US.json'
import ptBRMessages from '../locales/pt-BR.json'
import zhCNMessages from '../locales/zh-CN.json'

import StorageHelper from './StorageHelper'

export interface LanguageOption {
    label: string
    value: string
    alias?: string[]
    antdLocale: Locale
    messages: Record<string, string>
}

const languagesOptions: LanguageOption[] = [
    // en-US should be the first option
    {
        label: 'English',
        value: 'en-US',
        alias: ['en'],
        antdLocale: enUS,
        messages: enUSMessages,
    },
    {
        label: 'Portuguese',
        value: 'pt-BR',
        alias: ['pt'],
        antdLocale: ptBR,
        messages: ptBRMessages,
    },
    {
        label: '简体中文',
        value: 'zh-CN',
        alias: ['zh'],
        antdLocale: zhCN,
        messages: zhCNMessages,
    },
]

const defaultLanguageOptions = languagesOptions[0]

const currentLanguage = StorageHelper.getLanguageFromLocalStorage()

const currentLanguageOption: LanguageOption =
    languagesOptions.find((o) => {
        return o.value === currentLanguage || o.alias?.includes(currentLanguage)
    }) || defaultLanguageOptions

export function localize(key: string, message: string) {
    return currentLanguageOption.messages[key] || message
}

export { currentLanguageOption, languagesOptions }

// Currently only enable language for dev mode, until the vast majority of the content is translated
export const isLanguageEnabled = !!process.env.REACT_APP_IS_DEBUG
