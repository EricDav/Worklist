import Croner from 'node-cron';
import moment from 'moment';

import reminder from '../models/reminder';
import { sendReminders, createMessage } from '../helpers';

/**
 * class ReminderController
 * @class
 */
export default class ReminderController {

  /**
 * @description: determines whether a reminder needs a notification at a
 * particular moment
 *
 * @param {Date} reminder required time to send notification
 *
 * @return {void}
 */
  static requiresNotification(reminder) {
    return (Math.floor(moment(new Date()).utc().valueOf() /
    60000) === moment(reminder.time).utc().valueOf() / 60000)
    && reminder.needReminder;
  }
  /**
 * @description: determines whether a reminder needs a notification at a
 * particular moment
 *
 * @param {Date} date required time to send notification
 *
 * @return {void}
 */
  static sendNotification() {
    reminder.find({}, (err, reminders) => {
      if (err) {
        return err;
      }
      if (reminders.length !== 0) {
        const requiresNotificationReminders = reminders.filter((reminder) => {
          return this.requiresNotification(reminder);
        });
        requiresNotificationReminders.forEach((reminder) => {
          const { name, todoName, taskName, time } = reminder;
          const message = createMessage(
            name, todoName, taskName,
            moment(time).format('LLLL')
          );
          sendReminders(message, reminder.email);
        });
      }
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
