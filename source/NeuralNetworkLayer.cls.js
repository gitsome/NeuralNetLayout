
var NeuralNetworkLayer;

(function () {

    /*============ PRIVATE STATIC VARIABLES/METHODS ============*/

    var layerId = 0;
    var layerIdMap = {};

    var sortRank = 0;
    var getNextSortRank = function () {
        return sortRank++;
    };

    var getNextLayerId = function () {
        return layerId++;
    };

    var getNodeStyle = function () {

        var that = this;

        if (that.type === 'input' || that.type === 'output') {
            return "stroke: #5cb85c;";
        } else {
            return "";
        }
    };


    /*============ CLASS ============*/

    NeuralNetworkLayer = function (configs, graph) {

        /*============ CONFIGURATION ============*/

        var that = this;
        var defaults = {
            id: getNextLayerId(),
            type: 'node',
            nodes: 1,
            sameRankAs: false,
            label: false
        };
        _.extend(that, defaults, configs);

        if (!that.nodes) {
            throw new Error('NeuralNetworkLayer.connectToLayer.initializedWithNoNodes');
        }

        layerIdMap[that.id] = {layer: that, firstNodId: false};


        /*============ PRIVATE VARIABLES METHODS ============*/

        var layerTypeShapeMap = {
            'activation': 'rect',
            'input': 'diamond',
            'output': 'diamond',
            'bias': 'ellipse'
        };

        var layerStyleMap = {
            'activation': 'stroke: #f0ad4e; stroke-width: 2px;',
            'input': 'stroke: #666; stroke-width: 1px;',
            'output': 'stroke: #666; stroke-width: 1px;',
            'bias': 'stroke: #337ab7; stroke-width: 2px; fill: #d6ecff;'
        };

        var layerTypeLabelStyleMap = {
            'activation': 'stroke: #90744c; font-size: 12px;'
        };

        var getNodeId = function (ind) {
            return that.id + '-' + ind;
        };

        var initialize = function () {

            var layerRank = getNextSortRank();

            var firstNodeId = false;
            var nodeId;
            var sameRankAs;

            for (var i=0; i < that.nodes; i++) {

                nodeId = getNodeId(i);

                if (firstNodeId === false) {
                    firstNodeId = nodeId;
                    layerIdMap[that.id].firstNodeId = firstNodeId;
                }

                sameRankAs = firstNodeId;
                if (that.sameRankAs !== false) {
                    sameRankAs = layerIdMap[that.sameRankAs].firstNodeId;
                }

                graph.setNode(nodeId, {
                    label: that.label ? that.label : "",
                    labelStyle: layerTypeLabelStyleMap[that.type] ? layerTypeLabelStyleMap[that.type] : '',
                    shape: layerTypeShapeMap[that.type] ? layerTypeShapeMap[that.type] : "circle",
                    getNodeStyle: getNodeStyle.call(that),
                    style: layerStyleMap[that.type],
                    sortRank: layerRank,
                    sameRankAs: sameRankAs,
                    width: that.type === 'bias' ? 6 : 20,
                    height: that.type === 'bias' ? 6 : 20
                });
            }
        };

        var layerTypeToEdgeTypeMap = {
            'fullyConnected': 'weighted',
            'activation': 'activation',
            'direct': 'normal'
        };

        var edgeStyleMap = {
            'activation': 'stroke: #f0ad4e; stroke-width: 2.5px; fill:none;',
            'weighted': 'stroke: #5cb85c; stroke-width: 2.5px; fill:none;',
            'normal': 'stroke: #888; stroke-width: 2px; stroke-dasharray: 12, 4; fill:none;',
            'passThrough': 'stroke: #888; stroke-width: 2px; stroke-dasharray: 12, 4; fill:none;',
            'bias': 'stroke: #337ab7; stroke-width: 2px; stroke-dasharray: 3, 3; fill:none;'
        };

        var connectTypeLabelStyleMap = {
            'activation': 'stroke: #90744c;'
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
                lineInterpolate: 'basis',
                color: '#444',
                label: ''
            };
            var connectConfigs = _.extend({}, defaultConnectionConfigs, configs_in);

            var layerRank = getNextSortRank();

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
                        lineInterpolate: connectConfigs.lineInterpolate,
                        sortRank: layerRank,
                        label: connectConfigs.label ? connectConfigs.label : "",
                        labelStyle: connectTypeLabelStyleMap[connectConfigs.edgeType] ? connectTypeLabelStyleMap[connectConfigs.edgeType] : '',
                        labelpos: 'c'
                    });
                }

            } else if (connectConfigs.type === 'fullyConnected') {

                for (var i=0; i < that.nodes; i++) {
                    for (var j=0; j < layerIn.nodes; j++) {

                        graph.setEdge(that.getNodeId(i), layerIn.getNodeId(j), {
                            arrowhead: 'normal',
                            arrowheadStyle: "stroke-width:1px; stroke: #333; fill:#333;",
                            style: getStyle(connectConfigs.edgeType),
                            lineInterpolate: connectConfigs.lineInterpolate,
                            sortRank: layerRank,
                            label: connectConfigs.label ? connectConfigs.label : "",
                            labelStyle: connectTypeLabelStyleMap[connectConfigs.edgeType] ? connectTypeLabelStyleMap[connectConfigs.edgeType] : '',
                            labelpos: 'c'
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