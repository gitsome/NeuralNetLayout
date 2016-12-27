
var startDemo;

(function () {

    startDemo = function () {

        var singleHiddenNetwork = new NeuralNetworkLayout({});

        var inputLayer = singleHiddenNetwork.createLayer({
            nodes: 3,
            id: 'input',
            type: 'input'
        });

        var hidden1 = singleHiddenNetwork.createLayer({
            nodes: 3,
            id: 'hidden_1'
        });

        var hidden1Relu = singleHiddenNetwork.createLayer({
            nodes: 3,
            id: 'hidden_1_relu',
            type: 'activation'
        });

        var hidden1ReluOut = singleHiddenNetwork.createLayer({
            nodes: 3,
            id: 'hidden_1_relu_out'
        });

        var hidden2 = singleHiddenNetwork.createLayer({
            nodes: 3,
            id: 'hidden_2'
        });

        var hidden2Relu = singleHiddenNetwork.createLayer({
            nodes: 3,
            id: 'hidden_2_relu',
            type: 'activation'
        });

        var hidden2ReluOut = singleHiddenNetwork.createLayer({
            nodes: 3,
            id: 'hidden_2_relu_out'
        });

        var hiddenLinearOut = singleHiddenNetwork.createLayer({
            nodes: 2,
            id: 'hidden_linear_out'
        });

        var softmax = singleHiddenNetwork.createLayer({
            nodes: 2,
            id: 'softmax',
            type: 'activation'
        });

        var output = singleHiddenNetwork.createLayer({
            nodes: 2,
            id: 'output',
            type: 'output'
        });


        inputLayer.connectToLayer(hidden1, {
            type: 'fullyConnected',
            edgeType: 'weighted'
        });

        hidden1.connectToLayer(hidden1Relu, {
            type: 'direct',
            edgeType: 'activation'
        });

        hidden1Relu.connectToLayer(hidden1ReluOut, {
            type: 'direct',
            edgeType: 'activation'
        });

        hidden1ReluOut.connectToLayer(hidden2, {
            type: 'fullyConnected',
            edgeType: 'weighted'
        });

        hidden2.connectToLayer(hidden2Relu, {
            type: 'direct',
            edgeType: 'activation'
        });

        hidden2Relu.connectToLayer(hidden2ReluOut, {
            type: 'direct',
            edgeType: 'activation'
        });

        hidden2ReluOut.connectToLayer(hiddenLinearOut, {
            type: 'fullyConnected',
            edgeType: 'weighted'
        });

        hiddenLinearOut.connectToLayer(softmax, {
            type: 'direct',
            edgeType: 'activation'
        });


        softmax.connectToLayer(output, {
            type: 'direct',
            edgeType: 'activation'
        });

        singleHiddenNetwork.render('#container');
    };

})();
