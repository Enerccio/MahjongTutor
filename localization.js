
class Localization {

    constructor() {
        this.newHand = "NEW HAND";
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
    }

    getYakuName(yakuName) {
        return yakuName;
    }

}

class LocalizationJP extends Localization {
    constructor() {
        super();

        this.newHand = "新和がり";
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

        this.yaku = {}
        this.yaku["Aka Dora"] = "赤ドラ";
        this.yaku["Chankan"] = "槍槓";
        this.yaku["Chantai"] = "全帯";
        this.yaku["Chiitoitsu"] = "七対子";
        this.yaku["Chinitsu"] = "清一色";
        this.yaku["Yakuhai (chun)"] = "役牌 中";
        this.yaku["Double Open Riichi"] = "ダブルオープン立直";
        this.yaku["Double Riichi"] = "ダブル立直";
        this.yaku["Dora"] = "ドラ";
        this.yaku["Yakuhai (east)"] = "役牌　東";
        this.yaku["Haitei Raoyue"] = "海底撈月";
        this.yaku["Yakuhai (haku)"] = "役牌　白";
        this.yaku["Yakuhai (hatsu)"] = "役牌　發 ";
        this.yaku["Honitsu"] = "混一色";
        this.yaku["Honroutou"] = "混老頭";
        this.yaku["Houtei Raoyui"] = "河底撈魚";
        this.yaku["Iipeiko"] = "一盃口";
        this.yaku["Ippatsu"] = "一発";
        this.yaku["Ittsu"] = "一気通貫";
        this.yaku["Junchan"] = "純全帯么九";
        this.yaku["Nagashi Mangan"] = "流し満貫";
        this.yaku["Yakuhai (north)"] = "役牌　北";
        this.yaku["Open Riichi"] = "オープン立直";
        this.yaku["Pinfu"] = "平和";
        this.yaku["Renhou"] = "人和";
        this.yaku["Riichi"] = "立直";
        this.yaku["Rinshan Kaihou"] = "嶺上開花";
        this.yaku["Ryanpeikou"] = "二盃口";
        this.yaku["San Ankou"] = "三暗刻";
        this.yaku["San Kantsu"] = "三槓子";
        this.yaku["Sanshoku Doujun"] = "三色同順";
        this.yaku["Sanshoku Doukou"] = "三色同刻";
        this.yaku["Shou Sangen"] = "小三元";
        this.yaku["Yakuhai (south)"] = "役牌　南";
        this.yaku["Tanyao"] = "断么九";
        this.yaku["Toitoi"] = "対々和";
        this.yaku["Menzen Tsumo"] = "門前清自摸和";
        this.yaku["Yakuhai (west)"] = "役牌　西";
        this.yaku["Yakuhai (wind of place)"] = "役牌　自風";
        this.yaku["Yakuhai (wind of round)"] = "役牌　場風";
        // yakumans
        this.yaku["Chiihou"] = "地和";
        this.yaku["Chinroutou"] = "清老頭";
        this.yaku["Chuuren Poutou"] = "九連宝燈";
        this.yaku["Daburu Chuuren Poutou"] = "サブル九連宝燈";
        this.yaku["Kokushi Musou Juusanmen Matchi"] = "国士無双１３面待ち";
        this.yaku["Daichisei"] = "大七星";
        this.yaku["Daisangen"] = "大三元";
        this.yaku["Daisharin"] = "大車輪";
        this.yaku["Dai Suushii"] = "大四喜";
        this.yaku["Kokushi Musou"] = "国士無双";
        this.yaku["Paarenchan"] = "八連荘";
        this.yaku["Renhou (yakuman)"] = "人和";
        this.yaku["Ryuuiisou"] = "緑一色";
        this.yaku["Sashikomi"] = "差し込み";
        this.yaku["Shousuushii"] = "小四喜";
        this.yaku["Suu Ankou"] = "四暗刻";
        this.yaku["Suu Ankou Tanki"] = "四暗刻単騎";
        this.yaku["Suu Kantsu"] = "四槓子";
        this.yaku["Tenhou"] = "天和";
        this.yaku["Tsuu Iisou"] = "字一色";
    }

    getYakuName(yakuName) {
        return this.yaku[yakuName];
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