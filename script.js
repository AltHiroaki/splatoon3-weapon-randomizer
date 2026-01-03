// ==========================================
// 定数・データ定義
// ==========================================

/**
 * ブキカテゴリーとブキ一覧のデータオブジェクト
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

const DOM_ID = {
	CATEGORY_DISPLAY: 'result-category',
	WEAPON_DISPLAY: 'result-weapon',
	ACCORDION_CONTAINER: 'accordion-container',
	ROLL_BUTTON: 'roll-button'
};

/**
 * 選択中のブキを管理するSet（重複なしリスト）
 * @type {Set<string>}
 */
const selectedWeapons = new Set();

// ==========================================
// 関数定義：基本ロジック
// ==========================================

/**
 * 指定された配列からランダムな要素を1つ返す関数
 */
function getRandomItem(array) {
	const index = Math.floor(Math.random() * array.length);
	return array[index];
}

/**
 * 結果を表示する関数（画像対応）
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

// ==========================================
// 関数定義：アコーディオンUIと選択ロジック
// ==========================================

/**
 * ブキボタンの見た目を選択状態/未選択状態に更新する
 * @param {HTMLElement} btn - 更新対象のボタン
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
 * カテゴリ一括選択ボタンが押されたときの処理
 * @param {string} category - カテゴリ名
 * @param {Event} e - クリックイベント
 */
function toggleCategoryAll(category, e) {
	e.stopPropagation(); // アコーディオンの開閉を防止

	const weaponList = WEAPON_DATA[category];
	// そのカテゴリのブキが「全て選択されているか」を確認
	const allSelected = weaponList.every(w => selectedWeapons.has(w));

	if (allSelected) {
		// 全て選択済みなら → 全解除
		weaponList.forEach(w => selectedWeapons.delete(w));
	} else {
		// 一部または未選択なら → 全選択
		weaponList.forEach(w => selectedWeapons.add(w));
	}

	// 画面上の全ボタンの見た目を更新
	// (効率は落ちますが、コードを簡単にするため全ボタンを再描画します)
	document.querySelectorAll('.weapon-toggle').forEach(btn => {
		updateButtonVisual(btn, btn.textContent);
	});
}

/**
 * アコーディオンUIを作成する関数
 */
function initAccordionUI() {
	const container = document.getElementById(DOM_ID.ACCORDION_CONTAINER);
	if (!container) return;

	for (const category in WEAPON_DATA) {
		// 1. カテゴリの箱
		const item = document.createElement('div');
		item.className = 'accordion-item';

		// 2. ヘッダー（タイトル ＋ 一括ボタン）
		const header = document.createElement('div');
		header.className = 'accordion-header';
		header.innerHTML = `<span>${category}</span>`;
		
		// 一括選択ボタン
		const selectAllBtn = document.createElement('button');
		selectAllBtn.className = 'category-select-btn';
		selectAllBtn.textContent = '全選択/解除';
		selectAllBtn.addEventListener('click', (e) => toggleCategoryAll(category, e));
		
		header.appendChild(selectAllBtn);

		// ヘッダーをクリックしたら中身を開閉
		header.addEventListener('click', () => {
			content.classList.toggle('open');
		});

		// 3. 中身（ブキ一覧エリア）
		const content = document.createElement('div');
		content.className = 'accordion-content';

		// ブキごとのボタンを作成
		WEAPON_DATA[category].forEach(weapon => {
			const weaponBtn = document.createElement('button');
			weaponBtn.className = 'weapon-toggle';
			weaponBtn.textContent = weapon;

			// 初期状態は未選択（必要ならここでaddする）
			// weaponBtn.classList.add('selected'); // 最初から全選択したい場合はコメントアウトを外す

			// クリックで選択/解除
			weaponBtn.addEventListener('click', () => {
				if (selectedWeapons.has(weapon)) {
					selectedWeapons.delete(weapon);
				} else {
					selectedWeapons.add(weapon);
				}
				updateButtonVisual(weaponBtn, weapon);
			});

			content.appendChild(weaponBtn);
		});

		item.appendChild(header);
		item.appendChild(content);
		container.appendChild(item);
	}
}

/**
 * 「選出する」ボタンの処理
 */
function onRollButtonClick() {
	if (selectedWeapons.size === 0) {
		alert('ブキがひとつも選択されていません！\nリストからブキを選んでください。');
		return;
	}

	// Setを配列に変換
	const targetWeapons = Array.from(selectedWeapons);
	
	// ランダムに一つ選ぶ
	const selectedWeapon = getRandomItem(targetWeapons);

	// カテゴリを逆引き（表示用）
	let foundCategory = "カスタム選択";
	for (const [cat, list] of Object.entries(WEAPON_DATA)) {
		if (list.includes(selectedWeapon)) {
			foundCategory = cat;
			break;
		}
	}

	displayResult(foundCategory, selectedWeapon);
}

// ==========================================
// 実行開始
// ==========================================
function init() {
	initAccordionUI();

	const rollBtn = document.getElementById(DOM_ID.ROLL_BUTTON);
	if (rollBtn) {
		rollBtn.addEventListener('click', onRollButtonClick);
	}
}

document.addEventListener('DOMContentLoaded', init);