class NeuralNetwork {
    constructor(neuronsPerLayer) {
        this.layers = [];

        for (let i = 0; i < neuronsPerLayer.length - 1; i++) {
            this.layers.push(new Layer(neuronsPerLayer[i], neuronsPerLayer[i + 1]));
        }
    }

    static networkFeedForward(inputs, network) {
        let curr_output = Layer.feedForward(inputs, network.layers[0]);
        for (let i = 1; i < network.layers.length; i++) {
            curr_output = Layer.feedForward(curr_output, network.layers[i]);
        }

        return curr_output;
    }
}

class Layer {
    constructor(inputSize, outputSize) {
        this.inputSize = inputSize;
        this.outputSize = outputSize;

        this.inputs = new Array(inputSize);
        this.outputs = new Array(outputSize);
        this.biases = new Array(outputSize);

        this.weights = [];

        for (let i = 0; i < inputSize; i++) {
            this.weights.push(new Array(outputSize));
        }

        Layer.#initailizeModel(this);
    }

    static #initailizeModel(layer) {
        for (let i = 0; i < layer.inputSize; i++) {
            for (let j = 0; j < layer.outputSize; j++) {
                layer.weights[i][j] = Math.random() * 2 - 1;
            }
        }

        for (let i = 0; i < layer.biases.length; i++) {
            layer.biases[i] = Math.random() * 2 - 1;
        }

    }

    static feedForward(inputs, layer) {
        for (let i = 0; i < layer.inputSize; i++) {
            layer.inputs[i] = inputs[i];
        }
        for (let i = 0; i < layer.outputSize; i++) {
            let sum = 0;

            for (let j = 0; j < layer.inputSize; j++) {
                sum += layer.inputs[j] * layer.weights[j][i];
            }

            if (sum + layer.biases[i] > 0) {
                layer.outputs[i] = 1;
            } else {
                layer.outputs[i] = 0;
            }

        }
        return layer.outputs;
    }
}