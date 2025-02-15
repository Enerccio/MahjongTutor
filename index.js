
/**
 * @param tutor JSTutor
 * @returns {Promise<void>}
 */
window.loadTutor = async function (tutor) {
    setTimeout(function () {
        preloadTiles().then(function (){
            const root = document.getElementById("root");
            root.removeChild(document.getElementById("loading"));

            const stage = new Konva.Stage({
                container: 'root',   // id of container <div>
                width: 900,
                height: 600
            });

            window.controller = new MahjongTutor(tutor);
            window.controller.renderer = new MahjongTutorRenderer(controller, stage);

            window.controller.start();
        });
    }, 100);
}

window.as_tutor = function (ref) {
    return new JSTutor(ref);
}