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
