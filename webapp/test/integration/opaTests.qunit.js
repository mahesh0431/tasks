/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	sap.ui.require([
		"grctasks/test/integration/AllJourneys"
	], function() {
		QUnit.start();
	});
});