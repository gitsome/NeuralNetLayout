
var NeuralNetworkLayout;

(function () {

    /*============ PRIVATE STATIC VARIABLES/METHODS ============*/


    /*============ CLASS ============*/

    NeuralNetworkLayout = function (configs) {

        /*============ CONFIGURATION ============*/

        var that = this;
        var defaults = {};
        _.extend(that, defaults, configs);


        /*============ PRIVATE VARIABLES METHODS ============*/

        var graph = new dagreD3.graphlib.Graph().setGraph({nodesep:30, ranksep:80, rankdir: 'LR'});

        var layers = [];


        /*============ PUBLIC PROPERTIES AND METHODS ============*/

        that.createLayer = function (layerConfigs) {
            var newLayer = new NeuralNetworkLayer(layerConfigs, graph);
            layers.push(newLayer);
            return newLayer;
        };

        that.render = function (svgElementSelector) {

            // Create the renderer
            var render = new dagreD3.render();

            // Set up an SVG group so that we can translate the final graph.
            var svg = d3.select(svgElementSelector),
                inner = svg.append("g");

            // Set up zoom support
            var zoom = d3.behavior.zoom().on("zoom", function() {
                inner.attr("transform", "translate(" + d3.event.translate + ")" +
                      "scale(" + d3.event.scale + ")");
            });
            svg.call(zoom);

            // Run the renderer. This is what draws the final graph.
            render(inner, graph);

            // Center the graph
            var xCenterOffset = (svg.attr("width") - graph.graph().width) / 2;
            inner.attr("transform", "translate(" + xCenterOffset + ", 20)");
            //svg.attr("height", graph.graph().height + 40);
        };



        /*============ INITIALIZATION ============*/

    };


    /*============ PUBLIC STATIC VARIABLES/METHODS ============*/

})();