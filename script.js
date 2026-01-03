// ==========================================
// 定数・データ定義
// ==========================================

/**
 * ブキカテゴリーとブキ一覧のデータオブジェクト
 * @type {Object.<string, string[]>}
 */
const WEAPON_DATA = {
	'シューター': [
		'.52ガロン', '.52ガロンデコ',
		'.96ガロン', '.96ガロンデコ', '.96ガロン爪',
		'H3リールガン', 'H3リールガンD', 'H3リールガンSNAK',
		'L3リールガン', 'L3リールガンD', 'L3リールガン箔',
		'N-ZAP85', 'N-ZAP89',
		'シャープマーカー', 'シャープマーカーネオ', 'シャープマーカーGECK',
		'ジェットスイーパー', 'ジェットスイーパーカスタム', 'ジェットスイーパーCOBR',
		'スペースシューター', 'スペースシューターコラボ',
		'スプラシューター', 'スプラシューターコラボ', 'スプラシューター煌',
		'ヒーローシューター レプリカ', 'オクタシューター レプリカ', 'オーダーシューター レプリカ',
		'プライムシューター', 'プライムシューターコラボ', 'プライムシューターFRZN',
		'プロモデラーMG', 'プロモデラーRG', 'プロモデラー彩',
		'ボールドマーカー', 'ボールドマーカーネオ',
		'ボトルガイザー', 'ボトルガイザーフォイル',
		'わかばシューター', 'もみじシューター'
	],
	'ローラー': [
		'ヴァリアブルローラー', 'ヴァリアブルローラーフォイル',
		'オーダーローラー レプリカ',
		'カーボンローラー', 'カーボンローラーデコ', 'カーボンローラーANGL',
		'スプラローラー', 'スプラローラーコラボ',
		'ダイナモローラー', 'ダイナモローラーテスラ', 'ダイナモローラー冥',
		'ワイドローラー', 'ワイドローラーコラボ', 'ワイドローラー惑'
	],
	'チャージャー': [
		'14式竹筒銃・甲', '14式竹筒銃・乙',
		'4Kスコープ', '4Kスコープカスタム',
		'R-PEN／5H', 'R-PEN／5B',
		'オーダーチャージャー レプリカ',
		'スクイックリンα', 'スクイックリンβ',
		'スプラチャージャー', 'スプラチャージャーコラボ', 'スプラチャージャーFRST',
		'スプラスコープ', 'スプラスコープコラボ', 'スプラスコープFRST',
		'ソイチューバー', 'ソイチューバーカスタム',
		'リッター4K', 'リッター4Kカスタム'
	],
	'スロッシャー': [
		'エクスプロッシャー', 'エクスプロッシャーカスタム',
		'オーダースロッシャー レプリカ',
		'オーバーフロッシャー', 'オーバーフロッシャーデコ',
		'スクリュースロッシャー', 'スクリュースロッシャーネオ',
		'バケットスロッシャー', 'バケットスロッシャーデコ',
		'ヒッセン', 'ヒッセン・ヒュー', 'ヒッセンASH',
		'モップリン', 'モップリンD', 'モップリン角'
	],
	'スピナー': [
		'イグザミナー', 'イグザミナー・ヒュー',
		'オーダースピナー レプリカ',
		'クーゲルシュライバー', 'クーゲルシュライバー・ヒュー',
		'スプラスピナー', 'スプラスピナーコラボ', 'スプラスピナーPYTN',
		'ノーチラス47', 'ノーチラス79',
		'ハイドラント', 'ハイドラントカスタム', 'ハイドラント圧',
		'バレルスピナー', 'バレルスピナーデコ'
	],
	'マニューバー': [
		'オーダーマニューバー レプリカ',
		'ガエンFF', 'ガエンFFカスタム',
		'クアッドホッパーブラック', 'クアッドホッパーホワイト',
		'ケルビン525', 'ケルビン525デコ',
		'スパッタリー', 'スパッタリー・ヒュー', 'スパッタリーOWL',
		'スプラマニューバー', 'スプラマニューバーコラボ', 'スプラマニューバー耀',
		'デュアルスイーパー', 'デュアルスイーパーカスタム', 'デュアルスイーパー蹄'
	],
	'シェルター': [
		'24式張替傘・甲', '24式張替傘・乙',
		'オーダーシェルター レプリカ',
		'キャンピングシェルター', 'キャンピングシェルターソレーラ', 'キャンピングシェルターCREM',
		'スパイガジェット', 'スパイガジェットソレーラ', 'スパイガジェット繚',
		'パラシェルター', 'パラシェルターソレーラ'
	],
	'ブラスター': [
		'Rブラスターエリート', 'Rブラスターエリートデコ', 'RブラスターエリートWNTR',
		'S-BLAST92', 'S-BLAST91',
		'オーダーブラスター レプリカ',
		'クラッシュブラスター', 'クラッシュブラスターネオ',
		'ノヴァブラスター', 'ノヴァブラスターネオ',
		'ホットブラスター', 'ホットブラスターカスタム', 'ホットブラスター艶',
		'ラピッドブラスター', 'ラピッドブラスターデコ',
		'ロングブラスター', 'ロングブラスターカスタム'
	],
	'フデ': [
		'オーダーブラシ レプリカ',
		'パブロ', 'パブロ・ヒュー',
		'フィンセント', 'フィンセント・ヒュー', 'フィンセントBRNZ',
		'ホクサイ', 'ホクサイ・ヒュー', 'ホクサイ彗'
	],
	'ストリンガー': [
		'LACT-450', 'LACT-450デコ', 'LACT-450MILK',
		'オーダーストリンガー レプリカ',
		'トライストリンガー', 'トライストリンガーコラボ', 'トライストリンガー燈',
		'フルイドV', 'フルイドVカスタム'
	],
	'ワイパー': [
		'オーダーワイパー レプリカ',
		'ジムワイパー', 'ジムワイパー・ヒュー', 'ジムワイパー封',
		'デンタルワイパーミント', 'デンタルワイパースミ',
		'ドライブワイパー', 'ドライブワイパーデコ', 'ドライブワイパーRUST'
	]
};

/**
 * 結果を表示するDOM要素のID
 */
const DOM_ID = {
	CATEGORY_DISPLAY: 'result-category',
	WEAPON_DISPLAY: 'result-weapon',
	RADIO_CONTAINER: 'radio-container',
	ROLL_BUTTON: 'roll-button'
};

/**
 * 「すべて」を選択したときの特別なキー
 * @type {string}
 */
const ALL_KEY = 'ALL';

// ==========================================
// 関数定義
// ==========================================

/**
 * 指定された配列からランダムな要素を1つ返す関数
 * @param {string[]} array - 選択元の配列
 * @returns {string} ランダムに選ばれた要素
 */
function getRandomItem(array) {
	const index = Math.floor(Math.random() * array.length);
	return array[index];
}

/**
 * 画面に選出されたブキとカテゴリを表示する関数
 * 画像の表示処理（PNGとWebPの混在対応版）
 * @param {string} category - ブキのカテゴリ名
 * @param {string} weapon - ブキ名
 */
function displayResult(category, weapon) {
	const categoryEl = document.getElementById(DOM_ID.CATEGORY_DISPLAY);
	const weaponEl = document.getElementById(DOM_ID.WEAPON_DISPLAY);
	const imageEl = document.getElementById('weapon-image');

	// テキストの更新
	if (categoryEl) categoryEl.textContent = category;
	if (weaponEl) weaponEl.textContent = weapon;

	// 画像の更新処理
	if (imageEl) {
		// 1. まず表示状態にする
		imageEl.style.display = 'inline-block';

		let filename = weapon;
        if (filename.startsWith('.')) {
            filename = filename.substring(1); // 先頭の1文字（ドット）を削除
        }
		
		// 2. 「読み込みに失敗したときの処理」を定義する
		imageEl.onerror = function () {
			// 今読み込もうとしたファイルが PNG だった場合
			if (this.src.endsWith('.png')) {
				// 「じゃあ WebP を試してみよう」と切り替える
				this.src = 'images/' + weapon + '.webp';
			}
			// WebP もダメだった場合（完全に画像がない場合）
			else {
				this.style.display = 'none'; // 画像を隠す
				console.log('画像が見つかりませんでした: ' + weapon);
			}
		};

		// 3. まずは PNG を読み込んでみる（ダメなら上のonerrorが発動する）
		imageEl.src = 'images/' + weapon + '.png';
	}
}

/**
 * 指定されたカテゴリのブキをランダムに選出し、表示を更新する関数
 * @param {string} categoryKey - WEAPON_DATAのキー（カテゴリ名）
 */
function pickWeaponByCategory(categoryKey) {
	const weaponList = WEAPON_DATA[categoryKey];
	if (!weaponList) return;

	const selectedWeapon = getRandomItem(weaponList);
	displayResult(categoryKey, selectedWeapon);
}

/**
 * 全ブキの中からランダムに1つ選出して表示する関数
 */
function pickWeaponFromAll() {
	// 全カテゴリのキーを取得
	const categories = Object.keys(WEAPON_DATA);
	// ランダムにカテゴリを決定
	const randomCategory = getRandomItem(categories);
	// そのカテゴリからランダムにブキを決定
	pickWeaponByCategory(randomCategory);
}

// ==========================================
// UI初期化・イベントハンドラ
// ==========================================

/**
 * ラジオボタンのHTMLを生成して画面に配置する関数
 * 「すべて」の選択肢と、WEAPON_DATAのキーに基づく選択肢を作成します。
 */
function initRadioUI() {
	const container = document.getElementById(DOM_ID.RADIO_CONTAINER);

	// エラーチェック
	if (!container) {
		console.error("エラー: HTML内に id='" + DOM_ID.RADIO_CONTAINER + "' が見つかりません。");
		return;
	}

	// 選択肢のリストを作成（先頭に「すべて」を追加）
	const categories = [ALL_KEY, ...Object.keys(WEAPON_DATA)];

	categories.forEach((category, index) => {
		// ラジオボタンのID（labelとの紐付け用）
		const radioId = `radio-${index}`;
		// 表示名（ALLの場合は日本語にする）
		const labelText = category === ALL_KEY ? 'すべての種から' : category;

		// input要素（ラジオボタン）の作成
		const input = document.createElement('input');
		input.type = 'radio';
		input.name = 'weapon-category'; // 同じname属性でグループ化
		input.value = category;
		input.id = radioId;
		input.className = 'radio-input';

		// デフォルトで「すべて」を選択状態にする
		if (category === ALL_KEY) {
			input.checked = true;
		}

		// label要素の作成（ボタンのような見た目にする対象）
		const label = document.createElement('label');
		label.htmlFor = radioId;
		label.className = 'radio-label';
		label.textContent = labelText;

		// コンテナに追加
		container.appendChild(input);
		container.appendChild(label);
	});
}

/**
 * 「ブキを選出する！」ボタンが押されたときの処理関数
 * 選択されているラジオボタンの値を確認し、適切な選出関数を呼び出します。
 */
function onRollButtonClick() {
	// チェックされているラジオボタンを取得
	const checkedRadio = document.querySelector('input[name="weapon-category"]:checked');

	if (!checkedRadio) {
		alert('カテゴリが選択されていません');
		return;
	}

	const selectedValue = checkedRadio.value;

	if (selectedValue === ALL_KEY) {
		// 「すべて」が選ばれている場合
		pickWeaponFromAll();
	} else {
		// 特定のカテゴリが選ばれている場合
		pickWeaponByCategory(selectedValue);
	}
}

/**
 * 初期化関数
 * ラジオボタンの生成と、実行ボタンへのイベント登録を行います。
 */
function init() {
	// 1. ラジオボタンUIの作成
	initRadioUI();

	// 2. 実行ボタンのイベント登録
	const rollBtn = document.getElementById(DOM_ID.ROLL_BUTTON);
	if (rollBtn) {
		rollBtn.addEventListener('click', onRollButtonClick);
	} else {
		console.error("エラー: HTML内に id='" + DOM_ID.ROLL_BUTTON + "' が見つかりません。");
	}
}

// ==========================================
// 実行開始
// ==========================================

// DOM読み込み完了後に初期化を実行
document.addEventListener('DOMContentLoaded', init);