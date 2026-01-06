# デザインツールを使用したコーディング

## このファイルの目的

- 先生の添削時に内容を伝えやすくするため
- 自分自身の振り返り・備忘録として
- マークダウン記法の練習として

## 課題サイトについて

- サガマリアージュ  
  https://sagamariage.jp/
- 課題提出用 GitHub  
  https://github.com/Narui-Tomoka/design3
- デザインデータ URL
  https://www.figma.com/design/6D57lgMk348hF3dq5yrQ72/%E3%82%B5%E3%82%AC%E3%83%9E%E3%83%AA%E3%82%A2%E3%83%BC%E3%82%B8%E3%83%A5?node-id=0-1&t=ey9w0oovpIVF3lRY-1

## 使用技術

### 言語・ライブラリ

- HTML
- CSS（SCSS）
- JavaScript
- jQuery（CDN 利用）
- jQuery inview プラグイン（CDN 利用）
- Vanilla JS Swiper プラグイン（CDN 利用）

### 開発環境・ツール

- Vite
- Autoprefixer（VS Code 拡張機能）
- markdownlint（VS Code 拡張機能／Markdown プレビュー用）

## お手本サイトとの相違点

- 画像差し替え  
  （スライドショー実装のため https://placehold.jp/ ではなく、スマホで撮影した画像を使用）
- section「concept」の L 字型背景画像は「写真 AC」の素材を使用  
  https://www.photo-ac.com/
- fv に重なる「SAGAMARIAGE」の文字  
  → お手本は一文字ずつ画像だが、今回はテキストで実装
- フッター最下部「佐賀の食と器の～」  
  → お手本はテキストだが、今回は画像で実装

## 備忘録

### 1. SCSS について

#### 共通スタイルはまとめて管理する

クラスごとにすべてのスタイルを個別管理するのではなく、

- 共通スタイルは一か所にまとめる
- 必要に応じてネスト内で上書き・追加する

ことで、クラス名が増えすぎず効率よく記述できると感じた。

【例】

.en {  
 font-family: "Marcellus", serif;  
 font-weight: 400;  
 font-style: normal;  
 color: #000;  
 letter-spacing: 0.05em;  
}

.ps-area {  
 （省略）  
 & h2.en {  
 display: block;  
 margin-left: 7.2rem;  
 letter-spacing: 0.05em;  
 font-size: 4rem;  
 margin-bottom: 4.8rem;  
 text-transform: uppercase;  
 }  
}

#### 詳細度（Specificity）に留意した CSS 設計

共通スタイルの管理は重要だが、  
セレクタを多用しすぎると詳細度が高くなり、

- スタイル変更が困難になる
- 他の人が触れないコードになる

という問題が起きる。

→ **必要以上に詳細度を上げないことが重要**  
（今回の課題で実感）

共通クラスを使いつつ、  
「ここだけ特別に変えたい」場合のみ詳細度を上げるよう意識した。

#### hover やメディアクエリは mixin で管理

hover 処理やメディアクエリも mixin 化することで、

- 記述がシンプルになる
- hover アニメーションの調整がしやすい
- ブレイクポイント変更時の修正が最小限で済む

と感じた。

【例】

@mixin hover {  
 @media (hover: hover) {  
 &:hover {  
 @content;  
 }  
 }  
}

呼び出し時：

.hamburger {  
 （省略）  
 @include mix.hover {  
 .hamburger**border:nth-child(2),  
 .hamburger**border:nth-child(3) {  
 height: 100%;  
 }  
 }  
}

### 2. JavaScript について

#### JS からスタイルを書き換えたほうが良いケース

footer のアコーディオンメニュー（「Project」「Story」）では、  
scrollHeight で要素の高さを取得し、max-height に指定して制御している。

CSS のみでは高さ取得ができないため、

- バグが起きやすい
- メニュー増減のたびに修正が必要

といった問題があり、  
このケースでは JavaScript で制御するほうが適していると感じた。

### 3. 今回の課題で新しく知ったこと

#### :hover と @media (hover: hover) の違い

- :hover  
  → スマホのタップでも反応する
- @media (hover: hover)  
  → ホバー操作が可能なデバイス（主に PC）のみ対象で、動作が安定する

#### :root セレクタ（SCSS / CSS）

HTML 文書のルート要素を指すセレクタで、  
CSS 変数（カスタムプロパティ）を定義するために使用する。

サイト全体で再利用でき、  
色やサイズなどのグローバル管理が可能になる。

##### :root の使い方

- 変数定義  
  --variable-name: value;
- 利用方法  
  var(--variable-name) でどのセレクタからでも参照可能
- 詳細度  
  html より詳細度が高く、上書きもしやすい

##### 今回のサイトでの使用例

画面左側の margin（ハンバーガーメニュー領域）を  
:root 内で変数として管理。

→ メディアクエリごとに書かずに済んだ。

##### SCSS 変数（$）との違い

- SCSS 変数  
  → コンパイル時に確定し、CSS 出力後は消える
- CSS 変数（:root）  
  → 実行時も保持され、JavaScript やメディアクエリと連携しやすい

## 使用した JavaScript ライブラリ

### jQuery プラグイン「inview」

画面内に要素が入ったタイミングでの処理を  
手軽に実装できるプラグイン。

Intersection Observer より簡単に扱えると感じた。

## Vite を使用した実機確認方法

### 開発中の画面を確認する

#### ① dev サーバーを --host 付きで起動

npm run dev -- --host  
または  
npx vite --host

#### ② ターミナル表示を確認

Local: http://localhost:5173/  
Network: http://192.168.1.10:5173/（例）

#### ③ PC とスマホを同じ Wi-Fi に接続

#### ④ スマホでアクセス

② の Network の URL にアクセスする。

PC 側で保存するとスマホも即リロード（HMR）されるため、  
レスポンシブ確認に適している。

### ビルド後の dist を確認する

#### ① ビルド

npm run build

#### ② ローカルサーバーで配信

##### 方法 A：Vite preview

npm run preview -- --host

Network: http://192.168.1.10:4173/（例）

### うまくいかない場合

- Vite の設定
- ファイアウォールによるブロック
- VPN・セキュリティソフトの影響
