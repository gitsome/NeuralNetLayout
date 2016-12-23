
var NeuralNetworkLayer;

(function () {

    /*============ PRIVATE STATIC VARIABLES/METHODS ============*/


    /*============ CLASS ============*/

    NeuralNetworkLayer = function (configs, graph) {

        /*============ CONFIGURATION ============*/

        var that = this;
        var defaults = {
            id: false,
            type: 'node',
            nodes: 1
        };
        _.extend(that, defaults, configs);

        if (!that.id) {
            throw new Error('NeuralNetworkLayer.connectToLayer.initializedWithNoId');
        }

        if (!that.nodes) {
            throw new Error('NeuralNetworkLayer.connectToLayer.initializedWithNoNodes');
        }


        /*============ PRIVATE VARIABLES METHODS ============*/

        var getNodeId = function (ind) {
            return that.id + '-' + ind;
        };

        var initialize = function () {
            for (var i=0; i < that.nodes; i++) {
                graph.setNode(getNodeId(i), {label: " ", shape: "circle"});
            }
        };


        /*============ PUBLIC PROPERTIES AND METHODS ============*/

        that.getNodeId = getNodeId;

        that.connectToLayer = function (layerIn, configs_in) {

            var defaultConnectionConfigs = {
                type: 'fullyConnected',
                color: '#444'
            };
            _.extend(that, defaultConnectionConfigs, configs_in);

            if (that.type === 'direct') {

                if (that.nodes !== layerIn.nodes) {
                    throw new Error('NeuralNetworkLayer.connectToLayer.mismatchedLayerSizesForDirectConnection');
                }

                for (var i=0; i < that.nodes; i++) {
                    graph.setEdge(that.getNodeId(i), layerIn.getNodeId(i), {arrowhead:'normal'});
                }

            } else if (that.type === 'fullyConnected') {

                for (var i=0; i < that.nodes; i++) {
                    for (var j=0; j < layerIn.nodes; j++) {
                        graph.setEdge(that.getNodeId(i), layerIn.getNodeId(j),  {arrowhead:'normal'});
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