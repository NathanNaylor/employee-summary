const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const company = [];


createManager();


function createManager() {
    inquirer
        .prompt([

            {
                type: "input",

                message: "What is your Manager's name?",

                name: "managerName"
            },
            {
                type: "input",

                message: "What is your Manager's ID?",

                name: "managerId"
            },
            {
                type: "input",

                message: "What is your Manager's email?",

                name: "managerEmail"
            },
            {
                type: "input",

                message: "What is your Manager's office number?",

                name: "managerOffice"
            }
        ])
        .then(answer => {
            const newManager = new Manager(answer.managerName, answer.managerId, answer.managerEmail, answer.managerOffice)
            company.push(newManager)
            employeeType();
        })

}

function createEmployee(job) {
    if (job === "Engineer") {
        createEngineer()
    } else if (job === "Intern") {
        createIntern()
    } else {
        writeFile();
    }
}

function createEngineer() {
    inquirer
        .prompt([

            {
                message: `What is your Engineer's name?`,

                name: `name`
            },
            {
                message: `What is your Engineer's ID?`,

                name: `id`
            },
            {
                message: `What is your Engineer's email?`,

                name: `email`
            },
            {
                message: `What is your Engineer's GitHub?`,

                name: `github`
            }

        ])
        .then(answers => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
            company.push(engineer);
            employeeType()
        })
}

function createIntern() {
    inquirer
        .prompt([

            {
                message: `What is your Intern's name?`,

                name: `name`
            },
            {
                message: `What is your Intern's ID?`,

                name: `id`
            },
            {
                message: `What is your Intern's email?`,

                name: `email`
            },
            {
                message: `What is your Intern's School?`,

                name: `school`
            }

        ])
        .then(answers => {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
            company.push(intern);
            employeeType()
        })
}

function employeeType() {

    inquirer
        .prompt(
            [{
                type: "list",

                message: "What kind of Employee would you like to add?",

                choices: ["Engineer", "Intern", "I don't want to add any more team members."],

                name: "type"
            }],

        )
        .then(answers => {
            createEmployee(answers.type);
        })
}

function writeFile() {

    fs.writeFile(outputPath, render(company), err => {
        if (err) {
            console.log(err);
        }
        console.log("Done writing file: " + outputPath);
    });
}