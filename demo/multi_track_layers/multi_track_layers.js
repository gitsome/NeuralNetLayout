
var startDemo;

(function () {

    startDemo = function () {

        var singleHiddenNetwork = new NeuralNetworkLayout({});

        /*============ INPUT LAYER ============*/

        var inputLayer = singleHiddenNetwork.createLayer({nodes: 3, type: 'input'});


        /*============ TRACK 1 LAYERS ============*/

        var track1_staging = singleHiddenNetwork.createLayer({nodes: 3 });

        var track1_hidden1 = singleHiddenNetwork.createLayer({nodes: 3 });

        var track1_hidden1_bias = singleHiddenNetwork.createLayer({nodes: 3, type: 'bias'});

        var track1_hidden1_out = singleHiddenNetwork.createLayer({nodes: 3, id: 'track1_hidden1_out'});

        var track1_hidden1Relu = singleHiddenNetwork.createLayer({nodes: 3, type: 'activation', label: 'RELU'});

        var track1_hidden1ReluOut = singleHiddenNetwork.createLayer({nodes: 3 });


        var track1_hidden2 = singleHiddenNetwork.createLayer({nodes: 2 });

        var track1_hidden2_bias = singleHiddenNetwork.createLayer({nodes: 2, type: 'bias'});

        var track1_hidden2_out = singleHiddenNetwork.createLayer({nodes: 2 });

        var track1_hidden2Relu = singleHiddenNetwork.createLayer({nodes: 2, type: 'activation', label: 'RELU'});

        var track1_hidden2ReluOut = singleHiddenNetwork.createLayer({nodes: 2 });


        /*============ TRACK 2 LAYERS ============*/

        var track2_staging = singleHiddenNetwork.createLayer({nodes: 3 });

        var track2_hidden = singleHiddenNetwork.createLayer({nodes: 2, id: 'track2_hidden'});

        var track2_hidden_bias = singleHiddenNetwork.createLayer({nodes: 2, type: 'bias', sameRankAs: 'track2_hidden'});

        var track2_hidden_out = singleHiddenNetwork.createLayer({nodes: 2, sameRankAs: 'track1_hidden1_out'});


        /*============ MERGED OUTPUT LAYERS ============*/

        var trackCombine = singleHiddenNetwork.createLayer({nodes: 2 });

        var softmax = singleHiddenNetwork.createLayer({nodes: 1, type: 'activation', label: 'SOFTMAX'});

        var output = singleHiddenNetwork.createLayer({nodes: 2, type: 'output' });


        /*============ TRACK ONE CONNECTIONS ============*/

        inputLayer.connectToLayer(track1_staging, {
            type: 'direct',
            edgeType: 'passThrough'
        });

        track1_staging.connectToLayer(track1_hidden1, {
            type: 'fullyConnected',
            edgeType: 'weighted'
        });

        track1_hidden1.connectToLayer(track1_hidden1_out, {
            type: 'direct',
            edgeType: 'normal'
        });

        track1_hidden1_bias.connectToLayer(track1_hidden1_out, {
            type: 'direct',
            edgeType: 'bias',
            lineInterpolate: 'normal'
        });

        track1_hidden1_out.connectToLayer(track1_hidden1Relu, {
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

        track1_hidden2.connectToLayer(track1_hidden2_out, {
            type: 'direct',
            edgeType: 'normal'
        });

        track1_hidden2_bias.connectToLayer(track1_hidden2_out, {
            type: 'direct',
            edgeType: 'bias',
            lineInterpolate: 'normal'
        });

        track1_hidden2_out.connectToLayer(track1_hidden2Relu, {
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


        /*============ TRACK TWO CONNECTIONS ============*/

        inputLayer.connectToLayer(track2_staging, {
            type: 'direct',
            edgeType: 'passThrough'
        });

        track2_staging.connectToLayer(track2_hidden, {
            type: 'fullyConnected',
            edgeType: 'weighted'
        });

        track2_hidden.connectToLayer(track2_hidden_out, {
            type: 'direct',
            edgeType: 'normal'
        });

        track2_hidden_bias.connectToLayer(track2_hidden_out, {
            type: 'direct',
            edgeType: 'bias',
            lineInterpolate: 'normal'
        });

        track2_hidden_out.connectToLayer(trackCombine, {
            type: 'direct',
            edgeType: 'passThrough'
        });


        /*============ OUTPUT CONNECTIONS============*/

        trackCombine.connectToLayer(softmax, {
            type: 'fullyConnected',
            edgeType: 'activation'
        });

        softmax.connectToLayer(output, {
            type: 'fullyConnected',
            edgeType: 'activation'
        });


        singleHiddenNetwork.render('#container');
    };

})();
