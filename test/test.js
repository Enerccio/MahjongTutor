
class GuiTest extends GuiHelper {

    async renderRoot(layer) {
        await this.withBorder(layer, 0, 0, "Test",
            window.mahjongTutorStyler.tilesBackground,
            window.mahjongTutorStyler.sectionLabelColor,
            400, 50,
            async (layer, bx, by) => await this.renderTestLayout(layer, bx, by));
    }

}

window.addEventListener('DOMContentLoaded', function () {
    preloadTiles().then(function (){
        const stage = new Konva.Stage({
            container: 'root',   // id of container <div>
            width: 900,
            height: 600
        });

        window.renderer = new GuiTest(stage);
        window.renderer.render().then();
    });
})