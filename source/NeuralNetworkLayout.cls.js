
var NeuralNetworkLayout;

(function () {

    /*============ PRIVATE STATIC VARIABLES/METHODS ============*/


    /*============ CLASS ============*/

    NeuralNetworkLayout = function (configs) {

        /*============ CONFIGURATION ============*/

        var that = this;
        var defaults = {};
        _.assign(that, defaults, configs);


        /*============ PRIVATE VARIABLES METHODS ============*/

        var layers = [];




        /*============ PUBLIC PROPERTIES AND METHODS ============*/

        that.addLayer = function (layerConfigs) {
            var newLayer = new NeuralNetworkLayer(layerConfigs);
            layers.push(newLayer);
            return newLayer;
        };



        /*============ INITIALIZATION ============*/

    };


    /*============ PUBLIC STATIC VARIABLES/METHODS ============*/


})();