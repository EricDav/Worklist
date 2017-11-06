import Croner from 'node-cron';
import moment from 'moment';

import reminder from '../models/reminder';
import { apiResponse, sendReminders } from '../helpers';

/**
 * class ReminderController
 * @class
 */
export default class ReminderController {
/**
 * @description: creates a user through route POST: api/v1/user
 *
 * @param {Object} reminderDetails requset object
 *
 * @return {void}
 */
  static createReminder(reminderDetails) {
    const newReminder = new reminder(reminderDetails);
    newReminder.save((err) => {
      if (err) {
        return apiResponse(res, 500, 'Server error', false);
      }
    });
  }
  /**
 * @description: determines whether a reminder needs a notification at a
 * particular moment
 *
 * @param {Date} date required time to send notification
 *
 * @return {void}
 */
  static requiresNotification(date) {
    return Math.floor(moment(new Date()).utc().valueOf() /
    60000) === moment(date).utc().valueOf() / 60000;
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
          return this.requiresNotification(reminder.time);
        });
        requiresNotificationReminders.forEach((notfiedReminder) => {
          sendReminders('Just testing', notfiedReminder.email);
        });
      } else {
        console.log('I am working but no data');
      }
    });
  }
  static start() {
    Croner.schedule('* * * * *', () => {
      this.sendNotification();
    });
  }
}
