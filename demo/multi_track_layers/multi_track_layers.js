
var startDemo;

(function () {

    startDemo = function () {

        var singleHiddenNetwork = new NeuralNetworkLayout({});

        var inputLayer = singleHiddenNetwork.createLayer({
            nodes: 4,
            id: 'input',
            type: 'input'
        });

        var track1_staging = singleHiddenNetwork.createLayer({
            nodes: 4,
            id: 'track1_staging'
        });

        var track1_hidden1 = singleHiddenNetwork.createLayer({
            nodes: 4,
            id: 'track1_hidden_1'
        });

        var track1_hidden1Relu = singleHiddenNetwork.createLayer({
            nodes: 4,
            id: 'track1_hidden_1_relu',
            type: 'activation'
        });

        var track1_hidden2 = singleHiddenNetwork.createLayer({
            nodes: 4,
            id: 'track1_hidden_2'
        });

        var track1_hidden2Relu = singleHiddenNetwork.createLayer({
            nodes: 4,
            id: 'track1_hidden_2_relu',
            type: 'activation'
        });


        var track2_staging = singleHiddenNetwork.createLayer({
            nodes: 4,
            id: 'track2_staging'
        });


        var softmax = singleHiddenNetwork.createLayer({
            nodes: 2,
            id: 'softmax'
        });

        var output = singleHiddenNetwork.createLayer({
            nodes: 2,
            id: 'output',
            type: 'output'
        });


        /*============ TRACK ONE ============*/

        inputLayer.connectToLayer(track1_staging, {
            type: 'direct'
        });

        track1_staging.connectToLayer(track1_hidden1, {
            type: 'fullyConnected'
        });

        track1_hidden1.connectToLayer(track1_hidden1Relu, {
            type: 'direct'
        });

        track1_hidden1Relu.connectToLayer(track1_hidden2, {
            type: 'fullyConnected'
        });

        track1_hidden2.connectToLayer(track1_hidden2Relu, {
            type: 'direct'
        });

        track1_hidden2Relu.connectToLayer(softmax, {
            type: 'fullyConnected'
        });


        /*============ TRACK TWO ============*/

        inputLayer.connectToLayer(track2_staging, {
            type: 'direct'
        });

        track2_staging.connectToLayer(softmax, {
            type: 'fullyConnected'
        });


        /*============ OUTPUT ============*/

        softmax.connectToLayer(output, {
            type: 'direct'
        });


        singleHiddenNetwork.render('#container');
    };

})();
