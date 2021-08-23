import { TextField, Typography } from "@material-ui/core";
import HorizontalSpacer from "@saleor/apps/components/HorizontalSpacer";
import VerticalSpacer from "@saleor/apps/components/VerticalSpacer";
import ControlledCheckbox from "@saleor/components/ControlledCheckbox";
import RadioGroupField from "@saleor/components/RadioGroupField";
import { GiftCardError } from "@saleor/fragments/types/GiftCardError";
import { getExpiryPeriodTerminationDate } from "@saleor/giftCards/GiftCardCreateDialog/utils";
import { getGiftCardErrorMessage } from "@saleor/giftCards/GiftCardUpdate/messages";
import { FormChange } from "@saleor/hooks/useForm";
import {
  GiftCardExpiryTypeEnum,
  TimePeriodTypeEnum
} from "@saleor/types/globalTypes";
import React from "react";
import { FormattedMessage } from "react-intl";
import { MessageDescriptor, useIntl } from "react-intl";

import TimePeriodField from "../TimePeriodField/TimePeriodField";
import { giftCardExpirySelectMessages as messages } from "./messages";
import { useGiftCardExpirySelectStyles as useStyles } from "./styles";

interface UntranslatedOption {
  label: MessageDescriptor;
  value: GiftCardExpiryTypeEnum;
}

const options: UntranslatedOption[] = [
  {
    label: messages.expiryPeriodLabel,
    value: GiftCardExpiryTypeEnum.EXPIRY_PERIOD
  },
  {
    label: messages.expiryDateLabel,
    value: GiftCardExpiryTypeEnum.EXPIRY_DATE
  }
];

interface GiftCardExpirySelectProps {
  change: FormChange;
  expiryEnabled: boolean;
  expiryPeriodType: TimePeriodTypeEnum;
  expiryPeriodAmount: number;
  expiryType: GiftCardExpiryTypeEnum;
  customOptions?: UntranslatedOption[];
  errors?: Record<"expiryPeriod" | "expiryDate", GiftCardError>;
  expiryDate?: string;
}

const GiftCardExpirySelect: React.FC<GiftCardExpirySelectProps> = ({
  errors,
  change,
  expiryEnabled,
  expiryPeriodType,
  expiryPeriodAmount,
  expiryType = GiftCardExpiryTypeEnum.EXPIRY_PERIOD,
  expiryDate,
  customOptions
}) => {
  const intl = useIntl();
  const classes = useStyles({});

  const translatedOptions = (customOptions || options).map(
    ({ label, value }) => ({
      value,
      label: intl.formatMessage(label)
    })
  );

  return (
    <>
      <ControlledCheckbox
        name={"expiryEnabled"}
        checked={expiryEnabled}
        onChange={change}
        label={intl.formatMessage(messages.expiryEnabledLabel)}
      />
      {expiryEnabled && (
        <>
          <VerticalSpacer spacing={2} />
          <RadioGroupField
            innerContainerClassName={classes.radioGroupContainer}
            choices={translatedOptions}
            onChange={change}
            name={"expiryType"}
            value={expiryType}
          />
          <VerticalSpacer spacing={2} />

          {expiryType === GiftCardExpiryTypeEnum.EXPIRY_DATE && (
            <TextField
              error={!!errors?.expiryDate}
              helperText={getGiftCardErrorMessage(errors?.expiryDate, intl)}
              onChange={change}
              name={"expiryDate"}
              className={classes.dateField}
              label={intl.formatMessage(messages.expiryDateLabel)}
              value={expiryDate}
              InputLabelProps={{
                shrink: true
              }}
              type="date"
            />
          )}

          {expiryType === GiftCardExpiryTypeEnum.EXPIRY_PERIOD && (
            <div className={classes.periodField}>
              <TimePeriodField
                isError={!!errors?.expiryPeriod}
                helperText={getGiftCardErrorMessage(errors?.expiryPeriod, intl)}
                change={change}
                periodType={expiryPeriodType}
                periodAmount={expiryPeriodAmount}
                amountFieldName={"expiryPeriodAmount"}
                typeFieldName={"expiryPeriodType"}
              />
              <HorizontalSpacer spacing={2} />
              <div className={classes.dateText}>
                <Typography variant="caption">
                  <FormattedMessage {...messages.expiryOnLabel} />
                </Typography>
                <Typography>
                  {getExpiryPeriodTerminationDate(
                    expiryPeriodType,
                    expiryPeriodAmount
                  )}
                </Typography>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default GiftCardExpirySelect;
