//qtip fix
Ext.override(Ext.ux.grid.RowActions, {
	/**
	 * @cfg {String} tplGroup Template for group actions
	 * @private
	 */
	tplGroup:
		 '<tpl for="actions">'
		+'<div class="ux-grow-action-item<tpl if="\'right\'===align"> ux-action-right</tpl> '
		+'{cls}" style="{style}" ext:qtip="{qtip}">{text}</div>'
		+'</tpl>'
	
	/**
	 * @cfg {String} tplRow Template for row actions
	 * @private
	 */
	,tplRow:
		 '<div class="ux-row-action">'
		+'<tpl for="actions">'
		+'<div class="ux-row-action-item {cls} <tpl if="text">'
		+'ux-row-action-text</tpl>" style="{hide}{style}" ext:qtip="{qtip}">'
		+'<tpl if="text"><span ext:qtip="{qtip}">{text}</span></tpl></div>'
		+'</tpl>'
		+'</div>'

});