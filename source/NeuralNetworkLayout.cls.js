
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

        var layers = [];




        /*============ PUBLIC PROPERTIES AND METHODS ============*/

        that.createLayer = function (layerConfigs) {
            var newLayer = new NeuralNetworkLayer(layerConfigs);
            layers.push(newLayer);
            return newLayer;
        };

        that.render = function (svgElementSelector) {

        };



        /*============ INITIALIZATION ============*/

        // Create the input graph
        var g = new dagreD3.graphlib.Graph().setGraph({});

        // Fill node "A" with the color green
        g.setNode("A", { style: "fill: #afa" });
        // Make the label for node "B" bold
        g.setNode("B", { labelStyle: "font-weight: bold" });
        // Double the size of the font for node "C"
        g.setNode("C", { labelStyle: "font-size: 2em" });
        g.setNode("D", {});
        g.setNode("E", {});
        // Make the edge from "A" to "B" red, thick, and dashed
        g.setEdge("A", "B", {
          style: "stroke: #f66; stroke-width: 3px; stroke-dasharray: 5, 5;",
          arrowheadStyle: "fill: #f66"
        });
        // Make the label for the edge from "C" to "B" italic and underlined
        g.setEdge("C", "B", {
          label: "A to C",
          labelStyle: "font-style: italic; text-decoration: underline;"
        });
        // Make the edge between A and D smoother.
        // see available options for lineInterpolate here: https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate
        g.setEdge("A", "D", {
          label: "line interpolation different",
          lineInterpolate: 'basis'
        });
        g.setEdge("E", "D", {});
        // Make the arrowhead blue
        g.setEdge("A", "E", {
          label: "Arrowhead class",
          arrowheadClass: 'arrowhead'
        });

        // Create the renderer
        var render = new dagreD3.render();

        // Set up an SVG group so that we can translate the final graph.
        var svg = d3.select("svg"),
            inner = svg.append("g");

        // Run the renderer. This is what draws the final graph.
        render(inner, g);

        // Center the graph
        var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
        inner.attr("transform", "translate(" + xCenterOffset + ", 20)");
        svg.attr("height", g.graph().height + 40);


    };


    /*============ PUBLIC STATIC VARIABLES/METHODS ============*/


})();