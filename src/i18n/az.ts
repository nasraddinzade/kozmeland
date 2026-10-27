// All interface strings (Azerbaijani only).
export const az = {
  demoBanner: "Demo versiya, sifarişlər qəbul edilmir",
  location: "Səbail, Tarqovu",

  nav: {
    catalog: "Kataloq",
    store: "Mağaza",
    cart: "Səbət",
    searchPlaceholder: "Məhsul və ya brend axtar",
    search: "Axtar",
    notFound: "Tapılmadı",
  },

  hero: {
    allProducts: "Bütün məhsullar",
    whatsapp: "WhatsApp-da yaz",
  },

  home: {
    brands: "Brendlər",
    topDiscounts: "Ən çox endirim",
    giftSets: "Hədiyyə dəstləri",
    categories: "Kateqoriyalar",
    seeAll: "Hamısına bax",
    store: "Mağaza",
  },

  categories: {
    "Üz makiyajı": "Üz makiyajı",
    Gözlər: "Gözlər",
    Dodaqlar: "Dodaqlar",
    "Dəri qulluğu": "Dəri qulluğu",
    "Bədən və saç": "Bədən və saç",
    "Hədiyyə dəstləri": "Hədiyyə dəstləri",
  } as Record<string, string>,

  catalog: {
    title: "Kataloq",
    priceSource: "Qiymətlər mağazanın 3 sentyabr - 21 oktyabr paylaşımlarından götürülüb",
    searchPlaceholder: "Ad və ya brend",
    category: "Kateqoriya",
    brand: "Brend",
    price: "Qiymət",
    sort: "Sıralama",
    all: "Hamısı",
    allBrands: "Bütün brendlər",
    sortDiscount: "Endirimə görə",
    sortPriceAsc: "Əvvəlcə ucuz",
    sortPriceDesc: "Əvvəlcə bahalı",
    reset: "Filtrləri sıfırla",
    filters: "Filtrlər",
    empty: "Bu filtrlərlə məhsul tapılmadı",
  },

  product: {
    volume: "Həcm",
    type: "Məhsul növü",
    priceDate: (date: string) => `Qiymət ${date} tarixli paylaşıma əsasdır`,
    quantity: "Say",
    addToCart: "Səbətə at",
    added: "Səbətə əlavə olundu",
    askWhatsapp: "WhatsApp-da soruş",
    whatsappText: (name: string) => `Salam! Bu məhsulla maraqlanıram: ${name}`,
    similar: "Oxşar məhsullar",
    decrease: "Azalt",
    increase: "Artır",
  },

  cart: {
    title: "Səbət",
    empty: "Səbət boşdur",
    goShopping: "Kataloqa keç",
    remove: "Sil",
    total: "Cəmi",
    checkout: "Sifarişi rəsmiləşdir",
    whatsappOrder: "WhatsApp ilə sifariş",
    whatsappHeader: "Salam! Sifariş vermək istəyirəm:",
    whatsappTotal: "Cəmi",
  },

  checkout: {
    title: "Sifarişin rəsmiləşdirilməsi",
    contacts: "Əlaqə məlumatları",
    name: "Ad, soyad",
    phone: "Telefon",
    phonePlaceholder: "+994 __ ___ __ __",
    method: "Alma üsulu",
    delivery: "Ünvana çatdırılma",
    pickup: "Mağazadan götürmə",
    address: "Çatdırılma ünvanı",
    comment: "Qeyd (istəyə görə)",
    summary: "Sifariş",
    pay: "Ödə",
    paying: "Ödəniş emal olunur…",
    demoNote: "Demo: pul çıxılmır",
    required: "Bu sahəni doldurun",
  },

  success: {
    title: "Sifariş qəbul olundu",
    orderNumber: "Sifariş nömrəsi",
    howYouGet: "Necə alırsan",
    demoNote: "Bu demo versiyadır, sifariş mağazaya göndərilmir və pul çıxılmır.",
    back: "Ana səhifəyə qayıt",
  },

  store: {
    title: "Mağaza",
    phone: "Telefon, WhatsApp",
    instagram: "Instagram",
    address: "Ünvan",
    delivery: "Çatdırılma",
    deliveryValue: "Çatdırılma var",
    writeWhatsapp: "WhatsApp-da yaz",
  },

  footer: {
    rights: "Kozmeland",
  },
} as const;
