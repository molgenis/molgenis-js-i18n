import { shallowMount } from '@vue/test-utils'
import i18next from 'i18next'
import Plugin from '@/plugin'
import Vue from 'vue'
import { createLocalVue } from '@vue/test-utils'
import dayjs from 'dayjs'
import { VueConstructor } from 'vue/types/umd'



describe('MOLGENIS Vue i18n plugin', () => {
 
  let requests = []

  const responses = {
    test: {
      nl: {
        tokenNL: 'token nl'
      },
      de: {
        tokenNL: 'token de',
        tokenDE: 'token de'
      },
      en: {
        tokenEN: 'token en'
      }
    },
    other: {
      nl: {
        tokenNL: 'token nl'
      },
      de: {
        tokenNL: 'token de',
        tokenDE: 'token de'
      },
      en: {
        tokenEN: 'token en'
      }
    }
  }

  const respond = (request: { url: string; respond: (arg0: number, arg1: {}, arg2: string) => void; method: string }) => {
    const regex = /^\/api\/v2\/i18n\/(\w+)\/(\w+)$/g
    const match = regex.exec(request.url)
    if (match) {
      const namespace = match[1]
      const language = match[2]
      console.log('responding to request for language ', language)
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      request.respond(200, {}, JSON.stringify(responses[namespace][language]))
    } else {
      if (request.method === 'POST') {
        console.log('sending 200 for request to url', request.url, request.method)
        request.respond(200, {}, '')
      }
    }
  }

  describe('Install', () => {
    it('should call callback function', (done) => {
      const localVue = createLocalVue()
      if (i18next.isInitialized) {
        done()
      } else {
        localVue.use(Plugin, {
          lng: 'nl',
          fallbackLng: ['de', 'en'],
          namespace: ['test', 'other'],
          callback: done
        })
      }
    })
  })

  describe('Vue prototype', () => {
    let vm: any

    beforeAll(function (done) {
      const LocalVue = createLocalVue()
      LocalVue.use(Plugin, {
        lng: 'nl',
        fallbackLng: ['de', 'en'],
        namespace: 'test',
        callback: () => { }
      })
      vm = new LocalVue()
      Vue.nextTick(() => {
        done()
      })
    })

    it('should add language to Vue.$lng', () => {
      expect(vm.$lng).toEqual('nl')
    })

    it('should add translation function to Vue._', () => {
      expect(vm._('tokenNL')).toEqual('token nl')
    })

    it('should add translation function to Vue.$t', () => {
      expect(vm.$t('tokenNL')).toEqual('token nl')
    })

    it('should add i18next to Vue.$i18n', () => {
      expect(vm.$i18n).toEqual(i18next)
    })
  })

  // describe('i18next configuration', () => {
  //   it('should set i18next language to lng', done => {
  //     expect(i18next.language).toEqual('nl')
  //     done()
  //   })

  //   it('should set i18next languages to lng plus the languages in fallbackLng', done => {
  //     expect(i18next.languages).to.deep.equal(['nl', 'de', 'en'])
  //     done()
  //   })

  //   it('should translate to the first available token', done => {
  //     expect(i18next.t('tokenNL')).toEqual('token nl')
  //     expect(i18next.t('tokenDE')).toEqual('token de')
  //     expect(i18next.t('tokenEN')).toEqual('token en')
  //     expect(i18next.t('token unknown')).toEqual('token unknown')
  //     done()
  //   })

  //   it('should post missing tokens to the correct URL', done => {
  //     i18next.t('token ABC')
  //     expect(requests[0].requestBody.startsWith('token%20ABC=token%20ABC'))
  //     done()
  //   })
  // })

  // describe('dayjs filter', () => {
  //   let vm
  //   const lng = 'nl'
  //   const date = Date.UTC(2019, 11, 5, 20, 12, 2)

  //   before(function (done) {
  //     const LocalVue = createLocalVue()
  //     LocalVue.use(Plugin, {
  //       lng,
  //       fallbackLng: ['de', 'en'],
  //       namespace: 'test'
  //     })

  //     vm = new LocalVue({
  //       template: '<div>{{ date | dayjs(\'LLLL\') }}</div>',
  //       data: {
  //         date
  //       }
  //     }).$mount()

  //     Vue.nextTick(() => {
  //       done()
  //     })
  //   })

  //   it('should format dates and times in the correct language', () => {
  //     dayjs.locale(lng)
  //     const expected = dayjs(date).format('LLLL')
  //     expect(vm.$el.textContent).toEqual(expected)
  //   })
  // })

  // describe('i18n in templates as template filter', () => {
  //   let vm

  //   before(function (done) {
  //     const LocalVue = createLocalVue()
  //     LocalVue.use(Plugin, {
  //       lng: 'nl',
  //       fallbackLng: ['de', 'en'],
  //       namespace: 'test'
  //     })

  //     vm = new LocalVue({
  //       template: '<div>{{ \'tokenNL\' | i18n }}</div>'
  //     }).$mount()

  //     Vue.nextTick(() => {
  //       done()
  //     })
  //   })

  //   it('should have i18n filter', () => {
  //     expect(vm.$el.textContent).toEqual('token nl')
  //   })
  // })

  // describe('i18n in templates as script filter', () => {
  //   let vm

  //   before(function (done) {
  //     const LocalVue = createLocalVue()
  //     LocalVue.use(Plugin, {
  //       lng: 'nl',
  //       fallbackLng: ['de', 'en'],
  //       namespace: 'test'
  //     })

  //     vm = new LocalVue({
  //       template: '<div>{{ $t(\'tokenNL\') }}</div>'
  //     }).$mount()

  //     Vue.nextTick(() => {
  //       done()
  //     })
  //   })

  //   it('should have $t function', () => {
  //     expect(vm.$el.textContent).toEqual('token nl')
  //   })
  // })
})