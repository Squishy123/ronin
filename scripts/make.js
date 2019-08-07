const templates = require('./templates/make');
const fs = require('fs');
const camelCase = require('camelcase');


module.exports = (args) => {
    //null
    if (args[0] === 'make') {
        console.log(
            `Usage: ronin make:[cmd] [args]

Supported Commands: migration, model, route`);
    }

    //make:migration %NAME%
    if (args[0] === 'make:migration') {
        if (!args[1])
            console.error("Error: No Name Specified.")

        let migration = templates.MAKE_MIGRATION;

        if (args[1].lastIndexOf('/') == -1) {
            migration = migration.replace(/%MIGRATION%/g, camelCase(args[1], { pascalCase: true }));
        } else {
            migration = migration.replace(/%MIGRATION%/g, camelCase(args[1].substr(args[1].lastIndexOf('/') + 1), { pascalCase: true }));
            if (args[1].lastIndexOf('/') != -1) {
                if (!fs.existsSync(`./src/server/migrations/${camelCase(args[1]).substr(0, args[1].lastIndexOf('/'))}`)) {
                    fs.mkdirSync(`./src/server/migrations/${camelCase(args[1]).substr(0, args[1].lastIndexOf('/'))}`, { recursive: true });
                }
            }
        }

        fs.writeFileSync(`./src/server/migrations/${camelCase(args[1])}.js`, migration, { flag: 'wx' });
        console.log(`Migration Successfully Created!`)
    }

    //make:model %NAME%
    if (args[0] === 'make:model') {
        if (!args[1])
            console.error("Error: No Name Specified.")

        let model = templates.MAKE_MODEL;

        if (args[1].lastIndexOf('/') == -1) {
            model = model.replace(/%MODEL%/g, camelCase(args[1], { pascalCase: true }));
        } else {
            model = model.replace(/%MODEL%/g, camelCase(args[1].substr(args[1].lastIndexOf('/') + 1), { pascalCase: true }));
            if (args[1].lastIndexOf('/') != -1) {
                if (!fs.existsSync(`./src/app/models/${camelCase(args[1]).substr(0, args[1].lastIndexOf('/'))}`)) {
                    fs.mkdirSync(`./src/app/models/${camelCase(args[1]).substr(0, args[1].lastIndexOf('/'))}`, { recursive: true });
                }
            }
        }

        fs.writeFileSync(`./src/app/models/${camelCase(args[1])}.js`, model, { flag: 'wx' });
        console.log(`Model Successfully Created!`)
    }

    //make:route %NAME% %METHOD% %PATH
    if (args[0] === 'make:route') {
        if (!args[1])
            console.error("Error: No Name Specified.")

        let model = templates.MAKE_ROUTE;
        model = model.replace(/%METHOD%/g, args[2].toUpperCase()).replace(/%PATH%/g, args[3].toLowerCase());

        if (args[1].lastIndexOf('/') != -1) {
            if (!fs.existsSync(`./src/app/routes/${camelCase(args[1]).substr(0, args[1].lastIndexOf('/'))}`)) {
                fs.mkdirSync(`./src/app/routes/${camelCase(args[1]).substr(0, args[1].lastIndexOf('/'))}`, { recursive: true });
            }
        }

        fs.writeFileSync(`./src/app/routes/${camelCase(args[1])}.js`, model, { flag: 'wx' });
        console.log(`Route Successfully Created!`)
    }
}