
var NeuralNetworkLayer;

(function () {

    /*============ PRIVATE STATIC VARIABLES/METHODS ============*/


    /*============ CLASS ============*/

    NeuralNetworkLayer = function (configs) {

        /*============ CONFIGURATION ============*/

        var that = this;
        var defaults = {
            nodes: 1
        };
        _.assign(that, defaults, configs);


        /*============ PRIVATE VARIABLES METHODS ============*/




        /*============ PUBLIC PROPERTIES AND METHODS ============*/

        that.connectToLayer = function (layerIn, configs_in) {

            var defaultConnectionConfigs = {
                type: 'fullyConnected',
                color: '#444'
            };
            var configs = _.assign({}, defaultConnectionConfigs, configs_in);



        };



        /*============ INITIALIZATION ============*/

    };


    /*============ PUBLIC STATIC VARIABLES/METHODS ============*/


})();