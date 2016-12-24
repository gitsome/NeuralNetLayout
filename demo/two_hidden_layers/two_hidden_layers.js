
var startDemo;

(function () {

    startDemo = function () {

        var singleHiddenNetwork = new NeuralNetworkLayout({});

        var inputLayer = singleHiddenNetwork.createLayer({
            nodes: 4,
            id: 'input'
        });

        var hidden1 = singleHiddenNetwork.createLayer({
            nodes: 4,
            id: 'hidden_1'
        });

        var hidden1Relu = singleHiddenNetwork.createLayer({
            nodes: 4,
            id: 'hidden_1_relu',
            type: 'activation'
        });

        var hidden2 = singleHiddenNetwork.createLayer({
            nodes: 4,
            id: 'hidden_2'
        });

        var hidden2Relu = singleHiddenNetwork.createLayer({
            nodes: 4,
            id: 'hidden_2_relu',
            type: 'activation'
        });

        var softmax = singleHiddenNetwork.createLayer({
            nodes: 2,
            id: 'softmax'
        });

        var output = singleHiddenNetwork.createLayer({
            nodes: 2,
            id: 'output'
        });


        inputLayer.connectToLayer(hidden1, {
            type: 'fullyConnected'
        });

        hidden1.connectToLayer(hidden1Relu, {
            type: 'direct'
        });

        hidden1Relu.connectToLayer(hidden2, {
            type: 'fullyConnected'
        });

        hidden2.connectToLayer(hidden2Relu, {
            type: 'direct'
        });

        hidden2Relu.connectToLayer(softmax, {
            type: 'fullyConnected'
        });

        softmax.connectToLayer(output, {
            type: 'direct'
        });

        singleHiddenNetwork.render('#container');
    };

})();
