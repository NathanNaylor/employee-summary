// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {

        //calling constructor of employee class
        super(name, id, email);

        this.officeNumber = officeNumber;

        this.job = "Manager";
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager