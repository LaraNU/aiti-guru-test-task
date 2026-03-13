Тестовое задание на позицию Frontend Developer. Приложение для управления списком товаров с использованием API [DummyJSON](https://dummyjson.com/).

### Технологический стек

- **Core:** React 18 + TypeScript + Vite
- **State Management:** Redux Toolkit + RTK Query (для работы с API)
- **UI Library:** Ant Design (Antd)
- **Routing:** React Router DOM v6
- **Forms:** React Hook Form
- **Code Quality:** ESLint, Prettier, Husky, Lint-staged (автоматическая проверка при коммите)

### Функционал

- **Авторизация:** Защищенные (Private) и публичные (Public) роуты. Хранение токена с поддержкой "Remember me" (LocalStorage/SessionStorage).
- **Таблица товаров:**
- Серверная пагинация и сортировка.
- Живой поиск с оптимизацией (**Debounce**).
- Синхронизация состояния таблицы (страница, поиск, сортировка) с **URL-параметрами**.
- Кастомные скелетоны (`Skeleton`) для начальной загрузки.
- Прогресс-бар состояния загрузки (`isFetching`).

- **Управление:** Модальное окно добавления товара с валидацией и Toast-уведомлением.

### Установка и запуск

1. **Клонировать репозиторий:**

```bash
git clone [ссылка на репозиторий]
cd aiti-guru-test-task

```

2. **Установить зависимости:**

```bash
npm install

```

3. **Запустить проект (режим разработки):**

```bash
npm run dev

```

4. **Сборка проекта:**

```bash
npm run build

```
