# ビルドと成果物

この文書は、このリポジトリをDev Container内でビルドするための手順です。

## 前提環境

Dev Containerは `vvakame/review:5.9` を使用し、Re:VIEW 5.9とPDF生成に必要なTeX環境を含みます。Node.jsとnpmの要件は `package.json` を参照してください。現在の要件はNode.js 20以上、npm 10.8以上です。

Dev Containerを作成すると `npm ci` が自動実行されます。Gemが不足している場合や、依存定義を更新した場合は、リポジトリのルートで次を実行します。

```sh
bundle install
npm ci
```

## PDF

```sh
npm run pdf
```

`articles/vrc-infra-anthology.pdf` が生成されます。

## EPUB

```sh
npm run epub
```

`articles/vrc-infra-anthology.epub` が生成されます。

## PDFとEPUBを両方残す

`npm run pdf` と `npm run epub` は、実行前のクリーンタスクで既存のPDFとEPUBをどちらも削除します。両方を同時に残す場合は、PDFの生成後、クリーンタスクを通さずEPUBを生成します。

```sh
npm run pdf
(cd articles && bundle exec rake epub)
```

この手順はDev Container内で実行し、PDFとEPUBの生成、およびEPUBのZIP整合性を確認しています。

## その他の出力

```sh
npm run web   # articles/webroot/
npm run text  # articles/*.txt
npm run html  # articles/*.html
```

利用可能なコマンドの一覧と実体は `package.json` と `Gruntfile.js` を参照してください。

## 設定ファイルを切り替える

通常は `articles/config.yml` を使用します。別の設定を使う場合は `REVIEW_CONFIG_FILE` を指定します。

```sh
REVIEW_CONFIG_FILE=config-ebook.yml npm run pdf
```

`REVIEW_CONFIG_FILE` は `articles/` から見たファイル名です。

## EPUB/Web用CSSを更新する

`articles/` 以下のSCSSを変更した場合は、リポジトリのルートで次を実行します。

```sh
./rebuild-css.sh
```

生成されたCSSも変更内容に含めます。

## Dev Containerを使わない場合

ホストにDockerがある場合は、Re:VIEW 5.9イメージを使う既存スクリプトでPDFを生成できます。

```sh
./build-in-docker.sh
```

またはDocker Composeを使用します。

```sh
docker compose run --rm review
```

これらはホスト側から実行するコマンドです。Dev Container内では、前述の `npm run` コマンドを直接使用してください。
