
class GuiComponent {
    constructor(gh, layer, x, y) {
        this.gh = gh;
        this.x = x;
        this.y = y;
        this.layer = layer;
        this.eventsEnabled = true;
    }

    async render() {
        await this.renderComponent();
        this.addEvents();
    }

    async renderComponent() {

    }

    addEvents() {

    }

    disableEvents() {
        this.eventsEnabled = false;
    }

    enableEvents() {
        this.eventsEnabled = true;
    }
}

class Eventable extends GuiComponent {

    constructor(gh, layer, x, y, group) {
        super(gh, layer, x, y);
        this.group = group;
    }

    addEvents() {
        if (this.gh.buttonGroups[this.group] === undefined) {
            this.gh.buttonGroups[this.group] = [];
        }
        this.gh.buttonGroups[this.group].push(this);
    }

    registerFocus(component) {
        component.on("mouseup", event => {
            if (this.gh.currentlyFocused !== undefined) {
                if (this.gh.currentlyFocused instanceof Eventable) {
                    this.gh.currentlyFocused.onBlur();
                }
            }
            this.gh.currentlyFocused = this;
            this.onFocus();
        });
    }

    onFocus() {

    }

    onBlur() {

    }

    get focused() {
        return this.gh.currentlyFocused === this;
    }
}

class HasValue extends Eventable {
    constructor(gh, layer, x, y, group) {
        super(gh, layer, x, y, group);

        this.value = null;
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
    }

}

class ButtonBase extends Eventable {
    constructor(gh, layer, x, y, callback, group) {
        super(gh, layer, x, y, group);
        this.callback = callback;
        this.buttonBody = null;
    }

    async renderButtonInfo() {

    }

    async renderComponent() {
        const info = await this.renderButtonInfo();
        this.buttonBody = new Konva.Rect({
            x: this.x,
            y: this.y,
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

        this.layer.add(this.buttonBody);
        this.layer.add(info);

        this.buttonBody.on('mouseup touchstart', () => {
            this.callback();
        });
        this.buttonBody.on("mouseover", () => {
            this.buttonBody.fill(window.mahjongTutorStyler.buttonMMFillColor);
        });
        this.buttonBody.on("mouseleave", () => {
            this.buttonBody.fill(window.mahjongTutorStyler.buttonFillColor);
        });

        this.registerFocus(this.buttonBody);
    }

    disableEvents() {
        super.disableEvents();

        this.buttonBody.listening(false);
        this.buttonBody.fill(window.mahjongTutorStyler.buttonFillColor);
    }

    enableEvents() {
        super.enableEvents();
        this.buttonBody.listening(true);
    }
}

class TextButton extends ButtonBase {
    constructor(gh, layer, x, y, callback, group, text) {
        super(gh, layer, x, y, callback, group);
        this.text = text;
    }

    async renderButtonInfo() {
        return new Konva.Text({
            x: this.x - 6,
            y: this.y - 5,
            text: this.text,
            fontSize: window.mahjongTutorStyler.textSizeLarge,
            fontFamily: window.mahjongTutorStyler.font,
            fill: window.mahjongTutorStyler.buttonTextColor,
            padding: 20,
            align: 'center',
        });
    }
}

class IconButton extends ButtonBase {
    constructor(gh, layer, x, y, callback, group, icon) {
        super(gh, layer, x, y, callback, group);
        this.icon = icon;
    }

    async renderButtonInfo() {
        return new Konva.Text({
            x: this.x - 6,
            y: this.y - 5,
            text: window.mahjongTutorStyler.getIcon(this.icon),
            fontSize: window.mahjongTutorStyler.iconSize,
            fontFamily: 'FontAwesome',
            fill: window.mahjongTutorStyler.buttonTextColor,
            padding: 20,
            align: 'center',
        });
    }
}

class TextField extends HasValue {
    constructor(gh, layer, x, y, group, width, height, ts, onChangeCallback) {
        super(gh, layer, x, y, group)
        this.width = width;
        this.height = height;
        this.ts = ts;
        this.onChange = onChangeCallback;

        this.value = "";
        this.text = null;
        this.textFieldBody = null;
    }

    disableEvents() {
        super.disableEvents();
    }

    enableEvents() {
        super.enableEvents();
    }

    setValue(value) {
        super.setValue(value);

        this.renderTextChange();
    }

    renderTextChange() {
        this.text.text(this.value);
        if (this.text.width () > this.width - 5) {
            this.setValue(this.value.substring(0, this.value.length-1));
        }
    }

    async renderComponent() {
        this.textFieldBody = new Konva.Rect({
            x: this.x,
            y: this.y,
            stroke: window.mahjongTutorStyler.tfStrikeColor,
            strokeWidth: 5,
            fill: window.mahjongTutorStyler.tfFillColor,
            width: this.width,
            height: this.height,
            shadowColor: window.mahjongTutorStyler.tfShadowColor,
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 10,
            shadowOpacity: 0.2,
            cornerRadius: 10,
        });
        this.text = new Konva.Text({
            x: this.x,
            y: this.y,
            text: "",
            fontSize: this.ts,
            fontFamily: window.mahjongTutorStyler.font,
            fill: window.mahjongTutorStyler.tfTextColor,
            padding: 5,
            align: 'left',
        });

        this.text.listening(false);

        this.layer.add(this.textFieldBody);
        this.layer.add(this.text);

        this.registerFocus(this.textFieldBody);
        addEventListener("keypress", (event) => this.capture(event.key))
        addEventListener("keydown", (event) => this.captureBackspace(event.key, event.code))
    }

    capture(key) {
        if (this.focused && key !== "Enter") {
            this.setValue(this.getValue() + key);
            if (this.onChange)
                this.onChange(this);
        }
    }

    captureBackspace(key, code) {
        if (this.focused) {
            if (code === "Backspace") {
                if (this.value.length > 0) {
                    this.setValue(this.value.substring(0, this.value.length-1));
                }
                if (this.onChange)
                    this.onChange(this);
            }
        }
    }

    onFocus() {
        this.renderTextChange();
    }

    onBlur() {
        this.renderTextChange();
    }

}

class GuiHelper {

    constructor(stage) {
        this.stage = stage
        this.buttonGroups = { };
        this.currentlyFocused = null;
    }

    async render() {
        this.stage.removeChildren()
        this.buttonGroups = {};
        this.currentlyFocused = null;

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

        rootLayer.on("mousedown", () => {
            if (this.currentlyFocused instanceof Eventable) {
                this.currentlyFocused.onBlur();
            }

            this.currentlyFocused = null;
        });

        await this.renderRoot(rootLayer);
    }

    async renderRoot(layout) {

    }

    swapTheme() {
        if (window.mahjongTutorStyler instanceof LightStyle) {
            window.mahjongTutorStyler = new DarkStyle();
        } else {
            window.mahjongTutorStyler = new LightStyle();
        }
        this.render().then(r => {});
    }

    async renderButton(layer, text, callback, x, y, group) {
        const button = new TextButton(this, layer, x, y, callback, group, text);
        await button.render();
    }

    async renderIconButton(layer, icon, callback, x, y, group) {
        const button = new IconButton(this, layer, x, y, callback, group, icon);
        await button.render();
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

    async renderTextField(layer, x, y, width, height, textSize, group, callback) {
        const tf = new TextField(this, layer, x, y, group, width, height, textSize, callback);
        await tf.render();
    }
}