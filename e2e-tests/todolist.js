module.exports = {
  'Create Todolist': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=userName]', 'Python123')
      .setValue('input[name=password]', 'david1996')
      .click('.btn')
      .waitForElementVisible('#intro', 5000)
      .click('#foot')
      .waitForElementVisible('[name=name', 5000)
      .setValue('input[name=name]', 'postIt')
      .click('.btn')
      .end(),
  'Add member to todolist': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=userName]', 'Python123')
      .setValue('input[name=password]', 'david1996')
      .click('.btn')
      .waitForElementVisible('#intro', 5000)
      .click('#todolists')
      .waitForElementVisible('[data-activates=dropdown2]', 5000)
      .click('[data-activates=dropdown2]')
      .waitForElementVisible('[name=task]', 5000)
      .click('[name=add]')
      .setValue('input[id=icon_prefix]', 'a')
      .waitForElementVisible('#but', 5000)
      .click('[name=addUserButton')
      .setValue('input[id=test2]', true)
};
