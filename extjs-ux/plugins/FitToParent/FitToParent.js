Ext.namespace('Ext.ux.plugins');
Ext.ux.plugins.FitToParent = Ext.extend(Object, {
    constructor: function(parent) {
        this.parent = parent;
    },
    init: function(c) {
        c.on('render', function(c) {
            c.fitToElement = Ext.get(this.parent || c.getDomPositionEl().dom.parentNode);
        }, this, {single: true});
        c.monitorResize = true;
        c.doLayout = c.doLayout.createInterceptor(this.fitSizeToParent);
    },
    fitSizeToParent: function() {
        var pos = this.getPosition(true), size = this.fitToElement.getViewSize();
        this.setSize(size.width - pos[0], size.height - pos[1]);
    }
});