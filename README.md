# Kozmeland — demo store prototype

Прототип интернет-магазина косметики Kozmeland (Bakı, Səbail) для показа владельцу. Это демо: заказы не принимаются, оплата имитируется.

Спецификация: [`kozmeland-claude-code.md`](kozmeland-claude-code.md). Отчёт по фотографиям: [`PHOTO_REPORT.md`](PHOTO_REPORT.md).

## Запуск

```bash
npm install
npm run dev
```

Стек: Next.js (App Router), TypeScript, Tailwind. Бэкенда и базы нет. Корзина хранится в localStorage. Проект готов к деплою на Vercel без настроек.

## Где что лежит

- `src/config.ts`: константы.
  - `SHOW_PRICE_DATE` включает пометки о дате цены.
  - `SHOW_DEMO_BANNER` включает плашку «Demo versiya».
  - `SHOW_UNCONFIRMED` включает неподтверждённые данные: адрес с номером дома, кредит, скидку студентам.
  - `WHATSAPP_PHONE` — номер для WhatsApp.
- `src/i18n/az.ts`: все строки интерфейса.
- `src/data/products.ts`: товары. Файл генерируется скриптом `python -I scripts/gen_products.py` из спецификации и `scripts/image-sources/*.json`.
- `public/products/`: фото товаров, 800×800 webp. Источник каждого снимка указан в `SOURCES.md`.
- `scripts/process_image.py`: конвертирует и проверяет фото.
- `scripts/photo_report.py`: проверяет все фото и выводит статистику.

## Оплата

Кнопка оплаты ждёт 1,5 секунды и показывает номер заказа, деньги не списываются. Реальным платёжным шлюзом будет epoint.
