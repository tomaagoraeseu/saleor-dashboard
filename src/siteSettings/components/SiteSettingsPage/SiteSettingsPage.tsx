import { Typography } from "@material-ui/core";
import CompanyAddressInput from "@saleor/components/CompanyAddressInput";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import Hr from "@saleor/components/Hr";
import PageHeader from "@saleor/components/PageHeader";
import Savebar from "@saleor/components/Savebar";
import { ShopErrorFragment } from "@saleor/fragments/types/ShopErrorFragment";
import useAddressValidation from "@saleor/hooks/useAddressValidation";
import { SubmitPromise } from "@saleor/hooks/useForm";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import { commonMessages, sectionNames } from "@saleor/intl";
import { Backlink } from "@saleor/macaw-ui";
import { makeStyles } from "@saleor/macaw-ui";
import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
import { mapCountriesToChoices } from "@saleor/utils/maps";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { SiteSettings_shop } from "../../types/SiteSettings";
import SiteSettingsDetails from "../SiteSettingsDetails/SiteSettingsDetails";

export interface SiteSettingsPageAddressFormData {
  city: string;
  companyName: string;
  country: string;
  countryArea: string;
  phone: string;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface SiteSettingsPageFormData
  extends SiteSettingsPageAddressFormData {
  description: string;
  domain: string;
  name: string;
}

export interface SiteSettingsPageProps {
  disabled: boolean;
  errors: ShopErrorFragment[];
  shop: SiteSettings_shop;
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: SiteSettingsPageFormData) => SubmitPromise;
}

export function areAddressInputFieldsModified(
  data: SiteSettingsPageAddressFormData
): boolean {
  return ([
    "city",
    "country",
    "countryArea",
    "phone",
    "postalCode",
    "streetAddress1",
    "streetAddress2"
  ] as Array<keyof SiteSettingsPageAddressFormData>)
    .map(key => data[key])
    .some(field => field !== "");
}

const useStyles = makeStyles(
  theme => ({
    hr: {
      gridColumnEnd: "span 2",
      margin: theme.spacing(1, 0)
    }
  }),
  {
    name: "SiteSettingsPage"
  }
);

const SiteSettingsPage: React.FC<SiteSettingsPageProps> = props => {
  const {
    disabled,
    errors,
    saveButtonBarState,
    shop,
    onBack,
    onSubmit
  } = props;
  const classes = useStyles(props);
  const intl = useIntl();
  const [displayCountry, setDisplayCountry] = useStateFromProps(
    shop?.companyAddress?.country.code || ""
  );

  const {
    errors: validationErrors,
    submit: handleSubmitWithAddress
  } = useAddressValidation(onSubmit);

  const initialFormAddress: SiteSettingsPageAddressFormData = {
    city: shop?.companyAddress?.city || "",
    companyName: shop?.companyAddress?.companyName || "",
    country: shop?.companyAddress?.country.code || "",
    countryArea: shop?.companyAddress?.countryArea || "",
    phone: shop?.companyAddress?.phone || "",
    postalCode: shop?.companyAddress?.postalCode || "",
    streetAddress1: shop?.companyAddress?.streetAddress1 || "",
    streetAddress2: shop?.companyAddress?.streetAddress2 || ""
  };
  const initialForm: SiteSettingsPageFormData = {
    ...initialFormAddress,
    description: shop?.description || "",
    domain: shop?.domain.host || "",
    name: shop?.name || ""
  };

  return (
    <Form
      initial={initialForm}
      onSubmit={data => {
        const submitFunc = areAddressInputFieldsModified(data)
          ? handleSubmitWithAddress
          : onSubmit;
        return submitFunc(data);
      }}
      confirmLeave
    >
      {({ change, data, hasChanged, submit }) => {
        const countryChoices = mapCountriesToChoices(shop?.countries || []);
        const handleCountryChange = createSingleAutocompleteSelectHandler(
          change,
          setDisplayCountry,
          countryChoices
        );

        return (
          <Container>
            <Backlink onClick={onBack}>
              {intl.formatMessage(sectionNames.configuration)}
            </Backlink>
            <PageHeader
              title={intl.formatMessage(commonMessages.generalInformations)}
            />
            <Grid variant="inverted">
              <div>
                <Typography>
                  {intl.formatMessage(sectionNames.siteSettings)}
                </Typography>
                <Typography variant="body2">
                  <FormattedMessage defaultMessage="These are general information about your store. They define what is the URL of your store and what is shown in browsers taskbar." />
                </Typography>
              </div>
              <SiteSettingsDetails
                data={data}
                errors={errors}
                disabled={disabled}
                onChange={change}
              />
              <Hr className={classes.hr} />
              <div>
                <Typography>
                  <FormattedMessage
                    defaultMessage="Company Information"
                    description="section header"
                  />
                </Typography>
                <Typography variant="body2">
                  <FormattedMessage defaultMessage="This adress will be used to generate invoices and calculate shipping rates." />
                  <FormattedMessage defaultMessage="Email adress you provide here will be used as a contact adress for your customers." />
                </Typography>
              </div>
              <CompanyAddressInput
                data={data}
                displayCountry={displayCountry}
                countries={countryChoices}
                errors={[...errors, ...validationErrors]}
                disabled={disabled}
                header={intl.formatMessage({
                  defaultMessage: "Store Information",
                  description: "section header"
                })}
                onChange={change}
                onCountryChange={handleCountryChange}
              />
            </Grid>
            <Savebar
              state={saveButtonBarState}
              disabled={disabled || !hasChanged}
              onCancel={onBack}
              onSubmit={submit}
            />
          </Container>
        );
      }}
    </Form>
  );
};

SiteSettingsPage.displayName = "SiteSettingsPage";
export default SiteSettingsPage;
