
var startDemo;

(function () {

    startDemo = function () {

        var singleHiddenNetwork = new NeuralNetworkLayout({});

        var inputLayer = singleHiddenNetwork.createLayer({
            id: 'input'
        });

        var hiddenLayer = singleHiddenNetwork.createLayer({
            id: 'hidden'
        });

        inputLayer.connectToLayer(hiddenLayer, {});

        singleHiddenNetwork.render('#container');
    };

})();
