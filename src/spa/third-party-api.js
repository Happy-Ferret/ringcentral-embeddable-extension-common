/**
 * third party api
 * you can do things like:
 * 1. sync third party contacts to ringcentral widgets contact list
 * 2. when call outbound or call inbound, show caller/callee info panel
 * 3. sync call log to third party system
 *
 * document about third party features: https://github.com/ringcentral/ringcentral-embeddable/blob/master/docs/third-party-service-in-widget.md

 *
 */

import {thirdPartyConfigs} from '../common/app-config'
import {sendMsgToRCIframe} from '../common/helpers'

let {
  serviceName
} = thirdPartyConfigs

export default async function initThirdPartyApi (config) {
  if (!config.thirdPartyServiceConfig) {
    return
  }
  let thirdPartyConfig = config.thirdPartyServiceConfig(serviceName)
  if (!thirdPartyConfig) {
    return
  }
  const {
    services,
    handleRCEvents
  } = thirdPartyConfig

  sendMsgToRCIframe({
    type: 'rc-adapter-register-third-party-service',
    service: services
  })

  // init
  window.addEventListener('message', handleRCEvents)

  config.initThirdParty && config.initThirdParty()

}

