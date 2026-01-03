/**
 * @fileoverview かんたん選出モード用のJavaScriptファイル。
 * ラジオボタンによるブキ種選択と、ランダム選出機能を提供します。
 */

// ==========================================
// 定数・データ定義
// ==========================================

/**
 * ブキカテゴリーとブキ一覧のデータオブジェクト。
 * キーがカテゴリ名、値がブキ名の配列。
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
 * DOM要素のID定数
 * @type {Object.<string, string>}
 */
const DOM_ID = {
	CATEGORY_DISPLAY: 'result-category',
	WEAPON_DISPLAY: 'result-weapon',
	RADIO_CONTAINER: 'radio-container',
	ROLL_BUTTON: 'roll-button'
};

/**
 * 「すべて」を選択したときの特別な識別キー
 * @type {string}
 */
const ALL_KEY = 'ALL';

// ==========================================
// 関数定義
// ==========================================

/**
 * 指定された配列からランダムな要素を1つ返す。
 * @param {string[]} array - 選択元の配列
 * @returns {string} ランダムに選ばれた要素
 */
function getRandomItem(array) {
	const index = Math.floor(Math.random() * array.length);
	return array[index];
}

/**
 * 選出結果を画面に表示する。画像の読み込み処理も含む。
 * @param {string} category - カテゴリ名
 * @param {string} weapon - ブキ名
 */
function displayResult(category, weapon) {
	const categoryEl = document.getElementById(DOM_ID.CATEGORY_DISPLAY);
	const weaponEl = document.getElementById(DOM_ID.WEAPON_DISPLAY);
	const imageEl = document.getElementById('weapon-image');

	if (categoryEl) categoryEl.textContent = category;
	if (weaponEl) weaponEl.textContent = weapon;

	if (imageEl) {
		imageEl.style.display = 'inline-block';

		// ファイル名用に整形（先頭のドットを削除）
		let filename = weapon;
		if (filename.startsWith('.')) {
			filename = filename.substring(1);
		}

		// 画像読み込みエラー時のフォールバック処理
		imageEl.onerror = function () {
			if (this.src.endsWith('.png')) {
				// PNGがダメならWebPを試す
				this.src = 'images/' + filename + '.webp';
			} else {
				// 両方ダメなら非表示
				this.style.display = 'none';
				console.log('画像が見つかりませんでした: ' + weapon);
			}
		};

		// まずはPNGを読み込む
		imageEl.src = 'images/' + filename + '.png';
	}
}

/**
 * 指定されたカテゴリ内からランダムにブキを選出する。
 * @param {string} categoryKey - WEAPON_DATAのキー
 */
function pickWeaponByCategory(categoryKey) {
	const weaponList = WEAPON_DATA[categoryKey];
	if (!weaponList) return;
	const selectedWeapon = getRandomItem(weaponList);
	displayResult(categoryKey, selectedWeapon);
}

/**
 * 全てのカテゴリからランダムにブキを選出する。
 */
function pickWeaponFromAll() {
	const categories = Object.keys(WEAPON_DATA);
	const randomCategory = getRandomItem(categories);
	pickWeaponByCategory(randomCategory);
}

/**
 * ラジオボタンUIを生成して配置する。
 */
function initRadioUI() {
	const container = document.getElementById(DOM_ID.RADIO_CONTAINER);
	if (!container) return;

	const categories = [ALL_KEY, ...Object.keys(WEAPON_DATA)];
	categories.forEach((category, index) => {
		const radioId = `radio-${index}`;
		const labelText = category === ALL_KEY ? 'すべての種から' : category;

		const input = document.createElement('input');
		input.type = 'radio';
		input.name = 'weapon-category';
		input.value = category;
		input.id = radioId;
		input.className = 'radio-input';
		// デフォルトで「すべて」を選択
		if (category === ALL_KEY) input.checked = true;

		const label = document.createElement('label');
		label.htmlFor = radioId;
		label.className = 'radio-label';
		label.textContent = labelText;

		container.appendChild(input);
		container.appendChild(label);
	});
}

/**
 * 「ブキを選出する！」ボタンクリック時のハンドラ。
 */
function onRollButtonClick() {
	const checkedRadio = document.querySelector('input[name="weapon-category"]:checked');
	if (!checkedRadio) {
		alert('カテゴリが選択されていません');
		return;
	}
	const selectedValue = checkedRadio.value;
	if (selectedValue === ALL_KEY) {
		pickWeaponFromAll();
	} else {
		pickWeaponByCategory(selectedValue);
	}
}

/**
 * 初期化処理。UI生成とイベント登録を行う。
 */
function init() {
	initRadioUI();
	const rollBtn = document.getElementById(DOM_ID.ROLL_BUTTON);
	if (rollBtn) {
		rollBtn.addEventListener('click', onRollButtonClick);
	}
}

document.addEventListener('DOMContentLoaded', init);