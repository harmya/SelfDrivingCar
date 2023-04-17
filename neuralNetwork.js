var synaptic = require('synaptic');
var Neuron = synaptic.Neuron;
var Layer = synaptic.Layer;
var Network = synaptic.Network;
var Trainer = synaptic.Trainer;
var Architect = synaptic.Architect;

// The Neuron class

class NeuralNetwork {
    constructor(neuronsPerLayer) {
        this.inputLayer = new Layer(neuronsPerLayer[0]);
        this.hiddenLayers = [];
        for (let i = 1; i < neuronsPerLayer.length - 1; i++) {
            var hiddenLayer = new Layer(neuronsPerLayer[i]);
            this.hiddenLayers.push(hiddenLayer);
        }
        this.outputLayer = new Layer(neuronsPerLayer[neuronsPerLayer.length - 1]);

        this.inputLayer.project(this.hiddenLayers[0]);
        for (let i = 0; i < this.hiddenLayers.length - 1; i++) {
            this.hiddenLayers[i].project(this.hiddenLayers[i + 1]);
        }
        this.hiddenLayers[this.hiddenLayers.length - 1].project(this.outputLayer);

        this.network = new Network({
            input: this.inputLayer,
            hidden: this.hiddenLayers,
            output: this.outputLayer
        });
    }

    static mutateNetork(network, mutationRate) {
        

    }
}

myNeuralNetwork = new NeuralNetwork([10, 15, 10, 4]);

console.log(myNeuralNetwork.network.activate(
    [0, 0, 0, 0, 0, 0, 0, 0, 0.6154717646857175,  0.6610472513481518])
    );





