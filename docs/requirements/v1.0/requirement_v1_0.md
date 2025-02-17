# 要件定義書

プロジェクト名：「映画投票アプリ」

# 目的

本プロジェクトの目的は何もよりもまず**「失敗する」**ことにある。
個人開発という安全に失敗できる環境で失敗を経験することにより、本業での開発という失敗できない環境での失敗を予防することができる。
また、失敗することにより成功よりも多くの学びを得ることができる。
本プロジェクトの目標は失敗を通じて学びを得ることであり、収益面や保守性は度外視する。

よって、本プロジェクトはプロトタイプ開発を行い、失敗と改善を繰り返しながら開発を進めていく。
例えば、初期リリースでは DB さえ使わず、コードベタ打ちのハードコードで対応する。
早期に失敗をすることで、大きな手戻りを防ぐことが狙いである。

# プロジェクトの概要

シュアハウスの住人向けのサービスである。想定ユーザー数は 20 名程度  
次に見たい映画を自由に投票・追加できる web アプリサービス

本プロジェクトの開発の目的は、みたい映画を自由に共有できることで、住民同士の交流を促進させることを目的とする。  
画面デザインはスマートフォンのみ対象とする。（PC での画面レイアウトは対象外とする）  
また、本アプリの利用は無料とし、マネタイズは本プロジェクトの対象外とする。

## 開発の優先順位

本プロジェクトは、何よりもまずユーザーに素早く価値を提供することを第一優先とする。  
よって、「重厚なドキュメントよりも、動くアプリ」をユーザーに提供することを重視する。  
プロトタイプを作成し、ユーザーに実際に使ってもらうことでフィードバックを得て、機能の改善に取り組む。

# システム要件

## 画面デザイン

https://github.com/hato-taka/TMDb-api/blob/main/docs/requirements/v1.0/mock-up.png

モックアップ: https://main.d27y2h250yphml.amplifyapp.com/

## 技術スタック

### フロントエンド

- React
- Next.js
- typescript
- Tailwind CSS
- prisma: ORM ラッパー

### API

- TMDB API: 映画情報を取得 https://www.themoviedb.org/

### DB

- TiDB

### デプロイ

- AWS amplify

### コード管理・ドキュメント管理

- Github

## システム構成の概要

プロトタイプ開発のため、すぐにデプロイしやすい amplify を採用した。  
またなるべく開発費用を抑えるために、DB は TiDB の無料枠を利用することにした。  
想定ユーザー数が最大でも 30 名程度なので、無料枠内の利用で十分なキャパシティーと判定した。

- Next.js と typescript で開発
- DB は TiDB を利用する
- AWS amplify でデプロイする
- TMDB の API を利用して映画情報を取得する
- DB 操作は Prisma で行う
- Gitはmainブランチとdevブランチに分け、devブランチで動作確認後、mainブランチへマージする

## システム構成図

```mermaid
graph TD;
    %% ユーザー
    User["👤 User (ブラウザ)"] -->|アクセス| Amplify["🚀 AWS Amplify<br>(Next.js + TypeScript)"];

    %% Amplifyの動作
    subgraph "フロントエンド"
        AmplifyAPI["📡 API Routes<br>Next.js API"]
        AmplifyUI["🎨 UI Components<br>React + TailwindCSS"]
    end

    Amplify -->|画面描画| AmplifyUI;
    Amplify -->|リクエスト処理| AmplifyAPI;

    %% TMDB API とのやり取り
    AmplifyAPI -->|"映画情報取得リクエスト<br>GET /movies"| TMDB["🎥 TMDB API<br>(映画データ取得)"];
    TMDB -->|"JSONレスポンス"| AmplifyAPI;

    %% データベースの操作
    subgraph "バックエンド"
        TiDB["🛢 TiDB<br>(MySQL互換DB)"];
        Prisma["🛠 Prisma ORM"];
    end

    AmplifyAPI -->|"DB操作: SELECT・INSERT・UPDATE"| Prisma;
    Prisma -->|"SQL クエリ送信"| TiDB;
    TiDB -->|"データ取得"| Prisma;
    Prisma -->|"JSON 形式で返却"| AmplifyAPI;

    %% Git のブランチ管理
    subgraph "Git ブランチ管理"
        DevBranch["🌿 dev ブランチ<br>(動作確認用)"]
        MainBranch["🌳 main ブランチ<br>(本番環境)"]
    end

    DevBranch -->|"動作確認後マージ"| MainBranch;
```

# 機能要件

- ユーザーが自由に「観たい映画一覧」に新しい映画を追加できる
- ユーザーが自由に「いいね！」ボタンを押せる
- 累計の「いいね！」数が表示される

## 機能一覧

| No. | カテゴリー          | 優先度 | 要求内容                                              |
| --- | ------------------- | ------ | ----------------------------------------------------- |
| 1   | いいねボタン        | 高     | ユーザーが観たい映画に投票できる                      |
| 2   | 検索機能            | 高     | ユーザーが観たい映画をリストに追加できる              |
| 3   | LINE アプリとの連携 | 中     | ライン上からアプリの閲覧・操作が可能である            |
| 4   | 統計情報            | 低     | google analytics と連携し、アクセス数などが集計できる |

# 非機能要件

## パフォーマンス要件

- ユーザー操作から画面の描画までに、著しい遅延が発生しない。目安として、スマホでの画面描画の完了が 2 秒以内に完結すること。
- データベースのデータの整合性が取れていること

# 参考記事一覧

- [要件定義書 テンプレート](https://notepm.jp/template/requirement-definition)
- [要件定義書テンプレート・要件定義書の書き方](https://qiita.com/syantien/items/9a8a7cbaeca2be3ef0d7)
