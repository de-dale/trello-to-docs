const fs = require('fs');
const { writeAsDoc } = require('../src/docs-writer');

describe('Write Model As Book', () => {

    const testFolder = 'test/tmp';

    afterAll(() => {
        fs.rmdirSync(testFolder, { recursive: true });
    });

    it('should write model as doc', () => {
        let model = readResource('simple-piped-with-quotes.card.json');
        model = {
            'pages': [
                {
                    'name': 'Idées en vrac',
                    'description': '',
                    'fileName': 'idees-en-vrac',
                    'position': 65535,
                    'trelloShortUrl': '',
                    'pages': [
                        {
                            'name': 'Achievments',
                            'description': 'Faire faire un vote aux joueurs pour déterminer qui est le meilleur truc ou bidule.',
                            'position': 81920,
                            'trelloShortUrl': 'A8EkQ4R0',
                            'pages': [],
                            'fileName': 'achievments'
                        }
                    ]
                } ]
        };

        writeAsDoc(testFolder)(model)
    });

});

const readResource = (fileName) => readFile('__resources__/' + fileName);

const readFile = (fileName) => JSON.parse(fs.readFileSync(__dirname + '/' + fileName));