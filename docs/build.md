# ビルドと成果物

この文書は、このリポジトリをDev Container内でビルドするための手順です。

## 前提環境

Dev Containerは `vvakame/review:5.9` を使用し、Re:VIEW 5.9とPDF生成に必要なTeX環境を含みます。Node.jsとnpmの要件は `package.json` を参照してください。現在の要件はNode.js 20以上、npm 10.8以上です。

Dev Containerを作成すると `npm ci` が自動実行されます。Gemが不足している場合や、依存定義を更新した場合は、リポジトリのルートで次を実行します。

```sh
bundle install
npm ci
```

## 表記を確認する

Re:VIEW原稿（`articles/**/*.re`）はprhで表記を確認できます。

```sh
npm run check:prh
```

すべてのビルドとGitHub Actionsで自動実行され、`⚠ WARN ファイル:行:列: 指摘内容` の形式で表示します。指摘が残っていても、原稿のビルドを妨げないよう終了コードは成功のままです。

警告は機械的に置換せず、誤検知や文意・語調への影響を確認してから修正してください。


## TODOを確認する

Re:VIEW原稿（`articles/**/*.re`）に残っている `TODO:` は、次のコマンドで確認できます。

```sh
npm run check:todo
```

ビルド時にも同じ確認が自動実行され、ファイル名・行番号・内容を警告として表示します。TODOが残っていても、執筆途中のビルドを妨げないよう終了コードは成功のままです。

警告が表示された場合は、ビルド結果を共有するときに残存TODOも併せて報告してください。

## 成果物

生成物は形式別のサブディレクトリを作らず、すべてリポジトリ直下の `output/` に出力します。`output/` はGitの管理対象外です。

```text
output/
├── vrc-infra-anthology-print.pdf
├── vrc-infra-anthology-ebook.pdf
└── vrc-infra-anthology.epub
```

## 印刷用PDF

```sh
npm run pdf
```

`output/vrc-infra-anthology-print.pdf` が生成されます。

## 電子書籍用PDF

```sh
REVIEW_CONFIG_FILE=config-ebook.yml npm run pdf
```

`output/vrc-infra-anthology-ebook.pdf` が生成されます。印刷用PDFとは別名なので、両方を同時に保持できます。

## EPUB

```sh
npm run epub
```

`output/vrc-infra-anthology.epub` が生成されます。

## まとめて生成する

各コマンドの成果物は別名で `output/` に残るため、順番に実行できます。

```sh
npm run pdf
REVIEW_CONFIG_FILE=config-ebook.yml npm run pdf
npm run epub
```

PDF出力の検証では、印刷用と電子書籍用の両方を生成します。

## その他の出力

```sh
npm run web   # articles/webroot/
npm run text  # articles/*.txt
npm run html  # articles/*.html
```

利用可能なコマンドの一覧と実体は `package.json` と `Gruntfile.js` を参照してください。

## その他の設定ファイルを使う

通常は `articles/config.yml` を使用します。`REVIEW_CONFIG_FILE` に別の設定を指定した場合、その設定ファイル名を基にPDFの接尾辞を決めます。

```sh
REVIEW_CONFIG_FILE=config-example.yml npm run pdf
```

この例では `output/vrc-infra-anthology-example.pdf` が生成されます。`REVIEW_CONFIG_FILE` は `articles/` から見たファイル名です。

## EPUB/Web用CSSを更新する

`articles/` 以下のSCSSを変更した場合は、リポジトリのルートで次を実行します。

```sh
./rebuild-css.sh
```

生成されたCSSも変更内容に含めます。

## Dev Containerを使わない場合

ホストにDockerがある場合は、Re:VIEW 5.9イメージを使う既存スクリプトで印刷用PDFを生成できます。

```sh
./build-in-docker.sh
```

またはDocker Composeを使用します。

```sh
docker compose run --rm review
```

これらはホスト側から実行するコマンドです。Dev Container内では、前述の `npm run` コマンドを直接使用してください。
