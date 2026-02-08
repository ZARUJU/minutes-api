# minutes-api

会議録JSONを `data/` で管理し、Cloudflare Workers（Hono）で読み取り専用APIとして配信するサンプルです。

## 構成

- 正本データ: `data/`
- 配信用データ: `public/data/`（生成物）
- API実装: `src/`
- インデックス生成: `scripts/generate-index.mjs`
- データ同期: `scripts/sync-data.mjs`

## データ運用フロー

1. 会議ファイルを `data/meetings/*.json` に追加・更新
2. `npm run build:data` を実行
3. 自動で `data/index.json` を再生成
4. `data/` が `public/data/` へ同期

`data/index.json` は自動生成ファイルです。手動編集しないでください。

## API

- `GET /meetings`
  - `data/index.json` を返却
- `GET /meetings/:meetingId`
  - `data/meetings/:meetingId.json` を返却
- `GET /meetings/:meetingId.json`
  - 上記と同内容（互換パス）

共通ヘッダ:

- `Content-Type: application/json; charset=utf-8`
- `Access-Control-Allow-Origin: *`
- `Cache-Control: public, max-age=60`

## コマンド

```bash
npm install
npm run dev
```

`dev` 前に `predev` が走り、`build:data`（index生成 + 同期）が自動実行されます。

```bash
npm run deploy
```

`deploy` 前に `predeploy` が走り、同様に `build:data` が自動実行されます。

```bash
npm run generate:index
npm run sync:data
npm run build:data
npm run cf-typegen
```

## Wrangler 設定

`wrangler.jsonc` で `public/` を Assets として配信しています。

- `assets.directory = "./public"`
- `assets.binding = "ASSETS"`
- `assets.run_worker_first = true`

Workerは `env.ASSETS` から `public/data/*.json` を取得し、ルーティングとヘッダ制御を行います。
