	Ext.override(Ext.ux.form.DateTime, {
	    /**
	     * @cfg {Number} dateWidth Width of time field in pixels (defaults to 100)
	     */
	    dateWidth:100,
		initDate: null,
		tabIndex: undefined,
		keepVisibleConfig: true,
		finalDateConfig:null,
		finalTimeConfig: null,
		checkHidden: false,
		submitBlankAsEmpty: true,
	    initComponent:function() {
	        // call parent initComponent
	        Ext.ux.form.DateTime.superclass.initComponent.call(this);

	        var dateListeners = Ext.apply({}, this.dateConfig.listeners,
	        		{
	                  blur:{scope:this, fn:this.onBlur}
	                 ,focus:{scope:this, fn:this.onFocus}
	                 //,keypress: {scope:this, fn:this.onKeyPress}
	                 //,keydown: {scope:this, fn:this.onKeyDown}
	                 //,specialkey: {scope:this, fn:this.onSpecialKey}
	        		}
	        );
	        
	        // create DateField
	        
//	        this.finalDateConfig = Ext.apply({}, {
//	             id:this.id + '-date'
//	            ,format:this.dateFormat || Ext.form.DateField.prototype.format
//	            ,width:this.dateWidth
//	            ,tabIndex: this.tabIndex
//	            ,selectOnFocus:this.selectOnFocus
//	            ,validator:this.dateValidator
//	            ,listeners:{
//	                  blur:{scope:this, fn:this.onBlur}
//	                 ,focus:{scope:this, fn:this.onFocus}
//	                 //,keypress: {scope:this, fn:this.onKeyPress}
//	                 //,keydown: {scope:this, fn:this.onKeyDown}
//	                 //,specialkey: {scope:this, fn:this.onSpecialKey}
//	            }
//	        }, this.dateConfig);

   	        this.finalDateConfig = Ext.apply({}, {
	   	             id:this.id + '-date'
	   	            ,format:this.dateFormat || Ext.form.DateField.prototype.format
	   	            ,width:this.dateWidth
	   	            ,tabIndex: this.tabIndex
	   	            ,selectOnFocus:this.selectOnFocus
	   	            ,validator:this.dateValidator
	   	            ,listeners: dateListeners
	   	    }, this.dateConfig);

	        this.df = new Ext.form.DateField(this.finalDateConfig);
	        this.df.ownerCt = this;
	        delete(this.dateFormat);

	        // create TimeField
	        this.finalTimeConfig = Ext.apply({}, {
	             id:this.id + '-time'
	            ,format:this.timeFormat || Ext.form.TimeField.prototype.format
	            ,width:this.timeWidth
	            ,selectOnFocus:this.selectOnFocus
	            ,validator:this.timeValidator
	            ,listeners:{
	                  blur:{scope:this, fn:this.onBlur}
	                 ,focus:{scope:this, fn:this.onFocus}
	            }
	        }, this.timeConfig);
	        this.tf = new Ext.form.TimeField(this.finalTimeConfig);
	        this.tf.ownerCt = this;
	        delete(this.timeFormat);

	        // relay events
	        this.relayEvents(this.df, ['focus', 'specialkey', 'invalid', 'valid']);
	        this.relayEvents(this.tf, ['focus', 'specialkey', 'invalid', 'valid', 'select']);

	        this.on('specialkey', this.onSpecialKey, this);

	    }, // eo function initComponent
	    onRender:function(ct, position) {
	        // don't run more than once
	        if(this.isRendered) {
	            return;
	        }

	        // render underlying hidden field
	        Ext.ux.form.DateTime.superclass.onRender.call(this, ct, position);

	        // render DateField and TimeField
	        // create bounding table
	        var t;
	        if('below' === this.timePosition || 'bellow' === this.timePosition) {
	            t = Ext.DomHelper.append(ct, {tag:'table',style:'border-collapse:collapse',children:[
	                 {tag:'tr',children:[{tag:'td', style:'padding-bottom:1px', cls:'ux-datetime-date'}]}
	                ,{tag:'tr',children:[{tag:'td', cls:'ux-datetime-time'}]}
	            ]}, true);
	        }
	        else {
	            t = Ext.DomHelper.append(ct, {tag:'table',style:'border-collapse:collapse',children:[
	                {tag:'tr',children:[
	                    {tag:'td',style:'padding-right:4px', cls:'ux-datetime-date'},{tag:'td', cls:'ux-datetime-time'}
	                ]}
	            ]}, true);
	        }

	        this.tableEl = t;
	        this.wrap = t.wrap({cls:'x-form-field-wrap'});
//	        this.wrap = t.wrap();
	        this.wrap.on("mousedown", this.onMouseDown, this, {delay:10});

	        // render DateField & TimeField
	        this.df.render(t.child('td.ux-datetime-date'));
	        this.tf.render(t.child('td.ux-datetime-time'));

	        // workaround for IE trigger misalignment bug
	        // see http://extjs.com/forum/showthread.php?p=341075#post341075
//	        if(Ext.isIE && Ext.isStrict) {
//	            t.select('input').applyStyles({top:0});
//	        }

	       //this.df.el.swallowEvent(['keydown', 'keypress']); //removed for backspace issue
	       //this.tf.el.swallowEvent(['keydown', 'keypress']);

	        // create icon for side invalid errorIcon
	        if('side' === this.msgTarget) {
	            var elp = this.el.findParent('.x-form-element', 10, true);
	            if(elp) {
	                this.errorIcon = elp.createChild({cls:'x-form-invalid-icon'});
	            }

	            var o = {
	                 errorIcon:this.errorIcon
	                ,msgTarget:'side'
	                ,alignErrorIcon:this.alignErrorIcon.createDelegate(this)
	            };
	            Ext.apply(this.df, o);
	            Ext.apply(this.tf, o);
//	            this.df.errorIcon = this.errorIcon;
//	            this.tf.errorIcon = this.errorIcon;
	        }

	        // setup name for submit
	        this.el.dom.name = this.hiddenName || this.name || this.id;

	        // prevent helper fields from being submitted
	        this.df.el.dom.removeAttribute("name");
	        this.tf.el.dom.removeAttribute("name");

	        // we're rendered flag
	        this.isRendered = true;

	        // update hidden field
	        this.updateHidden();

	    }, // eo function onRender

		setInitDate: function(date) {
			if(date instanceof Date)
			{
				this.initDate = date;
			}	
		},
		getInitDate: function() {
			return this.initDate;
		},
		initDateValue:function() {
	        this.dateValue = this.initDate != null ? this.initDate : this.otherToNow ? new Date().clearTime() : new Date(1970, 0, 1, 0, 0, 0);
	    },
	    getRawTimeValue:function() {
	    	return this.tf.getValue();
	    },
//	    getValue:function() {
//	      // create new instance of date
//	      //return this.dateValue ? new Date(this.dateValue) : '';
//	  	
//		  	if(this.dateValue)
//		  	{
//		  		return this.dateValue.equals(new Date(1970, 0, 1, 0, 0, 0)) ? '' : new Date(this.dateValue);
//		  	}
//		  	else
//		  	{
//		  		return '';
//		  	}	
//	    },
//	    setTime:function(date) {
//		      //this.tf.setValue(date);
//	    	  if(date instanceof Date && date.equals(new Date(1970, 0 ,1, 0, 0, 0)))
//		      {
//		      	this.tf.setValue('');
//		      }
//		      else
//		      {
//		      	this.tf.setValue(date);
//		      }
//	    },
	    getDateField: function() {
	    	return this.df;
	    },
	    getTimeField: function() {
	    	return this.tf;
	    },
	    getRawDateValue:function() {
	    	return this.df.getValue();
	    },
	    onBlur:function(f) {
	        // called by both DateField and TimeField blur events
	        // revert focus to previous field if clicked in between
	        if(this.wrapClick) {
	            f.focus();
	            this.wrapClick = false;
	        }

	        // update underlying value
	        if(f === this.df) {
	            this.updateDate();
	        }
	        else {
	            this.updateTime();
	        }
	        this.updateHidden();

	        this.validate();
	        // fire events later
	        (function() {
	            if(!this.df.hasFocus && !this.tf.hasFocus) {
	                var v = this.getValue();
	                
	                var rawTimeVal = this.getRawTimeValue();
	                var stVal = String(this.startValue);
	                if(this.startValue instanceof Date)
	                {
	                	stVal = this.startValue.format('H:i:s');
	                }	
	                
//	                if(String(v) !== String(this.startValue)) {
	               	if(String(v) !== String(this.startValue) || rawTimeVal !== stVal) {
	                    this.fireEvent("change", this, v, this.startValue);
	                }
	                this.hasFocus = false;
	                this.fireEvent('blur', this);
	            }
	        }).defer(20, this);

	    }

	    
	    ,updateHidden:function() {
	        if(this.isRendered) {
	            var value = this.dateValue instanceof Date ? this.dateValue.format(this.hiddenFormat) : (this.submitBlankAsEmpty==true ? '' : new Date(1970, 0, 1, 0, 0, 0).format(this.hiddenFormat));
	            this.el.dom.value = value;
	        }
	    },
	    /**
	     * @private
	     * Handles Tab and Shift-Tab events
	     */
	    onSpecialKey:function(t, e) {
	        var key = e.getKey();
	        if(key === e.TAB) {
	            if(t === this.df && !e.shiftKey && this.tf.isVisible()) {
	                e.stopEvent();
	                this.tf.focus();
	            }
	            if(t === this.tf && e.shiftKey && this.df.isVisible()) {
	                e.stopEvent();
	                this.df.focus();
	            }
	            this.updateValue();
	        }
	        // otherwise it misbehaves in editor grid
	        if(key === e.ENTER) {
	            this.updateValue();
	        }

	    } // eo function onSpecialKey

	    /**
	     * Hide or show this component by boolean
	     * @return {Ext.Component} this
	     */
	    ,setVisible: function(visible){
        	if(visible == false || this.keepVisibleConfig == false) {
        		this.df.show();
        		this.tf.show();
	        }
	        else
	        {
        		if (!this.finalDateConfig.hasOwnProperty('hidden') ||  this.finalDateConfig.hidden != true)
        		{
        			this.df.show();	
        		}

        		if (!this.finalTimeConfig.hasOwnProperty('hidden') ||  this.finalTimeConfig.hidden != true)
        		{
        			this.tf.show();	
        		}
	        }	
	        return this;
	    } // eo function setVisible

	    /**
	     * @private
	     * Sets correct sizes of underlying DateField and TimeField
	     * With workarounds for IE bugs
	     */
	    ,setSize:function(w, h) {
	        if(!w) {
	            return;
	        }
	        if('below' === this.timePosition) {
	            this.df.setSize(w, h);
	            this.tf.setSize(w, h);
	            if(Ext.isIE) {
	                this.df.el.up('td').setWidth(w);
	                this.tf.el.up('td').setWidth(w);
	            }
	        }
	        else if(this.df.hidden === true || this.tf.hidden === true) 
	        {
	            this.df.setSize(w, h);
	            this.tf.setSize(w, h);
	            if(Ext.isIE) {
	                this.df.el.up('td').setWidth(w);
	                this.tf.el.up('td').setWidth(w);
	            }
	        }	
	        else {
	            this.df.setSize(w - this.dateWidth - 4, h);
	            this.tf.setSize(this.timeWidth, h);

	            if(Ext.isIE) {
	                this.df.el.up('td').setWidth(w - this.dateWidth - 4);
	                this.tf.el.up('td').setWidth(this.timeWidth);
	            }
	        }
	    } // eo function setSize


	    ,setAllowBlank: function(allowBlank, checkVisible) {
			var checkVisible = (Ext.isEmpty(checkVisible) ? true : checkVisible);
			var checkHidden = this.checkHidden;
			
	    	if(checkVisible === false && checkHidden === false 
	    			|| (checkVisible === true && this.df.isVisible() && checkHidden === false) 
	    			|| (checkHidden === true && this.df.hidden != true && checkVisible === false)
	    			|| (checkVisible === true && this.df.isVisible() && checkHidden === true && this.df.hidden != true) 
	    	)
	    	{
	    		this.df.allowBlank = allowBlank;
	    	}	

	    	if(checkVisible === false && checkHidden === false 
	    			|| (checkVisible === true && this.tf.isVisible() && checkHidden === false) 
	    			|| (checkHidden === true && this.tf.hidden != true && checkVisible === false)
	    			|| (checkVisible === true && this.tf.isVisible() && checkHidden === true && this.tf.hidden != true) 
	    	)
	    	{
	    		this.tf.allowBlank = allowBlank;
	    	}	
	    }
	    ,setReadOnly:function(rdOnly){
	    	this.readOnly = true;
	        this.df.setReadOnly(rdOnly);
	    } // eo function clearInvalid
	    ,makeViewOnly: function() {
	    	this.viewOnly = true;
			this.df.setReadOnly(true);
			this.df.addClass('x-item-disabled');
		}
		,clearViewOnly: function() {
			this.viewOnly = false;
			this.df.setReadOnly(false);
			this.df.removeClass('x-item-disabled');
		}

	});
