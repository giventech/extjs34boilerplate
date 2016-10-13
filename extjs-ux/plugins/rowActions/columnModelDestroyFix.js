//destroy fix
Ext.override(Ext.grid.ColumnModel, {
    destroy : function(){
        for(var i = 0, len = this.config.length; i < len; i++){
            Ext.destroy(this.config[i]);
        }
        this.purgeListeners();
    }
});