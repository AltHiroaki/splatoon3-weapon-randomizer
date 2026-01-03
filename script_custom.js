/**
 * @fileoverview カスタム選出モード用のJavaScriptファイル。
 * アコーディオンUIによる複数ブキ選択、選択状態の可視化、ランダム選出機能を提供します。
 */

// ==========================================
// 定数・データ定義
// ==========================================

/**
 * ブキカテゴリーとブキ一覧のデータオブジェクト。
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
	ACCORDION_CONTAINER: 'accordion-container',
	ROLL_BUTTON: 'roll-button'
};

/**
 * 現在選択されているブキを保持するSet（重複なしリスト）
 * @type {Set<string>}
 */
const selectedWeapons = new Set();

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
		let filename = weapon;
		if (filename.startsWith('.')) {
			filename = filename.substring(1);
		}
		imageEl.onerror = function () {
			if (this.src.endsWith('.png')) {
				this.src = 'images/' + filename + '.webp';
			} else {
				this.style.display = 'none';
				console.log('画像が見つかりませんでした: ' + weapon);
			}
		};
		imageEl.src = 'images/' + filename + '.png';
	}
}

/**
 * ブキボタンの見た目を選択状態/未選択状態に更新する。
 * @param {HTMLElement} btn - 更新対象のボタン要素
 * @param {string} weaponName - ブキ名
 */
function updateButtonVisual(btn, weaponName) {
	if (selectedWeapons.has(weaponName)) {
		btn.classList.add('selected');
	} else {
		btn.classList.remove('selected');
	}
}

/**
 * 指定されたカテゴリのヘッダーの色を更新する。
 * カテゴリ内のブキが1つ以上選択されていればアクティブ色にする。
 * @param {string} category - カテゴリ名
 * @param {HTMLElement} headerElement - ヘッダー要素
 */
function updateCategoryHeaderVisual(category, headerElement) {
	const weaponList = WEAPON_DATA[category];
	// カテゴリ内のブキが選択済みリストにいくつ含まれているかカウント
	const selectedCount = weaponList.filter(w => selectedWeapons.has(w)).length;

	if (selectedCount > 0) {
		headerElement.classList.add('active-category');
	} else {
		headerElement.classList.remove('active-category');
	}
}

/**
 * カテゴリ一括選択ボタンが押されたときの処理。
 * @param {string} category - カテゴリ名
 * @param {HTMLElement} headerElement - ヘッダー要素（色更新用）
 * @param {Event} e - クリックイベント
 */
function toggleCategoryAll(category, headerElement, e) {
	e.stopPropagation(); // アコーディオンの開閉を防止

	const weaponList = WEAPON_DATA[category];
	const allSelected = weaponList.every(w => selectedWeapons.has(w));

	if (allSelected) {
		weaponList.forEach(w => selectedWeapons.delete(w));
	} else {
		weaponList.forEach(w => selectedWeapons.add(w));
	}

	// 全てのブキボタンの見た目を更新
	document.querySelectorAll('.weapon-toggle').forEach(btn => {
		updateButtonVisual(btn, btn.textContent);
	});

	// ヘッダーの見た目も更新
	updateCategoryHeaderVisual(category, headerElement);
}

/**
 * アコーディオンUIを初期化・生成する。
 */
function initAccordionUI() {
	const container = document.getElementById(DOM_ID.ACCORDION_CONTAINER);
	if (!container) return;

	for (const category in WEAPON_DATA) {
		const item = document.createElement('div');
		item.className = 'accordion-item';

		// ヘッダー生成
		const header = document.createElement('div');
		header.className = 'accordion-header';
		header.innerHTML = `<span>${category}</span>`;

		// 全選択ボタン生成
		const selectAllBtn = document.createElement('button');
		selectAllBtn.className = 'category-select-btn';
		selectAllBtn.textContent = '全選択/解除';
		// 引数にheaderを渡して、色更新ができるようにする
		selectAllBtn.addEventListener('click', (e) => toggleCategoryAll(category, header, e));

		header.appendChild(selectAllBtn);

		// 中身生成
		const content = document.createElement('div');
		content.className = 'accordion-content';

		// 開閉イベント
		header.addEventListener('click', () => {
			content.classList.toggle('open');
		});

		// ブキボタン生成
		WEAPON_DATA[category].forEach(weapon => {
			const weaponBtn = document.createElement('button');
			weaponBtn.className = 'weapon-toggle';
			weaponBtn.textContent = weapon;
			weaponBtn.addEventListener('click', () => {
				// 選択状態の切り替え
				if (selectedWeapons.has(weapon)) {
					selectedWeapons.delete(weapon);
				} else {
					selectedWeapons.add(weapon);
				}
				updateButtonVisual(weaponBtn, weapon);
				// ボタンを押したタイミングで、親カテゴリの色もチェックして更新
				updateCategoryHeaderVisual(category, header);
			});
			content.appendChild(weaponBtn);
		});

		item.appendChild(header);
		item.appendChild(content);
		container.appendChild(item);
	}
}

/**
 * 「選出する」ボタンクリック時のハンドラ。
 */
function onRollButtonClick() {
	if (selectedWeapons.size === 0) {
		alert('ブキがひとつも選択されていません！\nリストからブキを選んでください。');
		return;
	}
	const targetWeapons = Array.from(selectedWeapons);
	const selectedWeapon = getRandomItem(targetWeapons);

	// 選ばれたブキがどのカテゴリに属するか探す（表示用）
	let foundCategory = "カスタム選択";
	for (const [cat, list] of Object.entries(WEAPON_DATA)) {
		if (list.includes(selectedWeapon)) {
			foundCategory = cat;
			break;
		}
	}
	displayResult(foundCategory, selectedWeapon);
}

/**
 * 初期化処理。
 */
function init() {
	initAccordionUI();
	const rollBtn = document.getElementById(DOM_ID.ROLL_BUTTON);
	if (rollBtn) {
		rollBtn.addEventListener('click', onRollButtonClick);
	}
}

document.addEventListener('DOMContentLoaded', init);