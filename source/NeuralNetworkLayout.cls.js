
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

        var customizeRenderer = function (render) {
            render.arrows().hollowPoint = function normal(parent, id, edge, type) {
              var marker = parent.append("marker")
                .attr("id", id)
                .attr("viewBox", "0 0 10 10")
                .attr("refX", 9)
                .attr("refY", 5)
                .attr("markerUnits", "strokeWidth")
                .attr("markerWidth", 6)
                .attr("markerHeight", 4)
                .attr("orient", "auto");

              var path = marker.append("path")
                .attr("d", "M 0 0 L 10 5 L 0 10 z")
                .style("stroke-width", 1)
                .style("stroke-dasharray", "1,0")
                .style("fill", "#fff")
                .style("stroke", "#333");
              dagreD3.util.applyStyle(path, edge[type + "Style"]);
            };
        };


        /*============ PUBLIC PROPERTIES AND METHODS ============*/

        that.createLayer = function (layerConfigs) {
            var newLayer = new NeuralNetworkLayer(layerConfigs, graph);
            layers.push(newLayer);
            return newLayer;
        };

        that.render = function (svgElementSelector) {

            // Create the renderer
            var render = new dagreD3.render();

            // Customize the renderer
            customizeRenderer(render);

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
            svg.attr("height", graph.graph().height + 40);
        };



        /*============ INITIALIZATION ============*/




    };


    /*============ PUBLIC STATIC VARIABLES/METHODS ============*/


})();