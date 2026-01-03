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
    BUTTON_CONTAINER: 'buttons-container'
};

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
 * @param {string} category - ブキのカテゴリ名
 * @param {string} weapon - ブキ名
 */
function displayResult(category, weapon) {
    const categoryEl = document.getElementById(DOM_ID.CATEGORY_DISPLAY);
    const weaponEl = document.getElementById(DOM_ID.WEAPON_DISPLAY);

    categoryEl.textContent = category;
    weaponEl.textContent = weapon;
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

/**
 * ページ読み込み時にボタンを動的に生成する初期化関数
 */
function initButtons() {
    const container = document.getElementById(DOM_ID.BUTTON_CONTAINER);

    // 1. 全ランダムボタンの作成
    const allRandomBtn = document.createElement('button');
    allRandomBtn.textContent = '全ブキからランダム！';
    allRandomBtn.className = 'all-random';
    allRandomBtn.addEventListener('click', pickWeaponFromAll);
    container.appendChild(allRandomBtn);

    // 2. カテゴリごとのボタン作成
    for (const category in WEAPON_DATA) {
        const btn = document.createElement('button');
        btn.textContent = category;
        
        // クリックイベントの登録
        btn.addEventListener('click', () => {
            pickWeaponByCategory(category);
        });

        container.appendChild(btn);
    }
}

// ==========================================
// 実行開始
// ==========================================

// DOM読み込み完了後に初期化を実行
document.addEventListener('DOMContentLoaded', initButtons);