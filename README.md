# Re:VIEW Template

Re:VIEW 5.9を使用した書籍プロジェクトです。執筆内容と設定は `articles/` にあります。

## クイックスタート

Dev Container内で、リポジトリのルートから実行します。

```sh
bundle install
npm ci
npm run pdf
```

PDFは `articles/vrc-infra-anthology.pdf` に生成されます。EPUBの生成や、両方の成果物を残す方法は[ビルドガイド](docs/build.md)を参照してください。

## ドキュメント

- [ビルドと成果物](docs/build.md)
