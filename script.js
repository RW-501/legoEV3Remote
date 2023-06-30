var connection = "blue";
// Global variables for the Bluetooth device and connection status

let connectionStatusElement;


let device; // Variable to store the Bluetooth device

if (navigator.bluetooth) {
  // Web Bluetooth API is supported
  // Your code for connecting to the Bluetooth device and controlling motors
    document.getElementById("message").innerHTML = 'supported';
} else {
  // Web Bluetooth API is not supported
  document.getElementById("message").innerHTML = 'Web Bluetooth API is not supported in this browser.';
}
// Function to handle the connection and send commands




// Function to handle the connection and send commands
async function connectToDevice() {
  try {
    // Request Bluetooth device
    const device = await navigator.bluetooth.requestDevice({
      filters: [
        { services: ['00001101-0000-1000-8000-00805f9b34fb'] } // LEGO Mindstorms EV3 service UUID
      ]
    });

    // Connect to the Bluetooth device
    const server = await device.gatt.connect();

    // Update the connection status
    const connectionStatusElement = document.getElementById("connectionStatus");
    connectionStatusElement.textContent = "Connected";
    document.getElementById("message").innerHTML = '';

    // Get the buttons for each motor
    const motorAForwardBtn = document.querySelector("#controls button[data-motor='A'][data-direction='forward']");
    const motorABackwardBtn = document.querySelector("#controls button[data-motor='A'][data-direction='backward']");
    const motorBForwardBtn = document.querySelector("#controls button[data-motor='B'][data-direction='forward']");
    const motorBBackwardBtn = document.querySelector("#controls button[data-motor='B'][data-direction='backward']");
    const motorCForwardBtn = document.querySelector("#controls button[data-motor='C'][data-direction='forward']");
    const motorCBackwardBtn = document.querySelector("#controls button[data-motor='C'][data-direction='backward']");
    const motorDForwardBtn = document.querySelector("#controls button[data-motor='D'][data-direction='forward']");
    const motorDBackwardBtn = document.querySelector("#controls button[data-motor='D'][data-direction='backward']");

    // Function to send motor command
    function sendMotorCommand(motor, direction) {
      const command = direction === 'forward' ? 'F' : 'B';
      const characteristic = getMotorCharacteristic(motor);
      const data = new Uint8Array([command.charCodeAt(0)]);
      characteristic.writeValue(data);
    }

    // Function to move a motor
    function moveMotor(motor, direction) {
      sendMotorCommand(motor, direction);
    }

    // Function to stop a motor
    function stopMotor(motor) {
      sendMotorCommand(motor, 'stop');
    }

    // Function to get the characteristic for a motor
    function getMotorCharacteristic(motor) {
      // Replace the characteristic UUIDs with the actual UUIDs for your EV3 brick
      switch (motor) {
        case 'A':
          return '00001526-1212-efde-1523-785feabcd123'; // Motor A characteristic UUID
        case 'B':
          return '00001527-1212-efde-1523-785feabcd123'; // Motor B characteristic UUID
        case 'C':
          return '00001528-1212-efde-1523-785feabcd123'; // Motor C characteristic UUID
        case 'D':
          return '00001529-1212-efde-1523-785feabcd123'; // Motor D characteristic UUID
        default:
            document.getElementById("message").innerHTML ='Invalid motor:  '+ motor;
          return null;
      }
    }

    // Add event listeners to the motor buttons
    motorAForwardBtn.addEventListener('click', () => moveMotor('A', 'forward'));
    motorABackwardBtn.addEventListener('click', () => moveMotor('A', 'backward'));
    motorBForwardBtn.addEventListener('click', () => moveMotor('B', 'forward'));
    motorBBackwardBtn.addEventListener('click', () => moveMotor('B', 'backward'));
    motorCForwardBtn.addEventListener('click', () => moveMotor('C', 'forward'));
    motorCBackwardBtn.addEventListener('click', () => moveMotor('C', 'backward'));
    motorDForwardBtn.addEventListener('click', () => moveMotor('D', 'forward'));
    motorDBackwardBtn.addEventListener('click', () => moveMotor('D', 'backward'));

  } catch (error) {
      document.getElementById("message").innerHTML ='Bluetooth connection error:  '+ error;
  }
}

// Function to initialize the page
function initializePage() {
  const connectButton = document.getElementById("connectButton");
  connectButton.addEventListener('click', connectToDevice);
}

// Call the initializePage function to set up the page
initializePage();





    if(connection === "blue"){

    
}else{
    
    // Establish a WebSocket connection to the EV3 brick
const socket = new WebSocket('ws://EV3_BRICK_IP_ADDRESS:3000');

// When the WebSocket connection is established
socket.onopen = function() {
    console.log('Connected to EV3 brick');
};

// When a message is received from the EV3 brick
socket.onmessage = function(event) {
    const message = event.data;
    console.log('Received message from EV3:', message);
    // Handle the received message (e.g., sensor data)
    // Add your custom logic here
};

// When an error occurs with the WebSocket connection
socket.onerror = function(error) {
    console.error('WebSocket error:', error);
};

// Function to send a command to the EV3 brick
function sendCommand(command) {
    // Send the command as a message to the EV3 brick
    socket.send(command);
    console.log('Sent command to EV3:', command);
}

// Function to move a motor
function moveMotor(motor, direction) {
    // Construct the command based on the motor and direction
    const command = `MOVE_${direction.toUpperCase()}_${motor.toUpperCase()}`;
    sendCommand(command);
}

// Function to stop a motor
function stopMotor(motor) {
    // Construct the command to stop the motor
    const command = `STOP_${motor.toUpperCase()}`;
    sendCommand(command);
}


}
