module.exports = {
  'Edit Profile': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=userName]', 'Python123')
      .setValue('input[name=password]', 'david1996')
      .click('.btn')
      .waitForElementVisible('#intro', 5000)
      .click('.dropdown-button')
      .waitForElementVisible('[name=profile', 5000)
      .click('[name=profile')
      .waitForElementVisible('#fullname', 5000)
      .clearValue('input[name=fullName]')
      .setValue('input[name=fullName]', 'New name')
      .click('#myButton')
      .pause('2000')
      .pause('2000')
      .assert.urlEquals(`${'http://localhost:8000/dashboard#'}`)
      .assert.value('input[name=fullName]', 'New name')
      .end(),
  'User should be able to signup and signout': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .click('#clickMe')
      .setValue('input[name=userName]', 'Python123566787')
      .setValue('input[name=password]', 'david1996')
      .setValue('input[name=fullName]', 'ade Musa')
      .setValue('input[name=email]', 'ade12356@we.com')
      .click('.btn')
      .waitForElementVisible('.dropdown-button', 5000)
      .click('.dropdown-button')
      .waitForElementVisible('[name=logout', 5000)
      .click('[name=logout')
      .end()
};
