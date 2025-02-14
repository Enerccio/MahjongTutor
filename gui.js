
let style = "Regular";

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
            width: 700,
            height: 500,
            fill: 'black',
            stroke: 'black'
        });
        background.listening(false);
        rootLayer.add(background);
        this.stage.add(rootLayer);

        await this.renderRoot(rootLayer);
    }

    async renderRoot(layer) {
        await this.renderControls(layer, 0, 0);

        // await this.renderHand(layer, 0, 80);
    }

    async renderHand(layer, bx, by) {
        await this.withBorder(layer, bx, by, "Hand", "#ddd", "#555", 550, 50,
            async (layer, bx, by) => await this.renderHandTiles(layer, bx, by));
        await this.withBorder(layer, bx + 560, by, "Winning tile", "#ddd", "#555", 150, 50,
            async (layer, bx, by) => await this.renderRonpai(layer, bx, by));
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

        layer.add(tileBackground);
        layer.add(tileImage);
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
    }

    /**
     * @param parent Konva.Layer
     * @param bx
     * @param by
     * @returns {Promise<void>}
     */
    async renderControls(parent, bx, by) {
        await this.renderButton(parent, "NEW HAND", "#rr0000",
            () => this.controller.regenerate(), bx+10, by+10);
    }

    async renderButton(layer, text, color, callback, x, y) {
        const complexText = new Konva.Text({
            x: x,
            y: y,
            text: text,
            fontSize: 18,
            fontFamily: 'Calibri',
            fill: '#555',
            padding: 20,
            align: 'center',
        });

        const buttonBody = new Konva.Rect({
            x: x,
            y: y,
            stroke: '#555',
            strokeWidth: 5,
            fill: '#ddd',
            width: complexText.width(),
            height: complexText.height(),
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 10,
            shadowOpacity: 0.2,
            cornerRadius: 10,
        });

        complexText.listening(false);

        layer.add(buttonBody);
        layer.add(complexText);

        buttonBody.on('mousedown', function() {
            callback();
        });
        buttonBody.on('tap', function() {
            callback();
        });
    }

    async withBorder(layer, bx, by, text, color, scolor, w, h, callback) {
        const label = new Konva.Text({
            x: bx,
            y: by,
            text: text,
            fontSize: 18,
            fontFamily: 'Calibri',
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

    // /**
    //  * @param hand JSRandomHand
    //  * @returns {Promise<void>}
    //  */
    // async showHand(hand) {
    //     hand.print();
    //
    //
    //
    //     offset += 20;
    //
    //     let tile = hand.get_win_tile();
    //     this.canvas.getContext('2d').drawImage(await tile.getTileBackground(), offset, 0, 30, 40);
    //     this.canvas.getContext('2d').drawImage(await tile.getFrontImage(), offset, 0, 30, 40);
    //
    //     offset = 0;
    //
    //     for (let meld of hand.get_melds()) {
    //         if (meld.is_close_kan) {
    //             let it = 0
    //             for (let tile of meld.get_tiles()) {
    //                 if (it === 0 || it === 3) {
    //                     this.canvas.getContext('2d').drawImage(await tile.getTileBackside(), offset, 50, 30, 40);
    //                 } else {
    //                     this.canvas.getContext('2d').drawImage(await tile.getTileBackground(), offset, 50, 30, 40);
    //                     this.canvas.getContext('2d').drawImage(await tile.getFrontImage(), offset, 50, 30, 40);
    //                 }
    //
    //                 it += 1;
    //                 offset += 40;
    //             }
    //         } else {
    //             for (let tile of meld.get_tiles()) {
    //                 this.canvas.getContext('2d').drawImage(await tile.getTileBackground(), offset, 50, 30, 40);
    //                 this.canvas.getContext('2d').drawImage(await tile.getFrontImage(), offset, 50, 30, 40);
    //
    //                 offset += 40;
    //             }
    //         }
    //
    //         offset += 20;
    //     }
    // }
}

