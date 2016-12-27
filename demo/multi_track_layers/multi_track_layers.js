
var startDemo;

(function () {

    startDemo = function () {

        var singleHiddenNetwork = new NeuralNetworkLayout({});

        var inputLayer = singleHiddenNetwork.createLayer({
            nodes: 3,
            type: 'input'
        });

        var track1_staging = singleHiddenNetwork.createLayer({nodes: 3 });

        var track1_hidden1 = singleHiddenNetwork.createLayer({nodes: 3 });

        var track1_hidden1Relu = singleHiddenNetwork.createLayer({nodes: 3, type: 'activation' });

        var track1_hidden1ReluOut = singleHiddenNetwork.createLayer({nodes: 3 });

        var track1_hidden2 = singleHiddenNetwork.createLayer({nodes: 2 });

        var track1_hidden2Relu = singleHiddenNetwork.createLayer({nodes: 2, type: 'activation' });

        var track1_hidden2ReluOut = singleHiddenNetwork.createLayer({nodes: 2 });


        var track2_staging = singleHiddenNetwork.createLayer({nodes: 3 });

        var track2_hidden = singleHiddenNetwork.createLayer({nodes: 2 });


        var trackCombine = singleHiddenNetwork.createLayer({nodes: 2 });

        var softmax = singleHiddenNetwork.createLayer({nodes: 2, type: 'activation' });

        var output = singleHiddenNetwork.createLayer({nodes: 2, type: 'output' });


        /*============ TRACK ONE ============*/

        inputLayer.connectToLayer(track1_staging, {
            type: 'direct',
            edgeType: 'passThrough'
        });

        track1_staging.connectToLayer(track1_hidden1, {
            type: 'fullyConnected',
            edgeType: 'weighted'
        });

        track1_hidden1.connectToLayer(track1_hidden1Relu, {
            type: 'direct',
            edgeType: 'activation'
        });

        track1_hidden1Relu.connectToLayer(track1_hidden1ReluOut, {
            type: 'direct',
            edgeType: 'activation'
        });

        track1_hidden1ReluOut.connectToLayer(track1_hidden2, {
            type: 'fullyConnected',
            edgeType: 'weighted'
        });

        track1_hidden2.connectToLayer(track1_hidden2Relu, {
            type: 'direct',
            edgeType: 'activation'
        });

        track1_hidden2Relu.connectToLayer(track1_hidden2ReluOut, {
            type: 'direct',
            edgeType: 'activation'
        });

        track1_hidden2ReluOut.connectToLayer(trackCombine, {
            type: 'direct',
            edgeType: 'passThrough'
        });


        /*============ TRACK TWO ============*/

        inputLayer.connectToLayer(track2_staging, {
            type: 'direct',
            edgeType: 'passThrough'
        });

        track2_staging.connectToLayer(track2_hidden, {
            type: 'fullyConnected',
            edgeType: 'weighted'
        });

        track2_hidden.connectToLayer(trackCombine, {
            type: 'direct',
            edgeType: 'passThrough'
        });


        /*============ OUTPUT ============*/

        trackCombine.connectToLayer(softmax, {
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
