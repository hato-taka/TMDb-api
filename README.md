# 要件定義書
https://github.com/hato-taka/TMDb-api/blob/3432bfbf179ec05f7b4ff11391e907be10d0fd7c/docs/requirements/v1.0/requirement_v1_0.md
に記述している


# TODO
- [x] いいね！のリアクション機能をつける
- [x] みたいものリストのJSONを作る 
- [x] ページタイトルの変更
- [x] OGPの追加
- [ ] LINEでOGPを表示させる
- [x] dev環境のセットアップ
- [ ] DBでデータの永続化

# 利用API
https://www.themoviedb.org/u/hato_code

# エンドポイント
https://developer.themoviedb.org/reference/trending-movies


<details>

<summary>エンドポイント一覧</summary>

## 映画関連

- `/movie/{movie_id}`: 特定の映画の詳細情報を取得[9]
- `/movie/{movie_id}/alternative_titles`: 映画の代替タイトルを取得
- `/movie/{movie_id}/credits`: 映画のキャストとクルー情報を取得
- `/movie/{movie_id}/images`: 映画の画像（ポスター、背景など）を取得
- `/movie/{movie_id}/keywords`: 映画のキーワードを取得
- `/movie/{movie_id}/videos`: 映画の関連動画を取得
- `/movie/popular`: 人気映画のリストを取得
- `/movie/top_rated`: 高評価の映画リストを取得
- `/movie/upcoming`: 公開予定の映画リストを取得

## 検索

- `/search/movie`: 映画を検索[10]
- `/search/tv`: テレビ番組を検索
- `/search/person`: 人物を検索
- `/search/multi`: 映画、テレビ番組、人物を一括検索

## テレビ番組関連

- `/tv/{tv_id}`: 特定のテレビ番組の詳細情報を取得
- `/tv/{tv_id}/season/{season_number}`: 特定のシーズンの情報を取得
- `/tv/{tv_id}/season/{season_number}/episode/{episode_number}`: 特定のエピソードの情報を取得

## 人物関連

- `/person/{person_id}`: 特定の人物の詳細情報を取得
- `/person/{person_id}/movie_credits`: 人物の映画出演作品を取得
- `/person/{person_id}/tv_credits`: 人物のテレビ出演作品を取得

## その他

- `/configuration`: API設定情報を取得[15]
- `/genre/movie/list`: 映画ジャンルのリストを取得
- `/genre/tv/list`: テレビ番組ジャンルのリストを取得
- `/trending/{media_type}/{time_window}`: トレンド情報を取得

</details>

# TiDBの利用
https://tidbcloud.com/console/clusters?orgId=1372813089209254943&projectId=1372813089454572626

5クラスターまで無料

### TiDBの使用方法は下記にまとめる
https://zenn.dev/wakuto_hato/scraps/a025c349326cc0

# Prismaの使用
install
```
npm install prisma --save-dev
```

### TiDB に接続

```prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

Prisma Client をビルドして利用
```bash
npx prisma generate
```

### TiDB Cloud のエンドポイント情報
```.env
DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<database>?sslaccept=strict"
```


# AWS amplify でデプロイ
https://main.d27y2h250yphml.amplifyapp.com/
