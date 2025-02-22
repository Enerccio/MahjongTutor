
const imageMap = {

}

class JSFuDetail {

    constructor(fu_detail) {
        this._fu_value = fu_detail.get("fu");
        this._fu_name = fu_detail.get("reason");
    }

    get str() {
        return window.loc.getFu(this._fu_name) + ": " + this._fu_value;
    }

}

class JSTile {

    constructor(tile_ref) {
        const order = tile_ref[0];
        const type = tile_ref[1];
        const value = tile_ref[2];
        const is_red = tile_ref[3];

        this._ord = order;
        this._type = type;
        this._value = value;
        this._is_red = is_red;
    }

    async getTileImage(type) {
        const path =  "riichi-mahjong-tiles/" + window.mahjongTutorStyler.tileStyle + "/" + type + ".svg";
        return imageMap[path];
    }

    async  getTileBackground() {
        const path = "riichi-mahjong-tiles/" + window.mahjongTutorStyler.tileStyle + "/Front.svg";
        return imageMap[path];
    }

    async getTileBackside() {
        const path = "riichi-mahjong-tiles/" + window.mahjongTutorStyler.tileStyle + "/Back.svg";
        return imageMap[path];
    }

    async getFrontImage() {
        if (this._type === "dragon") {
            if (this._value === "haku") {
                return this.getTileImage("Haku");
            } else if (this._value === "hatsu") {
                return this.getTileImage("Hatsu");
            }
            return this.getTileImage("Chun");
        } else if (this._type === "wind") {
            if (this._value === "east") {
                return this.getTileImage("Ton");
            } else if (this._value === "west") {
                return this.getTileImage("Shaa");
            } else if (this._value === "north") {
                return this.getTileImage("Pei");
            }
            return this.getTileImage("Nan");
        } else {
            let tile = "";
            if (this._type === "man")
                tile = "Man";
            else if (this._type === "sou")
                tile = "Sou";
            else
                tile = "Pin";
            if (this._is_red) {
                return this.getTileImage(tile + "5-Dora");
            } else {
                return this.getTileImage(tile + this._value);
            }
        }
    }
}

class JSMeld {
    constructor(meld_ref) {
        this._tiles = meld_ref[0];
        this._open = meld_ref[1];
    }

    get is_close_kan() {
        return this._tiles.length === 4 && !this._open;
    }

    /**
     * @returns {*[JSTile]}
     */
    get_tiles() {
        return as_tiles(this._tiles);
    }

    is_open() {
        return this._open;
    }
}

class JSRandomHand {
    constructor (random_hand_ref) {
        this._ref = random_hand_ref;
    }

    print() {
        this._ref.print();
    }

    /**
     * @returns {*[JSTile]}
     */
    get_hand_tiles() {
        return as_tiles(this._ref.get_hand_tiles());
    }

    get_win_tile() {
        return new JSTile(this._ref.get_win_tile());
    }

    /**
     * @returns {*[JSMeld]}
     */
    get_melds() {
        return as_melds(this._ref.get_melds());
    }

    get is_tsumo() {
        return this._ref.is_tsumo;
    }

    get is_riichi() {
        return this._ref.is_riichi;
    }

    /**
     * @returns {*[JSTile]}
     */
    get_winds() {
        return as_tiles(this._ref.get_winds());
    }

    /**
     * @returns {*[JSTile]}
     */
    get_dora() {
        return as_tiles(this._ref.dora_indicators);
    }

    /**
     * @returns {*[JSTile]}
     */
    get_uradora() {
        return as_tiles(this._ref.uradora_indicators);
    }

    get_fu() {
        return this._ref.get_fu();
    }

    get_han() {
        return this._ref.get_han();
    }

    get_points() {
        return this._ref.get_points();
    }

    get_fu_details() {
        return as_fu_details(this._ref.get_fu_details());
    }

    get_fu_details_complete() {
        const fu = this.get_fu_details();
        let str = "";
        for (let i=0; i<fu.length; i++) {
            str += fu[i].str;
            if (i < fu.length-1)
                str += "\n";
        }
        return str;
    }

    get_yaku() {
        return as_yaku(this._ref.get_yaku());
    }

    get_yaku_full() {
        const yaku = this.get_yaku();
        let str = "";
        for (let i=0; i<yaku.length; i++) {
            str += window.loc.getYakuName(yaku[i]);
            if (i < yaku.length-1)
                str += "\n";
        }
        return str;
    }
}

function as_melds(pyrefarray) {
    const melds = [];

    for (let i=0; i<pyrefarray.length; i++) {
        const meld = pyrefarray[i];
        melds.push(new JSMeld(meld));
    }

    return melds;
}

function as_tiles(pyrefarray) {
    const tiles = [];

    for (let i=0; i<pyrefarray.length; i++) {
        const tile = pyrefarray[i];
        tiles.push(new JSTile(tile));
    }

    return tiles;
}

function as_fu_details(pyrefarray) {
    const fu_details = [];
    for (let i=0; i<pyrefarray.length; i++) {
        const fuDetail = pyrefarray[i];
        fu_details.push(new JSFuDetail(fuDetail));
    }
    return fu_details;
}

function as_yaku(pyrefarray) {
    const yaku = [];
    for (let i=0; i<pyrefarray.length; i++) {
        const y = pyrefarray[i];
        yaku.push(y.toString());
    }
    return yaku;
}

const __staticImageCacheLoader = [
    "Back.svg",
    "Blank.svg",
    "Chun.svg",
    "Front.svg",
    "Haku.svg",
    "Hatsu.svg",
    "Man1.svg",
    "Man2.svg",
    "Man3.svg",
    "Man4.svg",
    "Man5-Dora.svg",
    "Man5.svg",
    "Man6.svg",
    "Man7.svg",
    "Man8.svg",
    "Man9.svg",
    "Nan.svg",
    "Pei.svg",
    "Pin1.svg",
    "Pin2.svg",
    "Pin3.svg",
    "Pin4.svg",
    "Pin5-Dora.svg",
    "Pin5.svg",
    "Pin6.svg",
    "Pin7.svg",
    "Pin8.svg",
    "Pin9.svg",
    "Shaa.svg",
    "Sou1.svg",
    "Sou2.svg",
    "Sou3.svg",
    "Sou4.svg",
    "Sou5-Dora.svg",
    "Sou5.svg",
    "Sou6.svg",
    "Sou7.svg",
    "Sou8.svg",
    "Sou9.svg",
    "Ton.svg",
]

function loadSvg(path) {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.src = path;
        img.width = 30;
        img.height = 40;
        img.onload = () => resolve(img)
        img.onerror = reject
    })
}

async function preloadTiles() {
    for (let style of ["Regular", "Black"]) {
        for (let type of __staticImageCacheLoader) {
            const path =  "riichi-mahjong-tiles/" + style + "/" + type;
            imageMap[path] = await this.loadSvg(path);
        }
    }
}