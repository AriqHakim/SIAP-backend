# SIAP - Sisten Aplikasi Aktivitas Praktikum

## Setup .ENV

```
PORT : Port untuk server API
DB_PORT : Port untuk database MySQL
DB_NAME : Database yang dipakai
DB_USERNAME : credential username untuk akses MySQL
DB_PASSWORD : credential password untuk akses MySQL
```

## Menjalankan API

Untuk build typescript ke folder `./dist`

```
npm run build
```

Build + run

```
npm run dev
```

Run folder `./dist`

```
npm run start
```

## Migration

Masukkan command berikut untuk run migration

```
npm run migration:up
```

Masukkan command berikut untuk revert migration

```
npm run migration:down
```

Masukkan command berikut untuk generate migration dari entity

```
npm run migration:generate -n src/migration/<Migration name>
```
