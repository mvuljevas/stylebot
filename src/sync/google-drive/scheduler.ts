import BackgroundPageStyles from 'background/styles';

import { runGoogleDriveSync, getGoogleDriveSyncEnabled } from '@stylebot/sync';

export const scheduleGoogleDriveSync = async (): Promise<void> => {
  const googleDriveSyncEnabled = await getGoogleDriveSyncEnabled();

  if (googleDriveSyncEnabled) {
    chrome.alarms.create('google-drive-sync', {
      delayInMinutes: 1,
    });
  }
};

export const initGoogleDriveSyncScheduler = (
  styles: BackgroundPageStyles
): void => {
  chrome.alarms.onAlarm.addListener(async alarm => {
    if (alarm.name === 'google-drive-sync') {
      const googleDriveSyncEnabled = await getGoogleDriveSyncEnabled();

      if (googleDriveSyncEnabled) {
        runGoogleDriveSync(styles.getAll());
      }
    }
  });
};