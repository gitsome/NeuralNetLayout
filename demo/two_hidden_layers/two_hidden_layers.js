
var startDemo;

(function () {

    startDemo = function () {

        /*============ LAYERS ============*/

        var singleHiddenNetwork = new NeuralNetworkLayout({});

        var inputLayer = singleHiddenNetwork.createLayer({nodes: 3, type: 'input'});


        var hidden1 = singleHiddenNetwork.createLayer({nodes: 3});

        var hidden1Bias = singleHiddenNetwork.createLayer({nodes: 3, type: 'bias'});

        var hidden1Out = singleHiddenNetwork.createLayer({nodes: 3});

        var hidden1Relu = singleHiddenNetwork.createLayer({nodes: 3, type: 'activation', label: 'RELU'});

        var hidden1ReluOut = singleHiddenNetwork.createLayer({nodes: 3});


        var hidden2 = singleHiddenNetwork.createLayer({nodes: 2});

        var hidden2Bias = singleHiddenNetwork.createLayer({nodes: 2, type: 'bias'});

        var hidden2Out = singleHiddenNetwork.createLayer({nodes: 2});


        var softmax = singleHiddenNetwork.createLayer({nodes: 1, type: 'activation', label: 'SOFTMAX'});

        var output = singleHiddenNetwork.createLayer({nodes: 2, type: 'output'});


        /*============ CONNECTIONS ============*/

        inputLayer.connectToLayer(hidden1, {
            type: 'fullyConnected',
            edgeType: 'weighted'
        });


        hidden1.connectToLayer(hidden1Out, {
            type: 'direct',
            edgeType: 'normal'
        });

        hidden1Bias.connectToLayer(hidden1Out, {
            type: 'direct',
            edgeType: 'bias',
            lineInterpolate: 'normal'
        });

        hidden1Out.connectToLayer(hidden1Relu, {
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


        hidden2.connectToLayer(hidden2Out, {
            type: 'direct',
            edgeType: 'normal'
        });

        hidden2Bias.connectToLayer(hidden2Out, {
            type: 'direct',
            edgeType: 'bias',
            lineInterpolate: 'normal'
        });

        hidden2Out.connectToLayer(softmax, {
            type: 'fullyConnected',
            edgeType: 'activation'
        });

        softmax.connectToLayer(output, {
            type: 'fullyConnected',
            edgeType: 'activation'
        });


        /*============ RENDER ============*/

        singleHiddenNetwork.render('#container');
    };

})();
