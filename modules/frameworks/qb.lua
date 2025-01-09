local debug = require("modules.utils.shared").debug

local qb = exports["qb-core"]:GetCoreObject()
local interface = require("modules.interface.client")

local qbFramework = {}
qbFramework.__index = qbFramework

local function toggleHud(state)
    interface.toggle(state)
    DisplayRadar(state)
    debug("(toggleHud) Toggled HUD to state: ", state)
end

RegisterNetEvent('QBCore:Client:OnPlayerLoaded', function()
	debug("QBCore:Client:OnPlayerLoaded event triggered")
    toggleHud(true)
end)

RegisterNetEvent('QBCore:Client:OnPlayerUnload', function()
	debug("QBCore:Client:OnPlayerUnload event triggered")
    toggleHud(false)
end)

function qbFramework.new()
	debug("(qbFramework:new) Created new instance.")
	local self = setmetatable({}, qbFramework)
	self.values = {}

	RegisterNetEvent("hud:client:UpdateNeeds", function(hunger, thirst)
		self.values.hunger = hunger
		self.values.thirst = thirst
	end)

	RegisterNetEvent("hud:client:UpdateStress", function(stress)
		self.values.stress = stress
	end)

	return self
end

function qbFramework:getPlayerHunger()
	return self.values.hunger or "disabled"
end

function qbFramework:getPlayerThirst()
	return self.values.thirst or "disabled"
end

function qbFramework:getPlayerStress()
	return self.values.stress or "disabled"
end

return qbFramework
