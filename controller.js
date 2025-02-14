

class MahjongTutor {

    /**
     * @param tutor JSTutor
     */
    constructor(tutor) {
        this._tutor = tutor;
        this._renderer = null;
    }

    /**
     * @returns {MahjongTutor}
     */
    get renderer() {
        return this._renderer;
    }

    set renderer(renderer) {
        this._renderer = renderer;
    }

    get tutor() {
        return this._tutor;
    }

    start() {
        this.regenerate();
    }

    regenerate() {
        console.log("Regenerating hand");

        this._tutor.generate();
        this._tutor.get_hand().print();
        this.renderer.render();
    }

}