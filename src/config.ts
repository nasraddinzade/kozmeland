// Site-wide switches and shop constants.

/** Show "Qiymət ... tarixli paylaşıma əsasdır" on product pages and the source line in the catalog header. */
export const SHOW_PRICE_DATE = true;

/** Top banner "Demo versiya, sifarişlər qəbul edilmir" on every page. Set to false to remove it. */
export const SHOW_DEMO_BANNER = true;

/** Facts confirmed by only one source (see TODO list in the spec). Hidden until the owner confirms them. */
export const SHOW_UNCONFIRMED = false;

export const WHATSAPP_PHONE = "994557953787";

export const CONTACTS = {
  phone: "+994 55 795 37 87",
  instagram: "kozmeland.az",
  address: "Hacı Zeynalabdin Tağıyev küçəsi, Səbail",
} as const;

// Unconfirmed: shown only when SHOW_UNCONFIRMED = true.
export const ADDRESS_2GIS = "H. Z. Tağıyev küçəsi 20-22, 1-ci mərtəbə, Səbail";
export const ADDRESS_INSTAGRAM = "Hacı Zeynalabdin Tağıyev 20b";
export const CREDIT_NOTE = "Kreditlə alış (2 ay sonra ödə, ilkin ödənişsiz)";
export const STUDENT_NOTE = "Tələbələrə endirim";
