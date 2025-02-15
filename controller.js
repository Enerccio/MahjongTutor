

class MahjongTutor {

    /**
     * @param tutor JSTutor
     */
    constructor(tutor) {
        this._tutor = tutor;
        this._renderer = null;

        this._showAnswer = false;
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

    get showAnswer() {
        return this._showAnswer;
    }

    async start() {
        await this.regenerate();
    }

    async regenerate() {
        console.log("Regenerating hand");

        this._tutor.generate();
        this._tutor.get_hand().print();
        this._showAnswer = false;
        await this.renderer.render();
    }

}