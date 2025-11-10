# 🚀 How to start
1. `yarn install`
2. `yarn start`

# 🔗 Link
## https://valetax-kohl.vercel.app/

# 📍Base provisions

1. No `.env` file needed
2. The second currency is not displayed in the search (To avoid the situation where `$1` = `$1`)
3. Almost pixel perfect

# 🔑 Key decisions
1. Used `@tanstack/react-query` for network. It provides offline support and cache strategy. It's simpler than using `@reduxjs/toolkit/query`
2. Used `@reduxjs/toolkit` for store management. Store isn't big, but this lib is reliable
3. Used floating formatting for currency. Input supports `,` and `.`