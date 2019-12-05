const app = require('commander');
const { getTrelloBoard, trelloToModel } = require('api/trello');
const { writeAsDoc, rawer } = require('./docs-writer');

export function main(args) {
    app.version('1.0.0')
        .requiredOption('-k, --key <key>', 'Trello API Key')
        .requiredOption('-t, --token <token>', 'Trello API Token')
        .option('-r, --raw <raws>', 'Export Raw', '')
        .option('--board <board>', 'Trello board', 'Sphérier')
        .option('-o, --output-dir <output-dir>', 'output directory', 'tmp')
        .action((options) => {
            const writeRaw = rawer(options.raw, options.outputDir);
            getTrelloBoard(options.key, options.token, options.board)
                .then(writeRaw('trello'))
                .then(trelloToModel)
                .then(writeRaw('model'))
                .then(writeAsDoc(options.outputDir))
            // .then((trelloOutput) =>
            // console.log('GOT: ' + JSON.stringify(trelloOutput))
            // )
            ;
        });
    app.parse(args);
};

