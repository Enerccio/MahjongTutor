

class MahjongTutor {

    /**
     * @param tutor JSTutor
     */
    constructor(tutor, rootElem) {
        this._tutor = tutor;
        this._renderer = null;
        this._rootElem = rootElem;

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
        this._rootElem.parentElement.parentElement.style.background = window.mahjongTutorStyler.fillColor;
        await this.regenerate();
    }

    async regenerate() {
        console.log("Regenerating hand");

        this._tutor.generate();
        this._tutor.get_hand().print();
        this._showAnswer = false;
        await this.renderer.render();
    }

    reveal() {
        this._showAnswer = true;
        this._renderer.render().then();
    }

    hide() {
        this._showAnswer = false;
        this._renderer.render().then();
    }

    swapTheme() {
        this.renderer.swapTheme();
        this._rootElem.parentElement.parentElement.style.background = window.mahjongTutorStyler.fillColor;
    }

    swapLocalization() {
        this.renderer.swapLocalization();
    }

}