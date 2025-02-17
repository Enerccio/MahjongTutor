
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