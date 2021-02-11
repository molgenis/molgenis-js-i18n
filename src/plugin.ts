import i18next, { InitOptions } from 'i18next'
import HttpApi from 'i18next-http-backend';
import dayjs from 'dayjs'
import 'dayjs/locale/pt'
import 'dayjs/locale/es'
import 'dayjs/locale/it'
import 'dayjs/locale/fr'
import 'dayjs/locale/nl'
import 'dayjs/locale/de'

type PluginOptions = {
    namespace: string | string[];
    lng: string;
    fallbackLng?: string | string[];
    callback?: () => void;
}

type DayJsValue = string | number | Date | dayjs.Dayjs | undefined

/**
 * I18next Vue module for MOLGENIS.
 *
 * @param Vue the Vue class
 * @param options the options to use
 * @param options.namespace the namespace (or array of namespaces) for this application
 * @param options.lng the user's language
 * @param options.fallbackLng the fallback languages to use
 * @param options.callback callback function to call once languages are available
 *
 * @see https://github.com/icebob/vue-express-mongo-boilerplate/blob/master/client/app/core/i18next.js
 */
function plugin(Vue: any, options: PluginOptions) {
    const {
        namespace,
        lng,
        fallbackLng,
        callback
    } = options

    const t = (key: string, options: any) => i18next.t(key, options)

    Vue.prototype.$lng = lng
    Vue.prototype.$i18n = i18next
    Vue.prototype.$t = t
    Vue.prototype._ = t
    Vue.filter('i18n', t)
    Vue.filter('dayjs', (value: DayJsValue, format: string | undefined) => dayjs(value).format(format))
    dayjs.locale(lng)

    const i18nOptions: InitOptions = {
        lng,
        fallbackLng,
        ns: Array.isArray(namespace) ? namespace : [namespace],
        defaultNS: Array.isArray(namespace) ? namespace[0] : namespace,
        load: 'languageOnly',
        saveMissing: true,
        saveMissingTo: 'current',
        backend: {
            loadPath: '/api/v2/i18n/{{ns}}/{{lng}}',
            addPath: '/api/v2/i18n/{{ns}}',
            allowMultiLoading: false,
            withCredentials: true
        }
    }

    if (i18next.isInitialized) {
        console.log('i18next already initialized, reload page!')
        callback && callback()
    } else {
        console.log('Initializing i18next...')
        i18next
            .use(HttpApi)
            .init(i18nOptions, () => {
                console.log('I18Next initialized! Language: ' + i18next.language)
                callback && callback()
            })
    }
}

plugin.version = '__VERSION__'

export default plugin