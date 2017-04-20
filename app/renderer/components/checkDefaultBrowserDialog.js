/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

const React = require('react')

// Components
const ImmutableComponent = require('./immutableComponent')
const Dialog = require('../../../js/components/dialog')
const Button = require('../../../js/components/button')
const SwitchControl = require('../../../js/components/switchControl')

// Actions
const appActions = require('../../../js/actions/appActions')
const windowActions = require('../../../js/actions/windowActions')

// Constants
const settings = require('../../../js/constants/settings')

const {StyleSheet, css} = require('aphrodite/no-important')
const globalStyles = require('./styles/global')

const braveAbout = require('../../extensions/brave/img/braveAbout.png')

const {
  CommonFormMedium,
  CommonFormSection,
  CommonFormButtonWrapper
} = require('./commonForm')

class CheckDefaultBrowserDialog extends ImmutableComponent {
  constructor () {
    super()
    this.onCheckDefaultOnStartup = this.onCheckDefaultOnStartup.bind(this)
    this.onNotNow = this.onNotNow.bind(this)
    this.onUseBrave = this.onUseBrave.bind(this)
  }

  onCheckDefaultOnStartup (e) {
    windowActions.setModalDialogDetail('checkDefaultBrowserDialog', {checkDefaultOnStartup: e.target.value})
  }
  onNotNow () {
    appActions.defaultBrowserUpdated(false)
    appActions.defaultBrowserCheckComplete()
    appActions.changeSetting(settings.CHECK_DEFAULT_ON_STARTUP, this.props.checkDefaultOnStartup)
    this.props.onHide()
  }
  onUseBrave () {
    appActions.defaultBrowserUpdated(true)
    appActions.defaultBrowserCheckComplete()
    appActions.changeSetting(settings.CHECK_DEFAULT_ON_STARTUP, this.props.checkDefaultOnStartup)
    this.props.onHide()
  }
  render () {
    return <Dialog className='checkDefaultBrowserDialog'>
      <CommonFormMedium onClick={(e) => e.stopPropagation()}>
        <CommonFormSection>
          <div className={css(styles.flexAlignCenter)}>
            <div className={css(styles.section__braveIcon)} />
            <div>
              <div className={css(styles.section__title)} data-l10n-id='makeBraveDefault' />
              <SwitchControl className={css(styles.section__switchControl)}
                rightl10nId='checkDefaultOnStartup'
                checkedOn={this.props.checkDefaultOnStartup}
                onClick={this.onCheckDefaultOnStartup} />
            </div>
          </div>
        </CommonFormSection>
        <CommonFormButtonWrapper>
          <Button className='whiteButton'
            l10nId='notNow'
            testId='notNowButton'
            onClick={this.onNotNow}
          />
          <Button className='primaryButton'
            l10nId='useBrave'
            testId='useBraveButton'
            onClick={this.onUseBrave}
          />
        </CommonFormButtonWrapper>
      </CommonFormMedium>
    </Dialog>
  }
}

const styles = StyleSheet.create({
  flexAlignCenter: {
    display: 'flex',
    alignItems: 'center'
  },

  section__braveIcon: {
    backgroundImage: `image-set(url(${braveAbout}) 2x)`,
    backgroundRepeat: 'no-repeat',
    height: '64px',
    width: '64px',
    minWidth: '64px',
    marginRight: globalStyles.spacing.dialogInsideMargin
  },
  section__title: {
    fontWeight: 'bold'
  },
  section__switchControl: {
    paddingLeft: 0,
    marginTop: `calc(${globalStyles.spacing.dialogInsideMargin} / 2)`
  }
})

module.exports = CheckDefaultBrowserDialog
