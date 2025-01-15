// Importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// Define the Cli class
class Cli {
    // TODO: update the vehicles property to accept Truck and Motorbike objects as well
  // TODO: You will need to use the Union operator to define additional types for the array
  // TODO: See the AbleToTow interface for an example of how to use the Union operator
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  // TODO: Update the constructor to accept Truck and Motorbike objects as well
  constructor(vehicles: (Car | Truck | Motorbike)[] = []) {
    this.vehicles = vehicles;
  }

  // Static method to generate a VIN
  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // Method to start the CLI
  startCli(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "CreateOrSelect",
          message:
            "Would you like to create a new vehicle or perform an action on an existing vehicle?",
          choices: ["Create a new vehicle", "Select an existing vehicle", "Exit"],
        },
      ])
      .then((answers) => {
        if (answers.CreateOrSelect === "Create a new vehicle") {
          this.createVehicle();
        } else if (answers.CreateOrSelect === "Select an existing vehicle") {
          this.chooseVehicle();
        } else {
          console.log("Exiting the application. Goodbye!");
          this.exit = true;
        }
      });
  }

  // Method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "Select a vehicle type:",
          // TODO: Update the choices array to include Truck and Motorbike
          choices: ["Car", "Truck", "Motorbike"],
        },
      ])
      // TODO: add statements to create a truck or motorbike if the user selects the respective vehicle type
      .then((answers) => {
        if (answers.vehicleType === "Car") {
          this.createCar();
        } else if (answers.vehicleType === "Truck") {
          this.createTruck();
        } else if (answers.vehicleType === "Motorbike") {
          this.createMotorbike();
        }
      });
  }

  // Method to create a car
  createCar(): void {
    inquirer
      .prompt([
        { type: "input",
          name: "color",
          message: "Enter Color:" 
        },
        { type: "input",
          name: "make", 
          message: "Enter Make:" 
        },
        { type: "input", 
          name: "model",
          message: "Enter Model:" 
        },
        { type: "input", 
          name: "year", 
          message: "Enter Year:" 
        },
        { type: "input", 
          name: "weight", 
          message: "Enter Weight:"
        },
        { type: "input", 
          name: "topSpeed", 
          message: "Enter Top Speed:" 
        },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(car);
        console.log("Car created successfully!");
        this.startCli();
      });
  }

  // Method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        { type: "input", 
          name: "color", 
          message: "Enter Color:" 
        },
        { type: "input", 
          name: "make", 
          message: "Enter Make:" 
        },
        { type: "input", 
          name: "model", 
          message: "Enter Model:" 
        },
        { type: "input", 
          name: "year", 
          message: "Enter Year:" 
        },
        { type: "input", 
          name: "weight", 
          message: "Enter Weight:" 
        },
        { type: "input", 
          name: "topSpeed", 
          message: "Enter Top Speed:" 
        },
        { type: "input", 
          name: "towingCapacity", 
          message: "Enter Towing Capacity:" 
        },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [new Wheel(), new Wheel(), new Wheel(), new Wheel()],
          parseInt(answers.towingCapacity)
        );
        this.vehicles.push(truck);
        console.log("Truck created successfully!");
        this.startCli();
      });
  }

  // Method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        { type: "input", 
          name: "color", 
          message: "Enter Color:" 
        },
        { type: "input", 
          name: "make", 
          message: "Enter Make:" 
        },
        { type: "input", 
          name: "model", 
          message: "Enter Model:" 
        },
        { type: "input", 
          name: "year", 
          message: "Enter Year:" 
        },
        { type: "input", 
          name: "weight", 
          message: "Enter Weight:" 
        },
        { type: "input", 
          name: "topSpeed", 
          message: "Enter Top Speed:" 
        },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [new Wheel(17, "Michelin"), new Wheel(17, "Michelin")]
        );
        this.vehicles.push(motorbike);
        console.log("Motorbike created successfully!");
        this.startCli();
      });
  }

  // Method to choose a vehicle
  chooseVehicle(): void {
    if (this.vehicles.length === 0) {
      console.log("No vehicles available. Please create one first.");
      this.startCli();
      return;
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on:",
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.make} ${vehicle.model} (VIN: ${vehicle.vin})`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  // Method to perform actions on a vehicle
  performActions(): void {
    const selectedVehicle = this.vehicles.find(
      (vehicle) => vehicle.vin === this.selectedVehicleVin
    );

    if (!selectedVehicle) {
      console.log("No vehicle selected.");
      this.startCli();
      return;
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Select an action:",
          choices: [
            "Print details",
            "Start vehicle",
            "Accelerate 5 MPH",
            "Decelerate 5 MPH",
            "Stop vehicle",
            "Turn right",
            "Turn left",
            "Reverse",
            "Tow a vehicle (Truck only)",
            "Perform a wheelie (Motorbike only)",
            "Select or create another vehicle",
            "Exit",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.action) {
          case "Print details":
            selectedVehicle.printDetails();
            break;
          case "Start vehicle":
            selectedVehicle.start();
            break;
          case "Accelerate 5 MPH":
            selectedVehicle.accelerate(5);
            break;
          case "Decelerate 5 MPH":
            selectedVehicle.decelerate(5);
            break;
          case "Stop vehicle":
            selectedVehicle.stop();
            break;
          case "Turn right":
            selectedVehicle.turn("right");
            break;
          case "Turn left":
            selectedVehicle.turn("left");
            break;
          case "Reverse":
            selectedVehicle.reverse();
            break;
          case "Tow a vehicle (Truck only)":
            if (selectedVehicle instanceof Truck) {
              this.findVehicleToTow(selectedVehicle);
            } else {
              console.log("This action is only available for trucks.");
            }
            break;
          case "Perform a wheelie (Motorbike only)":
            if (selectedVehicle instanceof Motorbike) {
              selectedVehicle.wheelie();
            } else {
              console.log("This action is only available for motorbikes.");
            }
            break;
          case "Select or create another vehicle":
            this.startCli();
            return;
          case "Exit":
            console.log("Exiting. Goodbye!");
            this.exit = true;
            return;
          default:
            console.log("Invalid action.");
        }

        if (!this.exit) {
          this.performActions();
        }
      });
  }

  // Method to find a vehicle to tow
  findVehicleToTow(truck: Truck): void {
    const towableVehicles = this.vehicles.filter((vehicle) => vehicle.vin !== truck.vin);

    if (towableVehicles.length === 0) {
      console.log("No vehicles available to tow.");
      this.performActions();
      return;
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleToTow",
          message: "Select a vehicle to tow:",
          choices: towableVehicles.map((vehicle) => ({
            name: `${vehicle.make} ${vehicle.model} (VIN: ${vehicle.vin})`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers) => {
        const vehicleToTow = this.vehicles.find(
          (vehicle) => vehicle.vin === answers.vehicleToTow
        );

        if (vehicleToTow) {
          truck.tow(vehicleToTow);
        } else {
          console.log("Vehicle not found.");
        }

        this.performActions();
      });
  }
}

export default Cli;

