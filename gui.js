const GRP_MAIN = "main";
const GRP_SETTINGS = "settings";
const GRP_RESULTS = "results";

class MahjongTutorRenderer extends GuiHelper {

    constructor(controller, stage) {
        super(stage);

        this.controller = controller
    }

    async renderRoot(layer) {
        await this.renderControls(layer, 10, 10);

        await this.renderHand(layer, 10, 80);
    }

    async renderHand(layer, bx, by) {
        await this.withBorder(layer, bx, by, "Round", window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor, 100, 50,
            async (layer, bx, by) => await this.renderRoundWind(layer, bx, by));
        await this.withBorder(layer, bx + 110, by, "Seat", window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor, 100, 50,
            async (layer, bx, by) => await this.renderSeatWind(layer, bx, by));
        await this.withBorder(layer, bx + 220, by, "Dora", window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor, 180, 50,
            async (layer, bx, by) => await this.renderDora(layer, bx, by, false));
        await this.withBorder(layer, bx + 410, by, "Uradora", window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor, 180, 50,
            async (layer, bx, by) => await this.renderDora(layer, bx, by, true));
        await this.withBorder(layer, bx + 600, by, "Ronpai", window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor, 110, 50,
            async (layer, bx, by) => await this.renderRonpai(layer, bx, by));

        await this.withBorder(layer, bx, by + 120, "Hand", window.mahjongTutorStyler.tilesBackground,
                window.mahjongTutorStyler.sectionLabelColor, 710, 80,
            async (layer, bx, by) => await this.renderHandTiles(layer, bx, by));

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
            x: bx + 20,
            y: by,
            text: hand.is_tsumo ? "TSUMO" : "RON",
            fontSize: window.mahjongTutorStyler.textSizeMedium,
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
            bx+10, by, GRP_MAIN);
        await this.renderButton(parent, "NEW HAND",
            () => this.controller.regenerate(), bx+70, by, GRP_MAIN);
    }

}