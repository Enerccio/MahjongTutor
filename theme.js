
class MahjongTutorStyler {

    constructor() {
        this._icon_cache = {};

        this.tileStyle = "Black";

        this.font = "Calibri";
        this.textSizeMedium = 14;
        this.textSizeLarge = 18;
        this.textSizeExtraLarge = 24;
        this.iconSize = 18;

        this.fillColor = "#000000";
        this.tilesBackground = "#102b01";
        this.sectionLabelColor = "#555";
        this.buttonTextColor = "#555";
        this.buttonStrikeColor = "#555";
        this.buttonFillColor = "#ddd";
        this.buttonShadowColor = "black";
        this.buttonMMFillColor = "#958686";
        this.riichiBonBody = "#ffffff";
        this.riichiBonShadowColor = "#000000";
        this.riichiBonPin = "#ff0000";
        this.tfStrikeColor = "#555";
        this.tfFillColor = "#ddd";
        this.tfTextColor = "#000000"
        this.tfShadowColor = "black"
    }

    getIcon(iconName) {
        if (this._icon_cache[iconName] !== undefined)
            return this._icon_cache[iconName];

        for (let ss of document.styleSheets) {
            try {
                for (let rule of ss.cssRules) {
                    if (rule instanceof CSSStyleRule) {
                        if (rule.selectorText === iconName) {
                            let s = rule.style.getPropertyValue("--fa");
                            s = s.slice(1, s.length-1);
                            s = s.replace("\\\\", "\\");
                            const char = String.fromCharCode(parseInt(s.slice(1), 16));
                            this._icon_cache[iconName] = char;
                            return this._icon_cache[iconName]
                        }
                    }
                }
            } catch (e) {

            }
        }
    }

}

class DarkStyle extends MahjongTutorStyler {

    // DARK IS DEFAULT BITCHES

}

class LightStyle extends MahjongTutorStyler {

    constructor() {
        super();

        this.tileStyle = "Regular";

        this.fillColor = "#ffffff";
        this.tilesBackground = "#36870a";
        this.buttonTextColor = "#000000";
        this.sectionLabelColor = "#000000";
    }

}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    window.mahjongTutorStyler = new DarkStyle();
} else {
    window.mahjongTutorStyler = new LightStyle();
}