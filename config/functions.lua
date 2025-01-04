return {
	isSeatbeltOn = function() -- Repalce this with your own seatbelt logic if your not using the built in seatbelt logic.
		return false
	end,
	getVehicleFuel = function(currentVehicle) -- Replace this with your own logic to grab the fuel level of the vehicle.
		return GetVehicleFuelLevel(currentVehicle)
	end,
	getNosLevel = function(currentVehicle) -- Replace this with your own logic to grab the nos level of the vehicle.
		return 0
	end,
}
