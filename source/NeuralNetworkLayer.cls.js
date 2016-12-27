
var NeuralNetworkLayer;

(function () {

    /*============ PRIVATE STATIC VARIABLES/METHODS ============*/

    var layerId = 0;

    var getNextLayerId = function () {
        return layerId++;
    };


    /*============ CLASS ============*/

    NeuralNetworkLayer = function (configs, graph) {

        /*============ CONFIGURATION ============*/

        var that = this;
        var defaults = {
            id: getNextLayerId(),
            type: 'node',
            nodes: 1
        };
        _.extend(that, defaults, configs);

        if (!that.nodes) {
            throw new Error('NeuralNetworkLayer.connectToLayer.initializedWithNoNodes');
        }


        /*============ PRIVATE VARIABLES METHODS ============*/

        var layerTypeShapeMap = {
            'activation': 'rect',
            'input': 'diamond',
            'output': 'diamond'
        };

        var getNodeId = function (ind) {
            return that.id + '-' + ind;
        };

        var initialize = function () {
            for (var i=0; i < that.nodes; i++) {
                graph.setNode(getNodeId(i), {
                    label: " ",
                    shape: layerTypeShapeMap[that.type] ? layerTypeShapeMap[that.type] : "circle"
                });
            }
        };

        var layerTypeToEdgeTypeMap = {
            'fullyConnected': 'weighted',
            'activation': 'activation',
            'direct': 'normal'
        };

        var edgeStyleMap = {
            'activation': 'stroke: #f0ad4e; stroke-width: 2px; fill:none;',
            'weighted': 'stroke: #5cb85c; stroke-width: 2px; fill:none;',
            'normal': 'stroke: #333; stroke-width: 1px; fill:none;',
            'passThrough': 'stroke: #666; stroke-width: 2px; stroke-dasharray: 5, 5; fill:none;'
        };

        var getStyle = function (edgeStyle) {
            return edgeStyleMap[edgeStyle];
        };


        /*============ PUBLIC PROPERTIES AND METHODS ============*/

        that.getNodeId = getNodeId;

        that.connectToLayer = function (layerIn, configs_in) {

            var defaultConnectionConfigs = {
                type: 'fullyConnected',
                edgeType: 'normal',
                color: '#444'
            };
            var connectConfigs = _.extend({}, defaultConnectionConfigs, configs_in);


            var connectToOptions;
            if (connectConfigs.type === 'direct') {

                if (that.nodes !== layerIn.nodes) {
                    throw new Error('NeuralNetworkLayer.connectToLayer.mismatchedLayerSizesForDirectConnection');
                }

                for (var i=0; i < that.nodes; i++) {

                    graph.setEdge(that.getNodeId(i), layerIn.getNodeId(i), {
                        arrowhead: 'normal',
                        arrowheadStyle: "stroke-width:1px; stroke: #333; fill:#333;",
                        style: getStyle(connectConfigs.edgeType),
                        lineInterpolate: 'basis'
                    });
                }

            } else if (connectConfigs.type === 'fullyConnected') {

                for (var i=0; i < that.nodes; i++) {
                    for (var j=0; j < layerIn.nodes; j++) {

                        graph.setEdge(that.getNodeId(i), layerIn.getNodeId(j), {
                            arrowhead: 'normal',
                            arrowheadStyle: "stroke-width:1px; stroke: #333; fill:#333;",
                            style: getStyle(connectConfigs.edgeType),
                            lineInterpolate: 'basis'
                        });
                    }
                }

            } else {
                throw new Error('NeuralNetworkLayer.connectToLayer.invalidType');
            }
        };



        /*============ INITIALIZATION ============*/

        initialize();
    };


    /*============ PUBLIC STATIC VARIABLES/METHODS ============*/


})();