
class MahjongTutorRenderer {

    constructor(controller, stage) {
        this.controller = controller
        this.stage = stage
    }

    async render() {
        this.stage.removeChildren()
        const rootLayer = new Konva.Layer();

        const background = new Konva.Rect({
            x: 0,
            y: 0,
            width: 900,
            height: 600,
            fill: window.mahjongTutorStyler.fillColor,
            stroke: window.mahjongTutorStyler.fillColor
        });
        background.listening(false);
        rootLayer.add(background);
        this.stage.add(rootLayer);

        await this.renderRoot(rootLayer);
    }

    async renderRoot(layer) {
        await this.renderControls(layer, 0, 0);

        await this.renderHand(layer, 0, 70);
    }

    async renderHand(layer, bx, by) {
        await this.withBorder(layer, bx, by, "Round", window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor, 100, 50,
            async (layer, bx, by) => await this.renderRoundWind(layer, bx, by));
        await this.withBorder(layer, bx + 110, by, "Seat", window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor, 100, 50,
            async (layer, bx, by) => await this.renderSeatWind(layer, bx, by));
        await this.withBorder(layer, bx + 220, by, "Dora Indicator", window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor, 240, 50,
            async (layer, bx, by) => await this.renderDora(layer, bx, by, false));
        await this.withBorder(layer, bx + 470, by, "Uradora Indicator", window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor, 240, 50,
            async (layer, bx, by) => await this.renderDora(layer, bx, by, true));

        await this.withBorder(layer, bx, by + 120, "Hand", window.mahjongTutorStyler.tilesBackground,
                window.mahjongTutorStyler.sectionLabelColor, 550, 80,
            async (layer, bx, by) => await this.renderHandTiles(layer, bx, by));
        await this.withBorder(layer, bx + 560, by + 120, "Winning tile", window.mahjongTutorStyler.tilesBackground,
                window.mahjongTutorStyler.sectionLabelColor, 150, 50,
            async (layer, bx, by) => await this.renderRonpai(layer, bx, by));
        await this.withBorder(layer, bx, by + 270, "Open Melds", window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor, 710, 50,
            async (layer, bx, by) => await this.renderMelds(layer, bx, by));
    }

    async renderDora(layer, bx, by, uradora) {
        const hand = this.controller.tutor.get_hand();

        let offset = 0;
        for (let tile of (!uradora ? hand.get_dora() : hand.get_uradora())) {

            const tileBackground = new Konva.Image({
                x: bx+offset,
                y: by,
                image: await tile.getTileBackground(),
                width: 30,
                height: 40,
            });
            const tileImage = new Konva.Image({
                x: bx+offset,
                y: by,
                image: await tile.getFrontImage(),
                width: 30,
                height: 40,
            });

            layer.add(tileBackground);
            layer.add(tileImage);
            offset += 40;
        }
    }

    async renderRoundWind(layer, bx, by) {
        const hand = this.controller.tutor.get_hand();
        let tile = hand.get_winds()[0];
        const tileBackground = new Konva.Image({
            x: bx,
            y: by,
            image: await tile.getTileBackground(),
            width: 30,
            height: 40,
        });
        const tileImage = new Konva.Image({
            x: bx,
            y: by,
            image: await tile.getFrontImage(),
            width: 30,
            height: 40,
        });
        layer.add(tileBackground);
        layer.add(tileImage);
    }

    async renderSeatWind(layer, bx, by) {
        const hand = this.controller.tutor.get_hand();
        let tile = hand.get_winds()[1];
        const tileBackground = new Konva.Image({
            x: bx,
            y: by,
            image: await tile.getTileBackground(),
            width: 30,
            height: 40,
        });
        const tileImage = new Konva.Image({
            x: bx,
            y: by,
            image: await tile.getFrontImage(),
            width: 30,
            height: 40,
        });
        layer.add(tileBackground);
        layer.add(tileImage);
    }

    async renderRonpai(layer, bx, by) {
        const hand = this.controller.tutor.get_hand();
        let tile = hand.get_win_tile();

        const tileBackground = new Konva.Image({
            x: bx,
            y: by,
            image: await tile.getTileBackground(),
            width: 30,
            height: 40,
        });
        const tileImage = new Konva.Image({
            x: bx,
            y: by,
            image: await tile.getFrontImage(),
            width: 30,
            height: 40,
        });
        const type = new Konva.Text({
            x: bx + 40,
            y: by,
            text: hand.is_tsumo ? "TSUMO" : "RON",
            fontSize: window.mahjongTutorStyler.textSizeLarge,
            fontFamily: window.mahjongTutorStyler.font,
            fill: window.mahjongTutorStyler.buttonTextColor,
            padding: 20,
            align: 'center',
        });

        layer.add(tileBackground);
        layer.add(tileImage);
        layer.add(type);
    }

    async renderHandTiles(layer, bx, by) {
        const hand = this.controller.tutor.get_hand();

        let offset = 0;
        for (let tile of hand.get_hand_tiles()) {

            const tileBackground = new Konva.Image({
                x: bx+offset,
                y: by,
                image: await tile.getTileBackground(),
                width: 30,
                height: 40,
            });
            const tileImage = new Konva.Image({
                x: bx+offset,
                y: by,
                image: await tile.getFrontImage(),
                width: 30,
                height: 40,
            });

            layer.add(tileBackground);
            layer.add(tileImage);
            offset += 40;
        }

        if (hand.is_riichi) {
            await this.renderRiichiBon(layer, bx, by + 50);
        }
    }

    async renderRiichiBon(layer, x, y) {
        const bon = new Konva.Rect({
            x: x,
            y: y,
            stroke: window.mahjongTutorStyler.riichiBonBody,
            strokeWidth: 5,
            fill: window.mahjongTutorStyler.riichiBonBody,
            width: 300,
            height: 15,
            shadowColor: window.mahjongTutorStyler.riichiBonShadowColor,
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 10,
            shadowOpacity: 0.2,
            cornerRadius: 10,
        });
        layer.add(bon);

        const pin = new Konva.Circle({
            x: x + 150,
            y: y + 7.5,
            radius: 5,
            fill: window.mahjongTutorStyler.riichiBonPin,
            width: 300,
            height: 15,
        });
        layer.add(pin);
    }

    async renderMelds(layer, bx, by) {
        const hand = this.controller.tutor.get_hand();

        let offset = 0;
        for (let meld of hand.get_melds()) {
            if (meld.is_close_kan) {
                let it = 0
                for (let tile of meld.get_tiles()) {
                    if (it === 0 || it === 3) {
                        const backside = new Konva.Image({
                            x: bx+offset,
                            y: by,
                            image: await tile.getTileBackside(),
                            width: 30,
                            height: 40,
                        });
                        layer.add(backside);
                    } else {
                        const tileBackground = new Konva.Image({
                            x: bx+offset,
                            y: by,
                            image: await tile.getTileBackground(),
                            width: 30,
                            height: 40,
                        });
                        const tileImage = new Konva.Image({
                            x: bx+offset,
                            y: by,
                            image: await tile.getFrontImage(),
                            width: 30,
                            height: 40,
                        });

                        layer.add(tileBackground);
                        layer.add(tileImage);
                    }

                    it += 1;
                    offset += 40;
                }
            } else {
                for (let tile of meld.get_tiles()) {
                    const tileBackground = new Konva.Image({
                        x: bx+offset,
                        y: by,
                        image: await tile.getTileBackground(),
                        width: 30,
                        height: 40,
                    });
                    const tileImage = new Konva.Image({
                        x: bx+offset,
                        y: by,
                        image: await tile.getFrontImage(),
                        width: 30,
                        height: 40,
                    });

                    layer.add(tileBackground);
                    layer.add(tileImage);

                    offset += 40;
                }
            }

            offset += 20;
        }
    }

    /**
     * @param parent Konva.Layer
     * @param bx
     * @param by
     * @returns {Promise<void>}
     */
    async renderControls(parent, bx, by) {
        await this.renderIconButton(parent, ".fa-circle-half-stroke", () => this.swapTheme(),
            bx+10, by);
        await this.renderButton(parent, "NEW HAND",
            () => this.controller.regenerate(), bx+70, by);
    }

    async renderButton(layer, text, callback, x, y) {
        await this._renderButton(layer, text, null, callback, x, y);
    }

    async renderIconButton(layer, icon, callback, x, y) {
        await this._renderButton(layer, null, icon, callback, x, y);
    }

    async _renderButton(layer, text, icon, callback, x, y) {
        let info;
        if (text !== null) {
            info = new Konva.Text({
                x: x - 6,
                y: y - 5,
                text: text,
                fontSize: window.mahjongTutorStyler.textSizeLarge,
                fontFamily: window.mahjongTutorStyler.font,
                fill: window.mahjongTutorStyler.buttonTextColor,
                padding: 20,
                align: 'center',
            });
        } else {
            info = new Konva.Text({
                x: x - 6,
                y: y - 5,
                text: window.mahjongTutorStyler.getIcon(icon),
                fontSize: window.mahjongTutorStyler.iconSize,
                fontFamily: 'FontAwesome',
                fill: window.mahjongTutorStyler.buttonTextColor,
                padding: 20,
                align: 'center',
            });
        }

        const buttonBody = new Konva.Rect({
            x: x,
            y: y,
            stroke: window.mahjongTutorStyler.buttonStrikeColor,
            strokeWidth: 5,
            fill: window.mahjongTutorStyler.buttonFillColor,
            width: info.width() - 10,
            height: info.height() - 10,
            shadowColor: window.mahjongTutorStyler.buttonShadowColor,
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 10,
            shadowOpacity: 0.2,
            cornerRadius: 10,
        });

        info.listening(false);

        layer.add(buttonBody);
        layer.add(info);

        buttonBody.on('mouseup touchstart', function() {
            callback();
        });
        buttonBody.on("mouseover", function () {
            buttonBody.fill(window.mahjongTutorStyler.buttonMMFillColor);
        });
        buttonBody.on("mouseleave", function () {
            buttonBody.fill(window.mahjongTutorStyler.buttonFillColor);
        });
    }

    async withBorder(layer, bx, by, text, color, scolor, w, h, callback) {
        const label = new Konva.Text({
            x: bx,
            y: by,
            text: text,
            fontSize: window.mahjongTutorStyler.textSizeLarge,
            fontFamily: window.mahjongTutorStyler.font,
            fill: scolor,
            padding: 20,
            align: 'center',
        });

        const border = new Konva.Rect({
            x: bx,
            y: by,
            stroke: scolor,
            strokeWidth: 5,
            fill: color,
            width: w,
            height: label.height() + h,
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 10,
            shadowOpacity: 0.2,
            cornerRadius: 10,
        });

        layer.add(border);
        layer.add(label);

        await callback(layer, bx+15, by+label.height());
    }

    swapTheme() {
        if (window.mahjongTutorStyler instanceof LightStyle) {
            window.mahjongTutorStyler = new DarkStyle();
        } else {
            window.mahjongTutorStyler = new LightStyle();
        }
        this.render().then(r => {});
    }

}

