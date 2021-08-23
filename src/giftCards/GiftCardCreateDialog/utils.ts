import {
  GiftCardExpirySettingsInput,
  GiftCardExpiryTypeEnum
} from "@saleor/types/globalTypes";
import { TimePeriodTypeEnum } from "@saleor/types/globalTypes";
import moment from "moment-timezone";

import { GiftCardCommonFormData } from "./types";

const dateFormat = "L";

const addToCurrentDate = (
  expiryPeriodAmount: number,
  unit: moment.unitOfTime.DurationConstructor
) =>
  moment()
    .add(expiryPeriodAmount, unit)
    .format(dateFormat);

export const getExpiryPeriodTerminationDate = (
  expiryPeriodType: TimePeriodTypeEnum,
  expiryPeriodAmount: number = 0
) => {
  switch (expiryPeriodType) {
    case TimePeriodTypeEnum.DAY:
      return addToCurrentDate(expiryPeriodAmount, "d");
    case TimePeriodTypeEnum.MONTH:
      return addToCurrentDate(expiryPeriodAmount, "M");
    case TimePeriodTypeEnum.YEAR:
      return addToCurrentDate(expiryPeriodAmount, "y");
    default:
      return null;
  }
};

export const getGiftCardExpirySettingsInputData = ({
  expiryEnabled,
  expiryType,
  expiryDate,
  expiryPeriodAmount,
  expiryPeriodType
}: Pick<
  GiftCardCommonFormData,
  | "expiryEnabled"
  | "expiryDate"
  | "expiryPeriodAmount"
  | "expiryPeriodType"
  | "expiryType"
>): GiftCardExpirySettingsInput => {
  if (!expiryEnabled) {
    return {
      expiryType
    };
  }

  switch (expiryType) {
    case GiftCardExpiryTypeEnum.EXPIRY_DATE: {
      return {
        expiryType,
        expiryDate
      };
    }

    case GiftCardExpiryTypeEnum.EXPIRY_PERIOD: {
      return {
        expiryType,
        expiryDate: getExpiryPeriodTerminationDate(
          expiryPeriodType,
          expiryPeriodAmount
        )
      };
    }
  }
};
