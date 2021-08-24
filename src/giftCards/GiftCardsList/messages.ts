import { defineMessages } from "react-intl";

export const giftCardsListHeaderMenuItemsMessages = defineMessages({
  settings: {
    defaultMessage: "Settings",
    description: "GiftCardsListHeader menu item settings"
  },
  bulkIssue: {
    defaultMessage: "Bulk Issue",
    description: "GiftCardsListHeader menu item settings"
  },
  exportCodes: {
    defaultMessage: "Export card codes",
    description: "GiftCardsListHeader menu item settings"
  },
  issueButtonLabel: {
    defaultMessage: "Issue card",
    description: "GiftCardsListHeader issue button label"
  },
  noGiftCardsNotificationTitle: {
    defaultMessage: "You haven’t defined a gift card product!",
    description: "GiftCardsListHeader notification"
  },
  noGiftCardsProductsAndProductTypes: {
    defaultMessage:
      "{createGiftCardProductType} and {giftCardProduct} to start selling gift cards in your store.",
    description: "GiftCardsListHeader notification"
  },
  noGiftCardsProductTypes: {
    defaultMessage:
      "{createGiftCardProductType} to start selling gift cards in your store.",
    description: "GiftCardsListHeader notification"
  },
  noGiftCardsProducts: {
    defaultMessage:
      "{createGiftCardProduct} to start selling gift cards in your store.",
    description: "GiftCardsListHeader notification"
  },
  createGiftCardProductType: {
    defaultMessage: "Create a gift card product type",
    description: "GiftCardsListHeader notification"
  },
  createGiftCardProduct: {
    defaultMessage: "Create a gift card product",
    description: "GiftCardsListHeader notification"
  },
  giftCardProduct: {
    defaultMessage: "gift card product",
    description: "GiftCardsListHeader notification"
  }
});

export const giftCardsListTableMessages = defineMessages({
  giftCardsTableColumnGiftCardTitle: {
    defaultMessage: "Gift Card",
    description: "GiftCardsListTable column title gift card"
  },
  giftCardsTableColumnTagTitle: {
    defaultMessage: "Tag",
    description: "GiftCardsListTable column title tag"
  },
  giftCardsTableColumnProductTitle: {
    defaultMessage: "Product",
    description: "GiftCardsListTable column title product"
  },
  giftCardsTableColumnCustomerTitle: {
    defaultMessage: "Used by",
    description: "GiftCardsListTable column title customer"
  },
  giftCardsTableColumnBalanceTitle: {
    defaultMessage: "Balance",
    description: "GiftCardsListTable column title balance"
  },
  codeEndingWithLabel: {
    defaultMessage: "Code ending with {displayCode}",
    description: "GiftCardsListTable code ending with label"
  },
  giftCardDisabledLabel: {
    defaultMessage: "Disabled",
    description: "GiftCardsListTable disabled label"
  },
  noGiftCardsFound: {
    defaultMessage: "No gift cards found",
    description: "GiftCardsListTable no cards found title"
  }
});
