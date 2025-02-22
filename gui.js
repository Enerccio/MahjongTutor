const GRP_MAIN = "main";
const GRP_SETTINGS = "settings";
const GRP_RESULTS = "results";

class MahjongTutorRenderer extends GuiHelper {

    constructor(controller, stage) {
        super(stage);

        this.controller = controller
    }

    async render() {
        await super.render();

        if (this.controller.showAnswer) {
            for (let c of this.buttonGroups[GRP_MAIN]) {
                c.disableEvents();
            }
        }
    }

    async renderRoot(layer) {
        await this.renderControls(layer, 10, 10);
        await this.renderHand(layer, 10, 80);
        if (this.controller.showAnswer) {
            await this.renderResultLayer(layer, 70, 20);
        }
    }

    async renderResultLayer(layer, bx, by) {
        const hand = this.controller.tutor.get_hand();

        let h = 0;
        const fuText = hand.get_fu_details_complete();
        const fuSize = this.getTextSize(fuText, window.mahjongTutorStyler.textSizeMedium);
        h += 30;
        h += 30;
        h += 60;
        h += 80;
        h += fuSize.height;
        h += 70;

        const yakuText = hand.get_yaku_full();
        const yakuSize = this.getTextSize(yakuText, window.mahjongTutorStyler.textSizeMedium);

        let yw = 0;
        let yh = 0;
        yh += yakuSize.height;
        yh += 70;
        yw += Math.max(fuSize.width+30, 240) + 20 + yakuSize.width;

        await this.withBorder(layer, bx, by, window.loc.result, window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor, Math.max(yw, 500), Math.max(h, yh),
            async (layer, bx, by) => await this.renderResult(layer, bx, by));
    }

    async renderResult(layer, x, y) {
        const hand = this.controller.tutor.get_hand();

        let bx = x;
        let by = y;
        layer.add(new Konva.Text({
            x: bx,
            y: by,
            text: window.loc.fuLabel + hand.get_fu(),
            fontSize: window.mahjongTutorStyler.textSizeExtraLarge,
            fontFamily: window.mahjongTutorStyler.font,
            fill: window.mahjongTutorStyler.buttonTextColor,
            padding: 20,
            align: 'center',
        }));
        by += 30;
        layer.add(new Konva.Text({
            x: bx,
            y: by,
            text: window.loc.hanLabel + hand.get_han(),
            fontSize: window.mahjongTutorStyler.textSizeExtraLarge,
            fontFamily: window.mahjongTutorStyler.font,
            fill: window.mahjongTutorStyler.buttonTextColor,
            padding: 20,
            align: 'center',
        }));
        by += 30;
        layer.add(new Konva.Text({
            x: bx,
            y: by,
            text: window.loc.pointsLabel + hand.get_points(),
            fontSize: window.mahjongTutorStyler.textSizeExtraLarge,
            fontFamily: window.mahjongTutorStyler.font,
            fill: window.mahjongTutorStyler.buttonTextColor,
            padding: 20,
            align: 'center',
        }));
        by += 60;

        const fuText = hand.get_fu_details_complete();
        const fuSize = this.getTextSize(fuText, window.mahjongTutorStyler.textSizeMedium);
        const yakuText = hand.get_yaku_full();
        const yakuSize = this.getTextSize(yakuText, window.mahjongTutorStyler.textSizeMedium);

        await this.withBorder(layer, bx, by, window.loc.fu, window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor, Math.max(fuSize.width+70, 200), fuSize.height+10,
            async (layer, _bx, _by) => {
                layer.add(new Konva.Text({
                    x: _bx,
                    y: _by,
                    text: fuText,
                    fontSize: window.mahjongTutorStyler.textSizeMedium,
                    fontFamily: window.mahjongTutorStyler.font,
                    fill: window.mahjongTutorStyler.buttonTextColor,
                    align: 'left',
                }));
            });
        by += fuSize.height;

        await this.withBorder(layer,
            x + Math.max(fuSize.width+70, 200) + 20,
            y,
            window.loc.yaku, window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor,
            Math.max(yakuSize.width+30, 240),
            Math.max(yakuSize.height+10, by),
            async (layer, _bx, _by) => {
                layer.add(new Konva.Text({
                    x: _bx,
                    y: _by,
                    text: yakuText,
                    fontSize: window.mahjongTutorStyler.textSizeMedium,
                    fontFamily: window.mahjongTutorStyler.font,
                    fill: window.mahjongTutorStyler.buttonTextColor,
                    align: 'left',
                }));
            });

        by += 80;
        await this.renderButton(layer, window.loc.ret, async () => this.controller.hide(),
            bx, Math.max(by, yakuSize.height + 80), 100, 40, GRP_RESULTS);

    }

    async renderHand(layer, bx, by) {
        await this.withBorder(layer, bx, by, window.loc.roundWind, window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor, 100, 50,
            async (layer, bx, by) => await this.renderRoundWind(layer, bx, by));
        await this.withBorder(layer, bx + 110, by, window.loc.seatWind, window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor, 100, 50,
            async (layer, bx, by) => await this.renderSeatWind(layer, bx, by));
        await this.withBorder(layer, bx + 220, by, window.loc.dora, window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor, 180, 50,
            async (layer, bx, by) => await this.renderDora(layer, bx, by, false));
        await this.withBorder(layer, bx + 410, by,  window.loc.uradora, window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor, 180, 50,
            async (layer, bx, by) => await this.renderDora(layer, bx, by, true));
        await this.withBorder(layer, bx + 600, by, window.loc.ronpai, window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor, 110, 50,
            async (layer, bx, by) => await this.renderRonpai(layer, bx, by));

        await this.withBorder(layer, bx, by + 120, window.loc.hand, window.mahjongTutorStyler.tilesBackground,
                window.mahjongTutorStyler.sectionLabelColor, 710, 80,
            async (layer, bx, by) => await this.renderHandTiles(layer, bx, by));

        await this.withBorder(layer, bx, by + 270, window.loc.openMelds, window.mahjongTutorStyler.tilesBackground,
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
            text: hand.is_tsumo ? window.loc.tsumo : window.loc.ron,
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
        await this.renderButton(parent, window.loc.language,
            () => this.controller.swapLocalization(), bx+10, by, 100, 50,  GRP_MAIN);
        await this.renderIconButton(parent, ".fa-circle-half-stroke", () => this.controller.swapTheme(),
            bx+120, by, 50, 50, GRP_MAIN);
        await this.renderButton(parent, window.loc.newHand,
            () => this.controller.regenerate(), bx+180, by, 120, 50, GRP_MAIN);
        await this.renderButton(parent, window.loc.reveal,
            () => this.controller.reveal(), bx+310, by, 120, 50, GRP_MAIN);
    }

}