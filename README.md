# デザインツールを使用したコーディング

## このファイルの目的

- 先生の添削時に、少しでも内容を伝えやすくするため
- 自分自身の振り返り・備忘録として
- マークダウン記法の練習として

## 使用言語

- HTML
- CSS（scss）
- JavaScript
- jQuery（CDN 利用）
- jQuery inview プラグイン（CDN 利用）
- Vanilla JS Swiper プラグイン（CDN 利用）

## 開発環境

- Vite

## マークダウン記法プレビュー方法

- markdownlint（VS Code 拡張機能）

## お手本のサイトとの相違点

- 画像の差し替え（スライドショー実装があるため https://placehold.jp/ ではなくスマホで撮影した画像を使用）
- section concept の L 字型の背景画像は「写真 AC」（ https://www.photo-ac.com/https://www.photo-ac.com/ ）の素材を使用
- fv に重なる「SAGAMARIAGE」の文字は一文字ずつの画像になっていますが、今回はテキストで実装
- フッター一番下の「佐賀の食と器の～」の部分はテキストですが、今回は画像で実装

## 今回の課題で気づいたこと

### ① SCSS について

#### 共通スタイルはまとめて管理する

クラスごとにすべてのスタイルを個別に用意するのではなく、

- 共通するスタイルは一か所にまとめる
- 必要に応じてネストした箇所で上書きや要素固有のスタイルを追加する
  → こうすることでクラス名が増えすぎず、効率よく記述できると感じた。

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

#### 詳細度に留意して CSS 設計する

上記 **共通スタイルはまとめて管理する** ことは必要だが、セレクタを多用しすぎると
**詳細度が高くなりすぎて簡単にスタイル変更が出来ず、誰にも手を付けられない状態** になる。

→**必要以上に詳細度を上げない！！**  
（今回の課題で懲りた）

**詳細度の指定は強力なので、共通クラスを使用しても「ここだけ違うスタイルを当てたい」という特別なケースだけで使うこと。**

#### hover やメディアクエリも mixin でまとめられる

メディアクエリだけでなく hover 処理も mixin 化することで、

- シンプルでわかりやすい
- hover アニメーションの追加・修正がしやすい
- ブレイクポイント変更時も mixin 側を修正するだけで済む

といったメリットがあり、拡張性が高いと感じた。

【例】

@mixin hover {  
 @media (hover: hover) {  
 &:hover {  
 @content;  
 }  
 }  
}

↓ 呼び出し時

.hamburger {  
 （省略）  
 @include mix.hover {  
 .hamburger**border:nth-child(2),  
 .hamburger**border:nth-child(3) {  
 height: 100%;  
 }  
 }  
}

### ② JavaScript について

#### JS からスタイルを書き換えたほうが良いケース

footer のアコーディオンメニュー部分「Project」「Story」では、
scrollHeight を使用して要素の高さを取得し、その値を max-height に指定して制御している。

CSS だけでは要素の高さを取得できないため、

- バグが起きやすい
- メニューの追加・削除時に毎回修正が必要になる

といった問題があり、
このようなケースでは JavaScript からスタイルを書き換えるほうがメリットが多い と感じた。

## 今回の課題で新しく知ったこと

### :hover と@media(hover: hover)の違い

### jQuery プラグイン「inview」

inview プラグインで手軽に画面に入った時の動作を実装できる。
JavaScript の Intersection Observer より簡単に利用できる。

### scss の:root セレクタ

HTML 文書のルート要素（）を指す特別なセレクタで、CSS 変数（カスタムプロパティ）を定義する場所として使われる。

ここに定義した変数は、ウェブサイト全体で再利用可能になり、色やフォントサイズなどのグローバルな設定を一元管理でき、メンテナンス性が大幅に向上する。

#### :root の役割と使い方

- グローバル変数の定義: --variable-name: value; の形式で変数を宣言する。 例: --main-color: #333;
- 文書全体への適用: :root{ ... ブロック内で定義された変数は、CSS のどのセレクタからでも var(--variable-name) のようにして利用できる。
- 詳細度（Specificity）: :root は html よりも詳細度が高いため、グローバルな値を設定しつつ、特定の箇所で上書きすることも容易にできる。

#### 今回のサイトでの使用例

画面左側の margin（ハンバーガーメニューが入る場所）が画面幅によって変化するところを:root 内で変数として宣言して活用している。  
→ メディアクエリでわざわざ書かなくてよくなる。

#### SCSS 変数（$）との違い

SCSS 独自の変数（$variable）と :root で定義する CSS 変数には、大きな違いがある。

- SCSS 変数 ($color: #000): コンパイル時に値が確定し、CSS ファイル出力後は消える。
- CSS 変数 (--color: #000): ブラウザ上で実行時に値を保持する。そのため、JavaScript から動的に値を変更したり、メディアクエリによる値の切り替えが容易。
