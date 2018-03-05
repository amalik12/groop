// randomly shuffled upper and lowercase letters
var alphabet = "zXahjxJkSmLDIMqRuEHKNwWtYnOZvolCBGTpFgidVPceUAsfyQbr";
// subtract from seconds to avoid adding too many characters
var epoch = 1520209554524;

function generate(input) {
    let output = '';
    let seconds = Date.now() - epoch;
    output += encode(Math.floor(seconds / 1000));
    output += encode(input);
    output += encode(Math.floor(Math.random() * alphabet.length));
    return output;
}

function encode(input) {
    let output = '';
    while (input) {
        output += alphabet[input % alphabet.length];
        input = Math.floor(input / alphabet.length);
    }
    return output;
}

module.exports = generate;