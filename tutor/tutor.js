
class JSTutor {
    constructor(tutor_ref) {
        this._ref = tutor_ref
    }

    /**
     * @returns {JSRandomHand}
     */
    get_hand () {
        return new JSRandomHand(this._ref.get_hand())
    }

    set has_red(red) {
        this._ref.had_red = red;
    }

    get has_red() {
        this._ref.has_red;
    }

    generate() {
        this._ref.generate()
    }
}