
const imageMap = {

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

    loadSvg(path) {
        return new Promise((resolve, reject) => {
            let img = new Image()
            img.src = path;
            img.width = 30;
            img.height = 40;
            img.onload = () => resolve(img)
            img.onerror = reject
        })
    }

    async getTileImage(type) {
        const path =  "riichi-mahjong-tiles/" + style + "/" + type + ".svg";
        if (imageMap[path] === undefined) {
            imageMap[path] = await this.loadSvg(path);
        }
        return imageMap[path];
    }

    async  getTileBackground() {
        const path = "riichi-mahjong-tiles/" + style + "/Front.svg";
        if (imageMap[path] === undefined) {
            imageMap[path] = await this.loadSvg(path);
        }
        return imageMap[path];
    }

    async  getTileBackside() {
        const path = "riichi-mahjong-tiles/" + style + "/Back.svg";
        if (imageMap[path] === undefined) {
            imageMap[path] = await this.loadSvg(path);
        }
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