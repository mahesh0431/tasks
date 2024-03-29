sap.ui.define([
    "sap/base/util/ObjectPath",
    "sap/ushell/services/Container"
], function (ObjectPath) {
    "use strict";

    // define ushell config
    ObjectPath.set(["sap-ushell-config"], {
        defaultRenderer: "fiori2",
        bootstrapPlugins: {
            "RuntimeAuthoringPlugin": {
                component: "sap.ushell.plugins.rta",
                config: {
                    validateAppVersion: false
                }
            },
            "PersonalizePlugin": {
                component: "sap.ushell.plugins.rta-personalize",
                config: {
                    validateAppVersion: false
                }
            }
        },
        renderers: {
            fiori2: {
                componentData: {
                    config: {
                        enableSearch: false,
                        rootIntent: "Shell-home"
                    }
                }
            }
        },
        services: {
            "LaunchPage": {
                "adapter": {
                    "config": {
                        "groups": [{
                            "tiles": [
                                {
                                    "tileType": "sap.ushell.ui.tile.StaticTile",
                                    "properties": {
                                        "title": "Risk Proposal",
                                        "targetURL": "#RiskProposalApp-display"
                                    }
                                },
                                {
                                    "tileType": "sap.ushell.ui.tile.StaticTile",
                                    "properties": {
                                        "title": "Risk Assess",
                                        "targetURL": "#RiskAssessApp-display"
                                    }
                                }, {
                                    "tileType": "sap.ushell.ui.tile.DynamicTile",
                                    "properties": {
                                        "title": "My Tasks",
                                        "subtitle": "(Risk Champion)",
                                        "targetURL": "#Tasks-display",
                                        "numberValue": "10",
                                        "numberFactor": "Nos.",
                                        "icon": "sap-icon://approvals"
                                    }
                                }, {
                                    "tileType": "sap.ushell.ui.tile.DynamicTile",
                                    "properties": {
                                        "title": "My Tasks",
                                        "subtitle": "(VP)",
                                        "targetURL": "#Tasks-display",
                                        "numberValue": "5",
                                        "numberFactor": "Nos.",
                                        "icon": "sap-icon://approvals"
                                    }
                                }]
                        }]
                    }
                }
            },
            "ClientSideTargetResolution": {
                "adapter": {
                    "config": {
                        "inbounds": {
                            "RiskProposal-display": {
                                "semanticObject": "RiskProposalApp",
                                "action": "display",
                                "description": "Risk Proposal Request",
                                "title": "Risk Proposal Request",
                                "signature": {
                                    "parameters": {}
                                },
                                "resolutionResult": {
                                    "applicationType": "SAPUI5",
                                    "additionalInformation": "SAPUI5.Component=gmriskproposal",
                                    "url": "../resources/gmriskproposal"
                                }
                            },
                            "RiskAssess-display": {
                                "semanticObject": "RiskAssessApp",
                                "action": "display",
                                "description": "Risk Assess Request",
                                "title": "Risk Assess Request",
                                "signature": {
                                    "parameters": {}
                                },
                                "resolutionResult": {
                                    "applicationType": "SAPUI5",
                                    "additionalInformation": "SAPUI5.Component=grcriskassess",
                                    "url": "../resources/grcriskassess"
                                }
                            },
                            "Tasks-display": {
                                "semanticObject": "Tasks",
                                "action": "display",
                                "description": "Tasks",
                                "title": "My Tasks",
                                "signature": {
                                    "parameters": {}
                                },
                                "resolutionResult": {
                                    "applicationType": "SAPUI5",
                                    "additionalInformation": "SAPUI5.Component=grctasks",
                                    "url": sap.ui.require.toUrl("grctasks")
                                }
                            }
                        }
                    }
                }
            },
            NavTargetResolution: {
                config: {
                    "enableClientSideTargetResolution": true
                }
            }
        }
    });

    var oFlpSandbox = {
        init: function () {
			/**
			 * Initializes the FLP sandbox
			 * @returns {Promise} a promise that is resolved when the sandbox bootstrap has finshed
			 */

            // sandbox is a singleton, so we can start it only once
            if (!this._oBootstrapFinished) {
                this._oBootstrapFinished = sap.ushell.bootstrap("local");
                this._oBootstrapFinished.then(function () {
                    sap.ushell.Container.createRenderer().placeAt("content");
                });
            }

            return this._oBootstrapFinished;
        }
    };

    return oFlpSandbox;
});