
class Localization {

    constructor() {
        this.newHand = "NEW HAND";
        this.reveal = "SHOW";
        this.language = "日本語";
        this.ron = "RON";
        this.tsumo = "TSUMO";
        this.openMelds = "Open Melds";
        this.hand = "Hand";
        this.ronpai = "Ronpai";
        this.uradora = "Uradora";
        this.dora = "Dora";
        this.seatWind = "Seat";
        this.roundWind = "Round";
        this.result = "Result";
        this.fu = "Fu";
        this.ret = "Return";
        this.yaku = "Yaku";
        this.fuLabel = "Fu: ";
        this.hanLabel = "Han: ";
        this.pointsLabel = "Points: ";

        this._fu = {};
        this.loadFu();
    }

    getFu(fuName) {
        return this._fu[fuName];
    }

    getYakuName(yakuName) {
        return yakuName;
    }

    loadFu() {
        this._fu["base"] = "Base";
        this._fu["penchan"] = "Penchan";
        this._fu["kanchan"] = "Kanchan";
        this._fu["valued_pair"] = "Valued Pair";
        this._fu["double_valued_pair"] = "Double Valued Pair";
        this._fu["pair_wait"] = "Pair Wait";
        this._fu["tsumo"] = "Tsumo";
        this._fu["hand_without_fu"] = "Pinfu";
        this._fu["closed_pon"] = "Closed Triplet";
        this._fu["open_pon"] = "Open Triplet";
        this._fu["closed_terminal_pon"] = "Closed Valued Triplet";
        this._fu["open_terminal_pon"] = "Open Valued Triplet";
        this._fu["closed_kan"] = "Closed Kan";
        this._fu["open_kan"] = "Open Kan";
        this._fu["closed_terminal_kan"] = "Closed Valued Kan";
        this._fu["open_terminal_kan"] = "Open Valued Kan";
    }
}

class LocalizationJP extends Localization {
    constructor() {
        super();

        this.newHand = "新和がり";
        this.reveal = "解説";
        this.language = "EN";
        this.ron = "ロン";
        this.tsumo = "ツモ";
        this.openMelds = "明順";
        this.hand = "和がり";
        this.ronpai = "和がり牌";
        this.uradora = "裏ドラ";
        this.dora = "ドラ";
        this.seatWind = "自風";
        this.roundWind = "場風";
        this.result = "結果";
        this.fu = "符";
        this.ret = "戻れ";
        this.yaku = "役";
        this.fuLabel = "符 ";
        this.hanLabel = "飜 ";
        this.pointsLabel = "点 ";

        this._yaku = {}
        this._yaku["Aka Dora"] = "赤ドラ";
        this._yaku["Chankan"] = "槍槓";
        this._yaku["Chantai"] = "全帯";
        this._yaku["Chiitoitsu"] = "七対子";
        this._yaku["Chinitsu"] = "清一色";
        this._yaku["Yakuhai (chun)"] = "役牌 中";
        this._yaku["Double Open Riichi"] = "ダブルオープン立直";
        this._yaku["Double Riichi"] = "ダブル立直";
        this._yaku["Dora"] = "ドラ";
        this._yaku["Yakuhai (east)"] = "役牌　東";
        this._yaku["Haitei Raoyue"] = "海底撈月";
        this._yaku["Yakuhai (haku)"] = "役牌　白";
        this._yaku["Yakuhai (hatsu)"] = "役牌　發 ";
        this._yaku["Honitsu"] = "混一色";
        this._yaku["Honroutou"] = "混老頭";
        this._yaku["Houtei Raoyui"] = "河底撈魚";
        this._yaku["Iipeiko"] = "一盃口";
        this._yaku["Ippatsu"] = "一発";
        this._yaku["Ittsu"] = "一気通貫";
        this._yaku["Junchan"] = "純全帯么九";
        this._yaku["Nagashi Mangan"] = "流し満貫";
        this._yaku["Yakuhai (north)"] = "役牌　北";
        this._yaku["Open Riichi"] = "オープン立直";
        this._yaku["Pinfu"] = "平和";
        this._yaku["Renhou"] = "人和";
        this._yaku["Riichi"] = "立直";
        this._yaku["Rinshan Kaihou"] = "嶺上開花";
        this._yaku["Ryanpeikou"] = "二盃口";
        this._yaku["San Ankou"] = "三暗刻";
        this._yaku["San Kantsu"] = "三槓子";
        this._yaku["Sanshoku Doujun"] = "三色同順";
        this._yaku["Sanshoku Doukou"] = "三色同刻";
        this._yaku["Shou Sangen"] = "小三元";
        this._yaku["Yakuhai (south)"] = "役牌　南";
        this._yaku["Tanyao"] = "断么九";
        this._yaku["Toitoi"] = "対々和";
        this._yaku["Menzen Tsumo"] = "門前清自摸和";
        this._yaku["Yakuhai (west)"] = "役牌　西";
        this._yaku["Yakuhai (wind of place)"] = "役牌　自風";
        this._yaku["Yakuhai (wind of round)"] = "役牌　場風";
        // yakumans
        this._yaku["Chiihou"] = "地和";
        this._yaku["Chinroutou"] = "清老頭";
        this._yaku["Chuuren Poutou"] = "九連宝燈";
        this._yaku["Daburu Chuuren Poutou"] = "サブル九連宝燈";
        this._yaku["Kokushi Musou Juusanmen Matchi"] = "国士無双１３面待ち";
        this._yaku["Daichisei"] = "大七星";
        this._yaku["Daisangen"] = "大三元";
        this._yaku["Daisharin"] = "大車輪";
        this._yaku["Dai Suushii"] = "大四喜";
        this._yaku["Kokushi Musou"] = "国士無双";
        this._yaku["Paarenchan"] = "八連荘";
        this._yaku["Renhou (yakuman)"] = "人和";
        this._yaku["Ryuuiisou"] = "緑一色";
        this._yaku["Sashikomi"] = "差し込み";
        this._yaku["Shousuushii"] = "小四喜";
        this._yaku["Suu Ankou"] = "四暗刻";
        this._yaku["Suu Ankou Tanki"] = "四暗刻単騎";
        this._yaku["Suu Kantsu"] = "四槓子";
        this._yaku["Tenhou"] = "天和";
        this._yaku["Tsuu Iisou"] = "字一色";
    }

    loadFu() {
        this._fu["base"] = "符底";
        this._fu["penchan"] = "辺張待ち";
        this._fu["kanchan"] = "嵌張待ち";
        this._fu["valued_pair"] = "役牌雀頭";
        this._fu["double_valued_pair"] = "ダブル役牌雀頭";
        this._fu["pair_wait"] = "単騎";
        this._fu["tsumo"] = "清自";
        this._fu["hand_without_fu"] = "平和";
        this._fu["closed_pon"] = "暗子";
        this._fu["open_pon"] = "明子";
        this._fu["closed_terminal_pon"] = "1・9牌と字牌の暗子";
        this._fu["open_terminal_pon"] = "1・9牌と字牌の明子";
        this._fu["closed_kan"] = "暗槓";
        this._fu["open_kan"] = "明槓";
        this._fu["closed_terminal_kan"] = "1・9牌と字牌の暗槓";
        this._fu["open_terminal_kan"] = "1・9牌と字牌の明槓";
    }

    getYakuName(yakuName) {
        let addendum = "";
        if (yakuName.startsWith("Dora")) {
            addendum = yakuName.substring(4);
            yakuName = "Dora";
        }
        if (yakuName.startsWith("Aka Dora")) {
            addendum = yakuName.substring(8);
            yakuName = "Aka Dora";
        }
        return this._yaku[yakuName] + addendum;
    }
}

function getLang() {
    if (navigator.languages !== undefined)
        return navigator.languages[0];
    return navigator.language;
}


if (!getLang() && getLang().includes("jp")) {
    window.loc = new LocalizationJP();
} else {
    window.loc = new Localization();
}