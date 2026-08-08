# Re:VIEW Template

Re:VIEW 5.9を使用した書籍プロジェクトです。執筆内容と設定は `articles/` にあります。

## クイックスタート

Dev Container内で、リポジトリのルートから実行します。

```sh
bundle install
npm ci
npm run pdf
```

印刷用PDFは `output/vrc-infra-anthology-print.pdf` に生成されます。電子書籍用PDFやEPUBの生成方法は[ビルドガイド](docs/build.md)を参照してください。

## ドキュメント

- [ビルドと成果物](docs/build.md)
