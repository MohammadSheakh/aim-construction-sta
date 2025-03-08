//[🚧][🧑‍💻✅][🧪] // 🆗

import { StatusCodes } from 'http-status-codes';
import ApiError from '../../errors/ApiError';
import { GenericService } from '../Generic Service/generic.services';
import { settingsType } from './settings.constant';
import { ISettings } from './settings.interface';
import { Settings } from './settings.model';
import e from 'express';

export class SettingsService extends GenericService<typeof Settings> {
  constructor() {
    super(Settings);
  }

  async createOrUpdateSettings(type: any, payload: any) {
    // List of allowed settings types

    const allowedTypes = [
      settingsType.aboutUs,
      settingsType.contactUs,
      settingsType.privacyPolicy,
      settingsType.termsAndConditions,
    ];

    if (!allowedTypes.includes(type)) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `Unsupported settings type: ${type}`
      );
    }

    // Find existing setting by type
    const existingSetting = await Settings.findOne({ type });
    if (existingSetting) {
      // existingSetting.set(payload.details); // ISSUE : not working ..
      existingSetting.details = payload.details;
      return await existingSetting.save();
    } else {
      // Ensure payload contains the correct type
      payload.type = type;
      return await Settings.create(payload);
    }
  }

  async getDetailsByType(type: any) {
    const setting = await Settings.findOne({ type }).sort({ createdAt: -1 });

    if (!setting) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `Details not found for type: ${type}`
      );
    }

    return setting;
  }
}
