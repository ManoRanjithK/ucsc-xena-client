'use strict';
var React = require('react');
var VizSettings = require('../views/VizSettings');
// XXX move ColumnEdit2 to views?
var _ = require('../underscore_ext');

var vizSettingsState = ['defaultNormalization', 'colorClass', 'vizSettings', 'valueType', 'fieldType'];
function vizSettingsSelector(appState, columnId) {
	return _.pick(_.getIn(appState, ['columns', columnId]), vizSettingsState);
}

function addVizEditor(Component) {
	return React.createClass({
		displayName: 'SpreadsheetVizSettings',
		onHideViz: function () {
			this.props.onOpenVizSettings(null);
		},
		render() {
			// XXX appState?

			var {onVizSettings, ...componentProps} = this.props,
				{appState} = componentProps,
				{openVizSettings} = appState,
				data = appState.data[openVizSettings],
				units = appState.columns[openVizSettings] && appState.columns[openVizSettings].units;
			return (
				<Component {...componentProps}>
					{this.props.children}
					{openVizSettings ?
						<VizSettings
							id={openVizSettings}
							onRequestHide={this.onHideViz}
							onVizSettings={onVizSettings}
							data={data}
							units={units}
							{...vizSettingsSelector(appState, openVizSettings)}/> :
						null}
				</Component>);
		}
	});
}

module.exports = addVizEditor;