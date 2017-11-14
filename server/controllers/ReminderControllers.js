import Croner from 'node-cron';
import moment from 'moment';

import reminder from '../models/reminder';
import { sendReminders, createMessage, apiResponse } from '../helpers';

/**
 * class ReminderController
 * @class
 */
export default class ReminderController {
  /**
 * @description: determines whether a reminder needs a notification at a
 * particular moment
 *
 * @param {Date} reminder required object
 *
 * @return {void}
 */
  static requiresNotification(reminder) {
    return (Math.floor(moment(new Date()).utc().valueOf() /
    60000) === moment(reminder.time).utc().valueOf() / 60000)
    && reminder.needReminder;
  }
  /**
 * @description: send reminders via email and application
 *
 * @return {void}
 */
  static sendNotification() {
    reminder.find({}, (err, reminders) => {
      if (err) {
        return err;
      }
      if (reminders.length !== 0) {
        const requiresNotificationReminders = reminders
          .filter(reminder => this.requiresNotification(reminder));
        requiresNotificationReminders.forEach((reminder) => {
          const {
            name, todoName, taskName, time
          } = reminder;
          const message = createMessage(
            name, todoName, taskName,
            moment(time).format('LLLL')
          );
          reminder.message = message[1];
          // reminder.needReminder = false;
          reminder.save();
          sendReminders(message[0], reminder.email);
        });
      }
    });
  }
  /**
 * @description: retrieves all the reminder through rouete
 * GET: /api/v1/users/reminders
 *
 * @param  {object} req request object
 * @param  {object} res response object
 *
 * @return {void}
 */
  static getReminders(req, res) {
    const { currentUser } = req.currentUser;
    reminder.find({
      $and: [{ ownerId: currentUser._id }, {
        message: 'The task you are assign to, '
      }, { needReminder: true }]
    }, (err, reminders) => {
      if (err) {
        return apiResponse(
          res, 500,
          'An error occured while retrieving reminders', false
        );
      }
      return apiResponse(res, 200, null, true, reminders);
    });
  }
  /**
 * @description: starts cron job
 *
 * @return {void}
 */
  static start() {
    Croner.schedule('* * * * *', () => {
      this.sendNotification();
    });
  }
}
