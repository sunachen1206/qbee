bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Dollar), function () {
    蓝牙命令字符 = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Dollar))
    命令类型 = qdee.qdee_analyzeBluetoothCmd(蓝牙命令字符)
    if (命令类型 == qdee.qdee_getBluetoothCmdtype(qdee.QdeeCmdType.RGB_LIGHT)) {
        qdee.qdee_setPixelRGBArgs(QdeeLights.All, qdee.qdee_getArgs(蓝牙命令字符, 1))
        qdee.qdee_showLight()
    }
    if (命令类型 == qdee.qdee_getBluetoothCmdtype(qdee.QdeeCmdType.BAT)) {
        bluetooth.uartWriteString(qdee.qdee_convertBattery(qdee.qdee_getBatVoltage()))
    }
    if (命令类型 == qdee.qdee_getBluetoothCmdtype(qdee.QdeeCmdType.VERSION)) {
        bluetooth.uartWriteString("CMD|0A|61|$")
    }
    if (命令类型 == qdee.qdee_getBluetoothCmdtype(qdee.QdeeCmdType.REMOTE)) {
        qdee.qdee_send_remote_phone_data(qdee.qdee_getArgs(蓝牙命令字符, 1))
    }
    if (命令类型 == qdee.qdee_getBluetoothCmdtype(qdee.QdeeCmdType.ULTRASONIC)) {
        bluetooth.uartWriteString(qdee.qdee_convertUltrasonic(qdee.qdee_ultrasonic(qdee.ultrasonicPort.port2)))
    }
    if (命令类型 == qdee.qdee_getBluetoothCmdtype(qdee.QdeeCmdType.TEMPERATURE)) {
        bluetooth.uartWriteString(qdee.qdee_convertTemperature(input.temperature()))
    }
    if (命令类型 == qdee.qdee_getBluetoothCmdtype(qdee.QdeeCmdType.LIGHT)) {
        bluetooth.uartWriteString(qdee.qdee_convertLight(input.lightLevel()))
    }
    if (命令类型 == qdee.qdee_getBluetoothCmdtype(qdee.QdeeCmdType.SHOW_FACE)) {
        qdee.qdee_show_expressions(qdee.qdee_getArgs(蓝牙命令字符, 1))
        bluetooth.uartWriteString("CMD|14|00|$")
    }
    if (命令类型 == qdee.qdee_getBluetoothCmdtype(qdee.QdeeCmdType.CHANGE_MODE)) {
        bluetooth.uartWriteString("CMD|13|00|$")
    }
    if (命令类型 == qdee.qdee_getBluetoothCmdtype(qdee.QdeeCmdType.SERVO)) {
        qdee.qdee_setBusServo(qdee.busServoPort.port10, qdee.qdee_getArgs(蓝牙命令字符, 1), qdee.qdee_getArgs(蓝牙命令字符, 2) - 120, qdee.qdee_getArgs(蓝牙命令字符, 1))
    }
    if (命令类型 == qdee.qdee_getBluetoothCmdtype(qdee.QdeeCmdType.CAR_RUN)) {
        车辆行进类型 = qdee.qdee_getArgs(蓝牙命令字符, 1)
        行进速度 = qdee.qdee_getArgs(蓝牙命令字符, 2)
        if (车辆行进类型 == qdee.qdee_getRunCarType(qdee.QdeeCarRunCmdType.GO_AHEAD)) {
            bluetooth.uartWriteString("CMD|01|01|$")
            行进速度 = 行进速度 * 20
            if (行进速度 == 100) {
                行进速度 = 85
            }
            qdee.qdee_setMotorSpeed(行进速度, 行进速度)
        }
        if (车辆行进类型 == qdee.qdee_getRunCarType(qdee.QdeeCarRunCmdType.GO_BACK)) {
            bluetooth.uartWriteString("CMD|01|02|$")
            行进速度 = 行进速度 * 20
            if (行进速度 == 100) {
                行进速度 = 85
            }
            qdee.qdee_setMotorSpeed(行进速度 * -1, 行进速度 * -1)
        }
        if (车辆行进类型 == qdee.qdee_getRunCarType(qdee.QdeeCarRunCmdType.TURN_LEFT)) {
            bluetooth.uartWriteString("CMD|01|03|$")
            qdee.qdee_setMotorSpeed(行进速度 * 12, 行进速度 * -12)
        }
        if (车辆行进类型 == qdee.qdee_getRunCarType(qdee.QdeeCarRunCmdType.TURN_RIGHT)) {
            bluetooth.uartWriteString("CMD|01|04|$")
            qdee.qdee_setMotorSpeed(行进速度 * -12, 行进速度 * 12)
        }
        if (车辆行进类型 == qdee.qdee_getRunCarType(qdee.QdeeCarRunCmdType.STOP)) {
            bluetooth.uartWriteString("CMD|01|00|$")
            qdee.qdee_setMotorSpeed(0, 0)
        }
    }
})
bluetooth.onBluetoothConnected(function () {
	
})
bluetooth.onBluetoothDisconnected(function () {
	
})
let 行进速度 = 0
let 车辆行进类型 = 0
let 命令类型 = 0
let 蓝牙命令字符 = ""
qdee.qdee_Init()
basic.showIcon(IconNames.Heart)
