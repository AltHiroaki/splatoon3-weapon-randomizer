/**
 * @fileoverview カスタム選出モード用のメインスクリプトファイル。
 * アコーディオンUI、サブ・スペシャル相互連動フィルタ、ランダム選出機能を提供します。
 * * 機能要件:
 * 1. カテゴリごとのブキ選択（アコーディオン形式）
 * 2. サブウェポン選択によるブキ・スペシャルの自動絞り込み
 * 3. スペシャルウェポン選択によるブキ・サブの自動絞り込み
 * 4. 選択されたブキ群からのランダム選出
 */

/* ==========================================================================
   1. 定数・データ定義
   ========================================================================== */

/**
 * ブキカテゴリーとそれに属するブキ名のリスト。
 * アコーディオンメニューの生成に使用されます。
 * @constant
 * @type {Object.<string, string[]>}
 */
const WEAPON_DATA = {
	'シューター': [
		'.52ガロン', '.52ガロンデコ', '.96ガロン', '.96ガロンデコ', '.96ガロン爪',
		'H3リールガン', 'H3リールガンD', 'H3リールガンSNAK', 'L3リールガン', 'L3リールガンD', 'L3リールガン箔',
		'N-ZAP85', 'N-ZAP89', 'シャープマーカー', 'シャープマーカーネオ', 'シャープマーカーGECK',
		'ジェットスイーパー', 'ジェットスイーパーカスタム', 'ジェットスイーパーCOBR',
		'スペースシューター', 'スペースシューターコラボ', 'スプラシューター', 'スプラシューターコラボ', 'スプラシューター煌',
		'ヒーローシューター レプリカ', 'オクタシューター レプリカ', 'オーダーシューター レプリカ',
		'プライムシューター', 'プライムシューターコラボ', 'プライムシューターFRZN',
		'プロモデラーMG', 'プロモデラーRG', 'プロモデラー彩', 'ボールドマーカー', 'ボールドマーカーネオ',
		'ボトルガイザー', 'ボトルガイザーフォイル', 'わかばシューター', 'もみじシューター'
	],
	'ローラー': [
		'ヴァリアブルローラー', 'ヴァリアブルローラーフォイル', 'オーダーローラー レプリカ',
		'カーボンローラー', 'カーボンローラーデコ', 'カーボンローラーANGL', 'スプラローラー', 'スプラローラーコラボ',
		'ダイナモローラー', 'ダイナモローラーテスラ', 'ダイナモローラー冥', 'ワイドローラー', 'ワイドローラーコラボ', 'ワイドローラー惑'
	],
	'チャージャー': [
		'14式竹筒銃・甲', '14式竹筒銃・乙', '4Kスコープ', '4Kスコープカスタム', 'R-PEN／5H', 'R-PEN／5B',
		'オーダーチャージャー レプリカ', 'スクイックリンα', 'スクイックリンβ', 'スプラチャージャー', 'スプラチャージャーコラボ', 'スプラチャージャーFRST',
		'スプラスコープ', 'スプラスコープコラボ', 'スプラスコープFRST', 'ソイチューバー', 'ソイチューバーカスタム', 'リッター4K', 'リッター4Kカスタム'
	],
	'スロッシャー': [
		'エクスプロッシャー', 'エクスプロッシャーカスタム', 'オーダースロッシャー レプリカ', 'オーバーフロッシャー', 'オーバーフロッシャーデコ',
		'スクリュースロッシャー', 'スクリュースロッシャーネオ', 'バケットスロッシャー', 'バケットスロッシャーデコ',
		'ヒッセン', 'ヒッセン・ヒュー', 'ヒッセンASH', 'モップリン', 'モップリンD', 'モップリン角'
	],
	'スピナー': [
		'イグザミナー', 'イグザミナー・ヒュー', 'オーダースピナー レプリカ', 'クーゲルシュライバー', 'クーゲルシュライバー・ヒュー',
		'スプラスピナー', 'スプラスピナーコラボ', 'スプラスピナーPYTN', 'ノーチラス47', 'ノーチラス79',
		'ハイドラント', 'ハイドラントカスタム', 'ハイドラント圧', 'バレルスピナー', 'バレルスピナーデコ'
	],
	'マニューバー': [
		'オーダーマニューバー レプリカ', 'ガエンFF', 'ガエンFFカスタム', 'クアッドホッパーブラック', 'クアッドホッパーホワイト',
		'ケルビン525', 'ケルビン525デコ', 'スパッタリー', 'スパッタリー・ヒュー', 'スパッタリーOWL',
		'スプラマニューバー', 'スプラマニューバーコラボ', 'スプラマニューバー耀', 'デュアルスイーパー', 'デュアルスイーパーカスタム', 'デュアルスイーパー蹄'
	],
	'シェルター': [
		'24式張替傘・甲', '24式張替傘・乙', 'オーダーシェルター レプリカ', 'キャンピングシェルター', 'キャンピングシェルターソレーラ', 'キャンピングシェルターCREM',
		'スパイガジェット', 'スパイガジェットソレーラ', 'スパイガジェット繚', 'パラシェルター', 'パラシェルターソレーラ'
	],
	'ブラスター': [
		'Rブラスターエリート', 'Rブラスターエリートデコ', 'RブラスターエリートWNTR', 'S-BLAST92', 'S-BLAST91', 'オーダーブラスター レプリカ',
		'クラッシュブラスター', 'クラッシュブラスターネオ', 'ノヴァブラスター', 'ノヴァブラスターネオ',
		'ホットブラスター', 'ホットブラスターカスタム', 'ホットブラスター艶', 'ラピッドブラスター', 'ラピッドブラスターデコ', 'ロングブラスター', 'ロングブラスターカスタム'
	],
	'フデ': [
		'オーダーブラシ レプリカ', 'パブロ', 'パブロ・ヒュー', 'フィンセント', 'フィンセント・ヒュー', 'フィンセントBRNZ', 'ホクサイ', 'ホクサイ・ヒュー', 'ホクサイ彗'
	],
	'ストリンガー': [
		'LACT-450', 'LACT-450デコ', 'LACT-450MILK', 'オーダーストリンガー レプリカ', 'トライストリンガー', 'トライストリンガーコラボ', 'トライストリンガー燈',
		'フルイドV', 'フルイドVカスタム'
	],
	'ワイパー': [
		'オーダーワイパー レプリカ', 'ジムワイパー', 'ジムワイパー・ヒュー', 'ジムワイパー封', 'デンタルワイパーミント', 'デンタルワイパースミ',
		'ドライブワイパー', 'ドライブワイパーデコ', 'ドライブワイパーRUST'
	]
};

/**
 * ブキごとの詳細スペック（サブ・スペシャル情報）のリスト。
 * フィルタリング機能で使用されます。
 * @constant
 * @type {Array<{name: string, sub: string, special: string}>}
 */
const WEAPON_SPECS = [
	// --- シューター ---
	{ name: "わかばシューター", sub: "スプラッシュボム", special: "グレートバリア" },
	{ name: "オーダーシューター レプリカ", sub: "キューバンボム", special: "ウルトラショット" },
	{ name: "オクタシューター レプリカ", sub: "スプラッシュボム", special: "トリプルトルネード" },
	{ name: "ヒーローシューター レプリカ", sub: "キューバンボム", special: "ウルトラショット" },
	{ name: "スプラシューター", sub: "キューバンボム", special: "ウルトラショット" },
	{ name: "プロモデラーMG", sub: "タンサンボム", special: "サメライド" },
	{ name: "N-ZAP85", sub: "キューバンボム", special: "エナジースタンド" },
	{ name: "もみじシューター", sub: "トーピード", special: "ホップソナー" },
	{ name: "スペースシューター", sub: "ポイントセンサー", special: "メガホンレーザー5.1ch" },
	{ name: "ボールドマーカー", sub: "カーリングボム", special: "ウルトラハンコ" },
	{ name: "プライムシューター", sub: "ラインマーカー", special: "カニタンク" },
	{ name: "スプラシューターコラボ", sub: "スプラッシュボム", special: "トリプルトルネード" },
	{ name: "N-ZAP89", sub: "ロボットボム", special: "デコイチラシ" },
	{ name: ".52ガロン", sub: "スプラッシュシールド", special: "メガホンレーザー5.1ch" },
	{ name: "スペースシューターコラボ", sub: "トラップ", special: "ジェットパック" },
	{ name: "スプラシューター煌", sub: "クイックボム", special: "テイオウイカ" },
	{ name: "ボールドマーカーネオ", sub: "ジャンプビーコン", special: "メガホンレーザー5.1ch" },
	{ name: "L3リールガン", sub: "カーリングボム", special: "カニタンク" },
	{ name: ".52ガロンデコ", sub: "カーリングボム", special: "スミナガシート" },
	{ name: "ジェットスイーパー", sub: "ラインマーカー", special: "キューインキ" },
	{ name: "シャープマーカー", sub: "クイックボム", special: "カニタンク" },
	{ name: ".96ガロン", sub: "スプリンクラー", special: "キューインキ" },
	{ name: "プロモデラーRG", sub: "スプリンクラー", special: "ナイスダマ" },
	{ name: "L3リールガンD", sub: "クイックボム", special: "ウルトラハンコ" },
	{ name: "プロモデラー彩", sub: "クイックボム", special: "スミナガシート" },
	{ name: "ボトルガイザー", sub: "スプラッシュシールド", special: "ウルトラショット" },
	{ name: "プライムシューターコラボ", sub: "キューバンボム", special: "ナイスダマ" },
	{ name: "L3リールガン箔", sub: "スプラッシュボム", special: "ジェットパック" },
	{ name: "ジェットスイーパーカスタム", sub: "ポイズンミスト", special: "アメフラシ" },
	{ name: "ジェットスイーパーCOBR", sub: "クイックボム", special: "ウルトラチャクチ" },
	{ name: "シャープマーカーネオ", sub: "キューバンボム", special: "トリプルトルネード" },
	{ name: "シャープマーカーGECK", sub: "ポイズンミスト", special: "アメフラシ" },
	{ name: ".96ガロンデコ", sub: "スプラッシュシールド", special: "テイオウイカ" },
	{ name: "プライムシューターFRZN", sub: "スプラッシュボム", special: "マルチミサイル" },
	{ name: "H3リールガン", sub: "ポイントセンサー", special: "エナジースタンド" },
	{ name: ".96ガロン爪", sub: "ラインマーカー", special: "エナジースタンド" },
	{ name: "ボトルガイザーフォイル", sub: "ロボットボム", special: "スミナガシート" },
	{ name: "H3リールガンD", sub: "スプラッシュシールド", special: "グレートバリア" },
	{ name: "H3リールガンSNAK", sub: "キューバンボム", special: "トリプルトルネード" },

	// --- チャージャー ---
	{ name: "オーダーチャージャー レプリカ", sub: "スプラッシュボム", special: "キューインキ" },
	{ name: "スプラチャージャー", sub: "スプラッシュボム", special: "キューインキ" },
	{ name: "スクイックリンα", sub: "ポイントセンサー", special: "グレートバリア" },
	{ name: "スプラチャージャーコラボ", sub: "スプラッシュシールド", special: "トリプルトルネード" },
	{ name: "スプラスコープ", sub: "スプラッシュボム", special: "キューインキ" },
	{ name: "スプラチャージャーFRST", sub: "スプリンクラー", special: "カニタンク" },
	{ name: "スクイックリンβ", sub: "ロボットボム", special: "ショクワンダー" },
	{ name: "R-PEN／5H", sub: "スプリンクラー", special: "エナジースタンド" },
	{ name: "スプラスコープコラボ", sub: "スプラッシュシールド", special: "トリプルトルネード" },
	{ name: "スプラスコープFRST", sub: "スプリンクラー", special: "カニタンク" },
	{ name: "リッター4K", sub: "トラップ", special: "ホップソナー" },
	{ name: "R-PEN／5B", sub: "スプラッシュシールド", special: "アメフラシ" },
	{ name: "リッター4Kカスタム", sub: "ジャンプビーコン", special: "テイオウイカ" },
	{ name: "14式竹筒銃・乙", sub: "タンサンボム", special: "デコイチラシ" },
	{ name: "14式竹筒銃・甲", sub: "ロボットボム", special: "メガホンレーザー5.1ch" },
	{ name: "ソイチューバー", sub: "トーピード", special: "マルチミサイル" },
	{ name: "4Kスコープ", sub: "トラップ", special: "ホップソナー" },
	{ name: "ソイチューバーカスタム", sub: "タンサンボム", special: "ウルトラハンコ" },
	{ name: "4Kスコープカスタム", sub: "ジャンプビーコン", special: "テイオウイカ" },

	// --- ブラスター ---
	{ name: "オーダーブラスター レプリカ", sub: "スプラッシュボム", special: "ショクワンダー" },
	{ name: "ホットブラスター", sub: "ロボットボム", special: "グレートバリア" },
	{ name: "ラピッドブラスター", sub: "トラップ", special: "トリプルトルネード" },
	{ name: "ホットブラスターカスタム", sub: "ポイントセンサー", special: "ウルトラチャクチ" },
	{ name: "ホットブラスター艶", sub: "ジャンプビーコン", special: "カニタンク" },
	{ name: "ラピッドブラスターデコ", sub: "トーピード", special: "ジェットパック" },
	{ name: "ロングブラスター", sub: "キューバンボム", special: "ホップソナー" },
	{ name: "ノヴァブラスター", sub: "スプラッシュボム", special: "ショクワンダー" },
	{ name: "ロングブラスターカスタム", sub: "スプラッシュボム", special: "テイオウイカ" },
	{ name: "S-BLAST92", sub: "スプリンクラー", special: "サメライド" },
	{ name: "クラッシュブラスター", sub: "スプラッシュボム", special: "ウルトラショット" },
	{ name: "ノヴァブラスターネオ", sub: "タンサンボム", special: "ウルトラハンコ" },
	{ name: "クラッシュブラスターネオ", sub: "カーリングボム", special: "デコイチラシ" },
	{ name: "Rブラスターエリート", sub: "ポイズンミスト", special: "キューインキ" },
	{ name: "S-BLAST91", sub: "クイックボム", special: "ナイスダマ" },
	{ name: "Rブラスターエリートデコ", sub: "ラインマーカー", special: "メガホンレーザー5.1ch" },
	{ name: "RブラスターエリートWNTR", sub: "キューバンボム", special: "エナジースタンド" },

	// --- ローラー ---
	{ name: "オーダーローラー レプリカ", sub: "カーリングボム", special: "グレートバリア" },
	{ name: "スプラローラー", sub: "カーリングボム", special: "グレートバリア" },
	{ name: "カーボンローラー", sub: "ロボットボム", special: "ショクワンダー" },
	{ name: "スプラローラーコラボ", sub: "ジャンプビーコン", special: "テイオウイカ" },
	{ name: "ダイナモローラー", sub: "スプリンクラー", special: "エナジースタンド" },
	{ name: "ワイドローラー", sub: "スプラッシュシールド", special: "キューインキ" },
	{ name: "ダイナモローラーテスラ", sub: "スプラッシュボム", special: "デコイチラシ" },
	{ name: "ダイナモローラー冥", sub: "ポイントセンサー", special: "メガホンレーザー5.1ch" },
	{ name: "ワイドローラーコラボ", sub: "ラインマーカー", special: "アメフラシ" },
	{ name: "ヴァリアブルローラー", sub: "トラップ", special: "マルチミサイル" },
	{ name: "ワイドローラー惑", sub: "トーピード", special: "ウルトラチャクチ" },
	{ name: "カーボンローラーデコ", sub: "クイックボム", special: "ウルトラショット" },
	{ name: "カーボンローラーANGL", sub: "タンサンボム", special: "デコイチラシ" },
	{ name: "ヴァリアブルローラーフォイル", sub: "キューバンボム", special: "スミナガシート" },

	// --- フデ ---
	{ name: "オーダーブラシ レプリカ", sub: "キューバンボム", special: "ショクワンダー" },
	{ name: "ホクサイ", sub: "キューバンボム", special: "ショクワンダー" },
	{ name: "パブロ", sub: "スプラッシュボム", special: "メガホンレーザー5.1ch" },
	{ name: "ホクサイ・ヒュー", sub: "ジャンプビーコン", special: "アメフラシ" },
	{ name: "ホクサイ彗", sub: "ロボットボム", special: "テイオウイカ" },
	{ name: "フィンセント", sub: "カーリングボム", special: "ホップソナー" },
	{ name: "パブロ・ヒュー", sub: "トラップ", special: "ウルトラハンコ" },
	{ name: "フィンセント・ヒュー", sub: "ポイントセンサー", special: "マルチミサイル" },
	{ name: "フィンセントBRNZ", sub: "スプラッシュシールド", special: "ウルトラショット" },

	// --- スロッシャー ---
	{ name: "オーダースロッシャー レプリカ", sub: "スプラッシュボム", special: "トリプルトルネード" },
	{ name: "バケットスロッシャー", sub: "スプラッシュボム", special: "トリプルトルネード" },
	{ name: "ヒッセン", sub: "ポイズンミスト", special: "ジェットパック" },
	{ name: "バケットスロッシャーデコ", sub: "ラインマーカー", special: "ショクワンダー" },
	{ name: "スクリュースロッシャー", sub: "タンサンボム", special: "ナイスダマ" },
	{ name: "モップリン", sub: "キューバンボム", special: "サメライド" },
	{ name: "ヒッセン・ヒュー", sub: "タンサンボム", special: "エナジースタンド" },
	{ name: "モップリンD", sub: "ジャンプビーコン", special: "ホップソナー" },
	{ name: "ヒッセンASH", sub: "スプラッシュボム", special: "スミナガシート" },
	{ name: "オーバーフロッシャー", sub: "スプリンクラー", special: "アメフラシ" },
	{ name: "モップリン角", sub: "カーリングボム", special: "カニタンク" },
	{ name: "スクリュースロッシャーネオ", sub: "ポイントセンサー", special: "ウルトラショット" },
	{ name: "オーバーフロッシャーデコ", sub: "ラインマーカー", special: "テイオウイカ" },
	{ name: "エクスプロッシャー", sub: "ポイントセンサー", special: "アメフラシ" },
	{ name: "エクスプロッシャーカスタム", sub: "スプラッシュシールド", special: "ウルトラチャクチ" },

	// --- スピナー ---
	{ name: "オーダースピナー レプリカ", sub: "スプリンクラー", special: "ホップソナー" },
	{ name: "バレルスピナー", sub: "スプリンクラー", special: "ホップソナー" },
	{ name: "スプラスピナー", sub: "クイックボム", special: "ウルトラハンコ" },
	{ name: "イグザミナー", sub: "カーリングボム", special: "エナジースタンド" },
	{ name: "バレルスピナーデコ", sub: "ポイントセンサー", special: "テイオウイカ" },
	{ name: "イグザミナー・ヒュー", sub: "スプラッシュボム", special: "カニタンク" },
	{ name: "ハイドラント", sub: "ロボットボム", special: "ナイスダマ" },
	{ name: "ハイドラントカスタム", sub: "トラップ", special: "スミナガシート" },
	{ name: "スプラスピナーコラボ", sub: "ポイズンミスト", special: "グレートバリア" },
	{ name: "ハイドラント圧", sub: "スプリンクラー", special: "グレートバリア" },
	{ name: "スプラスピナーPYTN", sub: "ジャンプビーコン", special: "ウルトラショット" },
	{ name: "ノーチラス79", sub: "キューバンボム", special: "ウルトラチャクチ" },
	{ name: "ノーチラス47", sub: "ポイントセンサー", special: "アメフラシ" },
	{ name: "クーゲルシュライバー・ヒュー", sub: "トラップ", special: "キューインキ" },
	{ name: "クーゲルシュライバー", sub: "タンサンボム", special: "ジェットパック" },

	// --- マニューバー ---
	{ name: "オーダーマニューバー レプリカ", sub: "キューバンボム", special: "カニタンク" },
	{ name: "スプラマニューバー", sub: "キューバンボム", special: "カニタンク" },
	{ name: "デュアルスイーパー", sub: "スプラッシュボム", special: "ホップソナー" },
	{ name: "スプラマニューバーコラボ", sub: "カーリングボム", special: "ウルトラチャクチ" },
	{ name: "スパッタリー", sub: "ジャンプビーコン", special: "エナジースタンド" },
	{ name: "スプラマニューバー耀", sub: "タンサンボム", special: "グレートバリア" },
	{ name: "デュアルスイーパーカスタム", sub: "ジャンプビーコン", special: "デコイチラシ" },
	{ name: "クアッドホッパーブラック", sub: "ロボットボム", special: "サメライド" },
	{ name: "デュアルスイーパー蹄", sub: "ポイントセンサー", special: "スミナガシート" },
	{ name: "ケルビン525", sub: "スプラッシュシールド", special: "ナイスダマ" },
	{ name: "ガエンFF", sub: "トラップ", special: "メガホンレーザー5.1ch" },
	{ name: "クアッドホッパーホワイト", sub: "スプリンクラー", special: "ショクワンダー" },
	{ name: "スパッタリー・ヒュー", sub: "トーピード", special: "サメライド" },
	{ name: "ケルビン525デコ", sub: "ポイントセンサー", special: "ウルトラショット" },
	{ name: "ガエンFFカスタム", sub: "クイックボム", special: "トリプルトルネード" },
	{ name: "スパッタリーOWL", sub: "スプラッシュボム", special: "メガホンレーザー5.1ch" },

	// --- シェルター ---
	{ name: "オーダーシェルター レプリカ", sub: "スプリンクラー", special: "トリプルトルネード" },
	{ name: "パラシェルター", sub: "スプリンクラー", special: "トリプルトルネード" },
	{ name: "24式張替傘・甲", sub: "ラインマーカー", special: "グレートバリア" },
	{ name: "キャンピングシェルター", sub: "ジャンプビーコン", special: "キューインキ" },
	{ name: "スパイガジェット", sub: "トラップ", special: "サメライド" },
	{ name: "パラシェルターソレーラ", sub: "ロボットボム", special: "ジェットパック" },
	{ name: "24式張替傘・乙", sub: "ポイズンミスト", special: "ウルトラチャクチ" },
	{ name: "キャンピングシェルターソレーラ", sub: "トラップ", special: "ウルトラショット" },
	{ name: "スパイガジェットソレーラ", sub: "トーピード", special: "スミナガシート" },
	{ name: "キャンピングシェルターCREM", sub: "ポイズンミスト", special: "デコイチラシ" },
	{ name: "スパイガジェット繚", sub: "カーリングボム", special: "メガホンレーザー5.1ch" },

	// --- ワイパー ---
	{ name: "オーダーワイパー レプリカ", sub: "クイックボム", special: "ショクワンダー" },
	{ name: "ドライブワイパー", sub: "トーピード", special: "ウルトラハンコ" },
	{ name: "ドライブワイパーデコ", sub: "ジャンプビーコン", special: "マルチミサイル" },
	{ name: "ドライブワイパーRUST", sub: "カーリングボム", special: "ウルトラショット" },
	{ name: "ジムワイパー", sub: "クイックボム", special: "ショクワンダー" },
	{ name: "ジムワイパー・ヒュー", sub: "ポイズンミスト", special: "カニタンク" },
	{ name: "デンタルワイパーミント", sub: "キューバンボム", special: "グレートバリア" },
	{ name: "ジムワイパー封", sub: "ロボットボム", special: "ナイスダマ" },
	{ name: "デンタルワイパースミ", sub: "スプラッシュシールド", special: "ジェットパック" },

	// --- ストリンガー ---
	{ name: "オーダーストリンガー レプリカ", sub: "ポイズンミスト", special: "メガホンレーザー5.1ch" },
	{ name: "トライストリンガー", sub: "ポイズンミスト", special: "メガホンレーザー5.1ch" },
	{ name: "LACT-450", sub: "カーリングボム", special: "マルチミサイル" },
	{ name: "トライストリンガーコラボ", sub: "スプリンクラー", special: "デコイチラシ" },
	{ name: "LACT-450デコ", sub: "スプラッシュシールド", special: "サメライド" },
	{ name: "トライストリンガー燈", sub: "ラインマーカー", special: "ジェットパック" },
	{ name: "LACT-450MILK", sub: "トーピード", special: "ナイスダマ" },
	{ name: "フルイドV", sub: "ロボットボム", special: "ウルトラハンコ" },
	{ name: "フルイドVカスタム", sub: "ポイントセンサー", special: "ホップソナー" }
];

/**
 * DOM要素のIDを管理する定数オブジェクト。
 * HTMLのID変更時にこのオブジェクトのみを修正すれば済むようにしています。
 * @constant
 * @type {Object.<string, string>}
 */
const DOM_ID = {
	CATEGORY_DISPLAY: 'result-category',
	WEAPON_DISPLAY: 'result-weapon',
	ACCORDION_CONTAINER: 'accordion-container',
	ROLL_BUTTON: 'roll-button',
	SUB_FILTER_CONTAINER: 'sub-filter-container',
	SPECIAL_DISPLAY_CONTAINER: 'special-display-container'
};

/**
 * 現在選択されているブキ名を保持するSetオブジェクト。
 * 重複を許さず、効率的な追加・削除・検索を提供します。
 * @type {Set<string>}
 */
const selectedWeapons = new Set();


/* ==========================================================================
   2. ヘルパー関数 (Utility Functions)
   ========================================================================== */

/**
 * WEAPON_SPECSから重複を除いたサブウェポン名のリストを作成して返します。
 * @returns {string[]} ソート済みのサブウェポン名配列
 */
function getUniqueSubs() {
	const subs = new Set(WEAPON_SPECS.map(w => w.sub));
	return Array.from(subs).sort();
}

/**
 * WEAPON_SPECSから重複を除いたスペシャルウェポン名のリストを作成して返します。
 * @returns {string[]} ソート済みのスペシャルウェポン名配列
 */
function getUniqueSpecials() {
	const specials = new Set(WEAPON_SPECS.map(w => w.special));
	return Array.from(specials).sort();
}

/**
 * 指定された配列からランダムな要素を1つ取得して返します。
 * @param {Array} array - 選択元の配列
 * @returns {*} ランダムに選ばれた要素
 */
function getRandomItem(array) {
	const index = Math.floor(Math.random() * array.length);
	return array[index];
}


/* ==========================================================================
   3. UI更新・イベントハンドラ (UI Updates & Event Handlers)
   ========================================================================== */

/**
 * 選出結果を画面に表示します。
 * ブキ画像の読み込みと、エラー時のフォールバック処理も行います。
 * @param {string} category - 表示するブキのカテゴリ名
 * @param {string} weapon - 表示するブキ名
 */
function displayResult(category, weapon) {
	const categoryEl = document.getElementById(DOM_ID.CATEGORY_DISPLAY);
	const weaponEl = document.getElementById(DOM_ID.WEAPON_DISPLAY);
	const imageEl = document.getElementById('weapon-image');

	if (categoryEl) categoryEl.textContent = category;
	if (weaponEl) weaponEl.textContent = weapon;

	if (imageEl) {
		imageEl.style.display = 'inline-block';
		// ファイル名の生成（先頭のドット除去など）
		let filename = weapon;
		if (filename.startsWith('.')) {
			filename = filename.substring(1);
		}

		// 画像読み込みエラー時の処理
		imageEl.onerror = function () {
			if (this.src.endsWith('.png')) {
				// pngで見つからなければwebpを試す
				this.src = 'images/' + filename + '.webp';
			} else {
				// どちらもなければ非表示
				this.style.display = 'none';
				console.log('画像が見つかりませんでした: ' + weapon);
			}
		};
		// 初期はpngを試行
		imageEl.src = 'images/' + filename + '.png';
	}
}

/**
 * アコーディオン内の全てのブキボタンとカテゴリヘッダーの選択状態（見た目）を
 * 現在の `selectedWeapons` の状態に合わせて更新します。
 */
function updateAllButtonVisuals() {
	// 1. 個別のブキボタンの更新
	document.querySelectorAll('.weapon-toggle').forEach(btn => {
		if (selectedWeapons.has(btn.textContent)) {
			btn.classList.add('selected');
		} else {
			btn.classList.remove('selected');
		}
	});

	// 2. カテゴリヘッダーの更新
	// カテゴリ内のブキが1つでも選択されていればヘッダーをアクティブにする
	const headers = document.querySelectorAll('.accordion-header');
	headers.forEach(header => {
		const catSpan = header.querySelector('span');
		if (catSpan) {
			const category = catSpan.textContent;
			if (WEAPON_DATA[category]) {
				const weaponList = WEAPON_DATA[category];
				const count = weaponList.filter(w => selectedWeapons.has(w)).length;
				if (count > 0) {
					header.classList.add('active-category');
				} else {
					header.classList.remove('active-category');
				}
			}
		}
	});
}


/**
 * サブウェポン選択時のイベントハンドラ（直感的なトグル操作版）。
 * ・現在そのサブが「アクティブ（色付き）」なら → 選択中のブキからそのサブを持つものを【除外】。
 * ・現在そのサブが「非アクティブ（灰色）」なら → そのサブを持つブキを全て【追加】。
 * @param {string} selectedSub - 選択されたサブウェポン名
 */
function onSubSelect(selectedSub) {
	// 1. 「現在、このサブボタンはアクティブ（色付き）か？」を判定
	// 選択済みのブキの中に、このサブを持つものが1つでもあればアクティブとみなす
	let isCurrentlyActive = false;
	for (const weaponName of selectedWeapons) {
		const spec = WEAPON_SPECS.find(w => w.name === weaponName);
		if (spec && spec.sub === selectedSub) {
			isCurrentlyActive = true;
			break;
		}
	}

	if (isCurrentlyActive) {
		// 削除モード
		// 「選択済みのブキ」の中から、「このサブを持つもの」だけを消す
		// （他のスペシャルで選ばれた、別のサブを持つブキは残す）
		const toRemove = [];
		selectedWeapons.forEach(name => {
			const spec = WEAPON_SPECS.find(w => w.name === name);
			if (spec && spec.sub === selectedSub) {
				toRemove.push(name);
			}
		});
		toRemove.forEach(name => selectedWeapons.delete(name));
	} else {
		// 追加モード
		// WEAPON_SPECS全体から、「このサブを持つもの」を全て追加する
		WEAPON_SPECS.filter(w => w.sub === selectedSub).forEach(w => {
			selectedWeapons.add(w.name);
		});
	}

	// 画面の更新
	updateFilterVisuals();
	updateAllButtonVisuals();
}

/**
 * スペシャルウェポン選択時のイベントハンドラ（直感的なトグル操作版）。
 * ・現在そのスペシャルが「アクティブ（色付き）」なら → 選択中のブキからそのスペシャルを持つものを【除外】。
 * ・現在そのスペシャルが「非アクティブ（灰色）」なら → そのスペシャルを持つブキを全て【追加】。
 * @param {string} selectedSpecial - 選択されたスペシャルウェポン名
 */
function onSpecialSelect(selectedSpecial) {
	// 1. 「現在、このスペシャルボタンはアクティブ（色付き）か？」を判定
	let isCurrentlyActive = false;
	for (const weaponName of selectedWeapons) {
		const spec = WEAPON_SPECS.find(w => w.name === weaponName);
		if (spec && spec.special === selectedSpecial) {
			isCurrentlyActive = true;
			break;
		}
	}

	if (isCurrentlyActive) {
		// 削除モード
		// 「選択済みのブキ」の中から、「このスペシャルを持つもの」だけを消す
		const toRemove = [];
		selectedWeapons.forEach(name => {
			const spec = WEAPON_SPECS.find(w => w.name === name);
			if (spec && spec.special === selectedSpecial) {
				toRemove.push(name);
			}
		});
		toRemove.forEach(name => selectedWeapons.delete(name));
	} else {
		// 追加モード
		// WEAPON_SPECS全体から、「このスペシャルを持つもの」を全て追加する
		WEAPON_SPECS.filter(w => w.special === selectedSpecial).forEach(w => {
			selectedWeapons.add(w.name);
		});
	}

	// 画面の更新
	updateFilterVisuals();
	updateAllButtonVisuals();
}

/**
 * フィルタボタン（サブ・スペシャル）の見た目を現在の選択状態に合わせて更新する関数
 */
function updateFilterVisuals() {
	const activeSubs = new Set();
	const activeSpecials = new Set();

	WEAPON_SPECS.forEach(w => {
		if (selectedWeapons.has(w.name)) {
			activeSubs.add(w.sub);
			activeSpecials.add(w.special);
		}
	});

	document.querySelectorAll('.filter-btn').forEach(btn => {
		if (activeSubs.has(btn.dataset.sub)) {
			btn.classList.add('active');
		} else {
			btn.classList.remove('active');
		}
	});

	document.querySelectorAll('.special-tag').forEach(tag => {
		if (activeSpecials.has(tag.dataset.special)) {
			tag.classList.add('active');
		} else {
			tag.classList.remove('active');
		}
	});
}

/**
 * 絞り込みリセットボタンクリック時の処理。
 * 全ての選択状態をクリアし、初期状態に戻します。
 */
function resetSubFilter() {
	selectedWeapons.clear();

	// UIリセット
	document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
	document.querySelectorAll('.special-tag').forEach(t => t.classList.remove('active'));
	updateAllButtonVisuals();
}

/**
 * 「選出する」ボタンクリック時のイベントハンドラ。
 * 選択されたブキの中からランダムに1つ選び、結果を表示します。
 */
function onRollButtonClick() {
	if (selectedWeapons.size === 0) {
		alert('ブキがひとつも選択されていません！\nサブ/スペシャルを選ぶか、リストからブキを選択してください。');
		return;
	}

	// Setを配列に変換してランダム選出
	const targetWeapons = Array.from(selectedWeapons);
	const selectedWeapon = getRandomItem(targetWeapons);

	// 選ばれたブキのカテゴリを特定（表示用）
	let foundCategory = "カスタム選択";
	for (const [cat, list] of Object.entries(WEAPON_DATA)) {
		if (list.includes(selectedWeapon)) {
			foundCategory = cat;
			break;
		}
	}

	displayResult(foundCategory, selectedWeapon);
}


/* ==========================================================================
   4. 初期化関数 (Initialization)
   ========================================================================== */

/**
 * サブ・スペシャルフィルタUI（画面上部のパネル）を初期化・生成します。
 */
function initFilterUI() {
	const subContainer = document.getElementById(DOM_ID.SUB_FILTER_CONTAINER);
	const spContainer = document.getElementById(DOM_ID.SPECIAL_DISPLAY_CONTAINER);

	if (!subContainer || !spContainer) return;

	// サブボタンの生成
	const uniqueSubs = getUniqueSubs();
	uniqueSubs.forEach(sub => {
		const btn = document.createElement('div');
		btn.className = 'filter-btn';
		btn.textContent = sub;
		btn.dataset.sub = sub;
		btn.onclick = () => onSubSelect(sub);
		subContainer.appendChild(btn);
	});

	// スペシャルボタンの生成
	const uniqueSpecials = getUniqueSpecials();
	uniqueSpecials.forEach(sp => {
		const tag = document.createElement('div');
		tag.className = 'special-tag';
		tag.textContent = sp;
		tag.dataset.special = sp;
		tag.onclick = () => onSpecialSelect(sp);
		spContainer.appendChild(tag);
	});
}

/**
 * アコーディオンUI（画面下部のカテゴリ別リスト）を初期化・生成します。
 */
function initAccordionUI() {
	const container = document.getElementById(DOM_ID.ACCORDION_CONTAINER);
	if (!container) return;

	for (const category in WEAPON_DATA) {
		const item = document.createElement('div');
		item.className = 'accordion-item';

		// ヘッダー部分
		const header = document.createElement('div');
		header.className = 'accordion-header';
		header.innerHTML = `<span>${category}</span>`;

		// 「全選択/解除」ボタン
		const selectAllBtn = document.createElement('button');
		selectAllBtn.className = 'category-select-btn';
		selectAllBtn.textContent = '全選択/解除';

		selectAllBtn.addEventListener('click', (e) => {
			e.stopPropagation(); // アコーディオン開閉を防止
			const weaponList = WEAPON_DATA[category];
			const allSelected = weaponList.every(w => selectedWeapons.has(w));

			if (allSelected) {
				// すでに全選択済みなら全て解除
				weaponList.forEach(w => selectedWeapons.delete(w));
			} else {
				// そうでなければ全て選択
				weaponList.forEach(w => selectedWeapons.add(w));
			}
			updateAllButtonVisuals();
		});

		header.appendChild(selectAllBtn);

		// コンテンツ（ブキボタンリスト）部分
		const content = document.createElement('div');
		content.className = 'accordion-content';

		// ヘッダークリックで開閉
		header.addEventListener('click', () => {
			content.classList.toggle('open');
		});

		// 各ブキボタンの生成
		WEAPON_DATA[category].forEach(weapon => {
			const weaponBtn = document.createElement('button');
			weaponBtn.className = 'weapon-toggle';
			weaponBtn.textContent = weapon;
			weaponBtn.addEventListener('click', () => {
				// 選択状態のトグル
				if (selectedWeapons.has(weapon)) {
					selectedWeapons.delete(weapon);
				} else {
					selectedWeapons.add(weapon);
				}
				updateAllButtonVisuals();
			});
			content.appendChild(weaponBtn);
		});

		item.appendChild(header);
		item.appendChild(content);
		container.appendChild(item);
	}
}

/**
 * アプリケーションの初期化処理を実行します。
 * DOMContentLoadedイベント後に呼び出されます。
 */
function init() {
	initFilterUI();
	initAccordionUI();

	const rollBtn = document.getElementById(DOM_ID.ROLL_BUTTON);
	if (rollBtn) {
		rollBtn.addEventListener('click', onRollButtonClick);
	}
}

// ページの読み込み完了時に初期化を実行
document.addEventListener('DOMContentLoaded', init);